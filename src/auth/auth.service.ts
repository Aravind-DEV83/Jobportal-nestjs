import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { AuthController } from './auth.controller';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    public async getTokenForUser(user: User) {
        return await this.jwtService.sign({
            username: user.Username,
            sub: user.UserID
        });
    }

    async login(body){
        const {Username, Password} = body
        
        const user = await this.userRepository.findOne({
            where: {Username}
        });
        
        if (!user){
            throw new UnauthorizedException();
        }
        if (!bcrypt.compare((await user).Password, Password)){
            throw new UnauthorizedException();
        }

        user.LastLoggedIn = new Date();

        await this.userRepository.update(user.UserID, user)

        return {
            user: user.UserID,
            token: await this.getTokenForUser(user)
        }
    }
}
