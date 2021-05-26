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
const SolveShort = (maze, startPoint, exitPoint) => {
  
  class Node {
    constructor (point, value) {
      this.left = null;
      this.right = null;
      this.forward = null;
      this.backward = null;
      this.value = value;
      this.point = point;
    }
  }

  class Tree {
    constructor () {
      this.root = null;
    }

    grow (pos, maze, track, currentNode) {
      const [y, x] = pos.point;
      const [ey, ex] = exitPoint;
      const moves = ((y, x, ey, ex) => {
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
      })(y, x, ey, ex);
      if (track.length === 1) {
        this.root = startPose;
        currentNode = this.root;
      }
      const path = moves.map(([yMove, xMove]) => [y + yMove, x + xMove]);
      const filter = path.filter((path) => {
        if (path[0] > 8 || path[0] < 0 || path[1] > 8 ||
                        path[1] < 0 || maze[path[0]][path[1]] === 1) {
          return false;
        }
        if (maze[path[0]][path[1]] === 2) {
          this.addTwo(pos, path, currentNode, maze);
          return false;
        }
        return track.findIndex(index => index[0] === path[0] && index[1] === path[1]) === -1;
      });
      const nodeArr = filter.map(pos => {
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
        switch (true) {
          case position.point[0] < pos.point[0]:
            currentNode.backward = position;
            this.grow(position, maze, track, currentNode.backward);
            break;
          case position.point[0] > pos.point[0]:
            currentNode.forward = position;
            this.grow(position, maze, track, currentNode.forward);
            break;
          case position.point[1] < pos.point[1]:
            currentNode.left = position;
            this.grow(position, maze, track, currentNode.left);
            break;
          case position.point[1] > pos.point[1]:
            currentNode.right = position;
            this.grow(position, maze, track, currentNode.right);
            break;
          default:
        }
      });
    }

    addTwo (pos, path, currentNode, maze) {
      const node = new Node(path, maze[path[0]][path[1]]);
      switch (true) {
        case path[0] < pos.point[0]:
          currentNode.backward = node;
          break;
        case path[0] > pos.point[0]:
          currentNode.forward = node;
          break;
        case path[1] < pos.point[1]:
          currentNode.left = node;
          break;
        case path[1] > pos.point[1]:
          currentNode.right = node;
          break;
        default:
      }
    }

    dfsShort (node, arr, shortestPath) {
      arr.push([node.value, node.point]);
      if (node.value === 2) {
        shortestPath.push([...arr]);
      }
      if (node.left) {
        this.dfsShort(node.left, arr, shortestPath);
      }
      if (node.right) {
        this.dfsShort(node.right, arr, shortestPath);
      }
      if (node.forward) {
        this.dfsShort(node.forward, arr, shortestPath);
      }
      if (node.backward) {
        this.dfsShort(node.backward, arr, shortestPath);
      }
      arr.pop()
      if (!arr.length) {
        return shortestPath;
      }
    }
  }
  const startPose = new Node([startPoint[0], startPoint[1]], maze[startPoint[0]][startPoint[1]]);
  const tree = new Tree();
  tree.grow(startPose, maze, [[startPoint[0], startPoint[1]]]);
  const short = tree.dfsShort(tree.root, [], []);
  const shortest = short => (short.length) ? short.sort((a, b) => a.length - b.length)[0] : false;
  if (shortest(short) == false) return false;
  else{
    path = [];
    for (let i = 0; i < shortest(short).length; i++) {
      path.push(shortest(short)[i][1]);
      
    }
  }
  console.log(path);
}

SolveShort(pather, startPoint2, endPoint);