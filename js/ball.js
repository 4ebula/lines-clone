import { BaseComponent } from './base-component.js';
import { COLOR_PALETTE, random } from './constants.js';

export class Ball extends BaseComponent {
  color;

  active = false;

  constructor(root) {
    super('figure', ['ball'])
    this.color = COLOR_PALETTE[random(7)];
    this.element.classList.add(this.color);
    this.active = false;
    root.append(this.element);
  }

  bounce() {
    this.active = !this.active;
    this.element.classList.toggle('bounce');
  }
}
