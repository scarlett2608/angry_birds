//constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//variables
var engine,world;
var box1,ground,box2,box3,box4,box5;
var pig1,pig2,log1,log2,log3,log4;
var bird1;
var bg = 'sprites/bg.png';
var constrained_log;
var platform;
var gameState = 'onSling';
var background_img;
var score = 0;


function preload(){

  getBackgroundImg();

}

function setup() {
  //canvas
  var canvas = createCanvas(1200,400);
  //engine
  engine =  Engine.create();
  world = engine.world;
  
  //objects
  box1 = new Box(700,320,70,70);
  box3 = new Box(700,240,70,70);
  box4 = new Box(920,240,70,70);
  box5 = new Box(810,160,70,70);
  ground = new Ground(600,height,1200,20);
  platform = new Ground(150,305,300,170);
  box2 = new Box(920,320,70,70);
  pig1 = new Pig(810,350);
  pig2 = new Pig(810,220)
  // *pi = 180 degrees* //
  log1 = new Log(810,260,300,PI/2);
  log2 = new Log(810,180,300,PI/2);
  log3 = new Log(760,120,150,PI/7);
  log4 = new Log(870,120,150,-PI/7);
  //log5 = new Log(230,180,80,PI/2);
  bird1 = new Bird(200,50);
  slingShot = new SlingShot(bird1.body,{x:200,y:50});

  
}

function draw() {
  if (background_img) {
    //background colour
  background(background_img);
  }

  noStroke();
  textSize(35);
  fill('white');
  text('Score: '+ score,width-300,50);
    

  Engine.update(engine);

  //displaying objects
    //ground
    ground.display();
    platform.display();
    //boxes
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    //pigies
    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();
    //logs
    log1.display();
    log2.display();
    log3.display();
    log4.display();
    //birdies
    bird1.display();
    //slingshot
    //log5.display();
    slingShot.display();
    


}

function mouseDragged(){
  if (gameState !== 'launched') {
   Matter.Body.setPosition(bird1.body,{x:mouseX,y:mouseY})
  }
}

function mouseReleased(){
  
  slingShot.fly()
  gameState = 'launched';

}

function keyPressed () {
  if (keyCode === 32 && bird1.body.speed < 1) {
    bird1.trajectory = [];
    Matter.Body.setPosition(bird1.body,{x:200,y:50});
    slingShot.attach(bird1.body);
    gameState = 'onSling';
  }

}

async function getBackgroundImg (){
  
  var responce = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
  var responceJSON = await responce.json();
  var datetime = responceJSON.datetime;
  var hour = datetime.slice(11,13);
  if (hour >= 06 && hour <= 19) {
    bg = 'sprites/bg.png';
  }

  else{
    bg = 'sprites/bg2.jpg';
  }
  background_img = loadImage(bg);

}