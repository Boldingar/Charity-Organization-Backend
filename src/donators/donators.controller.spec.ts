import { Test, TestingModule } from '@nestjs/testing';
import { DonatorsController } from './donators.controller';
import { DonatorsService } from './donators.service';

describe('DonatorsController', () => {
  let controller: DonatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonatorsController],
      providers: [DonatorsService],
    }).compile();

    controller = module.get<DonatorsController>(DonatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
