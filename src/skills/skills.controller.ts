import { Controller, HttpStatus, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './model/create-skill.dto';
import { UpdateSkillDto } from './model/update-skill.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpsResponseStatus } from 'src/utils/constants/constants';

@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) {}

    @Post('create')
    @ApiOperation({summary: 'Skills Creation', description: 'Create the skills for the users'})
    @ApiResponse({status: HttpStatus.OK, description: 'Skills created succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to create the skills due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    create(@Body() createSkillDto: CreateSkillDto) {
        return this.skillsService.create(createSkillDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all Skills', description: 'Fetech all the skills from the skill table'})
    @ApiResponse({status: HttpStatus.OK, description: 'Skills retrived succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to create the skills due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    findAll() {
        return this.skillsService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get Skills by ID', description: 'Filter the skills by using Skill ID'})
    @ApiResponse({status: HttpStatus.OK, description: 'Skills retrived succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to create the skills due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    findOne(@Param('id') id: string) {
        return this.skillsService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update Skills by ID', description: 'Update the skills by using Skill ID'})
    @ApiResponse({status: HttpStatus.OK, description: 'Skills updated succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to create the skills due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
        return this.skillsService.update(+id, updateSkillDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.skillsService.remove(+id);
    }
}
