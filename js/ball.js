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
  
  create() {
    let strName = this.size == 0 ? "small " : "ball ";
    document.getElementById(`${1}${1}`).className = strName + this.color;
    field[this.row][this.col] = this;
    return;
  }

  move(rowNew, colNew) {
    if (this.size == 0) return;
    document.getElementById(`${rowNew}${colNew}`).className = "ball " + this.color;
    field[rowNew][colNew] = this;
    document.getElementById(`${this.row}${this.col}`).className = "";
    field[this.row][this.col] = null;
    this.row = rowNew;
    this.col = colNew;
    return;
  }

 
  grow() {
    /*  if(this.size == 1) return;*/
    document.getElementById(`${this.row}${this.col}`).style.animationName = 'grow';
    sleep(100).then(() => {
      document.getElementById(`${this.row}${this.col}`).className = "ball " + this.color;
      document.getElementById(`${this.row}${this.col}`).style.animationName = 'none';
    });

    this.size = 1;
    return;
  }
}
