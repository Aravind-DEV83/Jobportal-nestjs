import { ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class UpdateContactDto {
    @ApiPropertyOptional()
    PhoneNumber?: string;
  
    @ApiPropertyOptional()
    Address?: string;
  
    @ApiPropertyOptional()
    City?: string;
  
    @ApiPropertyOptional()
    State?: string;
  }