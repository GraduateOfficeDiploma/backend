import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import the necessary decorator
import { UserEntity } from '../../user/entities/user.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { CourseMemberEntity } from './course-member.entity';

@Entity({ name: 'course' })
export class CourseEntity {
  @ApiProperty() // Add the ApiProperty decorator for documentation
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty() // Add the ApiProperty decorator for documentation
  @Column({ nullable: false })
  name: string;

  @ApiProperty() // Add the ApiProperty decorator for documentation
  @Column({ type: 'text', nullable: true, array: true })
  schedule: string[];

  @ApiProperty() // Add the ApiProperty decorator for documentation
  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @ApiProperty() // Add the ApiProperty decorator for documentation
  @OneToMany(() => TaskEntity, (task) => task.course)
  tasks: TaskEntity[];

  @ApiProperty() // Add the ApiProperty decorator for documentation
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ApiProperty() // Add the ApiProperty decorator for documentation
  @OneToMany(() => CourseMemberEntity, (member) => member.course)
  members: CourseMemberEntity[];
}