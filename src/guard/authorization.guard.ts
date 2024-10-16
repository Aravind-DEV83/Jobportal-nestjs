import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthorizationGuard implements CanActivate{

    constructor(
        private reflector: Reflector,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean>{
        
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles){
            return true
        }
        console.log('The Required Roles are', requiredRoles);
        
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]

        try{
            const decoded = this.jwtService.decode(token) as {userID: number};
            const user = await this.userRepository.findOne({
                where: {UserID: decoded.userID}
            });

            const userRole = user.Role
            if (!user) {
                return false;
            }
            console.log("current Role user have", userRole);
            
            return requiredRoles.some((role) => userRole?.includes(role));
        }
        catch(err){
            console.log(err)
            return false
        }

    }
}