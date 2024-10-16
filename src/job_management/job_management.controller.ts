import { Controller, HttpStatus, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, SerializeOptions, ClassSerializerInterceptor } from '@nestjs/common';
import { JobManagementService } from './job_management.service';
import { CreateJobManagementDto } from './model/create-job_management.dto';
import { UpdateJobManagementDto } from './model/update-job_management.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { currentUser } from 'src/decorators/user.decorator';
import { AuthGuardJwt } from 'src/auth/strategies/auth-guard.jwt';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { HttpsResponseStatus, Role } from 'src/utils/constants/constants';
import { User } from 'src/users/entities/user.entity';
import { FilterProfileDto } from './model/filter-profile.dto';



@Controller('job-management')
@ApiTags('Job Management')
@ApiBearerAuth()
export class JobManagementController {
    constructor(
        private readonly jobManagementService: JobManagementService
    ) { }

    @Post('profile_create')
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER,Role.JOB_SEEKER, Role.PORTAL_ADMIN])
    @ApiOperation({summary: 'Job profile creation', description: 'Users can specify the details of their desired job.'})
    @ApiResponse({status: HttpStatus.OK, description: 'Job profile created succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to create the skills due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN,  description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    async createProfile(@Body() createJobManagementDto: CreateJobManagementDto, @currentUser() user:User) {
        const userID = user
        return await this.jobManagementService.create(createJobManagementDto,userID);
    }

    @Get('profileSearch')
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER,Role.JOB_SEEKER])
    @ApiOperation({summary: 'Get all Job profiles', description: 'This API will retrieve all available job profiles.'})
    @ApiResponse({status: HttpStatus.OK, description: 'Job profiles retirved succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to get the jon profiles due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN,  description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    async getAllProfiles(@Query() filter: FilterProfileDto) {
        return await this.jobManagementService.getAllProfiles(filter);
    }

    @Get('/profileSearch/:id')
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER,Role.JOB_SEEKER])
    @ApiOperation({summary: 'Get a Job Profile', description: 'This API will retrieve a job profile.'})
    @ApiResponse({status: HttpStatus.OK, description: 'Job profile retirved succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to get the job profile due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE,})
    @ApiResponse({ status: HttpStatus.FORBIDDEN,  description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    async getprofile(@Param('id') userID: number) {
        return await this.jobManagementService.getProfile(+userID);
    }

    @Patch('/updateProfile/:id')
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER,Role.JOB_SEEKER])
    @ApiOperation({summary: 'Update Job Profile', description: 'This API will update a job profile.'})
    @ApiResponse({status: HttpStatus.OK, description: 'Job profile updated succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to update the job profile due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    async updateProfile(@Param('id') userID: number, @Body() updateJobManagementDto: UpdateJobManagementDto) {
        return await this.jobManagementService.updateProfile(+userID, updateJobManagementDto);
    }
    
    @Post('/selectProfile/:id')
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER,Role.JOB_SEEKER])
    @ApiOperation({summary: 'Select Job Profile', description: 'This API will select a job profile.'})
    @ApiResponse({status: HttpStatus.OK, description: 'Job profile selected succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to select the job profile due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    async selectProfile(@Param('id') id: number, @currentUser() user: User){
        return await this.jobManagementService.selectProfile(id, user)
    }

    @Get('/getselectedProfiles')
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER,Role.JOB_SEEKER])
    @ApiOperation({summary: 'Get all selected Job Profiles', description: 'This API will retrieve all job profiles that are selected.'})
    @ApiResponse({status: HttpStatus.OK, description: 'Job profiles retrieved succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to get the selected job profiles due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    async getselectedProfiles(){
        
        return await this.jobManagementService.getselectedProfiles();
    }

    @Get('/getselectedProfiles/:id')
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER,Role.JOB_SEEKER])
    @ApiOperation({summary: 'Get selected Job Profile by Id', description: 'This API will retrieve job profile by id that is selected.'})
    @ApiResponse({status: HttpStatus.OK, description: 'Job profile retrieved succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to get the selected job profile due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE })
    async getselectedProfileById(@Param('id') id: number){
        return await this.jobManagementService.getselectedProfileById(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobManagementService.remove(+id);
    }

    
} 