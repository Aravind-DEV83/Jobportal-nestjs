import { ConfigService } from "src/config/config.service";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Contacts', schema: ConfigService.getValue('POSTGRES_SCHEMA') })
export class Contacts {
    @PrimaryGeneratedColumn()
    ContactId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    PhoneNumber: string

    @Column({ type: 'varchar', length: 255, nullable: true })
    Address: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    State: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    City: string;

    @OneToOne(() => User, (user)=> user.contact)
    @JoinColumn()
    userProfile: User

    @CreateDateColumn({nullable: true})
    CreatedAt: Date;

    @UpdateDateColumn({nullable: true})
    UpdatedAt: Date;
}