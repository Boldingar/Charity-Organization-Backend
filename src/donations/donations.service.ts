import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/departments/entities/department.entity';
import { Donator } from 'src/donators/entities/donator.entity';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private DonationRepository: Repository<Donation>,
    @InjectRepository(Donator)
    private DonatorRepository: Repository<Donator>,
    @InjectRepository(Department)
    private DepartmentRepository: Repository<Department>,
  ) {}

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const donator = await this.DonatorRepository.findOneBy({ ssn: createDonationDto.donatorSSN });
    if (!donator) {
      throw new NotFoundException('Donator not found');
    }

    const department = await this.DepartmentRepository.findOneBy({ name: createDonationDto.department });
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    const donation = new Donation();
    donation.type = createDonationDto.type;
    donation.date = createDonationDto.date;
    donation.amount = createDonationDto.amount;
    donation.donator = donator;
    donation.department = department;

    return await this.DonationRepository.save(donation);
  }

  async findAll() {
    return await this.DonationRepository.find();
  }

  async findOne(id: number) {
    return await this.DonationRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    const Donation = await this.findOne(id);

    if (!Donation) {
      throw new NotFoundException();
    }

    Object.assign(Donation, UpdateDonationDto);

    return await this.DonationRepository.save(Donation);
  }

  async remove(id: number) {
    const Donation = await this.findOne(id);

    if (!Donation) {
      throw new NotFoundException();
    }

    return await this.DonationRepository.remove(Donation);
  }
}
