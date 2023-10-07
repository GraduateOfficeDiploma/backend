import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { hashPassword } from '../helpers/hashPassword';
import { CreateUserPayload } from './payload/create-user.payload';
import { UpdateUserPayload } from './payload/update-user.payload';
import { PublicUser } from './entities/publicUser.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(conditions: FindOptionsWhere<User>): Promise<User> {
    const users = await this.usersRepository.find({
      select: [
        'firstName',
        'middleName',
        'lastName',
        'id',
        'password',
        'refreshToken',
        'avatarUrl',
        'email',
        'registeredAt',
      ],
      where: conditions,
    });
    return users[0] ?? null;
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(createUserDto: CreateUserPayload): Promise<PublicUser> {
    const user = createUserDto as User;
    user.password = await hashPassword(user.password);
    const newUser = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  async setRefreshToken(userId: string, refreshToken: string) {
    await this.usersRepository.update(userId, {
      refreshToken: !refreshToken
        ? refreshToken
        : await bcrypt.hash(refreshToken, 10),
    });
  }

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

  async update(id: string, updateUserPayload: UpdateUserPayload) {
    const user = await this.findOne({ id });
    if (!user) throw new NotFoundError('User not found');
    await this.usersRepository.update(user.id, updateUserPayload);
    delete user.password;
    delete user.refreshToken;
    return user;
  }
}
