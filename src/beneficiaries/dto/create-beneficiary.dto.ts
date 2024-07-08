import { IsNumber, IsString } from 'class-validator';
export class CreateBeneficiaryDto {
  @IsNumber()
  ssn: number;
  @IsString()
  name: string;
  @IsString()
  phone: string;
}
