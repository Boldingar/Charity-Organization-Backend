import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonatorDto } from './dto/create-donator.dto';
import { UpdateDonatorDto } from './dto/update-donator.dto';
import { Repository } from 'typeorm';
import { Donator } from './entities/donator.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DonatorsService {
  constructor(
    @InjectRepository(Donator)
    private DonatorRepository: Repository<Donator>,
  ) {}
  async create(createDonatorDto: CreateDonatorDto) {
    const Donator = this.DonatorRepository.create(createDonatorDto);

    return await this.DonatorRepository.save(Donator);
  }

  async findAll() {
    return await this.DonatorRepository.find();
  }

  async findOne(ssn: number) {
    return await this.DonatorRepository.findOne({ where: { ssn } });
  }

  async update(ssn: number, updateDonatorDto: UpdateDonatorDto) {
    const Donator = await this.findOne(ssn);

    if (!Donator) {
      throw new NotFoundException();
    }

    Object.assign(Donator, UpdateDonatorDto);

    return await this.DonatorRepository.save(Donator);
  }

  async remove(ssn: number) {
    const Donator = await this.findOne(ssn);

    if (!Donator) {
      throw new NotFoundException();
    }

    return await this.DonatorRepository.remove(Donator);
  }
}
