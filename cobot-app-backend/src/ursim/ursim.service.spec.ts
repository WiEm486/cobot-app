/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UrsimService } from './ursim.service';

describe('UrsimService', () => {
  let service: UrsimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrsimService],
    }).compile();

    service = module.get<UrsimService>(UrsimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
