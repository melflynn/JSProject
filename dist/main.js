/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Maze = __webpack_require__(/*! ./js/mazeGenerator */ \"./src/js/mazeGenerator.js\");\nconst Player = __webpack_require__(/*! ./js/player */ \"./src/js/player.js\");\nconst Game = __webpack_require__(/*! ./js/game */ \"./src/js/game.js\");\nconst Flashlight = __webpack_require__(/*! ./js/flashlight */ \"./src/js/flashlight.js\");\n\nconst map = new Maze(10, 10);\nmap.kruskal();\nconst player = new Player(map);\nconst flashlight = new Flashlight(map, player);\n\nconst gameView = new Game(map, player, flashlight);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/disjointSet.js":
/*!*******************************!*\
  !*** ./src/js/disjointSet.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DisjointSet {\n  constructor () {\n    this.parents = [];\n    this.ranks = [];\n  }\n\n  makeSet(x) {\n    this.parents[x] = x;\n    this.ranks[x] = 0;\n  }\n\n  find(x) {\n    if (x !== this.parents[x]) {\n      this.parents[x] = this.find(this.parents[x]);\n    }\n    return this.parents[x];\n  }\n\n  union(x, y) {\n    const xRoot = this.find(x);\n    const yRoot = this.find(y);\n\n    if (xRoot === yRoot) {\n      return false;\n    } else if (this.ranks[xRoot] < this.ranks[yRoot]) {\n      this.parents[xRoot] = yRoot;\n    } else if (this.ranks[xRoot] > this.ranks[yRoot]) {\n      this.parents[yRoot] = xRoot;\n    } else {\n      this.parents[yRoot] = xRoot;\n      this.ranks[xRoot] += 1;\n    }\n\n    return true;\n  }\n\n\n}\n\nmodule.exports = DisjointSet;\n\n//# sourceURL=webpack:///./src/js/disjointSet.js?");

/***/ }),

/***/ "./src/js/flashlight.js":
/*!******************************!*\
  !*** ./src/js/flashlight.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Ray = __webpack_require__(/*! ./ray */ \"./src/js/ray.js\");\nconst dist = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n\nclass Flashlight {\n  constructor (map, player) {\n    this.map = map;\n    this.player = player;\n    // const ctx = map.canvasEl.getContext('2d');\n    this.rays = [];\n    // this.calculateRays(ctx);\n    // this.lightMaze(ctx);\n  }\n\n  calculateRays () {\n    const ctx = this.map.canvasEl.getContext('2d');\n    this.rays = [];\n    this.map.walls.forEach(wall => {\n      const ray1Pos = [this.player.pos, wall.startPos];\n      let intersects = false;\n      let i = 0;\n      while (!intersects && i < this.map.walls.length) {\n        const otherWall = this.map.walls[i];\n        // if (otherWall !== wall) {\n          let x1 = ray1Pos[0][0];\n          let x2 = ray1Pos[1][0];\n          let x3 = otherWall.startPos[0];\n          let x4 = otherWall.endPos[0];\n          let y1 = ray1Pos[0][1];\n          let y2 = ray1Pos[1][1];\n          let y3 = otherWall.startPos[1];\n          let y4 = otherWall.endPos[1];\n          let det = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));\n          let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;\n          let u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / det;\n          if ((t > 0 && t < 1) && (u > 0 && u < 1)) {\n            intersects = true;\n          }\n        // }\n        i++;\n      }\n      if (!intersects) {\n        let j = 0;\n        while (!intersects && j < this.rays.length) {\n          const ray = this.rays[j];\n          if (!(ray.endPos[0] === ray1Pos[1][0] && ray.endPos[1] === ray1Pos[1][1])) {\n            // debugger;\n            let rayLength = dist(ray.startPos, ray.endPos);\n            let ray1Length = dist(ray1Pos[0], ray1Pos[1]);\n            let rayDist = dist(ray.endPos, ray1Pos[1]);\n            if (ray1Length > rayLength) {\n              if (Math.abs(ray1Length - (rayLength + rayDist)) < Math.abs(0.01)) {\n                intersects = true;\n              }\n            } else {\n              if (Math.abs(rayLength - (ray1Length + rayDist)) < Math.abs(0.01)) {\n                this.rays.splice(this.rays.indexOf(ray), 1, new Ray(this.player.pos, wall.startPos, ctx))\n                intersects = true;\n              }\n            }\n          } else {\n            intersects = true;\n          }\n          j++;\n        }\n\n        if (!intersects) {\n          let ray = new Ray(this.player.pos, wall.startPos, ctx)\n          if (!this.rays.includes(ray)) {\n            this.rays.push(ray);\n          }\n        }\n      }\n        \n      const ray2Pos = [this.player.pos, wall.endPos];\n      intersects = false;\n      i = 0;\n      while (!intersects && i < this.map.walls.length) {\n        const otherWall = this.map.walls[i];\n        // if (otherWall !== wall) {\n          let x1 = ray2Pos[0][0];\n          let x2 = ray2Pos[1][0];\n          let x3 = otherWall.startPos[0];\n          let x4 = otherWall.endPos[0];\n          let y1 = ray2Pos[0][1];\n          let y2 = ray2Pos[1][1];\n          let y3 = otherWall.startPos[1];\n          let y4 = otherWall.endPos[1];\n          let det = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));\n          let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;\n          let u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / det;\n          if ((t > 0 && t < 1) && (u > 0 && u < 1)) {\n            intersects = true;\n          }\n        // }\n        i++;\n      }\n      if (!intersects) {\n        let j = 0;\n        while (!intersects && j < this.rays.length) {\n          const ray = this.rays[j];\n          if (!(ray.endPos[0] === ray2Pos[1][0] && ray.endPos[1] === ray2Pos[1][1])) {\n            // debugger;\n            let rayLength = dist(ray.startPos, ray.endPos);\n            let ray2Length = dist(ray2Pos[0], ray2Pos[1]);\n            let rayDist = dist(ray.endPos, ray2Pos[1]);\n            if (ray2Length > rayLength) {\n              if (Math.abs(ray2Length - (rayLength + rayDist)) < Math.abs(0.01)) {\n                intersects = true;\n              }\n            } else {\n              if (Math.abs(rayLength - (ray2Length + rayDist)) < Math.abs(0.01)) {\n                this.rays.splice(this.rays.indexOf(ray), 1, new Ray(this.player.pos, wall.startPos, ctx))\n                intersects = true;\n              }\n            }\n          } else {\n            intersects = true;\n          }\n          j++;\n        }\n\n        if (!intersects) {\n          let ray = new Ray(this.player.pos, wall.endPos, ctx)\n          // debugger;\n          if (!this.rays.includes(ray)) {\n            this.rays.push(ray);\n          }\n        }\n      }\n    })\n    console.log(this.rays);\n    this.rays.forEach(ray => {\n      ray.draw();\n    })\n  }\n\n  lightMaze () {\n    const ctx = this.map.canvasEl.getContext('2d');\n    const sortedRays = this.sortRays();\n    ctx.strokeStyle = 'rgba(250, 216, 89, 1)';\n    ctx.beginPath();\n    ctx.moveTo(...sortedRays[0].startPos);\n    sortedRays.forEach(ray => {\n      ctx.lineTo(...ray.endPos);\n      // let lastPos = ray.endPos;\n      // let startWall;\n      // let endWall\n      // let i = 0;\n      // while (!startWall && !endWall && i < this.map.walls.length) {\n      //   let checkWall = this.map.walls[i];\n      //   if (checkWall.startPos[0] === lastPos[0] && checkWall.startPos[1] === lastPos[1]) {\n      //     startWall = checkWall;\n      //   }\n      //   if (checkWall.endPos[0] === lastPos[0] && checkWall.endPos[1] === lastPos[1]) {\n      //     endWall = checkWall;\n      //   }\n      //   i++;\n      // }\n      // if(startWall) {\n      //   ctx.lineTo(...startWall.endPos);\n      // } \n      // if (endWall) {\n      //   ctx.lineTo(...endWall.startPos)\n      // }\n    })\n    ctx.lineTo(...sortedRays[0].endPos);\n    ctx.stroke();\n    ctx.fillStyle = 'rgba(250, 216, 89, 0.5)';\n    ctx.fill()\n  }\n\n  rayAngle (first, second, center) {\n    const cf = dist(center, first);\n    const cs = dist(center, second);\n    const fs = dist(first, second);\n    return Math.acos((cf + cs - fs)/ (2 * cf * cs));\n  }\n\n  sortRays () {\n    const ray = this.rays[0];\n    return [ray].concat(this.mergeSort(this.rays.slice(1), ray));\n  }\n\n  mergeSort(array, firstRay) {\n    if (array.length <= 1) {\n      return array;\n    } else {\n      const mid = array.length / 2;\n      const left = this.mergeSort(array.slice(0, mid), firstRay);\n      const right = this.mergeSort(array.slice(mid), firstRay);\n      return this.merge(left, right, firstRay);\n    }\n  }\n\n  merge (left, right, firstRay) {\n    let sorted = [];\n    while (!left.length === 0 && !right.length === 0) {\n      if (this.rayAngle(firstRay.endPos, left[0].endPos, firstRay.startPos) < this.rayAngle(firstRay.endPos, right[0].endPos, firstRay.startPos)) {\n        sorted.push(left.shift());\n      } else {\n        sorted.push(right.shift());\n      }\n    }\n    return sorted.concat(left).concat(right);\n  }\n}\n\nmodule.exports = Flashlight;\n\n//# sourceURL=webpack:///./src/js/flashlight.js?");

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const dist = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n\nclass Game {\n  constructor (map, player, flashlight) {\n    this.map = map;\n    this.player = player;\n    this.flashlight = flashlight;\n    // this.addPlayer();\n    this.draw();\n    this.bindKeyHandlers();\n  }\n\n  bindKeyHandlers () {\n    window.addEventListener('keydown', this.move.bind(this));\n  }\n\n  move (e) {\n    this.player.prevPos[1] = this.player.pos[1] - 7;\n    this.player.prevPos[0] = this.player.pos[0] - 7;\n    // const dist = (pos1, pos2) =>  Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));\n    let newPos = true;\n    switch (e.keyCode) {\n      case 37:\n        for (let i = 0; i < this.map.walls.length; i++) {\n          if (dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].startPos) < 8 \n          || dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].endPos) < 8 \n          || dist([this.player.pos[0] - 1, this.player.pos[1]], this.map.walls[i].center) < 8) {\n            newPos = false;\n          }\n        }\n        if (newPos) {\n          this.player.pos[0] -= 2;\n        }\n        break;\n      case 38:\n        for (let i = 0; i < this.map.walls.length; i++) {\n          if (dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].startPos) < 8 \n          || dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].endPos) < 8\n          || dist([this.player.pos[0], this.player.pos[1] - 1], this.map.walls[i].center) < 8) {\n            newPos = false;\n          }\n        }\n        if (newPos) {\n          this.player.pos[1] -= 2;\n        }\n        break;\n      case 39:\n        for (let i = 0; i < this.map.walls.length; i++) {\n          if (dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].startPos) < 8 \n          || dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].endPos) < 8\n          || dist([this.player.pos[0] + 1, this.player.pos[1]], this.map.walls[i].center) < 8) {\n            newPos = false;\n          }\n        }\n        if (newPos) {\n          this.player.pos[0] += 2;\n        }\n        break;\n      case 40:\n        for (let i = 0; i < this.map.walls.length; i++) {\n          if (dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].startPos) < 8 \n          || dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].endPos) < 8\n          || dist([this.player.pos[0], this.player.pos[1] + 1], this.map.walls[i].center) < 8) {\n            newPos = false;\n          }\n        }\n        if (newPos) {\n          this.player.pos[1] += 2;\n        }\n        break;\n    }\n\n    this.draw();\n  }\n\n  draw () {\n    const canvas = document.getElementsByTagName('canvas')[0];\n    const ctx = canvas.getContext('2d');\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    this.map.draw();\n    this.player.draw();\n    // this.flashlight.calculateRays();\n    // this.flashlight.lightMaze();\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/js/game.js?");

/***/ }),

/***/ "./src/js/graph.js":
/*!*************************!*\
  !*** ./src/js/graph.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Graph {\n  constructor (rowCount, colCount) {\n    this.rowCount = rowCount;\n    this.colCount = colCount;\n    this.grid = new Array(rowCount).fill(new Array(colCount).fill(0));\n    this.AdjacencyCellList = new Map();\n    this.buildAdjacencyCellList();\n  }\n\n  buildAdjacencyCellList () {\n    this.grid.forEach((row, rowNum) => {\n      row.forEach((col, colNum) => {\n        this.AdjacencyCellList.set([rowNum, colNum], [[rowNum - 1, colNum], [rowNum + 1, colNum], [rowNum, colNum - 1], [rowNum, colNum + 1]]);\n      })\n    })\n  }\n}\n\nmodule.exports = Graph;\n\n//# sourceURL=webpack:///./src/js/graph.js?");

/***/ }),

/***/ "./src/js/mazeGenerator.js":
/*!*********************************!*\
  !*** ./src/js/mazeGenerator.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Graph = __webpack_require__(/*! ./graph */ \"./src/js/graph.js\");\nconst DisjointSet = __webpack_require__(/*! ./disjointSet */ \"./src/js/disjointSet.js\");\nconst Wall = __webpack_require__(/*! ./wall */ \"./src/js/wall.js\");\n\nclass Maze {\n  constructor (width, height) {\n    this.width = width;\n    this.height = height;\n    const graph = new Graph(width, height);\n    this.grid = graph.grid;\n    this.AdjacencyCellList = this.grid.AdjacencyCellList;\n    this.canvasEl = document.getElementsByTagName(\"canvas\")[0];\n    this.keptWalls = [];\n    this.walls = [];\n  }\n\n  kruskal () {\n    let walls = [];\n    let keptWalls = [];\n    for (let i = 0; i < this.height - 1; i++) {\n      for (let j = 0; j < this.width - 1; j++) {\n        walls.push([[i, j], [i + 1, j]], [[i, j], [i, j + 1]]);\n      }\n    }\n    for (let i = 0; i < this.height - 1; i++) {\n      walls.push([[this.height - 1, i], [this.height - 1, i + 1]])\n    }\n    for (let j = 0; j < this.width - 1; j++) {\n      walls.push([[j, this.width -1], [j + 1, this.width - 1]]);\n    }\n\n    let cells = new DisjointSet();\n    this.grid.forEach((row, rowNum) => {\n      row.forEach((col, colNum) => {\n        cells.makeSet([rowNum, colNum]);\n      })\n    })\n    while (walls.length > 0) {\n      let i = Math.floor(Math.random() * (walls.length - 1))\n      let wall = walls[i];\n      let first = cells.find(wall[0]);\n      let second = cells.find(wall[1]);\n      if (first === second || first === undefined || second === undefined) {\n        keptWalls.push(wall);\n        walls.splice(i, 1);\n      } else {\n        walls.splice(i, 1);\n        cells.union(wall[0], wall[1]);\n      }\n    }\n\n    this.keptWalls = keptWalls;\n  }\n\n  draw () {\n    // const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n    this.canvasEl.height = this.height * 20 + 10;\n    this.canvasEl.width = this.width * 20 + 10;\n    // this.canvasEl.style.backgroundColor = 'black';\n    const ctx = this.canvasEl.getContext(\"2d\");\n    ctx.strokeStyle = 'black';\n    ctx.lineWidth = 1;\n    // canvasEl.style.border = '1px solid black';\n    this.walls = [];\n    this.walls.push(new Wall([5, 5], [this.width * 20 + 5, 5], ctx, \"horizontal\"));\n    this.walls.push(new Wall([5, 5], [5, 25], ctx, \"vertical\"));\n    this.walls.push(new Wall([5, 45], [5, this.height * 20 + 5], ctx, \"vertical\"));\n    this.walls.push(new Wall([5, this.height * 20 + 5], [this.width * 20 + 5, this.height * 20 + 5], ctx, \"horizontal\"));\n    this.walls.push(new Wall([this.width * 20 + 5, 5], [this.width * 20 + 5, this.height * 20 + 5 - 40], ctx, \"vertical\"));\n    this.walls.push(new Wall([this.width * 20 + 5, this.height * 20 + 5 - 20], [this.width * 20 + 5, this.height * 20 + 5], ctx, \"vertical\"));\n    this.keptWalls.forEach((wall) => {\n      const first = wall[0];\n      const second = wall[1];\n      if (first[0] < second[0]) { //horizontal line\n        this.walls.push(new Wall([second[1] * 20 + 5, second[0] * 20 + 5], [(second[1] + 1) * 20 + 5, second[0] * 20 + 5], ctx, \"horizontal\"));\n        // ctx.beginPath();\n        // ctx.moveTo(second[1] * 20 + 5, (second[0] * 20) + 5);\n        // ctx.lineTo((second[1] + 1) * 20 + 5, second[0] * 20 + 5);\n        // ctx.stroke();\n      } else { //vertical line\n        this.walls.push(new Wall([second[1] * 20 + 5, second[0] * 20 + 5], [second[1] * 20 + 5, (second[0] + 1) * 20 + 5], ctx, \"vertical\"));\n        // ctx.beginPath();\n        // ctx.moveTo(second[1] * 20 + 5, (second[0] * 20) + 5);\n        // ctx.lineTo((second[1]) * 20 + 5, (second[0] + 1) * 20 + 5);\n        // ctx.stroke();\n      }\n    })\n  }\n}\n\n// let maze = new Maze(5, 5);\n// maze.kruskal();\n\nmodule.exports = Maze;\n\n//# sourceURL=webpack:///./src/js/mazeGenerator.js?");

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// const KeyMaster = require('../../vendor/keymaster');\n\nclass Player {\n  constructor (map) {\n    this.pos = [15, 35];\n    this.prevPos = [10, 25];\n    this.vel = [0,0];\n    this.canvas = map.canvasEl;\n    // this.walls = map.walls;\n    console.log(this.walls);\n    // const ctx = canvas.getContext('2d');\n    // this.draw();\n    // this.bindKeyHandlers();\n  }\n\n  draw() {\n    const ctx = this.canvas.getContext('2d');\n    ctx.beginPath();\n    // ctx.clearRect(this.prevPos[0], this.prevPos[1], 14, 14 );\n    ctx.closePath()\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], 6, 0, 2 * Math.PI)\n    ctx.stroke();\n    ctx.fillStyle = 'yellow';\n    ctx.fill();\n  }\n\n  // bindKeyHandlers () {\n  //   window.addEventListener('keydown', this.move.bind(this));\n  // }\n\n  // move (e) {\n  //   this.prevPos[1] = this.pos[1] - 7;\n  //   this.prevPos[0] = this.pos[0] - 7;\n  //   const dist = (pos1, pos2) =>  Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));\n  //   let newPos = true;\n  //   switch (e.keyCode) {\n  //     case 37:\n  //       for (let i = 0; i < this.walls.length; i++) {\n  //         if (dist([this.pos[0] - 1, this.pos[1]], this.walls[i].startPos) < 8 \n  //         || dist([this.pos[0] - 1, this.pos[1]], this.walls[i].endPos) < 8 \n  //         || dist([this.pos[0] - 1, this.pos[1]], this.walls[i].center) < 8) {\n  //           newPos = false;\n  //         }\n  //       }\n  //       if (newPos) {\n  //         this.pos[0] -= 2;\n  //       }\n  //       break;\n  //     case 38:\n  //       for (let i = 0; i < this.walls.length; i++) {\n  //         if (dist([this.pos[0], this.pos[1] - 1], this.walls[i].startPos) < 8 \n  //         || dist([this.pos[0], this.pos[1] - 1], this.walls[i].endPos) < 8\n  //         || dist([this.pos[0], this.pos[1] - 1], this.walls[i].center) < 8) {\n  //           newPos = false;\n  //         }\n  //       }\n  //       if (newPos) {\n  //         this.pos[1] -= 2;\n  //       }\n  //       break;\n  //     case 39:\n  //       for (let i = 0; i < this.walls.length; i++) {\n  //         if (dist([this.pos[0] + 1, this.pos[1]], this.walls[i].startPos) < 8 \n  //         || dist([this.pos[0] + 1, this.pos[1]], this.walls[i].endPos) < 8\n  //         || dist([this.pos[0] + 1, this.pos[1]], this.walls[i].center) < 8) {\n  //           newPos = false;\n  //         }\n  //       }\n  //       if (newPos) {\n  //         this.pos[0] += 2;\n  //       }\n  //       break;\n  //     case 40:\n  //       for (let i = 0; i < this.walls.length; i++) {\n  //         if (dist([this.pos[0], this.pos[1] + 1], this.walls[i].startPos) < 8 \n  //         || dist([this.pos[0], this.pos[1] + 1], this.walls[i].endPos) < 8\n  //         || dist([this.pos[0], this.pos[1] + 1], this.walls[i].center) < 8) {\n  //           newPos = false;\n  //         }\n  //       }\n  //       if (newPos) {\n  //         this.pos[1] += 2;\n  //       }\n  //       break;\n  //   }\n\n  //   this.draw();\n  // }\n\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/js/player.js?");

/***/ }),

/***/ "./src/js/ray.js":
/*!***********************!*\
  !*** ./src/js/ray.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Ray {\n  constructor (startPos, endPos, ctx) {\n    this.startPos = startPos;\n    this.endPos = endPos;\n    this.ctx = ctx;\n    // this.draw(ctx);\n  }\n\n  draw () {\n    // ctx.strokeStyle = 'transparent';\n    this.ctx.beginPath();\n    this.ctx.moveTo(...this.startPos);\n    this.ctx.lineTo(...this.endPos);\n    this.ctx.stroke();\n  }\n}\n\nmodule.exports = Ray;\n\n//# sourceURL=webpack:///./src/js/ray.js?");

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const dist = (pos1, pos2) =>  Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));\n\nmodule.exports = dist;\n\n//# sourceURL=webpack:///./src/js/util.js?");

/***/ }),

/***/ "./src/js/wall.js":
/*!************************!*\
  !*** ./src/js/wall.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Wall {\n  constructor (startPos, endPos, ctx, dir) {\n    this.startPos = startPos;\n    this.endPos = endPos;\n    this.dir = dir;\n    let center;\n    if (dir === \"horizontal\") {\n      center = [(startPos[0] + endPos[0]) / 2, startPos[1]];\n    } else if (dir === \"vertical\") {\n      center = [startPos[0], (startPos[1] + endPos[1]) / 2];\n    }\n    this.center = center;\n    this.draw(ctx);\n  }\n\n  draw (ctx) {\n    ctx.beginPath();\n    ctx.moveTo(...this.startPos);\n    ctx.lineTo(...this.endPos);\n    ctx.stroke();\n  }\n}\n\nmodule.exports = Wall;\n\n//# sourceURL=webpack:///./src/js/wall.js?");

/***/ })

/******/ });