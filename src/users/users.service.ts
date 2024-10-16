import {BadRequestException, HttpStatus, Inject, Injectable, NotFoundException, forwardRef} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcyrpt from "bcrypt"
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './model/update-user.dto';
import { CreateUserDto } from './model/create-user.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService
  ) {}

    private async hashPasswords(password: string): Promise<string> {
        return await bcyrpt.hash(password, 10)
    }

    async signup(createUserDto): Promise<any> {
        const user = new User();   
        let date_time = new Date();

        if (createUserDto.Password !== createUserDto.ReTypedPassword) {
            throw new BadRequestException(['Passwords are not identical']);
        }

        const existingUser = await this.userRepository.findOne({
            where: [
                { Username: createUserDto.Username },
                { Email: createUserDto.Email },
            ],
        });
    
        if (existingUser) {
            throw new BadRequestException(['Username or Email has already taken']);
        }
        user.UserID = createUserDto.UserID
        user.Username = createUserDto.Username;
        user.Password = await this.hashPasswords(createUserDto.Password)
        user.Email = createUserDto.Email;
        user.FirstName = createUserDto.FirstName;
        user.LastName = createUserDto.LastName;
        user.Availability = createUserDto.Availability;
        user.Location = createUserDto.Location;
        user.CreatedAt = date_time
        user.UpdatedAt = date_time
        user.LastLoggedIn = date_time
        user.Type = createUserDto.Type;

        if (user.Type.toLowerCase() === 'provider' || user.Type.toLowerCase() === 'seeker'){
            user.Role = 'JOB_' + createUserDto.Type.toUpperCase();
        }
        else{
            const splitArray = createUserDto.Type.split(' ');
            user.Role = splitArray.join('_').toUpperCase();
        }
        
        console.log(user);
        
        await this.userRepository.save(user)

        const ResponseToUser = {
            status: HttpStatus.CREATED,
            message: 'Credentials Saved',
            token: await this.authService.getTokenForUser(user)
        };
        return ResponseToUser
    }

    async updateProfile(userId: number, body: UpdateUserDto): Promise<any>{
        
        const user = await this.userRepository.findOne({
            where: {UserID: userId}
        });

        if (!user){
            throw new NotFoundException(`User with ID: ${userId} not found`);
        }
        
        body["UpdatedAt"] = new Date();
        return await this.userRepository.update(userId, body);
    }
}
