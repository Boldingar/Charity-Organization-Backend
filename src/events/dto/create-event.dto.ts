import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';
export class CreateEventDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  fundingAmount: number;

  @ApiProperty()
  @IsNumber()
  beneficiariesSSN: number[];

  @ApiProperty()
  @IsNumber()
  volunteersSSN: number[];

  @ApiProperty()
  @IsString()
  organizerSSN: string;
}
