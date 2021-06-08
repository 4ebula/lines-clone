import { BaseComponent } from './base-component.js';
import { Cell } from './cell.js';

export class Field extends BaseComponent {
  gameField = [];

  constructor(root) {
    super('div', ['grid']);
    this.element.id = 'game-field';
    root.append(this.element);
    this.createField();
  }

  createField() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
       this.gameField.push(new Cell(i, j));
      }
    }
  }
}