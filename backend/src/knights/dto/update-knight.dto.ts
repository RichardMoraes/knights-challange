import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateKnightDto } from './create-knight.dto';

export class UpdateKnightDto extends PartialType(
  PickType(CreateKnightDto, ['nickname']),
) {}
