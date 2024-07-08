import { IsNumber, IsString, IsDate } from 'class-validator';
export class CreateEventDto {
  @IsString()
  name: string;
  @IsDate()
  date: Date;
  @IsNumber()
  fundingAmount: number;
  @IsString()
  department: string;
  @IsNumber()
  beneficiariesSSN: number[];
  @IsNumber()
  volunteersSSN: number[];
  @IsNumber()
  organizerSSN: number;
}
