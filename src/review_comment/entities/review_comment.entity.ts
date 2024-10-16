import { JobProfile } from 'src/job_management/entities/job_management.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne, JoinTable } from 'typeorm';

@Entity()
export class ReviewComment {
  @PrimaryGeneratedColumn()
  ReviewID: number;

  @Column('decimal', { precision: 3, scale: 2 })
  Rating: number;

  @Column('text')
  Comment: string;

  @ManyToOne(() => User, User => User.UserID)
  Reviewer: User;

  @ManyToOne(() => User, User => User.UserID)
  TargetUser: User;

  @ManyToOne(() => JobProfile, jobProfile => jobProfile.ProfileId)
  Job: JobProfile;

}