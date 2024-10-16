import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateReviewCommentDto } from './model/create-review_comment.dto';
import { UpdateReviewCommentDto } from './model/update-review_comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewComment } from './entities/review_comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JobProfile } from 'src/job_management/entities/job_management.entity';

@Injectable()
export class ReviewCommentService {
    constructor(
        @InjectRepository(ReviewComment)
        private readonly ReviewRepository: Repository<ReviewComment>,
        @InjectRepository(User)
        private readonly UserReviewRepository: Repository<User>,
        @InjectRepository(JobProfile)
        private readonly JobReviewRepository: Repository<JobProfile>
    ){}
    async create(createReviewCommentDto: CreateReviewCommentDto):Promise<ReviewComment> {
        console.log(createReviewCommentDto)

        const { ReviewerID, TargetUserID, JobID, ...rest } = createReviewCommentDto

        const review = await this.UserReviewRepository.findOne({
            where:{UserID: ReviewerID}
        });
        if (!review) throw new NotFoundException(`Review with ID ${ReviewerID} not found`);
        
        const targetUser = await this.UserReviewRepository.findOne({
            where:{UserID:TargetUserID}
        })
        if (!targetUser) throw new NotFoundException(`Target user with ID ${TargetUserID} not found`);
        
        const jobprofile = await this.JobReviewRepository.findOne({
            where:{ProfileId:JobID}
        })
        if (!jobprofile) throw new NotFoundException(`job profile with ID ${JobID} not found`);

        const reviewData = this.ReviewRepository.create({
            ...rest,
            Reviewer: review,
            TargetUser: targetUser,
            Job: jobprofile,
        });
        return this.ReviewRepository.save(reviewData)
    }

    findAll() {
        
        return this.ReviewRepository.find({
        relations:['TargetUser','Job','Reviewer']
        });
    }

    async findOne(id: number):Promise<ReviewComment> {
        const get_review = this.ReviewRepository.findOne({
        where: {ReviewID:id},
        relations: ['Reviewer','TargetUser','Job']
        })

        if (!get_review) throw new NotFoundException(`review with ID ${id} not found`);
        return get_review
    }

    async update(id: number, updateReviewCommentDto: UpdateReviewCommentDto):Promise<any> {
        const chk_review = this.ReviewRepository.findOne({
            where:{ReviewID: id}
            })

        if (!chk_review) throw new NotFoundException(`review with ID ${id} not found`);
        this.ReviewRepository.update(id,updateReviewCommentDto)
        return `Vales updated into the table with ID:${id}`
    }

    remove(id: number) {
        return `This action removes a #${id} reviewComment`;
    }
}
