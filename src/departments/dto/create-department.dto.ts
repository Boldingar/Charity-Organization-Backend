import { IsNumber, IsString } from "class-validator";
export class CreateDepartmentDto {
    @IsString()
    name: string;
    @IsNumber()
    hotline: number;
    @IsNumber()
    ManagerSSN: number;
}
