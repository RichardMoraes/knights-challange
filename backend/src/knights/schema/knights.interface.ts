export interface IKnight {
  _id: string;
  name: string;
  nickname: string;
  birthday: Date;
  weapons: IWeapon[];
  attributes: IAttributes;
  keyAttribute: string;
}

interface IWeapon {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

interface IAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
