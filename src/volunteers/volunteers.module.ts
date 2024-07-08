import { Module } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { VolunteersController } from './volunteers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from './entities/volunteer.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Department } from 'src/departments/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer, Staff, Department])],
  controllers: [VolunteersController],
  providers: [VolunteersService],
})
export class VolunteersModule {}
