class Cell {
  constructor(isWall, i, j) {
    this.isWall = isWall;
    this.i = i;
    this.j = j;
    this.isVisited = false;
    this.divElem = null;
  }
}