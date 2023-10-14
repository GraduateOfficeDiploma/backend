import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoursePayload } from './payload/create-course.payload';
import { UpdateCoursePayload } from './payload/update-course.payload';
import { CommandResponse } from '../../libs/response/command.response';
import { CourseEntity } from './entities/course.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../../libs/cloudinary/cloudinary.service';
import { UserEntity } from '../user/entities/user.entity';
import { CourseMemberEntity } from './entities/course-member.entity';
import { PaginationRequest } from '../../libs/request/pagination.request';
import { of } from 'rxjs';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(CourseMemberEntity)
    private readonly courseMemberRepository: Repository<CourseMemberEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createCoursePayload: CreateCoursePayload,
    user: UserEntity,
  ): Promise<CommandResponse> {
    const course = new CourseEntity();
    const courseOwner = new CourseMemberEntity();

    let imageUrl = null;
    if (createCoursePayload.image) {
      imageUrl = await this.cloudinaryService.uploadImage(
        createCoursePayload.image,
        300,
        300,
      );
    }

    course.name = createCoursePayload.name;
    course.schedule = createCoursePayload.schedule.filter((s) => s?.length > 0);
    course.imageUrl = imageUrl;
    course.createdBy = user;

    courseOwner.user = user;
    courseOwner.course = course;

    await this.courseRepository.save(course);
    await this.courseMemberRepository.save(courseOwner);

    return {
      id: course.id,
    };
  }

  async addMember(courseId: string, user: UserEntity) {
    const course = await this.courseRepository.findOne({
      where: {
        id: courseId,
      },
      relations: {
        members: true,
      },
    });
    if (!course) {
      throw new NotFoundException('Course does not exist');
    }
    const existingMember = await this.courseMemberRepository.findOne({
      where: {
        course: courseId,
        user: user.id,
      },
    });
    if (existingMember) {
      throw new ConflictException('User has already joined the course');
    }

    const courseMember = new CourseMemberEntity();
    courseMember.course = course;
    courseMember.user = user;

    await this.courseMemberRepository.save(courseMember);

    return {
      id: courseId,
    };
  }

  async getCourses(
    user: UserEntity,
    { filter, orderBy, page, limit }: PaginationRequest<CourseEntity>,
  ) {
    const offset = (page - 1) * limit;
    return this.courseRepository.find({
      where: {
        members: {
          user: user.id,
        },
        ...filter,
      },
      order: orderBy,
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} course`;
  }

  update(id: string, updateCoursePayload: UpdateCoursePayload) {
    return `This action updates a #${id} course`;
  }

  remove(id: string) {
    return `This action removes a #${id} course`;
  }
}
