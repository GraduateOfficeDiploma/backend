import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../enum/role.enum';
import { CourseEntity } from '../../course/entities/course.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 256 })
  fullName: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, length: 250, unique: true })
  email: string;

  @Column({ nullable: false })
  role: RoleEnum = RoleEnum.Guest;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: Date;

  @Column({ nullable: false, default: '', select: false })
  refreshToken?: string;

  @OneToMany(() => CourseEntity, (course) => course.createdBy)
  courses: CourseEntity[];
}
