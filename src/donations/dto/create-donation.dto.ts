import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';
export class CreateDonationDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  donatorSSN: string;

  @ApiProperty()
  @IsString()
  department: string;
}
