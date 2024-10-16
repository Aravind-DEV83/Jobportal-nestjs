import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {

  @ApiProperty()
  SkillName?: string;

  @ApiProperty()
  SkillLevel?: 'Beginner' | 'Intermediate' | 'Expert';
    
  @ApiProperty()
  Categories?: string;
  }