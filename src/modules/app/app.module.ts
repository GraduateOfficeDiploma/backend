import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfigOptions } from '../../libs/config/ormconfig';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CourseModule } from '../course/course.module';
import { TaskModule } from '../task/task.module';

const AppModules = [UserModule, AuthModule, CourseModule, TaskModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(OrmConfigOptions),
    ...AppModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
