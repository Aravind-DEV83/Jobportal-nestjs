import { Exclude } from 'class-transformer';
import { ConfigService } from 'src/config/config.service';
import { Contacts } from 'src/contacts/entities/contact.entity';
import { JobProfile } from 'src/job_management/entities/job_management.entity';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'User', schema: ConfigService.getValue('POSTGRES_SCHEMA') })
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  Password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  FirstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  LastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Availability: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Location: string;

  // @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  // Rating: number;

  @Column({type: 'varchar', length: 255, nullable: true})
  Type: string;

  @Column()
  Role: string;

  @OneToMany(() => JobProfile,(JobProfile)=>JobProfile.Seeker) 
  @JoinTable()
  Jobprofile: JobProfile[];

  @OneToOne(() => Contacts, (contact)=> contact.userProfile)
  @JoinColumn()
  contact: Contacts

  @CreateDateColumn({nullable: true})
  CreatedAt: Date

  @UpdateDateColumn({nullable: true})
  UpdatedAt: Date

  @Column({nullable: true})
  LastLoggedIn: Date
  
}

