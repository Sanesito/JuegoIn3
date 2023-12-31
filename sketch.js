var pista,pistaImg;
var carro,carroImg;
var roca,rocaImg;
var carror,carrorImg;
var tronco,troncoImg;
var carro2,carro2Img;
var obstacles1,obstacles1group;
var recompenza,recompenzaImg;
var recompenzaGroup;
var score;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover, gameoverImg;
var boton, botonImg;
var choque, choqueImg;
var AutoSound;
var choqueSound;

function preload(){
  pistaImg = loadImage("Pista de carreras.png");
  carroImg = loadImage("Carro.png");
  rocaImg = loadImage("roca.png");
  carrorImg = loadImage ("Carror.png");
  troncoImg = loadImage("Tronco.png");
  carro2Img = loadImage("Carro2.png");
  recompenzaImg = loadImage("estrella.png")
  gameoverImg = loadImage ("GameOver.png")
  botonImg = loadImage("Boton.png");
  choqueImg = loadImage("Choque.png");
  AutoSound = loadSound("Auto.mp3");
  choqueSound = loadSound("Choque.mp3");

}

function setup(){
  createCanvas(windowWidth,windowHeight)
  background("blue");
  score = 0

  

  pista = createSprite(400,400,width/2,);
  pista.addImage(pistaImg);
  pista.velocityX = -3
  pista.scale = 10


  carro = createSprite(30,400,width/2,50);
  carro.addAnimation("carro",carroImg);
  carro.scale = 0.5

  carro.addAnimation("choque",choqueImg);

  

  obstacles1group = new Group();
  recompenzaGroup = new Group();

  gameover = createSprite(600,250,width/2,50);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.6

  boton = createSprite(600,550,width/2,50)
  boton.addImage(botonImg)
  boton.scale = 0.5
}

function draw() {
  background(0);
  
  if (gamestate === PLAY){
    //AutoSound.play();
    //AutoSound.volume-= 20

    gameover.visible = false
    boton.visible = false
 //hace que el carro se mueva
  if (keyDown("UP_ARROW")&& carro.y >=  20) {
    carro.y = carro.y -4
  //  touches = []
  }
    
  if (keyDown("DOWN_ARROW")&& carro.y <=  600) {
    carro.y = carro.y +4
    //touches = []
  }
 // pista infinita
  if (pista.x <0) {
    pista.x = pista.width/2
  }
  if (recompenzaGroup.isTouching(carro)){
    score = score + 25
    recompenzaGroup.destroyEach();
  }
  obstacles();
  recompenzas();
  if (obstacles1group.isTouching(carro)) {
  choqueSound.play();
  //carro.velocityY = -2 IA
  gamestate = END
  }
} else if(gamestate === END){
  carro.changeAnimation("choque",choqueImg);
  obstacles1group.setVelocityXEach(0);
  obstacles1group.setLifetimeEach(-1);
  recompenzaGroup.setVelocityXEach(0);
  recompenzaGroup.setLifetimeEach(-1);
  carro.y = 300
  pista.velocityX = 0
  gameover.visible = true
  boton.visible = true
  

}
if(touches.length>0||mousePressedOver(boton)){
  reset();
  //touches = []
 }
  drawSprites();

  textSize = 40
  fill("blue")
  text("Puntuacion:"+score,20,50)
}
function obstacles () {
  if(frameCount %100 === 0){
  obstacles1 = createSprite(1300,200,width/2,50);
  obstacles1.velocityX = -6
  obstacles1.y = Math.round(random(100,600))
  var rand = Math.round(random(1,4))
  switch(rand){
    case 1:obstacles1.addImage(troncoImg)
    break;

    case 2:obstacles1.addImage(rocaImg)
    break;

    case 3:obstacles1.addImage(carrorImg)
    break;

    case 4:obstacles1.addImage(carro2Img)
    break;
    default:break
  }
  obstacles1group.add(obstacles1)
  obstacles1.scale = 0.5
  obstacles1.lifetime = 300
  }
}

function recompenzas () {
  if(frameCount %150 === 0){
  recompenza = createSprite(1300,250,width/2,50);
  recompenza.addImage(recompenzaImg)
  recompenza.velocityX = -6
  recompenza.y = Math.round(random(100,500))
  recompenzaGroup.add(recompenza)
  recompenza.scale = 0.5

  recompenza.lifetime = 300
  }
}
 function reset () {
 carro.changeAnimation("carro",carroImg);
 obstacles1group.destroyEach();
 recompenzaGroup.destroyEach();
 gamestate = PLAY
 score = 0
}