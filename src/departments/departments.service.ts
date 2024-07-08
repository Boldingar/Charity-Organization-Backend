import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private DepartmentRepository: Repository<Department>,
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const Department = this.DepartmentRepository.create(createDepartmentDto);

    return await this.DepartmentRepository.save(Department);
  }

  async findAll() {
    return await this.DepartmentRepository.find();
  }

  async findOne(name: string) {
    return await this.DepartmentRepository.findOne({ where: { name } });
  }

  async update(name: string, updateDepartmentDto: UpdateDepartmentDto) {
    const Department = await this.findOne(name);

    if (!Department) {
      throw new NotFoundException();
    }

    Object.assign(Department, UpdateDepartmentDto);

    return await this.DepartmentRepository.save(Department);
  }

  async remove(name: string) {
    const Department = await this.findOne(name);

    if (!Department) {
      throw new NotFoundException();
    }

    return await this.DepartmentRepository.remove(Department);
  }
}
