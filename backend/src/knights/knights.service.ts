import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { validateOrReject } from 'class-validator';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { KnightDocument } from './schema/knight.model';
import { Knight } from './schema/knight';
import { IKnight } from './schema/knights.interface';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel('Knight') private knightModel: Model<KnightDocument>,
  ) {}

  async create(createKnightDto: CreateKnightDto): Promise<Knight> {
    const existingKnight = await this.knightModel
      .findOne({ name: createKnightDto.name })
      .exec();

    // Validate if the Knight already exists
    if (existingKnight) {
      if (existingKnight.inHallOfHeroes) {
        throw new UnprocessableEntityException(
          'Um knight com este nome já existiu e é lembrado como um herói memorável!',
        );
      } else {
        throw new UnprocessableEntityException(
          'Um knight com o mesmo nome já existe.',
        );
      }
    }

    // Validate if theres more than one weapon equipped
    const equippedWeaponsCount = createKnightDto.weapons.filter(
      (weapon) => weapon.equipped,
    ).length;

    if (equippedWeaponsCount > 1)
      throw new UnprocessableEntityException(
        'Apenas uma arma pode estar equipada.',
      );

    try {
      await validateOrReject(createKnightDto);
      const knight = new Knight(
        await new this.knightModel(createKnightDto).save(),
      );

      return knight;
    } catch (error) {
      throw new UnprocessableEntityException(
        'Erro ao criar knight, verifique os dados e tente novamente.',
      );
    }
  }

  async findAll(filter: string): Promise<Knight[]> {
    const knights = await this.knightModel
      .find({ inHallOfHeroes: filter === 'heroes' ? true : false })
      .exec();

    return knights.map((knight) => new Knight(knight));
  }

  async findOne(id: string): Promise<IKnight> {
    const knight = await this.knightModel.findById(id).exec();
    if (!knight) throw new NotFoundException('Knight não encontrado.');

    return knight;
  }

  async update(id: string, updateKnightDto: UpdateKnightDto): Promise<IKnight> {
    const existingKnight = await this.knightModel.findById(id).exec();
    if (!existingKnight) throw new NotFoundException('Knight não encontrado.');

    if (existingKnight.inHallOfHeroes)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar, esse herói já foi eternizado com um apelido.',
      );

    if (!updateKnightDto.nickname)
      throw new UnprocessableEntityException(
        'O apelido do knight é obrigatório',
      );

    existingKnight.nickname = updateKnightDto.nickname;
    return await existingKnight.save();
  }

  async remove(id: string): Promise<{ message: string }> {
    const knight = await this.knightModel.findById(id).exec();
    if (!knight) throw new NotFoundException(`Knight não encontrado.`);

    if (knight.inHallOfHeroes)
      throw new UnprocessableEntityException(
        'Um knight com este nome já existiu e é lembrado como um herói memorável!',
      );

    knight.inHallOfHeroes = true;
    await knight.save();

    return {
      message: `O knight ${knight.name} será agora eternizado como um herói!`,
    };
  }
}
