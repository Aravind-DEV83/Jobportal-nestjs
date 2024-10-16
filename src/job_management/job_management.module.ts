import { Module } from '@nestjs/common';
import { JobManagementService } from './job_management.service';
import { JobManagementController } from './job_management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobProfile } from './entities/job_management.entity';
import { UsersModule } from 'src/users/users.module';
import { SkillsModule } from 'src/skills/skills.module';
import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JobSelection } from './entities/job-selection.entity';
import { LoggerService } from 'src/logger/logger.service';
import { ProducerService } from 'src/kafka/producer.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobProfile,Skill,User, JobSelection]),
            UsersModule,
            SkillsModule,
            JwtModule,
            ],
  controllers: [JobManagementController],
  providers: [JobManagementService, LoggerService, ProducerService],
})
export class JobManagementModule {}
