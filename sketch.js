var balloon,balloonImage1,balloonImage2;
var speed  = 5;
var database ;

var pos;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  var balloonPos = database.ref('balloon/position');
  balloonPos.on("value",readOp);
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown("a")) {
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.x = balloon.x - speed;
    updatePos(-10,0);
  }
  else if(keyDown("d")){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.x = balloon.x +  speed;
    updatePos(10,0);
  }
  else if(keyDown("w")){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.y = balloon.y - speed;
    updatePos(0,-10);
  }
  else if(keyDown("s")){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.y = balloon.y + speed;
    updatePos(0,10);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use WASD to move Hot Air Balloon!",40,40);
}
function readOp(data){
  pos = data.val();
  balloon.x = pos.x;
  balloon.y = pos.y;
}

function updatePos(x,y){
  database.ref('balloon/position').set({
    x:pos.x + x,
    y:pos.y + y

  })
}