// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// A collection of food in the world

class Food {
  constructor(num) {
    // Start with some food
    this.food = [];
    for (let i = 0; i < num; i++) {
      this.food.push(createVector(floor(random(0, floor(width / GRID_SIZE))) * GRID_SIZE, floor(random(0, floor(height / GRID_SIZE))) * GRID_SIZE));
    }
  }

  // Add some food at a location
  add(l) {
    this.food.push(l.copy());
  }

  // Display the food
  run() {
    for (let i = 0; i < this.food.length; i++) {
      let f = this.food[i];
      //rectMode(CENTER);
      stroke(0);
      fill(127);
      rect(f.x, f.y, GRID_SIZE, GRID_SIZE);
    }

    // There's a small chance food will appear randomly
    if (random(1) < 0.01) {
      this.food.push(createVector(floor(random(0, floor(width / GRID_SIZE))) * GRID_SIZE, floor(random(0, floor(height / GRID_SIZE))) * GRID_SIZE));
    }
  }

  // Return the list of food
  getFood() {
    return this.food;
  }
}
