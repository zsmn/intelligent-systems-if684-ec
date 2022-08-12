// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// The World we live in
// Has bloops and food

// Constructor
class World {
  constructor(num) {
    // Start with initial food and creatures
    this.food = new Food(2);
    this.agents = []; // An array for all creatures
    this.terrain = new Terrain();
    for (let i = 0; i < 1; i++) {
      let l = createVector(int(random(0, this.terrain.columns)), int(random(0, this.terrain.rows)));
      this.agents.push(new AgenteGrupo4(l));
    }
    this.terrain.generateTerrain();
  }

  // Run the world
  run() {
    this.display();
    this.update();
  }

  update() {
    this.food.run();
    // Cycle through the ArrayList backwards b/c we are deleting
    for (let i = this.agents.length - 1; i >= 0; i--) {
      // All bloops run and eat
      let b = this.agents[i];
      b.run(this.terrain);
      b.eat(this.food);
    }
  }

  display() {
    this.terrain.draw_map();
    // strokeWeight(1);
    // stroke(127,127,127,127);
    // for (let i = 0; i < width; i = i + GRID_SIZE) {
    //   line(i, 0, i, height);
    // }
    // for (let j = 0; j < height; j = j + GRID_SIZE) {
    //   line(0, j,width, j);
    // }
  }
}

