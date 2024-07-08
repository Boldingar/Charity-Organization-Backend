import { Test, TestingModule } from '@nestjs/testing';
import { DonatorsService } from './donators.service';

describe('DonatorsService', () => {
  let service: DonatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonatorsService],
    }).compile();

    service = module.get<DonatorsService>(DonatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
