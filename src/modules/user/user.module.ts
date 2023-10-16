import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger'; // Import the ApiTags decorator

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
@ApiTags('Users') // Add a tag to group related endpoints in Swagger
export class UserModule {}
