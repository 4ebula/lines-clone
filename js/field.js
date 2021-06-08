import { BaseComponent } from './base-component.js';
import { Cell } from './cell.js';
import { random } from './constants.js';

export class Field extends BaseComponent {
  gameField = [];

  constructor(root) {
    super('div', ['grid']);
    this.element.id = 'game-field';
    root.append(this.element);
    this.element.addEventListener('click', () => {console.log('DUM')});
    this.createField();
    this.initGame();
  }

  createField() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
       this.gameField.push(new Cell(i, j, this.element));
      }
    }
  }

  initGame() {
    for(let i = 0; i < 5;) {
      const coordinate = random(82);
      if(!this.gameField[coordinate].ball) {
        this.gameField[coordinate].createBall();
        i++;
      }
    }
  }
}