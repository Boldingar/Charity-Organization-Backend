import { Department } from 'src/departments/entities/department.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity({ name: 'volunteers' })
export class Volunteer {
  @PrimaryColumn()
  ssn: number;

  @Column()
  name: string;

  @Column()
  DOB: Date;

  @Column({ unique: true })
  phone: string;

  @ManyToOne(() => Department)
  department: Department;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'superSSN' })
  staff: Staff;
}
