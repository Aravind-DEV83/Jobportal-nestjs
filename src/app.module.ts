import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { AuthModule } from './auth/auth.module';
import { datasourceOptions } from 'datasources/db-datasource';
import { SkillsModule } from './skills/skills.module';
import { JobManagementModule } from './job_management/job_management.module';
import { ReviewCommentModule } from './review_comment/review_comment.module';
import { LoggerModule } from './logger/logger.module';
import { ContactsModule } from './contacts/contacts.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions),
    UsersModule,
    AuthModule,
    SkillsModule,
    AuthModule,
    JobManagementModule,
    ReviewCommentModule,
    LoggerModule,
    ContactsModule,
    // KafkaModule
  ],
  controllers: []
})
export class AppModule {}
