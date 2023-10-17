import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL,
      type: 'postgres',
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true, // Set to true for development, but false in production
      extra: {
        ssl: {
          rejectUnauthorized: false, // You can set this to true if using Heroku's provided SSL certificate
        },
      },
    }
  : {
      type: 'postgres',
      host: process.env.PGHOST || 'localhost',
      port: +process.env.PGPORT || 5432,
      username: process.env.PGUSER || 'admin',
      password: process.env.PGPASSWORD || 'admin',
      database: process.env.PGDATABASE || 'graduates_office',
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true, // Set to true for development, but false in production
    };

export const OrmConfigOptions: TypeOrmModuleOptions = {
  ...dbConfig,
  entities: ['dist/**/*.entity{.ts,.js}'],
};