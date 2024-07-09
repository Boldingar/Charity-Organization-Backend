import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('beneficiary')
@ApiBearerAuth('Bearer')
@UseGuards(AuthGuard)
@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Post('/create')
  create(@Body() createBeneficiaryDto: CreateBeneficiaryDto) {
    return this.beneficiariesService.create(createBeneficiaryDto);
  }

  @Get('/findAll')
  findAll() {
    return this.beneficiariesService.findAll();
  }

  @Get('/find:ssn')
  findOne(@Param('ssn') ssn: string) {
    return this.beneficiariesService.findOne(ssn);
  }

  @Patch('/update:ssn')
  update(
    @Param('ssn') ssn: string,
    @Body() updateBeneficiaryDto: UpdateBeneficiaryDto,
  ) {
    return this.beneficiariesService.update(ssn, updateBeneficiaryDto);
  }

  @Delete('/delete:ssn')
  remove(@Param('ssn') ssn: string) {
    return this.beneficiariesService.remove(ssn);
  }
}
