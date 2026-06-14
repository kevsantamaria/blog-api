import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.count();
    if (existingUser) throw new ConflictException('A user already exists');

    const user = new User();
    user.email = createUserDto.email;
    user.password = await hash(createUserDto.password, 10);
    user.fullName = createUserDto.fullName;

    return this.userRepository.save(user);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async findbyEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
      password: updateUserDto.password
        ? await hash(updateUserDto.password, 10)
        : undefined,
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    await this.userRepository.delete(id);
  }
}
