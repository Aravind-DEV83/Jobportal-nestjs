import { ConfigService } from 'src/config/config.service';
import { JobProfile } from 'src/job_management/entities/job_management.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Skills', schema: ConfigService.getValue('POSTGRES_SCHEMA') })
export class Skill {
  @PrimaryGeneratedColumn()
  Skill_ID: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  SkillName : string;

  @Column({type: 'varchar', length: 255, nullable: true})
  SkillLevel: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Categories: string;

  @ManyToMany(() => JobProfile,(jobProfile)=>jobProfile.Skill)
  @JoinTable()
  profiles: JobProfile[];

}
