import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class SignInRequest {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  password: string;
}
