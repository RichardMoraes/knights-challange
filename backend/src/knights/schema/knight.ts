import { IKnight } from './knights.interface';

export class Knight {
  private id: string;
  private name: string;
  private age: number;
  private weapons: number;
  private keyAttribute: string;
  private attack: number;
  private experience: number;

  constructor(data: IKnight) {
    this.id = data._id;
    this.name = data.name;
    this.age = this.getAge(data.birthday);
    this.weapons = data.weapons.length;
    this.keyAttribute = data.keyAttribute;
    this.attack = this.calculateAttack(data);
    this.experience = this.calculateExperience(data.birthday);
  }

  private calculateAttack(data: IKnight): number {
    const attributeMod = this.calculateAttributeMod(
      data.attributes[data.keyAttribute],
    );
    const equippedWeapon = data.weapons.find((weapon) => weapon.equipped);

    return 10 + attributeMod + equippedWeapon.mod;
  }

  private calculateAttributeMod(attributeValue: number): number {
    switch (true) {
      case attributeValue >= 0 && attributeValue <= 8:
        return -2;
      case attributeValue >= 9 && attributeValue <= 10:
        return -1;
      case attributeValue >= 11 && attributeValue <= 12:
        return 0;
      case attributeValue >= 13 && attributeValue <= 15:
        return 1;
      case attributeValue >= 16 && attributeValue <= 18:
        return 2;
      default:
        return 3;
    }
  }

  private calculateExperience(birthday: Date): number {
    const age = new Date().getFullYear() - birthday.getFullYear();

    if (age < 7) return 0;

    return Math.floor((age - 7) * Math.pow(22, 1.45));
  }

  private getAge(birthday: Date): number {
    const currentYear = new Date().getFullYear();
    const birthYear = birthday.getFullYear();

    return currentYear - birthYear;
  }
}
