import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.departmentsService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(name, updateDepartmentDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.departmentsService.remove(name);
  }
}
