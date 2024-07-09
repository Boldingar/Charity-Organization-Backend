import { Beneficiary } from 'src/beneficiaries/entities/beneficiary.entity';
import { Volunteer } from 'src/volunteers/entities/volunteer.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Department } from 'src/departments/entities/department.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  fundingAmount: number;

  @ManyToMany(() => Beneficiary, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'aids',
    joinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'beneficiary_ssn',
      referencedColumnName: 'ssn',
    },
  })
  beneficiaries?: Beneficiary[];

  @ManyToMany(() => Volunteer, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinTable({
    name: 'contributes_to',
    joinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'volunteer_ssn',
      referencedColumnName: 'ssn',
    },
  })
  volunteers?: Volunteer[];

  @OneToOne(() => Staff) staff: Staff;
  @Column()
  organizerSSN: string;
}
