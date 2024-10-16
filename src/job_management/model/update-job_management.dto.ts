import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateJobManagementDto {
    @ApiPropertyOptional()
    Description?: string;

    @ApiPropertyOptional()
    Duration?: number;

    @ApiPropertyOptional()
    StartDate?: Date;
    
    @ApiPropertyOptional()
    EndDate?: Date;

    @ApiPropertyOptional()
    JobType?: 'Physical' | 'Virtual';

    @ApiPropertyOptional()
    Location?: string;

    @ApiPropertyOptional()
    MaxBudget?: number;

    @ApiPropertyOptional()
    user?: number;

    @ApiPropertyOptional()
    skill?: number;
}
