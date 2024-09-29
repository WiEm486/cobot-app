import { Test, TestingModule } from '@nestjs/testing';
import { UrsimController } from './ursim.controller';

describe('UrsimController', () => {
  let controller: UrsimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrsimController],
    }).compile();

    controller = module.get<UrsimController>(UrsimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
