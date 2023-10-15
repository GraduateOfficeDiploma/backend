import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCoursePayload } from './payload/create-course.payload';
import { UpdateCoursePayload } from './payload/update-course.payload';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomRequest } from '../../types/request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginationRequest } from '../../libs/request/pagination.request';
import { CourseEntity } from './entities/course.entity';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Req() req: CustomRequest,
    @Body() createCoursePayload: CreateCoursePayload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createCoursePayload.image = image;
    return this.courseService.create(createCoursePayload, req.user);
  }

  @Post(':id/join')
  addCourseMember(@Req() req: CustomRequest, @Param('id') courseId: string) {
    return this.courseService.addMember(courseId, req.user);
  }

  @Get()
  getCourses(
    @Req() req: CustomRequest,
    @Body() payload: PaginationRequest<CourseEntity>,
  ) {
    return this.courseService.getCourses(req.user, payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: CustomRequest) {
    return this.courseService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateCoursePayload: UpdateCoursePayload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    updateCoursePayload.image = image;
    return this.courseService.update(id, updateCoursePayload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
