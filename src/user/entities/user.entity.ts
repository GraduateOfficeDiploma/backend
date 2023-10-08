import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  firstName: string;

  @Column({ nullable: false, length: 100 })
  middleName: string;

  @Column({ nullable: false, length: 100 })
  lastName: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, length: 250, unique: true })
  email: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: Date;

  @Column({ nullable: false, default: '', select: false })
  refreshToken?: string;
}
