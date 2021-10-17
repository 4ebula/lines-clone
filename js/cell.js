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

  createBall(isSmall = false) {
    this.ball = new Ball(this.element, isSmall);
  }

  set transfer(ball) {
      this.element.append(ball.element);
      this.ball = ball;
  }

  get transfer() {
    const ball = this.ball;
    this.element.innerHTML = '';
    this.ball = null;
    return ball;
  }

  clear() {
    this.element.innerHTML = '';
    this.ball = null;
  }

  burnBall() {
    this.clear();
  }
}
