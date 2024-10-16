import { Module } from '@nestjs/common';
import { ReviewCommentService } from './review_comment.service';
import { ReviewCommentController } from './review_comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewComment } from './entities/review_comment.entity';
import { User } from 'src/users/entities/user.entity';
import { JobProfile } from 'src/job_management/entities/job_management.entity';
import { UsersModule } from 'src/users/users.module';
import { JobManagementModule } from 'src/job_management/job_management.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,ReviewComment,JobProfile]),
          
           ],
  controllers: [ReviewCommentController],
  providers: [ReviewCommentService],
})
export class ReviewCommentModule {}
