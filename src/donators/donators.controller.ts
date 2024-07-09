import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DonatorsService } from './donators.service';
import { CreateDonatorDto } from './dto/create-donator.dto';
import { UpdateDonatorDto } from './dto/update-donator.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@Controller('donators')
export class DonatorsController {
  constructor(private readonly donatorsService: DonatorsService) {}

  @Post()
  create(@Body() createDonatorDto: CreateDonatorDto) {
    return this.donatorsService.create(createDonatorDto);
  }

  @Get()
  findAll() {
    return this.donatorsService.findAll();
  }

  @Get(':ssn')
  findOne(@Param('ssn') ssn: string) {
    return this.donatorsService.findOne(ssn);
  }

  @Patch(':ssn')
  update(@Param('ssn') ssn: string, @Body() updateDonatorDto: UpdateDonatorDto) {
    return this.donatorsService.update(ssn, updateDonatorDto);
  }

  @Delete(':ssn')
  remove(@Param('ssn') ssn: string) {
    return this.donatorsService.remove(ssn);
  }
}
