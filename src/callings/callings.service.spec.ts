import { Test, TestingModule } from '@nestjs/testing';
import { CallingsService } from './callings.service';

describe('CallingsService', () => {
  let service: CallingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallingsService],
    }).compile();

    service = module.get<CallingsService>(CallingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
