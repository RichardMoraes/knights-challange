import { Test, TestingModule } from '@nestjs/testing';
import { KnightsController } from './knights.controller';
import { KnightsService } from './knights.service';
import { RedisRepository } from '../redis/repository/redis.repository';

describe('KnightController', () => {
  let controller: KnightsController;
  let redisRepositoryMock: RedisRepository;

  beforeEach(async () => {
    redisRepositoryMock = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      setWithExpiry: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnightsController],
      providers: [
        KnightsService,
        { provide: RedisRepository, useValue: redisRepositoryMock },
      ],
    }).compile();

    controller = module.get<KnightsController>(KnightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
