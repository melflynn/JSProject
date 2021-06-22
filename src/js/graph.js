class Graph {
  constructor (rowCount, colCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.grid = new Array(rowCount).fill(new Array(colCount).fill(0));
    this.AdjacencyCellList = new Map();
    // this.AdjacencyWallList = new Map();
    this.buildAdjacencyCellList();
    // this.buildAdjacencyWallList();
  }

  buildAdjacencyCellList () {
    this.grid.forEach((row, rowNum) => {
      row.forEach((col, colNum) => {
        this.AdjacencyCellList.set([rowNum, colNum], [[rowNum - 1, colNum], [rowNum + 1, colNum], [rowNum, colNum - 1], [rowNum, colNum + 1]]);
      })
    })
  }

  // buildAdjacencyWallList () {
  //   this.grid.forEach((row, rowNum) => {
  //     row.forEach((col, colNum) => {
  //       this.AdjacencyWallList.set([])
  //     })
  //   })
  // }

  // addVertex (v) {
  //   this.AdjacencyList.set(v, []);
  // }

  // addEdge (v1, v2) {
  //   this.AdjacencyList.get(v1).push(v2);
  //   this.AdjacencyList.get(v2).push(v1);
  // }
}

// g = new Graph(4);
// for (let i = 0; i < 4; i++) {
//   g.addVertex(i);
// }
// g.addEdge(0,1);
// g.addEdge(1,3);
// g.addEdge(0,2);
// g.addEdge(2,3);
// console.log(g);

// g = new Graph(4, 4);
// console.log(g.grid, g.AdjacencyCellList);
// console.log(Object.values(g.AdjacencyCellList));

module.exports = Graph;