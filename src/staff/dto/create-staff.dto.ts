import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateStaffDto {
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
  @IsNumber()
  salary: number;

//   @ApiProperty()
//   @IsString()
//   departmentName: string; // using department name instead of ID
  
}
