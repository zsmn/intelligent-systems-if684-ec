//let previous;


class AgenteGrupo4 {
  constructor(position) {
    this.position = createVector(position.x * GRID_SIZE, position.y * GRID_SIZE);

    this.calculatedPath = Array();
    this.closestFood = undefined;
    this.pathAlgorithm = 0;
    this.dx = [1,-1,0, 0, 1, 1,-1,-1];
    this.dy = [0, 0,1,-1, 1,-1, 1,-1];
    this.terrainEnergy=0;
  }
  
  agentPixelToGrid(position) {
    
  }
  
  pixelToGrid(position){
    return createVector(floor(position.x/GRID_SIZE), floor(position.y/GRID_SIZE));
  }

  gridToPixel(position){
    return createVector(position.x * GRID_SIZE, position.y * GRID_SIZE);
  }

  run(terrain) {
    if(this.closestFood != undefined && (!this.closestFood.equals(this.calculatedPath[this.calculatedPath.length - 1]))) {
        
        let algorithmToRun = this.pathAlgorithm % 5;
        this.pathAlgorithm += 1;
        let gridPosition = this.pixelToGrid(this.position);
        this.terrainEnergy = (10*terrain.board[gridPosition.x][gridPosition.y])+5;
        console.log(this.terrainEnergy);
        
        this.calculatedPath = Array();

        this.dfs(gridPosition, terrain);
      
        // switch(algorithmToRun) {
        //   case 0:
        //     this.dfs(gridPosition, terrain);
        //     break;
        //   case 1:
        //     this.bfs(gridPosition, terrain);
        //     break;
        //   case 2:
        //     this.greed(terrain);
        //     break;
        //   case 3:
        //     this.astar(terrain);
        //     break;
        //   case 4:
        //     this.uniform(terrain);
        //     break;
        // }
     
      // console.log(this.position);
      // console.log(this.calculatedPath); 
      // console.log(this.calculatedPath[this.calculatedPath.length - 1]);
      // console.log(this.closestFood);
      // this.display();
      // exit(-1);
    }
    
    
    if(this.terrainEnergy <=0){
      let actualPosition = this.pixelToGrid(this.position);
      this.terrainEnergy = (10*terrain.board[actualPosition.x][actualPosition.y]) + 5;
      console.log(this.terrainEnergy);
      
      this.update();
    }
    this.terrainEnergy -=1;
    this.display();
    
    
    
  }

  
  dfsAux(gridPosition, terrain, visited, found){
    visited[gridPosition.x][gridPosition.y] = 1;
    this.calculatedPath.push(this.gridToPixel(gridPosition));
    
    if(gridPosition.equals(this.pixelToGrid(this.closestFood))) {
      found[0] = true;
      return ;
    }

    for(let i = 0; i < 8; i++){
      let new_x = gridPosition.x + this.dx[i];
      let new_y = gridPosition.y + this.dy[i];
      if(new_x >= 0 && new_x < terrain.columns && new_y >= 0 && new_y < terrain.rows) {
        if(visited[new_x][new_y] === 0 && terrain.board[new_x][new_y] !== OBSTACLE){
          this.dfsAux(createVector(new_x, new_y), terrain, visited, found);
          if(found[0] == true) {
            return ;
          }
        }
      }
    }

    if(found[0] == false) {
      this.calculatedPath.pop();
    }
  }

  dfs(gridPosition, terrain) {
    let visited = new Array(terrain.columns);
    for(let i = 0; i < terrain.columns; i++){
      visited[i] = new Array(terrain.rows);
      for(let j = 0; j < terrain.rows; j++){
        visited[i][j] = 0;
      }
    }
    
    let found = Array(false);
    
    this.dfsAux(gridPosition, terrain, visited, found);
  }
  
  bfsAux(gridPosition, terrain, visited, ancestor){
    visited[gridPosition.x][gridPosition.y] = 1;

    let queue = Array();
    queue.push(gridPosition);

    while(queue.length != 0){
      let currPosition = queue.shift();
      if(currPosition.equals(this.pixelToGrid(this.closestFood))) {
        break;
      }
      for(let i = 0; i < 8; i++){
        let new_x = currPosition.x + this.dx[i];
        let new_y = currPosition.y + this.dy[i];
        if(new_x >= 0 && new_x < terrain.columns && new_y >= 0 && new_y < terrain.rows) {
          if(visited[new_x][new_y] === 0 && terrain.board[new_x][new_y] !== OBSTACLE){
            visited[new_x][new_y] = 1;
            ancestor[new_x][new_y] = currPosition;
            queue.push(createVector(new_x, new_y));
          }
        }
      }
    }
    
    let initialPosition = this.pixelToGrid(this.closestFood);

    while(!initialPosition.equals(ancestor[initialPosition.x][initialPosition.y])) {
      this.calculatedPath.push(this.gridToPixel(initialPosition));
      initialPosition = createVector(ancestor[initialPosition.x][initialPosition.y].x, ancestor[initialPosition.x][initialPosition.y].y);
    }
    this.calculatedPath.push(this.gridToPixel(initialPosition));

    this.calculatedPath = reverse(this.calculatedPath);
  }

  bfs(gridPosition, terrain) {
    let visited = new Array(terrain.columns);
    for(let i = 0; i < terrain.columns; i++){
      visited[i] = new Array(terrain.rows);
      for(let j = 0; j < terrain.rows; j++){
        visited[i][j] = 0;
      }
    }
    let ancestor = new Array(terrain.columns);
    for (let i = 0; i < terrain.columns; i++) {
      ancestor[i] = new Array(terrain.rows);
    }
    for(let i = 0; i < terrain.columns; i++){
      for(let j = 0; j < terrain.rows; j++){
        ancestor[i][j] = createVector(i,j);
      }
    }
    
    this.bfsAux(gridPosition, terrain, visited, ancestor);
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
          if(foodLocation.equals(this.closestFood)) {
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
      if (d < GRID_SIZE/2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
    
    if(food.length === 0) {
      this.closestFood = undefined;
      this.calculatedPath = Array();
      return ;
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
        if(this.calculatedPath[i].equals(this.position)) {
          this.position = this.calculatedPath[i+1];
          break;
        }
    }
  }
  
  display() {
    stroke(0);
    fill(255, 255, 0);
    rect(this.position.x, this.position.y, GRID_SIZE, GRID_SIZE);
  }
}
