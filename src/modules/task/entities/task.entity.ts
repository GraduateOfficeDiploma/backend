import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from '../../course/entities/course.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => CourseEntity)
  course: CourseEntity | string;

  @Column()
  @Column({ nullable: true })
  dueDate: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity | string;

  @Column({ type: 'text', array: true, nullable: true })
  attachmentUrls: string[];
}
