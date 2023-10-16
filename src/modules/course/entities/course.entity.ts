import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { CourseMemberEntity } from './course-member.entity';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true, array: true })
  schedule: string[];

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @OneToMany(() => TaskEntity, (task) => task.course)
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @OneToMany(() => CourseMemberEntity, (member) => member.course)
  members: CourseMemberEntity[];
}
