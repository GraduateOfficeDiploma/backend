import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { hashPassword } from '../../libs/helpers/hashPassword';
import { CreateUserPayload } from './payload/create-user.payload';
import { UpdateUserPayload } from './payload/update-user.payload';
import { PublicUser } from './entities/publicUser.entity';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { RoleEnum } from './enum/role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@Injectable()
@ApiTags('User Module') // Add a tag to group related endpoints in Swagger
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  @ApiOperation({ summary: 'Find a user by conditions' })
  @ApiBody({
    type: CreateUserPayload,
    description: 'The conditions to search for a user',
  })
  @ApiResponse({ status: 200, type: UserEntity, description: 'The found user' })
  async findOne(conditions: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    const users = await this.usersRepository.find({
      select: [
        'id',
        'fullName',
        'password',
        'refreshToken',
        'avatarUrl',
        'email',
        'role',
        'registeredAt',
      ],
      where: conditions,
    });
    return users[0] ?? null;
  }

  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to find' })
  @ApiResponse({ status: 200, type: UserEntity, description: 'The found user' })
  async findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserPayload,
    description: 'The payload for creating a new user',
  })
  @ApiResponse({
    status: 201,
    type: PublicUser,
    description: 'The created user',
  })
  async create(createUserDto: CreateUserPayload): Promise<PublicUser> {
    const user = createUserDto as UserEntity;
    user.password = await hashPassword(user.password);
    user.role = RoleEnum.Guest;
    const newUser = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  @ApiOperation({ summary: 'Set a refresh token for a user' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  async setRefreshToken(userId: string, refreshToken: string) {
    await this.usersRepository.update(userId, {
      refreshToken: !refreshToken
        ? refreshToken
        : await bcrypt.hash(refreshToken, 10),
    });
  }

  @ApiOperation({ summary: 'Get a user by refresh token' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({
    status: 200,
    type: PublicUser,
    description: 'The user found by refresh token',
  })
  async getUserByRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<PublicUser> {
    const { refreshToken: hashedRefreshToken, ...user } = await this.findOne({
      id: userId,
    });

    const isTokenMatched = await bcrypt.compare(
      refreshToken,
      hashedRefreshToken,
    );
    delete user.password;
    return isTokenMatched ? user : null;
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to update' })
  @ApiBody({
    type: UpdateUserPayload,
    description: 'The payload for updating a user',
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'The updated user',
  })
  async update(id: string, updateUserPayload: UpdateUserPayload) {
    const user = await this.findOne({ id });
    if (!user) throw new NotFoundError('User not found');
    await this.usersRepository.update(user.id, updateUserPayload);
    delete user.password;
    delete user.refreshToken;
    return user;
  }
}
