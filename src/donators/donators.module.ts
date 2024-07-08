import { Module } from '@nestjs/common';
import { DonatorsService } from './donators.service';
import { DonatorsController } from './donators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donator } from './entities/donator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donator])],
  controllers: [DonatorsController],
  providers: [DonatorsService],
})
export class DonatorsModule {}
