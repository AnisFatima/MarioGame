var PLAY=0;
var END=1;

var gameState=PLAY;

var mario,mario_running,mario_collided;
var groundImage ,obstacle1,obstacle2,obstacle3,obstacle4;
var backgroundImage;
var brickImage;
//var score;

function preload(){
mario_running=loadAnimation("mario01.png","mario02.png","mario03.png");
  //mario_running=loadAnimation("collided.png");
   groundImage=loadImage("ground2.png");
  
   obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png");
   obstacle3=loadImage("obstacle3.png");
   obstacle4=loadImage("obstacle4.png");
  
   backgroundImage=loadImage("bg.png");
  
  brickImage=loadImage("brick.png");
  
  mario_collided =loadAnimation("collided.png");
  
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  jumpSound=loadSound("jump.mp3");
  
  
    
  }

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  
  
  bg=createSprite(windowWidth-300,windowHeight-250);
  bg.addImage("bg",backgroundImage);
  bg.scale=2;
  
  mario=createSprite(30,height-130,20,50);
  mario.addAnimation("running",mario_running);
  mario.addAnimation("collided" , mario_collided);
  
 
  ground=createSprite(width/2,height-70,width,125);
  ground.addImage("ground" , groundImage);
  ground.x=ground.width/2;
  
gameover=createSprite(width/2,height/2-50);
  gameover.addImage(gameoverImage);
  gameover.scale=0.5;
  
  restart=createSprite(width/2,height/2);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  bricksGroup = new Group();
  obstaclesGroup = new Group();
  
  mario.setCollider("circle",0,0,10);
  mario.debug=false;
  
  score=0;
   
  
}

function draw(){
  background("white");


 
if(gameState===PLAY){
    gameover.visible=false;
    restart.visible=false;
  
  if((touches.length > 0 || keyDown("SPACE")) && mario.y  >= height-200) {
      jumpSound.play( )
      mario.velocityY = -10;
       touches = [];
    }

  if(bricksGroup.isTouching(mario)){
    
     score = score+1;
  }
 
  
  
  ground.velocityX=-2;
  
  if(ground.x<400){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")&&mario.y>height-120){
    mario.velocityY=-10;
    jumpSound.play();
  }
  
  mario.velocityY=mario.velocityY+1;
  createObstacles();
  
  createBricks();
  
  if(obstaclesGroup.isTouching(mario)){
    gameState=END;
    
  }
  
}
  else if(gameState===END){
    
    gameover.visible=true;
    restart.visible=true;
    
    ground.velocityX=0;
    mario.velocityY=0;
    
    mario.changeAnimation("collided",mario_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    bricksGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  
    
    obstaclesGroup.setVelocityXEach(0);
    bricksGroup.setVelocityXEach(0);
  }
  
  mario.collide(ground);
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  
  
  drawSprites();
  
  textSize(25);
  fill("black");
 text("Score : " +score ,width-150,50);
  
   textSize(15);
  fill("black");
   text("press space/touch to jump" ,width-730,50);
 text("hit the bricks to score point" ,width-730,70);
  //text("press / click on ICON below GAME OVER to reset" ,30,40);
 
}

function reset(){
  
gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  
  score=0;
  
  mario.changeAnimation("running" , mario_running);
}
function createBricks(){
  if(frameCount%30===0){
  brick=createSprite(width+20,50,40,10);
  brick.velocityX=-3;
    
  brick.addImage(brickImage);
    brick.y=Math.round(random(height-190,height-220));
    
    brick.depth=mario.depth;
    mario.depth=mario.depth+1;
    
    brick.lifetime=300;
    brick.scale=0.7;
    
    bricksGroup.add(brick);
  }
  
  
}

function createObstacles(){
  
  if(frameCount%60===0){
    var obstacle=createSprite(width+20,height-120,10,40);
    obstacle.velocityX=-3;
    
    var randomNumber=Math.round(random(1,4));
    switch(randomNumber){
      case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3); 
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        default:break;
    }
    
    obstacle.lifetime=300;
    obstacle.scale=0.8;
    
    obstaclesGroup.add(obstacle);
  }
}