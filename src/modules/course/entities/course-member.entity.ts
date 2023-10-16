import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import the necessary decorator
import { CourseEntity } from './course.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'course_member' })
export class CourseMemberEntity {
  @ApiProperty() // Add the ApiProperty decorator for documentation
  @PrimaryColumn({ type: 'uuid', name: 'course_id' })
  @ManyToOne(() => CourseEntity, (course) => course.members)
  course: CourseEntity | string;

  @ApiProperty() // Add the ApiProperty decorator for documentation
  @PrimaryColumn({ type: 'uuid', name: 'user_id' })
  @ManyToOne(() => UserEntity, (user) => user.courses)
  user: UserEntity | string;
}
