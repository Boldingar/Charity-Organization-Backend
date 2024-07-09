import { Staff } from 'src/staff/entities/staff.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne } from 'typeorm';

@Entity({ name: 'departments' })
export class Department {
  @PrimaryColumn()
  name: string;

  @Column()
  hotline: number;

  @OneToOne(() => Staff) staff: Staff;
  @Column()
  managerSSN: string
}