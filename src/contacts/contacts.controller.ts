import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpsResponseStatus } from "src/utils/constants/constants";
import { CreateContactDto } from "./model/create-contact.dto";
import { Contacts } from "./entities/contact.entity";
import { UpdateContactDto } from "./model/update-contact.dto";

@Controller('conatcts')
@ApiTags('Contacts')
export class ContactsController {
    constructor( 
        private readonly contactsService: ContactsService
    ) { }

    @Post('/create/:userId')
    @ApiOperation({summary: 'Create a Contact', description: 'Register a contact to the jobportal application'})
    @ApiResponse({status: HttpStatus.OK, description: 'The contact has been successfully created.', type: Contacts})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to create a contact due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN , description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    async create(@Param('userId') userId: number, @Body() createContactDto: CreateContactDto ): Promise<any> {
        return await this.contactsService.create(userId, createContactDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all Contacts', description: 'Fetech all the Contacts from the contacts table'})
    @ApiResponse({status: HttpStatus.OK, description: 'Contacts retrived succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to get the contacts due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    async getAllContacts() {
        return await this.contactsService.getAllContacts();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get Contact by id', description: 'Fetech Contact by id from the contacts table'})
    @ApiResponse({status: HttpStatus.OK, description: 'Contact with id retrived succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to get the contact due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    async getContactById(@Param('id') id: number) {
        return await this.contactsService.getContactById(id);
    }

    @Patch('updateContact/:id')
    @ApiOperation({summary: 'Updates Contact details', description: 'Updates contact by id from the contacts table'})
    @ApiResponse({status: HttpStatus.OK, description: 'Contact with id updated succesfully.'})
    @ApiResponse({status: HttpStatus.GATEWAY_TIMEOUT, description: "Was unable to update the contact due to underlying service not being available"})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: HttpsResponseStatus.UNAUTHORIZED_MESSAGE})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpsResponseStatus.FORBIDDEN_MESSAGE})
    async updateContact(@Param('id') id: number, @Body() body: UpdateContactDto) {
        return await this.contactsService.updateContact(id, body);
    }
    
}