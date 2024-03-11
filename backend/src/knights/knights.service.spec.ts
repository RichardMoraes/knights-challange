import { Test, TestingModule } from '@nestjs/testing';
import { KnightsService } from './knights.service';
import { Knight } from './schema/knights.interface';
import { CreateKnightDto } from './dto/create-knight.dto';
import { RedisRepository } from '../redis/repository/redis.repository';
import { UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

const KnightMock: CreateKnightDto = {
  name: 'Sir Lancelot',
  nickname: 'The Brave',
  birthday: new Date('1960-05-03'),
  weapons: [{ name: 'sword', mod: 3, attr: 'strength', equipped: true }],
  attributes: {
    strength: 15,
    dexterity: 12,
    constitution: 13,
    intelligence: 10,
    wisdom: 8,
    charisma: 11,
  },
  keyAttribute: 'strength',
};

describe('KnightService', () => {
  let service: KnightsService;
  let redisRepositoryMock: RedisRepository;

  beforeEach(async () => {
    redisRepositoryMock = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      setWithExpiry: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightsService,
        { provide: RedisRepository, useValue: redisRepositoryMock },
      ],
    }).compile();

    service = module.get<KnightsService>(KnightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new knight', async () => {
    const createdKnight: Knight = await service.create(KnightMock);

    // Assert that the createdKnight is not null
    expect(createdKnight).toBeDefined();

    // Assert that the createdKnight has correct values
    expect(createdKnight.name).toEqual(KnightMock.name);
    expect(createdKnight.nickname).toEqual(KnightMock.nickname);
    expect(createdKnight.birthday).toEqual(KnightMock.birthday);
    expect(createdKnight.weapons).toEqual(KnightMock.weapons);
    expect(createdKnight.attributes).toEqual(KnightMock.attributes);
    expect(createdKnight.keyAttribute).toEqual(KnightMock.keyAttribute);
  });

  it('should throw error when create has invalid knight data', async () => {
    const invalidKnightMock = {
      ...KnightMock,
      name: undefined,
    };

    // Assert that the createdKnight has failed
    await expect(
      service.create(plainToInstance(CreateKnightDto, invalidKnightMock)),
    ).rejects.toThrow(UnprocessableEntityException);
  });
});
