import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { Department } from 'src/departments/entities/department.entity';
import { Beneficiary } from 'src/beneficiaries/entities/beneficiary.entity';
import { Volunteer } from 'src/volunteers/entities/volunteer.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Beneficiary)
    private beneficiaryRepository: Repository<Beneficiary>,
    @InjectRepository(Volunteer)
    private volunteerRepository: Repository<Volunteer>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    // Create a new Event instance
    const event = new Event();

    event.name = createEventDto.name;
    event.date = createEventDto.date;
    event.fundingAmount = createEventDto.fundingAmount;
    event.organizerSSN = createEventDto.organizerSSN;

    // Fetch Beneficiaries entities
    event.beneficiaries = await this.beneficiaryRepository.find({
      where: { ssn: In(createEventDto.beneficiariesSSN) },
    });
    if (event.beneficiaries.length !== createEventDto.beneficiariesSSN.length) {
      throw new NotFoundException('One or more Beneficiaries not found');
    }

    // Fetch Volunteers entities
    event.volunteers = await this.volunteerRepository.find({
      where: { ssn: In(createEventDto.volunteersSSN) },
    });
    if (event.volunteers.length !== createEventDto.volunteersSSN.length) {
      throw new NotFoundException('One or more Volunteers not found');
    }

    // Fetch Staff entity (Organizer)
    event.staff = await this.staffRepository.findOneBy({
      ssn: createEventDto.organizerSSN,
    });
    if (!event.staff) {
      throw new NotFoundException('Organizer not found');
    }

    // Save the event entity
    console.log('eee', event);
    await this.eventRepository.insert(event);

    // Manually manage relationships with QueryBuilder
  await this.eventRepository
    .createQueryBuilder()
    .relation(Event, "beneficiaries")
    .of(event)
    .add(event.beneficiaries);

  await this.eventRepository
    .createQueryBuilder()
    .relation(Event, "volunteers")
    .of(event)
    .add(event.volunteers);

    return event;
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    return await this.eventRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (updateEventDto.name !== undefined) {
      event.name = updateEventDto.name;
    }
    if (updateEventDto.date !== undefined) {
      event.date = updateEventDto.date;
    }
    if (updateEventDto.fundingAmount !== undefined) {
      event.fundingAmount = updateEventDto.fundingAmount;
    }
    if (updateEventDto.beneficiariesSSN !== undefined) {
      const beneficiaries = await this.beneficiaryRepository.findByIds(
        updateEventDto.beneficiariesSSN,
      );
      if (beneficiaries.length !== updateEventDto.beneficiariesSSN.length) {
        throw new NotFoundException('One or more Beneficiaries not found');
      }
      event.beneficiaries = beneficiaries;
    }
    if (updateEventDto.volunteersSSN !== undefined) {
      const volunteers = await this.volunteerRepository.findByIds(
        updateEventDto.volunteersSSN,
      );
      if (volunteers.length !== updateEventDto.volunteersSSN.length) {
        throw new NotFoundException('One or more Volunteers not found');
      }
      event.volunteers = volunteers;
    }
    if (updateEventDto.organizerSSN !== undefined) {
      const organizer = await this.staffRepository.findOneBy({
        ssn: updateEventDto.organizerSSN,
      });
      if (!organizer) {
        throw new NotFoundException('Organizer not found');
      }
      event.staff = organizer;
      event.organizerSSN = updateEventDto.organizerSSN;
    }

    return await this.eventRepository.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return await this.eventRepository.remove(event);
  }
}
