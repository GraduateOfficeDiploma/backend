import { CourseEntity } from './course.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'course_member' })
export class CourseMemberEntity {
  @PrimaryColumn({ type: 'uuid', name: 'course_id' })
  @ManyToOne(() => CourseEntity, (course) => course.members)
  course: CourseEntity | string;

  @PrimaryColumn({ type: 'uuid', name: 'user_id' })
  @ManyToOne(() => UserEntity, (user) => user.courses)
  user: UserEntity | string;
}
