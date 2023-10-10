import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from '../../course/entities/course.entity';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => CourseEntity)
  course: CourseEntity;

  @Column()
  dueDate: Date;

  @Column({ type: 'text', array: true })
  attachmentUrls: string[];
}
