import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateVolunteerDto {
  @ApiProperty()
  @IsString()
  ssn: string;
  
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsDate()
  DOB: Date;
  
  @ApiProperty()
  @IsString()
  phone: string;
  
  @ApiProperty()
  @IsString()
  departmentName: string; // using department name instead of ID
  
  @ApiProperty()
  @IsString()
  superSSN: string; // assuming you will send the SSN of the staff
}
