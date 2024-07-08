import { IsNumber, IsString } from 'class-validator';
export class CreateDonatorDto {
  @IsNumber()
  ssn: number;
  @IsString()
  name: string;
  @IsString()
  phone: string;
}
