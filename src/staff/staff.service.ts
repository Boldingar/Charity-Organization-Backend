import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private StaffRepository: Repository<Staff>,
  ) {}
  async create(createStaffDto: CreateStaffDto) {
    const Staff = this.StaffRepository.create(createStaffDto);

    return await this.StaffRepository.save(Staff);
  }

  async findAll() {
    return await this.StaffRepository.find();
  }

  async findOne(ssn: string) {
    return await this.StaffRepository.findOne({ where: { ssn } });
  }

  async update(ssn: string, updateStaffDto: UpdateStaffDto) {
    const Staff = await this.findOne(ssn);

    if (!Staff) {
      throw new NotFoundException();
    }

    Object.assign(Staff, UpdateStaffDto);

    return await this.StaffRepository.save(Staff);
  }

  async remove(ssn: string) {
    const Staff = await this.findOne(ssn);

    if (!Staff) {
      throw new NotFoundException();
    }

    return await this.StaffRepository.remove(Staff);
  }
}
