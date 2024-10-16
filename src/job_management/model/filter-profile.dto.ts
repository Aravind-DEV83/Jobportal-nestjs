import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";

export class FilterProfileDto {
    @ApiPropertyOptional()
    @IsEnum({
        message: 'jobType must be a valid enum value (Virtual or Physical)',
    })
    jobType?: string;

    @ApiPropertyOptional()
    Location?: string;

    @ApiPropertyOptional()
    @IsNumber()
    minBudget?: number;

    @ApiPropertyOptional()
    @IsNumber()
    maxBudget?: number;

    @ApiPropertyOptional({ type: [String], description: 'List of skill names for filtering' })
    @IsArray()
    @IsString({ each: true })
    SkillNames?: string[];

    @ApiPropertyOptional()
    @IsString()
    DeliveryTime?: number
}