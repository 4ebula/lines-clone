const createGameField = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let _div = document.createElement('div');
      _div.className = 'cell';
      _div.setAttribute("onclick", `game(${i}${j})`); // DELETE after adding event lisner
      let _figure = document.createElement('figure');
      _figure.id = i + '' + j;
      _figure.className = '';
      _div.appendChild(_figure);
      window['game-field'].appendChild(_div);
    }
  }
};
createGameField();