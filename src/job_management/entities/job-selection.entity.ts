import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateJobManagementDto } from "../model/create-job_management.dto";
import { JobProfile } from "./job_management.entity";
import { ConfigService } from "src/config/config.service";

@Entity({ name: 'JobSelection', schema: ConfigService.getValue('POSTGRES_SCHEMA') })
export class JobSelection{
    @PrimaryGeneratedColumn()
    ApplicationID: number;

    @Column('decimal', { precision: 10, scale: 2 })
    ProposedPrice: number;

    @Column({
        type: 'enum',
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    })
    Status: string;

    @Column('timestamp', { nullable: true })
    SelectedDate: Date;

    @Column('text', { nullable: true })
    comments: string;

    @OneToOne(() => JobProfile)
    @JoinColumn({ name: 'jobID' })
    jobID: JobProfile;

    @OneToOne(() => User)
    @JoinColumn({ name: 'Provider' })
    Provider: User;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
    
}