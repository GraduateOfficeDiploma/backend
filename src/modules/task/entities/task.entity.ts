import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { CourseEntity } from '../../course/entities/course.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AttachmentEntity } from './attachment.entity';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ nullable: true })
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @ManyToOne(() => CourseEntity)
  @ApiProperty({ type: CourseEntity })
  course: CourseEntity | string;

  @Column()
  @Column({ nullable: true })
  @ApiProperty()
  dueDate: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  @ApiProperty({ type: UserEntity })
  createdBy: UserEntity | string;

  @ManyToMany(() => AttachmentEntity)
  @JoinTable({ name: "task_attachment" })
  @ApiProperty({ type: [AttachmentEntity] })
  attachments: AttachmentEntity[];
}
