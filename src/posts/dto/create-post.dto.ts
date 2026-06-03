import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'The title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  @Matches(/^\S+$/, {
    message: 'Must be a single word',
  })
  category: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsUUID('4', { message: 'The userId must be a valid UUID v4' })
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;
}
