import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    Username: string;

    @ApiProperty()
    Email: string;

    @ApiProperty()
    Password: string;

    @ApiProperty()
    ReTypedPassword: string;

    @ApiPropertyOptional()
    FirstName: string;

    @ApiPropertyOptional()
    LastName: string;

    @ApiPropertyOptional()
    Availability?: string;

    @ApiPropertyOptional()
    Location?: string;

    @ApiPropertyOptional()
    Type?: 'Seeker' | 'Provider'
}
