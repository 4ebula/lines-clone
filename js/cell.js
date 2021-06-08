import { Ball } from './ball.js';
import { BaseComponent } from './base-component.js';

export class Cell extends BaseComponent {
  row;

  column;

  ball = null;

  constructor(i, j, root) {
    super('div', ['cell']);
    this.row = i;
    this.column = j;

    root.append(this.element);
  }

  createBall() {
    this.ball = new Ball(this.element);
  }
}