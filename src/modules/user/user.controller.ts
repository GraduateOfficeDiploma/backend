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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  update(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPayload,
  ) {
    if (req.user.id !== id) throw new UnauthorizedException();
    return this.userService.update(id, updateUserDto);
  }
}
