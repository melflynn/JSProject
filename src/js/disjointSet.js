// class Node {
//   constructor(val = null) {
//     this.next = null;
//     this.prev = null;
//     this.val = val;
//   }

//   remove () {
//     prev_link = this.prev;
//     next_link = this.next;
//     prev_link.next = next_link;
//     next_link.prev = prev_link;
//   }
// }

// class LinkedList {
//   constructor () {
//     this.head = new Node();
//     this.tail = new Node();
//     this.head.next = this.tail;
//     this.tail.prev = this.head;
//   }

//   size () {
//     let count = 0;
//     let node = this.head.next;
//     while (node !== this.tail) {
//       count ++;
//       node = node.next;
//     }
//     return count;
//   }

//   isEmpty () {
//     if (this.head.next === this.tail) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   first () {
//     if (this.head.next === this.tail) {
//       return null;
//     } else {
//       return this.head.next;
//     }
//   }

//   last () {
//     if (this.tail.prev === this.head) {
//       return null;
//     } else {
//       return this.tail.prev;
//     }
//   }

//   add (val) {
//     let node = new Node(val);
//     node.next = this.tail;
//     if (this.isEmpty()) {
//       this.head.next = node;
//       node.prev = this.head;
//       this.tail.prev = node;
//     } else {
//       let last = this.last();
//       last.next = node;
//       node.prev = last;
//       this.tail.prev = node;
//     }
//   }

//   includes (val) {
//     let node = this.head.next;
//     while (node !== this.tail) {
//       if (node.val === val) {
//         return true;
//       } else {
//         node = node.next;
//       }
//     }
//     return false;
//   }

//   // find (i) {
//   //   let j = 0;
//   //   let found = false;
//   //   let node = this.head;
//   //   while (j < size) {
//   //     if ()
//   //   }
//   // }
// }

class DisjointSet {
  constructor () {
    this.parents = [];
    this.ranks = [];
    // this.items = [];
    // items.forEach((item) => {
    //   this.items.push(new LinkedList().add(item));
    // })
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

// let list = new LinkedList();
// // console.log(list.head.next === list.tail);
// // console.log(list.size());
// list.add('x');
// // console.log(list.first().val);
// // console.log(list.size());
// console.log(list.includes('y'));
// list.add('y');
// console.log(list.includes('y'));
// console.log(list.first().val);
// console.log(list.size());
// console.log(list.last().val);

// let set = new DisjointSet();
// set.makeSet('x');
// set.makeSet('y');
// // console.log(set.parents);
// // console.log(set.ranks);
// console.log(set.union('x','y'));
// console.log(set.union('x','y'));
// console.log(set.find('y'));
// console.log(set.find('x'));
// console.log(set.ranks);
// console.log(set.parents);

module.exports = DisjointSet;