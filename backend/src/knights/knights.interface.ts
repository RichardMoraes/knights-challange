export interface Knight {
  name: string;
  nickname: string;
  birthday: Date;
  weapons: Weapon[];
  attributes: Attributes;
  keyAttribute: string;
}

interface Weapon {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
