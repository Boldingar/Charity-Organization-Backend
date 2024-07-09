import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { Repository } from 'typeorm';
import { Beneficiary } from './entities/beneficiary.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BeneficiariesService {
  constructor(
    @InjectRepository(Beneficiary)
    private BeneficiarysRepository: Repository<Beneficiary>,
  ) {}
  async create(createBeneficiaryDto: CreateBeneficiaryDto) {
    const Beneficiary = this.BeneficiarysRepository.create(createBeneficiaryDto);

    return await this.BeneficiarysRepository.save(Beneficiary);
  }

  async findAll() {
    return await this.BeneficiarysRepository.find();
  }

  async findOne(ssn: string) {
    return await this.BeneficiarysRepository.findOne({ where: { ssn } });
  }

  async update(ssn: string, updateBeneficiaryDto: UpdateBeneficiaryDto) {
    const Beneficiary = await this.findOne(ssn);

    if (!Beneficiary) {
      throw new NotFoundException();
    }

    Object.assign(Beneficiary, updateBeneficiaryDto);

    return await this.BeneficiarysRepository.save(Beneficiary);
  }

  async remove(ssn: string) {
    const Beneficiary = await this.findOne(ssn);

    if (!Beneficiary) {
      throw new NotFoundException();
    }

    return await this.BeneficiarysRepository.remove(Beneficiary);
  }
}
