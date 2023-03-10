import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat.gateway';
import { TasksModule } from './task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(typeormConnectionConfig),
    UserModule,
    AuthModule,
    TasksModule,
  ],
  providers: [ChatGateway, AppService],
  controllers: [AppController],
})
export class AppModule {}
