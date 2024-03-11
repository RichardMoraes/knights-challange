import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Knight Attributes Schema
@Schema({ _id: false })
export class KnightAttributes {
  @Prop({ required: true, min: 0, max: 20 })
  strength: number;

  @Prop({ required: true, min: 0, max: 20 })
  dexterity: number;

  @Prop({ required: true, min: 0, max: 20 })
  constitution: number;

  @Prop({ required: true, min: 0, max: 20 })
  intelligence: number;

  @Prop({ required: true, min: 0, max: 20 })
  wisdom: number;

  @Prop({ required: true, min: 0, max: 20 })
  charisma: number;
}

// Knight Weapon Schema
@Schema({ _id: false })
export class KnightWeapon {
  @Prop({ required: true, minlength: 2, maxlength: 20 })
  name: string;

  @Prop({ required: true, min: 0 })
  mod: number;

  @Prop({
    required: true,
    enum: [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma',
    ],
  })
  attr: string;

  @Prop({ required: true })
  equipped: boolean;
}

// Knight Schema
@Schema()
export class KnightDocument extends Document {
  @Prop({ required: true, unique: true, minlength: 2, maxlength: 50 })
  name: string;

  @Prop({ required: true, minlength: 2, maxlength: 20 })
  nickname: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ type: [KnightWeapon], required: true })
  weapons: KnightWeapon[];

  @Prop({ type: KnightAttributes, required: true })
  attributes: KnightAttributes;

  @Prop({
    required: true,
    enum: [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma',
    ],
  })
  keyAttribute: string;

  @Prop({ default: false })
  inHallOfHeroes: boolean;
}

export const KnightSchema = SchemaFactory.createForClass(KnightDocument);
