
const SAND = 0;
const MUD = 1;
const WATER = 2;
const OBSTACLE = 3;
const PLAYER = 4;
const FOOD = 5;
const EXPLORATION = 6;
const PATH = 7;

const color = new Array(8);
color[SAND] = [230, 197, 37, 255];
color[MUD] = [92, 51, 18, 255];
color[WATER] = [95, 116, 222, 255];
color[OBSTACLE] = [121, 114, 125, 255];
color[PLAYER] = [84, 191, 113, 255];
color[FOOD] = [191, 84, 130, 255];
color[EXPLORATION] = [0, 0, 255, 60];
color[PATH] = [255, 0, 0, 60];

class Terrain {
  constructor() {
    this.columns = floor(width / GRID_SIZE);
    this.rows = floor(height / GRID_SIZE);
    this.board = new Array(this.columns);
    this.boardEffects = new Array(this.columns);
    this.maxIndexToDrawExploration = 0;
    this.maxIndexToDrawPath = 0;
    this.counter = 0;
    this.drawCounter = 1;
    this.explorationPath = [];
    this.drawedExploration = false;
    this.path = [];
    this.drawedPath = false;
    for (let i = 0; i < this.columns; i++) {
      this.board[i] = new Array(this.rows);
    }
  }

  draw_map() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.draw_ij(i, j);
      }
    }
    
    this.draw_exploration();
    if(this.drawedExploration) {
      this.draw_path();
    }
  }
  
  set_exploration(exploration_path) {
    this.explorationPath = exploration_path;
    this.drawedExploration = false;
    this.maxIndexToDrawExploration = 0;
  }
  
  set_path(path) {
    this.path = path;
    this.drawedPath = false;
    this.maxIndexToDrawPath = 0;
  }
  
  draw_exploration() {
    if(this.explorationPath.length) {
      for(let i = 0; i <= min(this.explorationPath.length - 1, this.maxIndexToDrawExploration); i++) {
          let pointToDraw = this.explorationPath[i];
        
//           if(pointToDraw == undefined) {
//             console.log(this.explorationPath);
//             console.log(this.explorationPath.length);
//             console.log(i);
//             console.log("resolvi porra");
//             continue;
//           }

          rectMode(CORNER);
          let c = color[EXPLORATION];
          fill(c[0], c[1], c[2], c[3]);
          stroke(127,127,127,127);
          strokeWeight(0.5);
          rect(pointToDraw.x * GRID_SIZE, pointToDraw.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
          fill(0);
        }
    }
    
    if(this.drawedExploration == false) {
      if(this.counter >= this.drawCounter) {
        this.maxIndexToDrawExploration += 1;
        this.counter = 0;

        if(this.maxIndexToDrawExploration == this.explorationPath.length - 1) {
          this.drawedExploration = true;
        }
      }
      else {
        this.counter += 1;
      }
    }
  }
  
  draw_path() {
    if(this.path.length) {
      for(let i = 0; i <= this.maxIndexToDrawPath; i++) {
          let pointToDraw = this.path[i];

          rectMode(CORNER);
          let c = color[PATH];
          fill(c[0], c[1], c[2], c[3]);
          stroke(127,127,127,127);
          strokeWeight(0.5);
          rect(pointToDraw.x * GRID_SIZE, pointToDraw.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
          fill(0);
        }
    }
    
    if(this.drawedPath == false && this.counter >= this.drawCounter) {
      this.maxIndexToDrawPath += 1;
      this.counter = 0;
      
      if(this.maxIndexToDrawPath == this.path.length - 1) {
        this.drawedPath = true;
      }
    }
    else {
      this.counter += 1;
    }
  }

  draw_ij(i, j) {
    rectMode(CORNER);
    let c = color[this.board[i][j]];
    fill(c[0], c[1], c[2], c[3]);
    stroke(127,127,127,127);
    strokeWeight(0.5);
    rect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    fill(0);
  }

  generateTerrain() {
    const noise_scale = 20.0;
    const iterations = 1;

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        let noise_val = noise(i / noise_scale, j / noise_scale, iterations);

        if (noise_val < 0.3) {
          this.board[i][j] = WATER;
        } else if (noise_val < 0.4) {
          this.board[i][j] = MUD;
        } else {
          this.board[i][j] = SAND;
        }
      }
    }
  }
}
