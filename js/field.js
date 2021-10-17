import { BaseComponent } from './base-component.js';
import { Cell } from './cell.js';
import { random } from './constants.js';

import { astar } from './astar.js';
import { Graph } from './paths/graph.js';

export class Field extends BaseComponent {
  gameField = [];
  emptyCells = 81;
  lastCell = null;
  tempForOverlapsedSmallBall = null;
  isGameStarted = false;

  constructor(root) {
    super('div', ['grid']);
    this.element.id = 'game-field';
    root.append(this.element);

    this.element.addEventListener('click', (event) => {
      const target = event.target.closest('.cell');
      if (target) this.clickHanler(target);
    });
    this.createField();
  }

  createField() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.gameField.push(new Cell(i, j, this.element));
      }
    }
    this.createFieldsBalls(5, false);
    this.createFieldsBalls();
    this.isGameStarted = true;
  }

  createFieldsBalls(amount = 3, isSmall = true) {
    for (let i = 0; i < amount;) {
      if (this.emptyCells < 3) break;
      const coordinate = random(81);
      if (!this.gameField[coordinate].ball) {
        this.gameField[coordinate].createBall(isSmall);
        this.emptyCells--;
        i++;
      }
    }
    if (this.isGameStarted) this.checkIfBallsLined();
  }

  clickHanler(target) {
    //target is always HTML cell
    const cell = this.gameField.find((cell) => cell.element === target);
    // 1
    if (cell.ball === null) {
      // 5
      if (this.lastCell !== null) {
        // 6; replace true with movement avalibility function
        // SAME AS 7
        const trajectory = this.launchMaze(this.lastCell, cell);
        console.log(trajectory)
        if (trajectory.length > 0) {
              this.handleMovingBalls1(this.transformTrajectory(trajectory));
          // this.handleMovingBalls(cell);
        } else {
          // NOT SURE
          this.lastCell.ball.bounce();
          this.lastCell = null;
        }
      }
    } else {
      // 2
      if (cell.ball.isSmall) {
        if (this.lastCell === null) return;
        // 7; replace true with movement avalibility function
        if (true) {
          this.handleMovingBalls(cell, true);
        }
      } else {
        // 3
        if (this.lastCell !== null) {
          // 4
          if (this.lastCell === cell) {
            cell.ball.bounce();
            this.lastCell = null;
          } else {
            this.lastCell.ball.bounce();
            cell.ball.bounce();
            this.lastCell = cell;
          }
        } else {
          cell.ball.bounce();
          this.lastCell = cell;
        }
      }
    }
  }

  findCellsWithSmallBalls() {
    return this.gameField
      .filter((cell) => cell.ball !== null && cell.ball.isSmall);
  }

  handleMovingBalls(cell, onSmallBall = false) {
    this.lastCell.ball.bounce();
    if (onSmallBall) {
      this.tempForOverlapsedSmallBall = { lastCell: cell, color: cell.ball.color };
      cell.clear();
    }
    this.moveBall(this.lastCell, cell);
    this.lastCell = null;
    // CHECK IF SMTH LINED
    if (!this.checkIfBallsLined()) {
      this.findCellsWithSmallBalls().forEach((cell) => cell.ball.grow());
      this.createFieldsBalls();
    }
  }

  handleMovingBalls1(traj, onSmallBall = false) {
    this.lastCell.ball.bounce();
    traj.forEach((e) => {      
        this.moveBall(this.lastCell, e);
        this.lastCell = e;
        // TODO: Hadle stepping on small balls
    });
    this.lastCell = null;
    // if (onSmallBall) {
    //   this.tempForOverlapsedSmallBall = { lastCell: cell, color: cell.ball.color };
    //   cell.clear();
    // }

    // this.moveBall(this.lastCell, cell);
    // this.lastCell = null;
    // CHECK IF SMTH LINED
    if (!this.checkIfBallsLined()) {
      this.findCellsWithSmallBalls().forEach((cell) => cell.ball.grow());
      this.createFieldsBalls();
    }
  }

  checkIfBallsLined() {
    for (let i = 0; i < 9; i++) {
      const row = this.gameField.filter((cell) => cell.row === i);
      const column = this.gameField.filter((cell) => cell.column === i);
      const diag = this.gameField.filter((cell) => {
        if (cell.row + cell.column === i + 4) return cell;
      });
      const diagReverse = this.gameField.filter((cell) => {
        if (cell.column - cell.row === i - 4) return cell;
      });
      if ([row, column, diag, diagReverse]
        .some((e) => this.checkLine(e))) return true;
    }
    return false;
  }

  checkLine(line) {
    let matching = [];
    let currentCode = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i].ball !== null && !line[i].ball.isSmall) {
        if (currentCode !== 0) {
          if (currentCode !== line[i].ball.code) {
            if (matching.length >= 5) return this.destroyMatched(matching);
            matching = [];
          }
        }
        matching.push(line[i]);
        currentCode = line[i].ball.code;
      } else {
        if (matching.length >= 5) return this.destroyMatched(matching);
        else {
          currentCode = 0;
          matching = [];
        }
      }
    }
    return matching.length >= 5 ? this.destroyMatched(matching) : false;
  }

  destroyMatched(matching) {
    console.log(matching);
    matching.forEach((cell) => cell.burnBall());
    this.emptyCells += matching.length;
    return true;
  }

  moveBall(source, destination) {
    const ball = source.transfer;
    destination.transfer = ball;
  }


  launchMaze({ row: startRow, column: startCol }, { row: endRow, column: endCol }) {
    const graph = new Graph(this.transormField());
    const start = graph.grid[startRow][startCol];
    const end = graph.grid[endRow][endCol];
    return astar.search(graph, start, end);
  }

  transormField() {
    const arr = Array.from({ length: 9}, (e) => []);
    
    this.gameField.forEach((e) => {
      const { ball, row } = e;
      if (ball === null || ball.isSmall) arr[row].push(1);
      else arr[row].push(0);
    });
    return arr;
  }

  transformTrajectory(traj) {
    return traj.map(({ x: row, y: column }) => this.gameField.find((e) => e.row === row && e.column === column));
  }
}
