import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Skill } from "src/skills/entities/skill.entity";

export class CreateJobManagementDto {
  @ApiProperty()
  Description: string;

  @ApiProperty()
  Duration: number;

  @ApiProperty()
  StartDate: Date;
  
  @ApiProperty()
  EndDate: Date;

  @ApiProperty()
  JobType: 'Physical' | 'Virtual';

  @ApiProperty()
  Location: string;

  @ApiProperty()
  MaxBudget: number;

  @ApiProperty()
  SkillIds: Skill[];
  }

 