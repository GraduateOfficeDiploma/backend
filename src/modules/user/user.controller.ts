import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserPayload } from './payload/create-user.payload';
import { UpdateUserPayload } from './payload/update-user.payload';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResourceExistsException } from '../../libs/helpers/CustomExceptions';
import { CustomRequest } from '../../types/request';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users') // Add a tag to group related endpoints in Swagger
@ApiBearerAuth() // Enable Bearer Authentication

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found', type: CreateUserPayload })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserPayload) {
    const user = await this.userService.findOne({ email: createUserDto.email });
    if (user) throw new ResourceExistsException('User');
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UpdateUserPayload })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPayload,
  ) {
    if (req.user.id !== id) throw new UnauthorizedException();
    return this.userService.update(id, updateUserDto);
  }
}
