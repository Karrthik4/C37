var canvas,backgroundImg;
var gameState = 0;
var playerCount;
var database;
var form,player,game;
var allPlayers;

var cars, car1, car2, car3, car4;

function setup(){
  canvas = createCanvas(displayWidth-500,displayHeight-250);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount === 4){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }
}
