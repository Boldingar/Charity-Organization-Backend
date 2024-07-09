import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':ssn')
  findOne(@Param('ssn') ssn: string) {
    return this.staffService.findOne(ssn);
  }

  @Patch(':ssn')
  update(@Param('ssn') ssn: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(ssn, updateStaffDto);
  }

  @Delete(':ssn')
  remove(@Param('ssn') ssn: string) {
    return this.staffService.remove(ssn);
  }
}
