var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
 towerImg = loadImage("tower.png");
 doorImg = loadImage("door.png"); 
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png")
  
  
}

function setup(){
  createCanvas(600,600);
 tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
 if (gameState === "play") {
  
  if (keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
  if (keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  if (keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY +0.6;
  
   if (tower.y > 400){
     tower.y =300;
   }
    spawnDoors();

  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
   if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
     gameState = "end"; 
   }
   
    drawSprites();
 }
  
  if(gameState === "end"){
    stroke("white");
    strokeWeight(2);
    fill("black");
    textSize(30);
    text("Game Over",220, 250);
  

  }


}

function spawnDoors() {

  if (frameCount % 200 === 0) {
    door = createSprite(200, -50);
    door.x = random(120, 400);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    doorGroup.add(door);
    
    ghost.depth = door.depth
    ghost.depth += 1;
    
    climber = createSprite(200, 10);
    climber.x = door.x
    climber.velocityY = 1;
    climber.addImage(climberImg);
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.debug = true;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

