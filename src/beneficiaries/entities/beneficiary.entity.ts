import { Staff } from 'src/staff/entities/staff.entity';
import { Event } from 'src/events/entities/event.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'beneficiaries' })
export class Beneficiary {
  @PrimaryColumn()
  ssn: string;

  @Column()
  name: string;

  @Column({unique:true})
  phone: string;

}
