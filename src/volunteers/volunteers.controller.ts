import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Post()
  create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteersService.create(createVolunteerDto);
  }

  @Get()
  findAll() {
    return this.volunteersService.findAll();
  }

  @Get(':ssn')
  findOne(@Param('ssn') ssn: string) {
    return this.volunteersService.findOne(ssn);
  }

  @Patch(':ssn')
  update(@Param('ssn') ssn: string, @Body() updateVolunteerDto: UpdateVolunteerDto) {
    return this.volunteersService.update(ssn, updateVolunteerDto);
  }

  @Delete(':ssn')
  remove(@Param('ssn') ssn: string) {
    return this.volunteersService.remove(ssn);
  }
}

//gpg test
