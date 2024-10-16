import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateReviewCommentDto {
    @ApiProperty()
    Rating: number;
  
    @ApiProperty()
    Comment: string;
  
    @ApiProperty()
    ReviewerID: number;
  
    @ApiProperty()
    TargetUserID: number;
  
    @ApiProperty()
    JobID: number;
  }