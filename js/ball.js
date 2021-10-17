import { BaseComponent } from './base-component.js';
import { COLOR_PALETTE, random } from './constants.js';

export class Ball extends BaseComponent {
  color;
  active = false;
  isSmall = false;
  code;

  constructor(root, isSmall = false) {
    super('figure', ['ball']);
    this.code = random(7) + 1;
    this.color = COLOR_PALETTE[this.code - 1];
    this.element.classList.add(this.color);

    this.isSmall = isSmall;
    if (this.isSmall) this.element.classList.add('small');
    
    this.active = false;
    root.append(this.element);
  }

  bounce() {
    if (!this.isSmall) {
      this.active = !this.active;
      this.element.classList.toggle('bounce');
    }
  }

  grow() {
    this.element.classList.remove('small');
    this.isSmall = false;
  }
}
