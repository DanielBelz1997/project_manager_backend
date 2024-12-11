import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ComponentModule } from './component/component.module';
import { GroupModule } from './group/group.module';
import { PermissionModule } from './permission/permission.module';
import { ContactModule } from './contact/contact.module';
import { RequestModule } from './request/request.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ComponentModule,
    GroupModule,
    PermissionModule,
    ContactModule,
    RequestModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
