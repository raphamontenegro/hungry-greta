"use strict";

//----------- Game Constructor -----------------//

function Game() {
  var self = this;

  self.player = new Player();
  self.balloons = [];
  self.checkCollision();
  self.shootArrow();
  self.winLose();
  self.setBoard();
}

//---------------- Shoot Arrow Method ---------//

Game.prototype.shootArrow = function() {
  var self = this;
  Arrow.prototype.move();
  Player.prototype.numberOfArrows -= 1;
};

//--------- Collision Behavior-----------//

Game.prototype.checkCollision = function(arrow, balloon) {
  if (arrow.getPosition() === balloon.getPosition()) {
    Balloon.prototype.hasCollided = true;
  } else {
    Balloon.prototype.hasCollided = false;
  }
};

//---------------- Win/Lose Condition ------------------//

Game.prototype.winLose = function(balloon, arrow) {
  if (balloon.length === 0) {
    return true;
  } else {
    return false;
  }
};

//-------------- Player Constructor --------------//

function Player() {
  var self = this;

  self.x = 0;
  self.y = 0;
  self.numberOfArrows = 20;
  self.img = null;
  self.domElem = null;
  self.getPosition();
}

//------------------ Arrow Constructor --------------//

function Arrow() {
  var self = this;
  self.x = 0;
  self.y = 0;
  self.move();
  self.speed();
  self.img = null;
  self.domElem = null;
  self.getPosition();
}

//-------------- Balloon Constructor -------------//

function Balloon() {
  var self = this;
  self.x = 0;
  self.y = 0;
  self.hasCollided = false;
  self.speed();
  self.img = null;
  self.domElem = null;
  self.getPosition();
}

//------------- Set Board ----------//
Game.prototype.setBoard = function() {
  var self = this;

  //------------------ For Loop that creates the divs ----------------------//
  /*
  for (var ix = 1; ix <= 100; ix++) {
    var boardDiv = createHtml(`<div class="board-div"></div>`);
    boardDiv.id = ix;
    mainContent.appendChild(boardDiv);
  }
  */
};
