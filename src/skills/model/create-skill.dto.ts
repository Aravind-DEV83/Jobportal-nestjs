import { ApiProperty } from "@nestjs/swagger";

export class CreateSkillDto {
  @ApiProperty()
  SkillName: string;

  @ApiProperty()
  SkillLevel: 'Beginner' | 'Intermediate' | 'Expert';

  @ApiProperty()
  Categories: string;
  }