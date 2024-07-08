import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationService } from './donations.service';
import { DonationsController } from './donations.controller';
import { Donation } from './entities/donation.entity';
import { Donator } from 'src/donators/entities/donator.entity';
import { Department } from 'src/departments/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Donation, Donator, Department]),
  ],
  controllers: [DonationsController],
  providers: [DonationService],
})
export class DonationsModule {}
