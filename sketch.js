var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var score, particle, turn, gamestate, START, PLAY, END;

var divisionHeight=300;
var score =0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    
    score = 0;
    START = 0;
    PLAY = 1;
    END = 2;
    turn = 0;
    gamestate = START;
}
 


function draw() {
  background("black");
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   //if(frameCount%60===0){
     //particles.push(new Particle(random(width/2-300, width/2+300), 10,10));
     //score++;
   //}
  if(particle){
  particle.display();
  getScore();
  }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   text("Score: " + score,20,20);
   text("Turn: " + turn, 700,20);

   if(gamestate === END){
     fill("red");
     textSize(100);
     text("GAME OVER", 100, 300);
     fill("black")
   }

   for(var p = 20, s = 500; p < 400, s >= 100; p += 80, s -= 100){
       text(s,p,520);
   }
   for(var p = 740, s = 500; p > 400, s >= 100; p -= 80, s -= 100){
    text(s,p,520);
   }
}

function mousePressed(){
  if(gamestate === START)
  {
    turn++;
    particle = new Particle(mouseX,10,10,10);
    gamestate = PLAY;
  }
}

function getScore(){
  var pos = particle.body.position;
  if (pos.y > 520 && gamestate === PLAY){
    if(pos.x < 400 && pos.x > 0)
      score += (500 - Math.round(pos.x / 80) * 100);
    else if (pos.x < 800) {
      score += (-400 + Math.round(pos.x/ 80) * 100);
    }

    if(turn >= 5)
    gamestate = END;
    else
    gamestate = START;
  }
}