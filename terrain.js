// Adapted from https://github.com/vcnovaes/SearchAlgorithmsAnimation

const WATER = 0;
const SAND = 1;
const MUD = 2;
const OBSTACLE = 3;
const PLAYER = 4;
const FOOD = 5;

const color = new Array(6);
color[SAND] = [230, 197, 37];
color[MUD] = [92, 51, 18];
color[WATER] = [95, 116, 222];
color[OBSTACLE] = [121, 114, 125];
color[PLAYER] = [84, 191, 113];
color[FOOD] = [191, 84, 130];

class Terrain {
  constructor() {
    this.columns = floor(width / GRID_SIZE);
    this.rows = floor(height / GRID_SIZE);
    this.board = new Array(this.columns);
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
  }

  draw_ij(i, j) {
    rectMode(CORNER);
    let c = color[this.board[i][j]];
    fill(c[0], c[1], c[2]);
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

