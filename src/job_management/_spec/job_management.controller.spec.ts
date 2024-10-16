import { Test, TestingModule } from '@nestjs/testing';
import { JobManagementController } from '../job_management.controller';
import { JobManagementService } from '../job_management.service';

describe('JobManagementController', () => {
  let controller: JobManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobManagementController],
      providers: [JobManagementService],
    }).compile();

    controller = module.get<JobManagementController>(JobManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
