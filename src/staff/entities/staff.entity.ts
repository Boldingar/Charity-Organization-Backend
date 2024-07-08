import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'staff' })
export class Staff {
  @PrimaryColumn()
  ssn: number;

  @Column()
  name: string;

  @Column()
  DOB: Date;

  @Column()
  salary: number;

  @Column()
  depName: string;
}