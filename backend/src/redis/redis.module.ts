import { Module } from '@nestjs/common';
import { RedisRepository } from 'src/redis/repository/redis.repository';
import { redisClientFactory } from './redis-client.factory';

@Module({
  exports: [RedisRepository],
  providers: [RedisRepository, redisClientFactory],
})
export class RedisModule {}
