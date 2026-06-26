import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationDto } from './dto/pagination.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Authenticated } from 'src/common/decorators/authenticated.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Authenticated()
  @Post()
  create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  findAll(
    @Query() pagination: PaginationDto,
    @Query('category') category: string,
  ) {
    return this.postsService.findAll(pagination, category);
  }

  @ApiOperation({ summary: 'Get all deleted posts' })
  @Get('deleted')
  @ApiResponse({
    status: 200,
    description: 'Deleted posts retrieved successfully',
  })
  @Authenticated()
  findAllWithDeleted() {
    return this.postsService.findAllWithDeleted();
  }

  @ApiOperation({ summary: 'Get a post by ID' })
  @Public()
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Post retrieved successfully',
    type: Post,
  })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @Authenticated()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a post by ID' })
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @Authenticated()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete a post by ID' })
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @Authenticated()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
