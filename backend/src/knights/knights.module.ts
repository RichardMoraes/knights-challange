import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightController } from './knights.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [KnightController],
  imports: [RedisModule],
  providers: [KnightsService],
})
export class KnightsModule {}
