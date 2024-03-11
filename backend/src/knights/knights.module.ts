import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightController } from './knights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightSchema } from './schema/knight.model';

@Module({
  controllers: [KnightController],
  imports: [
    MongooseModule.forFeature([{ name: 'Knight', schema: KnightSchema }]),
  ],
  providers: [KnightsService],
})
export class KnightsModule {}
