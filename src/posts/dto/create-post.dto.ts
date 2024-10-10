import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Post' })
  title: string;

  @ApiProperty({ example: 'This is the content of the post' })
  content: string;

  @ApiProperty({ example: 1 })
  authorId: number;
}
