import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt, { compare } from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { randomUUID } from 'crypto';
import { RefreshToken } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { addDaysNative } from './utils/add-days-native';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await compare(password, user?.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: Pick<User, 'id' | 'email'>) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    const refreshId = randomUUID();
    const rawToken = randomUUID();
    const refreshToken = `${refreshId}.${rawToken}`;

    const daysToExpiration =
      Number(this.configService.get('REFRESH_TOKEN_EXPIRES_DAYS')) || 30;

    await this.refreshRepo.save({
      id: refreshId,
      tokenHash: await bcrypt.hash(rawToken, 10),
      user: { id: user.id },
      expiresAt: addDaysNative(new Date(), daysToExpiration),
    });
    return { accessToken, refreshToken };
  }

  async refresh(token: string) {
    const [tokenId, rawToken] = token.split('.');

    if (!tokenId || !rawToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const stored = await this.refreshRepo.findOne({
      where: { id: tokenId },
      relations: { user: true },
    });
    if (!stored) throw new UnauthorizedException('Invalid refresh token');

    const valid = await bcrypt.compare(rawToken, stored.tokenHash);
    if (!valid) throw new UnauthorizedException('Invalid refresh token');

    if (stored.expiresAt < new Date()) {
      await this.refreshRepo.delete(stored.id);
      throw new UnauthorizedException('Expired refresh token');
    }

    await this.refreshRepo.delete(stored.id);
    return this.login(stored.user);
  }
}
