import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Beneficiary } from 'src/beneficiaries/entities/beneficiary.entity';
import { Volunteer } from 'src/volunteers/entities/volunteer.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event,Department,Staff, Volunteer, Beneficiary])],
  controllers: [EventsController],
  providers: [EventService],
})
export class EventsModule {}
