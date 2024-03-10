import { IsNotEmpty, Length, ArrayNotEmpty, IsIn, IsNumber, IsString, IsBoolean, IsInt, Min, Max, IsDefined, IsDateString } from 'class-validator';

// Knight Attributes Class
class Attributes {
  // Knight strength
  @IsInt({ message: 'A força deve ser um número inteiro' })
  @Min(0, { message: 'A força não pode ser menor que 0' })
  @Max(20, { message: 'A força não pode ser maior que 20' })
  readonly strength: number;

  // Knight dexterity
  @IsInt({ message: 'A destreza deve ser um número inteiro' })
  @Min(0, { message: 'A destreza não pode ser menor que 0' })
  @Max(20, { message: 'A destreza não pode ser maior que 20' })
  readonly dexterity: number;

  // Knight constitution
  @IsInt({ message: 'A constituição deve ser um número inteiro' })
  @Min(0, { message: 'A constituição não pode ser menor que 0' })
  @Max(20, { message: 'A constituição não pode ser maior que 20' })
  readonly constitution: number;

  // Knight intelligence
  @IsInt({ message: 'A inteligência deve ser um número inteiro' })
  @Min(0, { message: 'A inteligência não pode ser menor que 0' })
  @Max(20, { message: 'A inteligência não pode ser maior que 20' })
  readonly intelligence: number;

  // Knight wisdom
  @IsInt({ message: 'A sabedoria deve ser um número inteiro' })
  @Min(0, { message: 'A sabedoria não pode ser menor que 0' })
  @Max(20, { message: 'A sabedoria não pode ser maior que 20' })
  readonly wisdom: number;

  // Knight charisma
  @IsInt({ message: 'A carisma deve ser um número inteiro' })
  @Min(0, { message: 'A carisma não pode ser menor que 0' })
  @Max(20, { message: 'A carisma não pode ser maior que 20' })
  readonly charisma: number;
}

// Knight Weapons Class
class Weapon {
  @IsNotEmpty({
    message: 'O nome da arma não pode estar vazio',
  })
  @IsString({
    message: 'O nome da arma deve ser uma string',
  })
  @Length(2, 20, {
    message: 'O nome da arma deve ter entre 2 e 20 caracteres',
  })
  readonly name: string;

  @IsNotEmpty({
    message: 'O modificador da arma não pode estar vazio',
  })
  @IsNumber({}, {
    message: 'O modificador da arma deve ser um número válido',
  })
  readonly mod: number;

  @IsIn(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'], {
    message: 'O atributo da arma deve ser uma das propriedades especificadas',
  })
  readonly attr: string;

  @IsNotEmpty({
    message: 'O status de equipamento da arma não pode estar vazio',
  })
  @IsBoolean({
    message: 'O status de equipamento da arma deve ser um booleano',
  })
  readonly equipped: boolean;
}

export class CreateKnightDto {
  // Knight Name
  @IsDefined({ message: 'O nome deve ser definido' })
  @IsNotEmpty({
    message: 'O nome não pode estar vazio',
  })
  @IsString({
    message: 'O nome deve ser uma string',
  })
  @Length(2, 50, {
    message: 'O nome deve ter entre 2 e 50 caracteres',
  })
  readonly name: string;

  // Knight nickname
  @IsNotEmpty({
    message: 'O apelido não pode estar vazio',
  })
  @IsString({
    message: 'O apelido deve ser uma string',
  })
  @Length(2, 20, {
    message: 'O apelido deve ter entre 2 e 20 caracteres',
  })
  readonly nickname: string;

  // Knight birthday
  @IsNotEmpty({
    message: 'A data de nascimento não pode estar vazia',
  })
  @IsDateString({}, {
    message: 'A data de nascimento deve ser uma data válida',
  })
  readonly birthday: Date;

  // Knight weapons
  @ArrayNotEmpty({
    message: 'Pelo menos uma arma deve ser especificada',
  })
  readonly weapons: Weapon[];

  // Knight attributes
  @IsNotEmpty({ message: 'Atributos do cavaleiro não podem estar vazios' })
  readonly attributes: Attributes;

  // Knight key Attribute
  @IsIn(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'], {
    message: 'O atributo chave deve ser uma das propriedades especificadas',
  })
  readonly keyAttribute: string;
}
