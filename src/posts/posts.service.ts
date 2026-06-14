import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const { userId, ...postData } = createPostDto;

    const post = this.postsRepository.create({
      ...postData,
      user: { id: userId },
    });
    return this.postsRepository.save(post);
  }

  findAll(category: string): Promise<Post[]> {
    const whereConditions: FindOptionsWhere<Post> = {};

    if (category) {
      whereConditions.category = category;
    }
    return this.postsRepository.find({
      where: whereConditions,
      relations: { user: true },
      select: { user: { email: true, fullName: true } },
    });
  }

  async findOne(id: number): Promise<Post | null> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: { user: true },
      select: { user: { email: true, fullName: true } },
    });
    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postsRepository.preload({
      id,
      ...updatePostDto,
    });
    if (!post) throw new NotFoundException('Post not found');

    return this.postsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');

    await this.postsRepository.delete(id);
  }
}
