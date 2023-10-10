import {
  Column,
  Entity, JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true, array: true })
  schedule: string[];

  @ManyToOne(() => UserEntity)
  created_by: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: "course_member" })
  members: UserEntity[];
}
