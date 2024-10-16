import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobManagementDto } from './model/create-job_management.dto';
import { UpdateJobManagementDto } from './model/update-job_management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { JobProfile } from './entities/job_management.entity';
import { User } from 'src/users/entities/user.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { JobSelection } from './entities/job-selection.entity';
import { LoggerService } from 'src/logger/logger.service';
import { ProducerService } from 'src/kafka/producer.service';


@Injectable()
export class JobManagementService {
    constructor(
        @InjectRepository(JobProfile)
        private readonly ProfileRepository: Repository<JobProfile>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,

        @InjectRepository(JobSelection)
        private readonly jobSelectRepository: Repository<JobSelection>,

        private readonly loggerService: LoggerService,

        private readonly producerService: ProducerService
        
    ) {
        this.producerService.start()
    }

    async create(profileDto: CreateJobManagementDto, userID:User):Promise<JobProfile> {
        try{

            const {SkillIds, ...jobprofiledata} = profileDto
            
            if (!SkillIds.length) throw new Error('Skill value cannot be undefined');

            const skills = await this.skillRepository.findBy({
                Skill_ID: In(SkillIds) 
            });  

            const profile = await this.ProfileRepository.create({
                ...jobprofiledata,
                Seeker: userID,
                Skill: skills
            });

            return await this.ProfileRepository.save(profile);
            

        }catch(err){
            console.error('Error creating job profile:', err);
            throw new Error('Failed to create job profile. Please try again later.');
        }
    }

    async getAllProfiles(filter):Promise<any> {
        this.loggerService.log('Retriving all job profiles -- IN')
        try{
            
            const { jobType, Location, minBudget, maxBudget, DeliveryTime, ...SkillNames} = filter;
            
            let current_date = new Date();
            
            const profiles = await this.ProfileRepository.find({
                where: {
                    JobType: jobType, 
                    Status: false,
                    Location: Location,
                },
                relations: ['Seeker', 'Skill']
            });

            if (!profiles.length){
                throw new NotFoundException('No job profiles have found');
            }

            const filteredJobProfiles = profiles.map(profile => {
              const matchingSkills = profile.Skill.filter((skill) => SkillNames.SkillNames.includes(skill.SkillName));
              const matchingSkillsCount = matchingSkills.length ? matchingSkills.length: 0;
              const totalFilerSkillCount = SkillNames.SkillNames.length? SkillNames.SkillNames.length: 0;
              const calculatePercentage = (matchingSkillsCount / totalFilerSkillCount) * 100;
              return {
                ...profile,
                matchingSkillsCount,
                calculatePercentage,
              };
            }); 
            
            const greaterThan60 = filteredJobProfiles.filter(profile => profile.matchingSkillsCount > 0 && profile.calculatePercentage > 60);
            const lessThanOrEqualTo60 = filteredJobProfiles.filter(profile => profile.matchingSkillsCount >= 0 && profile.calculatePercentage <= 60);

            const concatenedRecords = greaterThan60.concat(lessThanOrEqualTo60);

            const filteredRecords = concatenedRecords.map(({matchingSkillsCount, calculatePercentage, ...rest}) => rest)            

            const budgetFiltering = filteredRecords.filter((profile) => profile.MaxBudget >= parseInt(minBudget) && profile.MaxBudget <= parseInt(maxBudget) && profile.Duration <= DeliveryTime && profile.EndDate > current_date);

            this.loggerService.log('Retriving all job profiles -- OUT');
            return budgetFiltering


            // Hiding Excluded Fields code...
            // return filteredRecords.map((profile) =>
            //     plainToClass(User, profile.Seeker)
            // );
        }
        catch(err){
            console.log('Error fetching job profiles:', err)
            throw new Error('Failed to fetch job profiles. Please try again later.');
        }
    }

    async getProfile(userID: number):Promise<JobProfile> {
        this.loggerService.log('Retriving a job profile -- IN');
        try{
            const profile = await this.ProfileRepository.findOne({
                where: {ProfileId: userID, Status: false},
                relations: ['Seeker', 'Skill']
            });
        
            if(!profile){
            throw new NotFoundException(`Profile with ID ${userID} not found`);
            }

            // Hiding Excluded Fields code...
            // profile.Seeker = plainToClass(User, profile.Seeker);
            this.loggerService.log('Retriving a job profile -- OUT');
            return profile;
        }
        catch(err){
            console.log('Error fetching a job profile:', err)
            throw new Error('Failed to fetch job profile. Please try again later.');
        }

    }

    async updateProfile(userID: number, updateJobManagementDto: UpdateJobManagementDto):Promise<any> {

        try{
            const profile = await this.ProfileRepository.findOne({
                where: {ProfileId: userID}
            });
        
            if (!profile){
            throw new NotFoundException(`Profile with id: ${userID} not found`);
            }
        
            return await this.ProfileRepository.update(userID, updateJobManagementDto);
        }
        catch(err){
            console.log('Error updating the job profile:', err)
            throw new Error('Failed to update a job profile. Please try again later.');
        }
    }

    async selectProfile(id: number, user: User):Promise<any>{
        try{
            let current_date = new Date();
            const jobProfile = await this.ProfileRepository.findOne({
                where: {ProfileId: id},
                relations: ['Seeker']
            });

            if (!jobProfile){
                throw new NotFoundException('Job profile not found.');
            }

            const current_profile = new JobSelection();
            current_profile.ProposedPrice = jobProfile.MaxBudget;
            current_profile.SelectedDate = current_date;
            current_profile.jobID = jobProfile;
            current_profile.Provider = user;
            
            const recipientEmail = current_profile.jobID.Seeker.Email
            const subject = 'Congratulations! Your Job Profile Has Been Selected'
            const body = 
            ` Dear ${current_profile.jobID.Seeker.FirstName} ${current_profile.jobID.Seeker.LastName},

            We are delighted to inform you that your job profile has been selected for further consideration at [Company Name].

            After carefully reviewing your application and qualifications, we believe that you possess the skills and experience that align perfectly with the requirements of the [Job Title] position.
`;
            // Need to call any open source mailer service function that sends a mail to user.
            this.sendJobNotification(recipientEmail, subject, body)
            return await this.jobSelectRepository.save(current_profile)
        }
        catch(err){
            console.log('Error selecting the job profile:', err)
            throw new Error('Failed to select a job profile. Please try again later.');
        }

    }

    async getselectedProfiles():Promise<any>{
        const getprofiles = await this.jobSelectRepository.find({
            relations: ['jobID', 'jobID.Seeker', 'jobID.Skill', 'Provider']
        });

        if(!getprofiles.length){
            throw new NotFoundException('No selected records found in the database.')
        }

        const filteredRecords = getprofiles.filter((profile) => profile.Status === 'Pending');

        return filteredRecords
    }

    async getselectedProfileById(id: number):Promise<any>{
        const getProfile = await this.jobSelectRepository.findOne({
            where: {ApplicationID: id},
            relations: ['jobID', 'jobID.Seeker', 'jobID.Skill', 'Provider']
        });

        if(!getProfile){
            throw new NotFoundException(`No Record found with id ${id}`)
        }

        let filteredRecords = getProfile
        if (getProfile.Status == 'Pending'){
            filteredRecords = getProfile
        }
        else{
            return 'No Accepeted Records Found';
        }
        return filteredRecords
    }

    async sendJobNotification(recipientEmail: string, subject: string, body: string) {
        const message = {
          recipientEmail,
          subject,
          body,
        };
        await this.producerService.sendMessage('job-portal-topic', message);
    }

    remove(id: number) {
        return `This action removes a #${id} jobManagement`;
    }
}
