import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from '../../course/entities/course.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty() // Add ApiProperty for documentation
  id: string;

  @Column({ nullable: true })
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @ManyToOne(() => CourseEntity)
  @ApiProperty({ type: CourseEntity }) // Define the type and relationship
  course: CourseEntity | string;

  @Column()
  @Column({ nullable: true })
  @ApiProperty()
  dueDate: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  @ApiProperty({ type: UserEntity }) // Define the type and relationship
  createdBy: UserEntity | string;

  @Column({ type: 'text', array: true, nullable: true })
  @ApiProperty({ type: 'array', items: { type: 'string' } }) // Define the type for array
  attachmentUrls: string[];
}