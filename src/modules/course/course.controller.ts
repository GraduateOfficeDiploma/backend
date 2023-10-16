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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@Controller('courses')
@UseGuards(JwtAuthGuard)
@ApiTags('Courses') // Tag for this controller
@ApiBearerAuth() // Enable Bearer Authentication
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  create(
    @Req() req: CustomRequest,
    @Body() createCoursePayload: CreateCoursePayload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createCoursePayload.image = image;
    return this.courseService.create(createCoursePayload, req.user);
  }

  @Post(':id/join')
  @ApiOperation({ summary: 'Join a course' })
  @ApiResponse({ status: 200, description: 'You have successfully joined the course.' })
  addCourseMember(@Req() req: CustomRequest, @Param('id') courseId: string) {
    return this.courseService.addMember(courseId, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get courses' })
  @ApiResponse({ status: 200, description: 'List of courses retrieved successfully.', type: [CourseEntity] })
  getCourses(
    @Req() req: CustomRequest,
    @Body() payload: PaginationRequest<CourseEntity>,
  ) {
    return this.courseService.getCourses(req.user, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({ status: 200, description: 'The course details have been retrieved.', type: CourseEntity })
  findOne(@Param('id') id: string, @Req() req: CustomRequest) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({ status: 200, description: 'The course has been successfully updated.' })
  update(
    @Param('id') id: string,
    @Body() updateCoursePayload: UpdateCoursePayload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    updateCoursePayload.image = image;
    return this.courseService.update(id, updateCoursePayload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 200, description: 'The course has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
