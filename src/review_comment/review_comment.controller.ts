import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ReviewCommentService } from './review_comment.service';
import { CreateReviewCommentDto } from './model/create-review_comment.dto';
import { UpdateReviewCommentDto } from './model/update-review_comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpsResponseStatus } from 'src/utils/constants/constants';

@Controller('review-comment')
@ApiTags('Review and Comments')
export class ReviewCommentController {
    constructor(private readonly reviewCommentService: ReviewCommentService) {}

    @Post('review_create')
    @ApiOperation({summary: 'review creation', description: 'Provide can write about seeker works.'})
    @ApiResponse({status: HttpStatus.OK, description: 'Review created succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to create the review due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN,  description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    create(@Body() createReviewCommentDto: CreateReviewCommentDto) {
        return this.reviewCommentService.create(createReviewCommentDto);
    }

    @Get()
    findAll() {
        return this.reviewCommentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewCommentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewCommentDto: UpdateReviewCommentDto) {
        return this.reviewCommentService.update(+id, updateReviewCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewCommentService.remove(+id);
    }
}
