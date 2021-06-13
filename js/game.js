import { Field } from './field.js';

export class Game {
  gameField;

  constructor() {
    this.gameField = new Field(document.querySelector('.container'));
  }
}
