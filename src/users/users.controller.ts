import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Param, Patch, Post, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './model/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuardJwt } from 'src/auth/strategies/auth-guard.jwt';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { HttpsResponseStatus, Role } from 'src/utils/constants/constants';
import { currentUser } from 'src/decorators/user.decorator';
import { UpdateUserDto } from './model/update-user.dto';
import { User } from './entities/user.entity';

@Controller('/users')
@ApiTags('Users Registration')
@SerializeOptions({strategy: "exposeAll"})
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    @ApiOperation({summary: 'User Creation', description: 'Register a user to the jobportal application'})
    @ApiResponse({status: HttpStatus.OK, description: 'Created a user succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to create a user due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN , description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
        return await this.userService.signup(createUserDto);
    }

    @Get('profile')
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER, Role.JOB_SEEKER])
    @ApiBearerAuth()
    @ApiOperation({summary: 'Profile Info', description: 'Get the profile of the registered user'})
    @ApiResponse({status: HttpStatus.OK, description: 'Profile detials retrived succesfully'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to get the profile details due to underlying service not being available"})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    async getProfile(@currentUser() user): Promise<User>{
        return user
    }

    @Patch('update/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuardJwt, AuthorizationGuard)
    @Roles([Role.JOB_PROVIDER, Role.JOB_SEEKER])
    @ApiOperation({summary: 'Update Profile', description: 'Update the profile with the fields given in the request'})
    @ApiResponse({status: HttpStatus.OK, description: 'Updated profile detials succesfully'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to update the profile details due to underlying service not being available"})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    async updateProfile(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<any>{
        return await this.userService.updateProfile(id, body);
    }
}
