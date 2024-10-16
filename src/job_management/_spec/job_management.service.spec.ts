import { Test, TestingModule } from '@nestjs/testing';
import { JobManagementService } from './job_management.service';

describe('JobManagementService', () => {
  let service: JobManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobManagementService],
    }).compile();

    service = module.get<JobManagementService>(JobManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
