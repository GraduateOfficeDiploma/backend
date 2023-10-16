import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AttachmentEntity } from './attachment.entity';

@Entity({ name: 'task_submission' })
export class TaskSubmissionEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ManyToOne(() => TaskEntity)
  @ApiProperty({ type: TaskEntity })
  task: TaskEntity | string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'submitted_by' })
  @ApiProperty({ type: UserEntity })
  submittedBy: UserEntity;

  @Column({ nullable: true })
  @ApiProperty()
  grade: number | null;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  submitted_at: Date;

  @ManyToMany(() => AttachmentEntity)
  @JoinTable({ name: 'task_submission_attachment' })
  @ApiProperty({ type: [AttachmentEntity] })
  attachments: AttachmentEntity[];
}
