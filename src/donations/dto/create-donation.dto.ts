import { IsNumber, IsString, IsDate } from 'class-validator';
export class CreateDonationDto {
  @IsString()
  type: string;
  @IsDate()
  date: Date;
  @IsNumber()
  amount: number;
  @IsNumber()
  donatorSSN: number;
  @IsString()
  department: string;
}
