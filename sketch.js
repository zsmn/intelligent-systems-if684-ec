// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>
// The Nature of Code

// A World of creatures that eat food
// The more they eat, the longer they survive
// The longer they survive, the more likely they are to reproduce
// The bigger they are, the easier it is to land on food
// The bigger they are, the slower they are to find food
// When the creatures die, food is left behind


const GRID_SIZE = 20;

let world;

function setup() {
  createCanvas(500, 400);
  // World starts with 20 creatureslet J
  // and 20 pieces of food
  world = new World(3);
}

function draw() {
  background(175);
  world.run();
}

// // We can add a creature manually if we so desire
// function mousePressed() {
//   world.born(mouseX, mouseY);
// }

// function mouseDragged() {
//   world.born(mouseX, mouseY);
// }
