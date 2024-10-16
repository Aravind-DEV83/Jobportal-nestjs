import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    PhoneNumber?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    Address?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    City?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    State?: string;
}