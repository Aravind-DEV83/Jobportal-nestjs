import { ConfigService } from 'src/config/config.service';
import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'JobProfile', schema: ConfigService.getValue('POSTGRES_SCHEMA') })
export class JobProfile {
    @PrimaryGeneratedColumn()
    ProfileId: number;
  
    @Column({ type: 'text', nullable: true })
    Description: string;
  
    @Column({ nullable: true })
    Duration: number;
  
    @Column({ type: 'timestamp', nullable: true })
    StartDate: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    EndDate: Date;

    @Column({ type: 'enum', enum: ['Physical', 'Virtual'], nullable: true })
    JobType: 'Physical' | 'Virtual';
  
    @Column({ length: 255, nullable: true })
    Location: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    MaxBudget: number;

    @Column({type: 'boolean', default: false})
    Status: boolean;
  
    @ManyToOne(() => User, (User)=>User.Jobprofile) 
    @JoinTable()
    Seeker: User;
  
    @ManyToMany(() => Skill,(Skill)=>Skill.profiles)
    @JoinTable()
    Skill: Skill[];
    
}
