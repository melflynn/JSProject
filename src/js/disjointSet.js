class DisjointSet {
  constructor () {
    this.parents = [];
    this.ranks = [];
  }

  makeSet(x) {
    this.parents[x] = x;
    this.ranks[x] = 0;
  }

  find(x) {
    if (x !== this.parents[x]) {
      this.parents[x] = this.find(this.parents[x]);
    }
    return this.parents[x];
  }

  union(x, y) {
    const xRoot = this.find(x);
    const yRoot = this.find(y);

    if (xRoot === yRoot) {
      return false;
    } else if (this.ranks[xRoot] < this.ranks[yRoot]) {
      this.parents[xRoot] = yRoot;
    } else if (this.ranks[xRoot] > this.ranks[yRoot]) {
      this.parents[yRoot] = xRoot;
    } else {
      this.parents[yRoot] = xRoot;
      this.ranks[xRoot] += 1;
    }

    return true;
  }


}

module.exports = DisjointSet;