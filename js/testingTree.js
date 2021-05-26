let pather = [[0, 0, 1, 0, 0, 0, 0, 1, 1],
			        [0, 1, 1, 0, 0, 0, 1, 0, 1],
			        [0, 0, 0, 1, 1, 1, 0, 0, 0],
			        [0, 0, 1, 0, 2, 1, 0, 0, 0],
			        [0, 1, 1, 0, 0, 1, 0, 0, 0],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0],
			        [0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [0, 0, 0, 0, 0, 0, 1, 1, 0],
			        [1, 0, 0, 0, 0, 0, 1, 0, 0]];
let startPoint1 = [1, 2];
let startPoint2 = [1, 6];
let endPoint = [3, 4];
let path = [];
const movesBase = [[-1, 0],
                   [0, -1],
                   [0, +1],
                   [+1, 0]];
path.push(startPoint2);

function mover (start, end){
  const [x, y] = start;
  const [x0, y0] = end;
  const moves = ((x, y, x0, y0) => {
    switch (true) {
      case x <= x0 && y > y0:
        return [movesBase[3], movesBase[1], movesBase[0], movesBase[2]];
      case x > x0 && y >= y0: 
        return [movesBase[1], movesBase[0], movesBase[2], movesBase[3]];
      case x >= x0 && y < y0:
        return [movesBase[2], movesBase[0], movesBase[1], movesBase[3]];
      case x < x0 && y <= y0: 
        return [movesBase[2], movesBase[3], movesBase[1], movesBase[0]];
      default:
        return movesBase;
    }
  })(x, y, x0, y0);
  for (let k = 0; k < 4; k++) {
    let ex = x + moves[k][0];
    let ey = y + moves[k][1];
    if(ex < 0 || ex > 8 || 
       ey < 0 || ey > 8 || 
       pather[ex][ey] == 1) continue;
    if(ifIncludes(path, [ex, ey])) {console.log('the fuck'); continue;}
    if(pather[ex][ey] == 0){
      path.push([x,y]);
     // console.log(ex, ey, path);
      mover([ex,ey], end);
    }
    if(pather[ex][ey] == 2){
      path.push([ex, ey]);
      return;
    }
    if(ifIncludes(path, [end[0], end[1]])) return;
  }
  console.log(path);
  if(ifIncludes(path, [end[0], end[1]])) console.log("can't move there");

}
function ifIncludes(srch, val){
  for (let i = 0; i < srch.length; i++) {
    if(srch[i][0] === val[0] && srch[i][1] === val[1]) return true;
  }
  return false;
}
mover(startPoint1, endPoint);