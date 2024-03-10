import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';

@Controller('knights')
export class KnightController {
  constructor(private readonly knightService: KnightsService) {}

  @Post()
  create(@Body() createKnightDto: CreateKnightDto) {
    return this.knightService.create(createKnightDto);
  }

  @Get()
  findAll() {
    return this.knightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knightService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKnightDto: UpdateKnightDto) {
    return this.knightService.update(+id, updateKnightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knightService.remove(+id);
  }
}
