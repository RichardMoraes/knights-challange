import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { Knight } from './knights.interface';
import { v4 as uuidv4 } from 'uuid';
import { RedisRepository } from '../redis/repository/redis.repository';
import { RedisPrefixEnum } from '../redis/redis-prefix.enum';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class KnightsService {
  constructor(private readonly redisRepository: RedisRepository) {}

  async create(createKnightDto: CreateKnightDto): Promise<Knight> {
    // Try create a new Knight
    try {
      // Validade Knight DTO
      await validateOrReject(createKnightDto);

      // Generate unique UUID identifier
      const knightUUID: string = uuidv4(); 
      const knight: Knight = {
        name: createKnightDto.name,
        nickname: createKnightDto.nickname,
        birthday: createKnightDto.birthday,
        weapons: createKnightDto.weapons,
        attributes: createKnightDto.attributes,
        keyAttribute: createKnightDto.keyAttribute,
      };

      // Create the Knight
      await this.redisRepository.set(
        RedisPrefixEnum.KNIGHT,
        knightUUID,
        JSON.stringify(knight),
      );

      return knight;
    } catch (error) {
      throw new UnprocessableEntityException(
        'Erro ao criar Knight, verifique os dados e tente novamente.',
      );
    }
  }

  findAll() {
    return `This action returns all knight`;
  }

  findOne(id: number) {
    return `This action returns a #${id} knight`;
  }

  update(id: number, updateKnightDto: UpdateKnightDto) {
    return `This action updates a #${id} knight`;
  }

  remove(id: number) {
    return `This action removes a #${id} knight`;
  }
}
