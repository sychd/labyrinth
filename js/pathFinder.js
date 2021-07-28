class PathFinder {
  constructor() {
    this._clearPath();
    this._getPath();
  }


  _clearPath() {
    for (let i = 0; i < way.length; i++) {
      way[i].divElem.style.backgroundColor = 'greenyellow';
    }
    way = [];
  }

  _getPath() {


    let stack = [];
    let currentCell = start;
    currentCell.isVisited = true;
    // this._clearVisitedFlags();

    while (currentCell !== finish) {
      let directions = this._getDirections(currentCell);

      if (directions.length > 0) {
        stack.push(currentCell);
        let nextCell = directions[this._getRandomWay(directions)];
        this._buildWay(currentCell, nextCell);
        currentCell = nextCell;
        currentCell.isVisited = true;
      } else if (stack.length != 0) {
        currentCell = stack.pop();

        way.pop();
        way.pop();// pop wrong step (cell & pseudowall)
      } else {
        console.log('no exit.');
        break;
      }
    }

    start.divElem.style.backgroundColor = 'blue';
    finish.divElem.style.backgroundColor = 'red';
  }

  _buildWay(curCell, nextCell) {
    way.push(nextCell);
    if (curCell.i === nextCell.i) {
      if (curCell.j < nextCell.j) {         //right
        way.push(cells[curCell.i][curCell.j + 1]);
      } else {                              //left
        way.push(cells[curCell.i][curCell.j - 1]);
      }
    } else {
      if (curCell.i < nextCell.i) {         //bot
        way.push(cells[curCell.i + 1][curCell.j]);
      } else {                              //top
        way.push(cells[curCell.i - 1][curCell.j]);
      }
    }
  }

  _getRandomWay(ways) {
    return Math.ceil(Math.random() * ways.length - 1);
  }

  _getDirections(cell) {
    let neighbours = [];
    if (!cells[cell.i][cell.j + 1].isWall) {
      ;
      if (!cells[cell.i][cell.j + 2].isVisited) {
        neighbours.push(cells[cell.i][cell.j + 2]);
      }
    }
    if (!cells[cell.i][cell.j - 1].isWall) {
      if (!cells[cell.i][cell.j - 2].isVisited) {
        neighbours.push(cells[cell.i][cell.j - 2]);
      }
    }
    if (!cells[cell.i + 1][cell.j].isWall) {
      if (!cells[cell.i + 2][cell.j].isVisited) {
        neighbours.push(cells[cell.i + 2][cell.j]);
      }
    }
    if (!cells[cell.i - 1][cell.j].isWall) {
      if (!cells[cell.i - 2][cell.j].isVisited) {
        neighbours.push(cells[cell.i - 2][cell.j]);
      }
    }

    return neighbours;
  }


}