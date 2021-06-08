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
  }

  createField() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.gameField.push(new Cell(i, j, this.element));
      }
    }
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
      }
    }
  }
  gameLogic2(target) {
  let row = +`0${cell}`.slice(-2)[0];
  let col = +`0${cell}`.slice(-2)[1];
  let curBall = field[row][col];
  if(lastCell == undefined){
    if(curBall == null || curBall.size == 0) return;
    else{
      curBall.bounce();
      lastCell = [row, col];
      return;
    }
  }
  //smth is active
  else{
    if(curBall == null){
      if(!SolveShort([lastCell[1], lastCell[0]], [col, row])) return; //Checks if movemnt is possible
      field[lastCell[0]][lastCell[1]].bounce().move(row,col);
      lastCell = undefined;
      if(!check()) {
        enlarge();
        if(tempClr != undefined) {
          add(1, true, tempClr);
          tempClr = undefined;
        }
        add();
      }
      check();
      return; 
    }
    else{
      if(curBall.size == 0){
        if(!SolveShort([lastCell[1], lastCell[0]], [col, row])) return; //Checks if movemnt is possible
        tempClr = curBall.color;
        curBall = null;
        let temp = field[lastCell[0]][lastCell[1]];
        temp.bounce().move(row,col);
        lastCell = undefined;
        if(!check()){
          add(1, true, tempClr);
          enlarge();
          add();
        }
        else{
          curBall = new Ball(row, col, tempClr, 0);
          curBall.create();
        }
        check();
        return;
      }
      else{
        if(lastCell[0] != row || lastCell[1] != col){
          curBall.bounce();
          field[lastCell[0]][lastCell[1]].bounce();
          lastCell[0] = row;
          lastCell[1] = col;
          return;
        }
        else{
          curBall.bounce();
          lastCell = undefined;
          return;
        }
      }
    }
  }
  }

  moveBall(source, destination) {
    const ball = source.transfer;
    destination.transfer = ball;
  }
}