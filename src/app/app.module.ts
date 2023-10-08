import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfigOptions } from '../config/ormconfig';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(OrmConfigOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
