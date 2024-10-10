import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' }) 
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
