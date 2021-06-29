class Graph {
  constructor (colCount, rowCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.grid = new Array(rowCount).fill(new Array(colCount).fill(0));
    this.AdjacencyCellList = new Map();
    this.buildAdjacencyCellList();
  }

  buildAdjacencyCellList () {
    this.grid.forEach((row, rowNum) => {
      row.forEach((col, colNum) => {
        this.AdjacencyCellList.set([rowNum, colNum], [[rowNum - 1, colNum], [rowNum + 1, colNum], [rowNum, colNum - 1], [rowNum, colNum + 1]]);
      })
    })
  }
}

module.exports = Graph;