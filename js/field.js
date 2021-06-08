import { BaseComponent } from './base-component.js';
import { Cell } from './cell.js';
import { random } from './constants.js';

export class Field extends BaseComponent {
  gameField = [];

  lastCell = null;

  constructor(root) {
    super('div', ['grid']);
    this.element.id = 'game-field';
    root.append(this.element);

    this.element.addEventListener('click', (event) => {
      const target = event.target.closest('.cell');
      if (target) this.fieildLogic(target);
    });
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
    for (let i = 0; i < 5;) {
      const coordinate = random(81);
      if (!this.gameField[coordinate].ball) {
        this.gameField[coordinate].createBall();
        i++;
      }
    }
  }

  fieildLogic(target) {
    const cell = this.gameField.find((cell) => cell.element === target);
    const ballExist = cell.ball;
    if (ballExist) {
        if (this.lastCell) this.lastCell.ball.bounce();
        if (cell !== this.lastCell) {
          ballExist.bounce();
          this.lastCell = cell;
        } else {
          this.lastCell = null;
        }
    } else {
      if (this.lastCell) {
        this.lastCell.ball.bounce();
        this.moveBall(this.lastCell, cell);
        this.lastCell = null;
        
        // move + unbounce
      }
    }
  }

  moveBall(source, destination) {
    const ball = source.transfer;
    destination.transfer = ball;
  }
}