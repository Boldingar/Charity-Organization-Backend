import { Department } from 'src/departments/entities/department.entity';
import { Donator } from 'src/donators/entities/donator.entity';
import { IsNumber, IsString, IsDate, isNumber} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity({ name: 'donations' })
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  type: string;

  @IsDate()
  @Column()
  date: Date;

  @IsNumber()
  @Column()
  amount: number;

  @ManyToOne(() => Donator) donator: Donator;
  // @IsNumber()
  // @Column()
  // donator_ssn: number;

  @ManyToOne(() => Department) department: Department;
  // @IsString()
  // @Column()
  // department_name: string;
}