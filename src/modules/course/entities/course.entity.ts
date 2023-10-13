import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { CourseMemberEntity } from './course-member.entity';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true, array: true })
  schedule: string[];

  @Column()
  imageUrl: string;

  @OneToMany(() => TaskEntity, (task) => task.course)
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @OneToMany(() => CourseMemberEntity, (member) => member.course)
  members: CourseMemberEntity[];
}
