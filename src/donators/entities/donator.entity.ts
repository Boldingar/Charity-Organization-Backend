import { Department } from 'src/departments/entities/department.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'donators' })
export class Donator {
  @PrimaryColumn()
  ssn: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;
}
