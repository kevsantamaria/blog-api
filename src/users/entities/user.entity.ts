import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/browser/index.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;
}
