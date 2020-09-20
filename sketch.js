var backImage,backgr; 
var player, player_running;
var ground,ground_img;
var FoodGroup, bananaImage;
var ObstaclesGroup, obstacle_img;
var gameOver;
var score=0;

function preload()

{
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
player = createSprite(100,340,20,50);
player.addAnimation("running",player_running);
player.scale=0.1;

ground = createSprite(400,350,800,10);  
ground.velocityX=-4;
ground.x = ground.width /2;
ground.visible=false;
  
backgr=createSprite(0,0,800,400); 
backgr.addImage(backImage); 
  backgr.scale=1.5; 
  backgr.x=backgr.width/2; 
  backgr.velocityX=-4;

ObstaclesGroup = createGroup();
  
FoodGroup = createGroup();
}

function draw() {
  background(220);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  if(backgr.x<100)
  { backgr.x=backgr.width/2; }
  
  if(FoodGroup.isTouching(player)){ FoodGroup.destroyEach();
score = score + 2;
                                  } 
  
  switch(score){ case 10: player.scale=0.12; break; case 20: player.scale=0.14; break; case 30: player.scale=0.16; break; case 40: player.scale=0.18; break; default: break; }
  
     //jump when the space key is pressed
    if(keyDown("space")){
      player.velocityY = -12 ;
    }
  
    //add gravity
    player.velocityY = player.velocityY + 0.8;
    
    //spawn the clouds
    spawnFood();
  
    //spawn obstacles
    spawnObstacles();
    player.collide(ground);
  
   if(ObstaclesGroup.isTouching(player))
   
   { player.scale=0.08; // score=score-2;
   }
  drawSprites();
                                         
  stroke("white"); textSize(20); fill("white"); text("Score: "+ score, 250,50);
 

}

function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnFood() {
  //write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = player.depth;
    player.depth = banana.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
}