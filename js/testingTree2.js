let maze1 = [[0, 0, 1, 0, 0, 0, 0, 1, 1],
			        [0, 1, 1, 0, 0, 0, 1, 0, 1],
			        [0, 0, 0, 1, 1, 1, 0, 0, 0],
			        [0, 0, 1, 0, 2, 1, 0, 0, 0],
			        [0, 1, 1, 0, 0, 1, 0, 0, 0],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0],
			        [0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [0, 0, 0, 0, 0, 0, 1, 1, 0],
              [1, 0, 0, 0, 0, 0, 1, 0, 0]];
let maze = [[0, 0, 1, 0, 0, 0, 0, 1, 1],
			        [0, 1, 1, 0, 0, 0, 1, 0, 1],
			        [0, 0, 0, 0, 0, 1, 0, 0, 0],
			        [0, 0, 1, 0, 2, 1, 0, 0, 0],
			        [0, 1, 1, 0, 1, 1, 0, 0, 0],
			        [1, 0, 0, 0, 0, 0, 0, 0, 0],
			        [0, 0, 0, 0, 0, 0, 0, 0, 1],
			        [0, 0, 0, 0, 0, 0, 1, 1, 0],
			        [1, 0, 0, 0, 0, 0, 1, 0, 0]];
let startPoint1 = [1, 2];
let startPoint2 = [1, 6];
let startPoint3 = [4, 4];
let endPoint = [3, 4];
const movesBase = [[0, -1],[-1, 0],[+1, 0],[0, +1]];
const movesBase1 = [[0, -1],
                   [-1, 0],
                   [+1, 0],
                   [0, +1]];
const SolveShort = (startPoint, exitPoint) => {
  for (let i = 0; i <9; i++) {
    console.log(' ' + maze[i]);
    
  }
   
    class Node {
      constructor (point, value) {
        this.forward = null;
        this.backward = null;
        this.right = null;
        this.left = null;
        this.value = value;
        this.point = point;
      }
    }
  
    class Tree {
      constructor () {
        this.root = null;
      }
  
      grow (pos, maze, track, currentNode) {
        const [x, y] = pos.point;
        const [ex, ey] = exitPoint;
        const moves = ((x, y, ex, ey) => {
          switch (true) {
            case ey < y && ex > x:
              return [movesBase[0], movesBase[2], movesBase[1], movesBase[3]];
            case ey < y && ex < x: 
              return [movesBase[0], movesBase[1], movesBase[3], movesBase[2]];
  
            case ey > y && ex > x:
              return [movesBase[3], movesBase[2], movesBase[0], movesBase[1]];
            case ey > y && ex < x: 
              return [movesBase[3], movesBase[1], movesBase[2], movesBase[0]];
  
            case ex === x && ey > y:
              return [movesBase[3], movesBase[1], movesBase[2], movesBase[0]];
            case ex === x && ey < y:
              return [movesBase[0], movesBase[1], movesBase[2], movesBase[3]];
  
            case ey === y && ex > x:
              return [movesBase[2], movesBase[0], movesBase[3], movesBase[1]];
            case ey === y && ex < x:
              return [movesBase[1], movesBase[0], movesBase[3], movesBase[2]];
  
            default:
              return movesBase;
          }
        })(x, y, ex, ey);
        console.log(x, y, ex, ey, '' + moves)
        if (track.length === 1) {
          this.root = startPose;
          currentNode = this.root;
        }
        const path = moves.map(([xMove, yMove]) => [x + xMove, y + yMove]);
        console.log('path: ', '' + path);
        const filter = path.filter((path) => {
          if (path[0] > 8 || path[0] < 0 || path[1] > 8 ||
                          path[1] < 0 || maze[path[0]][path[1]] === 1) {
            return false;
          }
          if (maze[path[0]][path[1]] === 2) {
              console.log('pervy');
            this.addTwo(pos, path, currentNode, maze);
            return false;
          }
          return track.findIndex(index => index[0] === path[0] && index[1] === path[1]) === -1;
        });
        console.log('filter: ', '' + filter);
        const nodeArr = filter.map(pos => {
            console.log('vtoroy');
          const node = new Node(pos, maze[pos[0]][pos[1]]);
          if (maze[pos[0]][pos[1]] !== 2) {
            track.push(pos);
          }
          return node
        });
        nodeArr.forEach((position, index) => {
          if (index === 1) {
            const index = track.findIndex(index => index[0] === position.point[0] && index[1] === position.point[1]);
            track = track.slice(0, index + 1);
          }
          console.log('this encounter');
          switch (true) {
            case position.point[0] < pos.point[0]:
              currentNode.left = position;
              this.grow(position, maze, track, currentNode.left);
              break;
            case position.point[0] > pos.point[0]:
              currentNode.right = position;
              this.grow(position, maze, track, currentNode.right);
              break;
            case position.point[1] < pos.point[1]:
              currentNode.forward = position;
              this.grow(position, maze, track, currentNode.forward);
              break;
            case position.point[1] > pos.point[1]:
              currentNode.backward = position;
              this.grow(position, maze, track, currentNode.backward);
              break;
            default:
          }
        });
      }
  
      addTwo (pos, path, currentNode, maze) {
          console.log('peace');
        const node = new Node(path, maze[path[0]][path[1]]);
        switch (true) {
          case path[0] < pos.point[0]:
            currentNode.left = node;
            break;
          case path[0] > pos.point[0]:
            currentNode.right = node;
            break;
          case path[1] < pos.point[1]:
            currentNode.forward = node;
            break;
          case path[1] > pos.point[1]:
            currentNode.backward = node;
            break;
          default:
        }
      }
      
      dfsShort (node, arr, shortestPath) {
        console.log('shit');
        arr.push([node.value, node.point]);
        if (node.value === 2) {
          shortestPath.push([...arr]);
        }
        if (node.forward) {
          this.dfsShort(node.forward, arr, shortestPath);
        }
        if (node.backward) {
          this.dfsShort(node.backward, arr, shortestPath);
        }
        if (node.right) {
          this.dfsShort(node.right, arr, shortestPath);
        }
        if (node.left) {
          this.dfsShort(node.left, arr, shortestPath);
        }
        arr.pop()
        if (!arr.length) {
          return shortestPath;
        }
        console.log('got reel');
      }
      
    }
    const startPose = new Node([startPoint[0], startPoint[1]], maze[startPoint[0]][startPoint[1]]);
    const tree = new Tree();
    tree.grow(startPose, maze, [[startPoint[0], startPoint[1]]]);
    console.log('tree');
    const short = tree.dfsShort(tree.root, [], []);
    console.log('fail');
    const shortest = short => (short.length) ? short.sort((a, b) => a.length - b.length)[0] : false;
    if (shortest(short) == false) return false;
    else{
      trajectory = [];
      for (let i = 0; i < shortest(short).length; i++) {
        trajectory.push(shortest(short)[i][1]);
        
      }
      console.log('shiiit');
      return true;
    }
}
SolveShort(startPoint3, endPoint);