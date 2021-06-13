import { Game } from './js/game.js';

window.onload = () => {
  const game = new Game();
};

// function add(amount = 3, forceNew = false, overColor = 1) {
//   let row, col, size, temp;
//   if (forceNew || amount == 5) size = 1;
//   else size = 0;
//   let emptyCounter = 0;
//   for (let i = 0; i < 9; i++) {
//     emptyCounter += field[i].reduce((counter, elem) => { return elem == null ? ++counter : counter; }, 0);
//   }
//   if (emptyCounter < 3) return 0;
//   do {
//     do {
//       row = getRandom(0, 9);
//       col = getRandom(0, 9);
//     } while (field[row][col] != null);
//     if (forceNew == false) var color = COLOR_PALETTE[getRandom(0, 7)];
//     else color = overColor;
//     temp = new Ball(row, col, color, size);
//     temp.create();
//     temp.state = false;
//     amount--;
//   } while (amount > 0);
// }

// function enlarge() {
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       let temp = field[i][j];
//       if (temp != null) {
//         if (temp.size == 0) {
//           temp.grow();
//         }
//       }
//     }
//   }
// }

// function check() {
//   let h = horizontal();
//   let v = vertical();
//   let d = diagonal();
//   return h || v || d ? true : false;
// }

// function horizontal() {
//   let counter = 1;
//   let state = false;
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 5; j++) {
//       if (field[i][j] != null && field[i][j].size != 0) {
//         for (let k = j + 1; k < 9 && counter < 9; k++) {
//           if (field[i][k] == null || field[i][k].size == 0) break;
//           else if (field[i][j].color == field[i][k].color) counter++;
//           else break;
//         }
//       }
//       if (counter > 4) {
//         score += counter * (counter - 4);
//         destroy(i, j, counter, 1);
//         state = true;
//       }
//       counter = 1;
//     }
//     counter = 1;
//   }
//   return state;
// }

// function vertical() {
//   let counter = 1;
//   let state = false;
//   for (let j = 0; j < 9; j++) {
//     for (let i = 0; i < 5; i++) {
//       if (field[i][j] != null && field[i][j].size != 0) {
//         for (let k = i + 1; k < 9 && counter < 9; k++) {
//           if (field[k][j] == null || field[k][j].size == 0) break;
//           else if (field[i][j].color == field[k][j].color) counter++;
//           else break;
//         }
//       }
//       if (counter > 4) {
//         score += counter * (counter - 4);
//         destroy(i, j, counter, 2);
//         state = true;
//       }
//       counter = 1;
//     }
//     counter = 1;
//   }
//   return state;
// }

// function diagonal() {
//   let counter = 1;
//   let state = false;
//   // \
//   for (let i = 0, j = 4, sum = 4; sum < 9; i++, j++) {
//     if (j > 4) {
//       sum++;
//       i = -1;
//       j = 8 - sum - 1;
//       continue;
//     }
//     if (field[i][j] != null && field[i][j].size != 0) {
//       for (let k = i + 1, l = j + 1; k < 9 && l < 9 && counter < 10; k++, l++) {
//         if (field[k][l] == null || field[k][l].size == 0) break;
//         else if (field[i][j].color == field[k][l].color) counter++;
//         else break;
//       }
//     }
//     if (counter > 4) {
//       score += counter * (counter - 4);
//       destroy(i, j, counter, 3);
//       state = true;
//     }
//     counter = 1;
//   }
//   for (let i = 4, j = 0, sum = 4; sum < 8; i--, j--) {
//     if (j < 0) {
//       sum++;
//       i = 5;
//       j = sum - 4 + 1;
//       continue;
//     }
//     if (field[i][j] != null && field[i][j].size != 0) {
//       for (let k = i + 1, l = j + 1; k < 9 && l < 9 && counter < 10; k++, l++) {
//         if (field[k][l] == null || field[k][l].size == 0) break;
//         else if (field[i][j].color == field[k][l].color) counter++;
//         else break;
//       }
//     }
//     if (counter > 4) {
//       score += counter * (counter - 4);
//       destroy(i, j, counter, 3);
//       state = true;
//     }
//     counter = 1;
//   }

//   counter = 1;
//   //Reverse diagonal '/'
//   for (let i = 0, j = 4, sum = 4; sum < 9; i++, j--) {
//     if (i > j) {
//       sum++;
//       i = -1;
//       j = sum - i;
//       continue;
//     }
//     if (field[i][j] != null && field[i][j].size != 0) {
//       for (let k = i + 1, l = j - 1; k < 9 && l >= 0 && counter < 10; k++, l--) {
//         if (field[k][l] == null || field[k][l].size == 0) break;
//         else if (field[i][j].color == field[k][l].color) counter++;
//         else break;
//       }
//     }
//     if (counter > 4) {
//       score += counter * (counter - 4);
//       destroy(i, j, counter, 4);
//       state = true;
//     }
//     counter = 1;
//   }
//   for (let i = 1, j = 8, sum = 9; sum < 13; i++, j--) {
//     if (i > j) {
//       sum++;
//       j = 9;
//       i = sum - j;
//       continue;
//     }
//     if (field[i][j] != null && field[i][j].size != 0) {
//       for (let k = i + 1, l = j - 1; k < 9 && l >= 0 && counter < 10; k++, l--) {
//         if (field[k][l] == null || field[k][l].size == 0) break;
//         else if (field[i][j].color == field[k][l].color) counter++;
//         else break;
//       }
//     }
//     if (counter > 4) {
//       score += counter * (counter - 4);
//       destroy(i, j, counter, 4);
//       state = true;
//     }
//     counter = 1;
//   }
//   return state;
// }

// function destroy(row, col, length, direction) {
//   displayScore();
//   while (length != 0) {
//     console.log('destroyed', row, col);
//     console.log('Length', length);
//     console.log('OBJ', field[row][col]);
//     field[row][col].delete();

//     switch (direction) {
//       case 1:
//         col++;
//         break;
//       case 2:
//         row++;
//         break;
//       case 3:
//         row++;
//         col++;
//         break;
//       case 4:
//         row++;
//         col--;
//         break;
//     }
//     length--;
//   }
// }

// function displayScore() {
//   let displayer = `000${score}`.slice(-4);
//   let dsp = ["one", "two", "three", "four"];
//   for (let i = 0; i < 4; i++) {
//     document.getElementById(dsp[i]).textContent = displayer[i];
//   }
// }

/** New features
 * - First drag ball, the explode + Explosion effect
 * - Add event listner instead of onlick => script always running
 * - Game over
 * - Start over
 * - Hard option: forbid path though other balls
 * https://talkwondo.github.io/the-maze-gunner/
 * https://levelup.gitconnected.com/finding-the-real-shortest-path-in-javascript-depth-first-search-93a3ce514250
 **/