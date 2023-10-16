import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

@Entity({ name: 'task_submission' })
export class TaskSubmissionEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty() // Add ApiProperty for documentation
  id: string;

  @ManyToOne(() => TaskEntity)
  @ApiProperty({ type: TaskEntity }) // Define the type and relationship
  task: TaskEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'submitted_by' })
  @ApiProperty({ type: UserEntity }) // Define the type and relationship
  submitted_by: UserEntity;

  @Column()
  @ApiProperty()
  grade: number;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  submitted_at: Date;
}