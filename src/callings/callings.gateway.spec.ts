import { Test, TestingModule } from '@nestjs/testing';
import { CallingsGateway } from './callings.gateway';
import { CallingsService } from './callings.service';

describe('CallingsGateway', () => {
  let gateway: CallingsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallingsGateway, CallingsService],
    }).compile();

    gateway = module.get<CallingsGateway>(CallingsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
