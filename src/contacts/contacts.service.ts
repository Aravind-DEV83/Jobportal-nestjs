import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Contacts } from "./entities/contact.entity";
import { CreateContactDto } from "./model/create-contact.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UpdateContactDto } from "./model/update-contact.dto";

@Injectable()
export class ContactsService {

    constructor( 
        @InjectRepository(Contacts)
        private readonly contactsRepository: Repository<Contacts>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){ }
    async create(userId: number, createContactDto: CreateContactDto){

        const current_date = new Date();
        const { PhoneNumber, Address, State, City } = createContactDto

        const user = await this.usersRepository.findOne({
            where: {UserID: userId}
        });

        if(!user) throw new NotFoundException(`No user found with id: ${userId}`);

        const contact = this.contactsRepository.create({
            PhoneNumber: PhoneNumber,
            Address: Address,
            State: State,
            City: City,
            userProfile: user,
            CreatedAt: current_date,
            UpdatedAt: current_date,
        });
        
        const contactSaved = await this.contactsRepository.save(contact);

        user.contact = contactSaved
        await this.usersRepository.save(user)

        return contactSaved
    }

    async getAllContacts(){
        const contacts = await this.contactsRepository.find({
            relations: ['userProfile']
        });

        if(!contacts.length) throw new NotFoundException('No contacts found in the database.');

        return contacts
    }

    async getContactById(id: number){

        const contact = await this.contactsRepository.findOne({
            where: {ContactId: id}
        });

        if(!contact) throw new NotFoundException(`No contact found with id: ${id}`);

        return contact;
    }

    async updateContact(id: number, body: UpdateContactDto){
        const contact = await this.contactsRepository.findOne({
            where: {ContactId: id}
        });

        if(!contact) throw new NotFoundException(`No Contacts found with id: ${id}`);

        body["UpdatedAt"] = new Date();

        return await this.contactsRepository.update(id, body)
    }
}