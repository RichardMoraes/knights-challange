import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { isValidObjectId } from 'mongoose';

@Controller('knights')
export class KnightController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post('/create-many')
  async createMany(
    @Body() knightsData: CreateKnightDto[],
  ): Promise<{ message: string }> {
    for (const knightData of knightsData) {
      await this.knightsService.create(knightData);
    }

    return { message: 'Knights criados com sucesso.' };
  }

  @Post()
  create(@Body() createKnightDto: CreateKnightDto) {
    return this.knightsService.create(createKnightDto);
  }

  @Get()
  findAll(@Query('filter') filter: string) {
    return this.knightsService.findAll(filter ?? '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('ID inválido');

    return this.knightsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKnightDto: UpdateKnightDto) {
    if (!isValidObjectId(id)) throw new NotFoundException('ID inválido');

    return this.knightsService.update(id, updateKnightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('ID inválido');

    return this.knightsService.remove(id);
  }
}
