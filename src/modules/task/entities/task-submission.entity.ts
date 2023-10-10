import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'task_submission' })
export class TaskSubmissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TaskEntity)
  task: TaskEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'submitted_by' })
  submitted_by: UserEntity;

  @Column()
  grade: number;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  submitted_at: Date;
}
