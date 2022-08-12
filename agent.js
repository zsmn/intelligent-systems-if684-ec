let previous;

// Caminho será salvo em uma lista
// O caminho so deve ser gerado novamente se o nosso agente comer ou se a comida mudar de lugar

// Pedro: Largura
// vivi: profundidade
// Zenio: Custo uniforme
// PNC:Gulosa 
// Zilde:A*

class Agent {
  constructor(x = width / 2 + GRID_SIZE / 2, y = height / 2 + GRID_SIZE / 2) {
    this.position = createVector(x, y);
    this.size = GRID_SIZE - 2;
    this.r = this.size;
    this.contAlgoritmo = 0;
    
    this.closestComida = undefined;
    this.path = Array(); //lista de posição
  }

  run(terrain){
    stroke(0);
    fill(255, 255, 0);
    circle(this.position.x, this.position.y, this.size);
    
    if((this.path.length == 0) || (this.closestComida.position != this.path[this.path.length-1].position)){
      let mod = this.contAlgoritmo%5;
      this.contAlgoritmo+=1;
      this.path=Array();
      
      switch(mod){
          case 0:
            this.bfs(terrain);
            break;
          case 1:
            this.dfs(terrain);
            break;
          case 2:
            this.uniforme(terrain);
            break;
          case 3:
            this.guloso(terrain);   
            break;
          default:
            this.aestrela(terrain);       
      }
      
      
    }
    
    
    this.borders();
    //this.update();
    this.display()
  }
  
  eat(f) {
    let food = f.getFood();
    let minDistClosestComida= 99999.0
    let position;
    // Are we touching any food objects?
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      
      if (d<minDistClosestComida){
        minDistClosestComida=d;
        position=foodLocation;
      }
      
      // If we are, juice up our strength!
      if (d < this.r / 2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
    this.closestComida = position;
  }

  bfs(terrain) {
    terrain.board
    
  }
  
  dfs(terrain) {
    
  }
  
  uniforme(terrain) {
    
  }
  
  guloso(terrain){
    
  }
  
  aestrela(terrain) {
    
  }
  
  update(){
    
  }
  
  display(){
    
  }
  

  borders() {
    if (this.position.x < -this.r / 2) this.position.x = width + this.r / 2;
    if (this.position.y < -this.r / 2) this.position.y = height + this.r / 2;
    if (this.position.x > width + this.r / 2) this.position.x = -this.r / 2;
    if (this.position.y > height + this.r / 2) this.position.y = -this.r / 2;
  }
}
