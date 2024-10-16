import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { HttpsResponseStatus } from 'src/utils/constants/constants';
import { UserLogin } from './model/user-login.dto';

@Controller('/auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private authSerive: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login', description: 'Login to the application' })
    @ApiResponse({status: HttpStatus.OK, description: 'User logged in succesfully.'})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description:HttpsResponseStatus.FORBIDDEN_MESSAGE})
    async signin(@Body() body: UserLogin) {
        return await this.authSerive.login(body)
    }
}
