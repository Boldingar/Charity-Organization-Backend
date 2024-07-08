import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateVolunteerDto {
  @IsNumber()
  ssn: number;
  
  @IsString()
  name: string;
  
  @IsDate()
  DOB: Date;
  
  @IsString()
  phone: string;
  
  @IsString()
  departmentName: string; // using department name instead of ID
  
  @IsNumber()
  superSSN: number; // assuming you will send the SSN of the staff
}
