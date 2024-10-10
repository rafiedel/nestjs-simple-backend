import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    minLength: 6,
    example: 'root@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    maxLength: 65,
    example: 'password',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(65)
  password: string;
}
