export class Cell {
  row;

  column;

  cell;

  constructor(i, j) {
    this.row = i;
    this.column = j;
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => game(i * 10 + j))
    // cell.setAttribute("onclick", `game(${i}${j})`); // DELETE after adding event lisner
    const figure = document.createElement('figure');
    figure.id = i + '' + j;
    // figure.className = '';
    cell.appendChild(figure);
    window['game-field'].appendChild(cell);
    console.log('BUMP');
  }
}