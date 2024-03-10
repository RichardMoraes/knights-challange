import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnightsModule } from './knights/knights.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [KnightsModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
