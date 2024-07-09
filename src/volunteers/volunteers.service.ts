import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { Repository } from 'typeorm';
import { Volunteer } from './entities/volunteer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/departments/entities/department.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Injectable()
export class VolunteersService {
  constructor(
    @InjectRepository(Volunteer)
    private VolunteerRepository: Repository<Volunteer>,
    @InjectRepository(Department)
    private DepartmentRepository: Repository<Department>,
    @InjectRepository(Staff)
    private StaffRepository: Repository<Staff>,
  ) {}

  async create(createVolunteerDto: CreateVolunteerDto): Promise<Volunteer> {
    const { departmentName, superSSN, ...volunteerData } = createVolunteerDto;
  
    const department = await this.DepartmentRepository.findOne({ where: { name: departmentName } });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
  
    const staff = await this.StaffRepository.findOne({ where: { ssn: superSSN } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
  
    const volunteer = this.VolunteerRepository.create({
      ...volunteerData,
      department,
      staff,
    });
  
    return await this.VolunteerRepository.save(volunteer);
  }
  async findAll() {
    return await this.VolunteerRepository.find();
  }

  async findOne(ssn: string) {
    return await this.VolunteerRepository.findOne({ where: { ssn } });
  }

  async update(ssn: string, updateVolunteerDto: UpdateVolunteerDto) {
    const volunteer = await this.findOne(ssn);

    if (!volunteer) {
      throw new NotFoundException();
    }

    Object.assign(volunteer, updateVolunteerDto);

    return await this.VolunteerRepository.save(volunteer);
  }

  async remove(ssn: string) {
    const volunteer = await this.findOne(ssn);

    if (!volunteer) {
      throw new NotFoundException();
    }

    return await this.VolunteerRepository.remove(volunteer);
  }
}
