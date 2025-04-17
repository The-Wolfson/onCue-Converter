export class Production {
    title: string;
    acts: Act[] = []
    characters: Character[] = []

  constructor(title: string) {
      this.title = title
  }

  toJSON() {
      return {
          production: {
  title: this.title,
  acts: this.acts.map(act => act.toJSON()),
  characters: this.characters.map(character => character.toJSON())
          }
      };
  }
  }

  export class Act {
    number: number;
    scenes: Scene[] = []

    constructor(number: number) {
      this.number = number;
    }

    toJSON() {
      return {
      number: this.number,
      scns: this.scenes.map(scene => scene.toJSON())
      };
    }
  }

 export class Scene {
    number: number;
  lines: Line[] = []

    constructor(number: number) {
      this.number = number;
    }

    toJSON() {
      return {
          number: this.number,
          lines: this.lines.map(line => line.toJSON())
      };
    }
  }

 export class Line {
    sequence: number;
    content: string;
    character: Character;

    constructor(sequence: number, content: string, character: Character) {
      this.sequence = sequence;
      this.content = content;
      this.character = character;
    }

    toJSON() {
      return {
          sequence: this.sequence,
          content: this.content,
          characterName: this.character.name
      };
    }
  }

 export class Character {
    name: string;
    gender: Gender;

    constructor(name: string, gender: Gender) {
      this.name = name;
      this.gender = gender;
    }

    toJSON() {
      return {
  name: this.name,
  gender: this.gender
      };
    }
  }

 export enum Gender {
      Unspecified = 0,
      Male = 1,
      Female = 2
  }