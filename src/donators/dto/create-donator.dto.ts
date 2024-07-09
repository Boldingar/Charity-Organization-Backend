import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class CreateDonatorDto {
  @ApiProperty()
  @IsString()
  ssn: string;

  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  phone: string;
}
