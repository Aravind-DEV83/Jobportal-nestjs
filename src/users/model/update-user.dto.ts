import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateUserDto {
    @ApiPropertyOptional()
    Username?: string;

    @ApiPropertyOptional()
    Email?: string;

    @ApiPropertyOptional()
    FirstName?: string;

    @ApiPropertyOptional()
    LastName?: string;

    @ApiPropertyOptional()
    Availability?: string;

    @ApiPropertyOptional()
    Location?: string;

    @ApiPropertyOptional()
    Rating?: number;

    @ApiPropertyOptional()
    Type?: 'Seeker' | 'Provider'

}