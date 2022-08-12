let previous;

class AgenteGrupo4 {
  constructor(position) {
    this.position = createVector(position.x * GRID_SIZE + GRID_SIZE/2, position.y * GRID_SIZE + GRID_SIZE/2);
    this.size = GRID_SIZE - 2;
    this.r = this.size;
    
    this.calculatedPath = Array();
    this.closestFood = undefined;
    this.pathAlgorithm = 0;
  }

  run(terrain) {
    if(this.closestFood != undefined && (this.closestFood != this.calculatedPath[this.calculatedPath.length - 1])) {
        let algorithmToRun = this.pathAlgorithm % 5;
        this.pathAlgorithm += 1;
      
        switch(algorithmToRun) {
          case 0:
            this.dfs(terrain);
            break;
          case 1:
            this.bfs(terrain);
            break;
          case 2:
            this.greed(terrain);
            break;
          case 3:
            this.astar(terrain);
            break;
          case 4:
            this.uniform(terrain);
            break;
        }
    }

    
    this.update();
    this.display();
  }
  
  dfs(terrain) {
    
  }
  
  bfs(terrain) {
    
  }
  
  greed(terrain) {
    
  }
  
  astar(terrain) {
    
  }
  
  uniform(terrain) {
    
  }
  
  checkIfFoodExists(food) {
      if(this.closestFood == undefined) {
        return false;
      }
    
      for (let i = food.length - 1; i >=0; i--) {
          let foodLocation = food[i];
          if(foodLocation == this.closestFood) {
            return true;
          }
      }
    
      return false;
  }
  
  eat(f) {
    let food = f.getFood();
    
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      // If we are, juice up our strength!
      if (d < this.r / 2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
    
    let foodExists = this.checkIfFoodExists(food);
    if(foodExists) return ;
    
    let minDist = 999999.0;
    let bestFoodLocation = undefined;
    
    // Are we touching any food objects?
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let manhattanDistance = abs(this.position.x - foodLocation.x) + abs(this.position.y - foodLocation.y);
      
      if (manhattanDistance < minDist) {
        minDist = manhattanDistance;
        bestFoodLocation = foodLocation;
      }
    }
    
    this.closestFood = bestFoodLocation;
    
  }

  update() {
    for(let i = 0; i < this.calculatedPath.length; i++) {
        if(this.calculatedPath[i] == this.position) {
          this.position = this.calculatedPath[i+1];
          break;
        }
    }
  }
  
  display() {
    stroke(0);
    fill(255, 255, 0);
    circle(this.position.x, this.position.y, this.size);
  }
}

