import { ApiProperty } from "@nestjs/swagger";

export class UserLogin {

    @ApiProperty()
    Username: string;
    
    @ApiProperty()
    Password: string;
}