'use strict';

class Field {
  constructor(options) {
    this._el = options.element;
    this._height = options.height;
    this._width = options.width;
    cells = this._generateCellsArray();
    start = null;
    finish = null;

    this.initField();
    this.clearVisitedFlags();//for correct work pathFinder

    this._pf = new PathFinder();
  }

  clearVisitedFlags() {
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        cells[i][j].isVisited = false;
      }
    }
  }

  initField() {
    this._generateField();
    this._renderField();
  }

  _renderField() {
    let field = document.getElementById('field-maze');
    if(field) {
      field.parentNode.removeChild(field);
    }

    field = document.createElement('div');
    field.className = 'field';
    field.id = 'field-maze';

    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        this._renderCell(cells[i][j], field);
      }
    }

    start.divElem.className += ' start';
    finish.divElem.className += ' finish';

    this._el.appendChild(field);
  }

  _renderCell(cell, parent) {
    let elem = document.createElement('div');

    if (cell.isWall) {
      elem.className = 'cell wall';
    } else {
      elem.className = 'cell';
    }
    elem.style.left = cell.i * 9 + 'px';
    elem.style.top = cell.j * 9 + 'px';
    elem.id = 'gridElement[' + cell.i + '][' + cell.j + ']';

    cell.divElem = elem;
    parent.appendChild(elem);
  }

  _generateCellsArray() {
    let arr = [];

    for (let i = 0; i < this._height; i++) {
      arr[i] = [];
      for (let j = 0; j < this._width; j++) {
        if (this._isEven(i, j)) {
          arr[i][j] = new Cell(false, i, j);
        } else {
          arr[i][j] = new Cell(true, i, j);
        }
      }
    }

    return arr;
  }

  _generateField() {
    let currentCell = cells[1][1];
    let stack = [];

    start = currentCell;
    currentCell.isVisited = true;

    while (!this._isAllVisited()) {
      let neighbours = this._getUnvisitedNeighbours(currentCell);
      if (neighbours.length > 0) {
        stack.push(currentCell);

        var nextCell = neighbours[this._getRandomNeighbour(neighbours)];
        this._removeWallBtw(currentCell, nextCell);

        currentCell = nextCell;
        currentCell.isVisited = true;
      } else if (stack.length != 0) {
        currentCell = stack.pop();
      }
    }
    //finish = nextCell;
    finish = cells[this._height - 2][this._width - 2];
  }

  _isAllVisited() {
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        if (!cells[i][j].isVisited && !cells[i][j].isWall) {
          return false;
        }
      }
    }

    return true;
  }


  _isEven(i, j) {
    return (i % 2 != 0 && j % 2 != 0);
  }

  _getUnvisitedNeighbours(cell) {
    let neighbours = [];
    let neighbour;

    neighbour = this._validateCell(cell.i - 2, cell.j);
    if (neighbour && this._isValidNeighbour(neighbour)) {
      neighbours.push(neighbour);
    }
    neighbour = this._validateCell(cell.i + 2, cell.j);
    if (neighbour && this._isValidNeighbour(neighbour)) {
      neighbours.push(neighbour);
    }
    neighbour = this._validateCell(cell.i, cell.j - 2);
    if (neighbour && this._isValidNeighbour(neighbour)) {
      neighbours.push(neighbour);
    }
    neighbour = this._validateCell(cell.i, cell.j + 2);
    if (neighbour && this._isValidNeighbour(neighbour)) {
      neighbours.push(neighbour);
    }

    return neighbours;
  }

  _validateCell(i, j) {
    let result;
    if (this._isInBounds(i, j)) {
      result = cells[i][j];
    } else {
      result = false;
    }

    return result;
  }

  _isValidNeighbour(neighbour) {
    return this._isInBounds(+neighbour.i, +neighbour.j) && !neighbour.isVisited;
  }

  _isInBounds(i, j) {
    return i > 0 && j > 0 && i < this._height && j < this._width;
  }

  _getRandomNeighbour(neighbours) {
    return Math.ceil(Math.random() * neighbours.length - 1);
  }

  _removeWallBtw(curCell, nextCell) {
    if (curCell.i === nextCell.i) {
      if (curCell.j < nextCell.j) {
        this._breakWall(curCell, 'right');
      } else {
        this._breakWall(curCell, 'left');
      }
    } else {
      if (curCell.i < nextCell.i) {
        this._breakWall(curCell, 'bot');
      } else {
        this._breakWall(curCell, 'top');
      }
    }
  }

  _breakWall(cell, side) {
    let i, j;

    switch (side) {
      case 'right':
        i = cell.i;
        j = cell.j + 1;
        break;
      case 'left':
        i = cell.i;
        j = cell.j - 1;
        break;
      case 'top':
        i = cell.i - 1;
        j = cell.j;
        break;
      case 'bot':
        i = cell.i + 1;
        j = cell.j;
        break;
    }

    cells[i][j].isWall = false;
    cells[i][j].isVisited = true;
  }

}