import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './model/create-skill.dto';
import { UpdateSkillDto } from './model/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchSkills } from './skills.utils';

@Injectable()
export class SkillsService {

    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
        private readonly skillservice: MatchSkills
    ) { }

    async create(createSkillDto: CreateSkillDto):Promise<any> {
        const match_skills = this.skillservice.extractSkills(createSkillDto.SkillName)
        const existingSkill = await this.skillRepository.findOne({
                where: { SkillName: match_skills },
                });

        if (existingSkill) {
            return  `Skill existing: ${existingSkill.SkillName}`
          }
        const skill = this.skillRepository.create({
            ...createSkillDto,
            SkillName: match_skills,
          });
        return this.skillRepository.save(skill);
    }



    findAll() {
        return this.skillRepository.find();
    }

    findOne(id: number): Promise<Skill> {
        return this.skillRepository.findOneBy({ Skill_ID: id });
    }

    async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
        await this.skillRepository.update(id, updateSkillDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.skillRepository.delete(id);
        if (result.affected === 0) {
        throw new NotFoundException(`Skill with ID ${id} not found`);
        }
    }
}
