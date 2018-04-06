'use strict'
var SPEED = 1;

//----------- Game Constructor -----------------//

function Game (parentElement) {
  var self = this;

  self.parentElement = parentElement;
  self.gameScreenElement = null;

  self.player = null;

  self.arrow = null;
  self.arrowsLeft = 10;
  
  self.balloons = [];

  self.intervalId = null;
  
  self.score = 0;
};


//---------------------------- Creates the game -------------------------//

Game.prototype.build = function () {
  var self = this;


  //------------------------- Will need to add this div somewhere <div id="counter-div">Arrows: 20</div> -----------------------//

  self.gameScreenElement = createHtml(`
    <div id="game-screen">
      <div class="arrows">
        <span class="label">Arrows: </span>
        <span class="value"></span>
      </div> 
      <div class="score">
        <span class="label">Score: </span>
        <span class="value">0</span>
      </div> 
    </div>`);
  

  self.parentElement.appendChild(self.gameScreenElement);
  self.arrowsLeftElement = self.gameScreenElement.querySelector('.arrows .value');
  self.scoreElement = self.gameScreenElement.querySelector(".score .value");


  self.handleKeyDown = function (event) {
    self.handleActions(event);
  }

  self.player = new Player(self.gameScreenElement);

  self.createBalloons();

  document.addEventListener("keydown", self.handleKeyDown);
  
  self.start();
} 


//------------------ Handles all the event listeners of the game ----------------//
Game.prototype.handleActions = function (event) {
  var self = this;
  console.log(event.key);
  
  if (event.key === 'k') {
    self.shootArrow();
  }

  if (event.key === 'w') {
    self.player.direction = 'up';
  } else if (event.key === 's') {
    self.player.direction = 'down';
  }

}


//--------------------- Checks if the game has ended --------------------//
Game.prototype.onEnded = function (cb) {
  var self = this;
  self.callback = cb;
}



//-------------- Win/Lose Condition ----------------------//

Game.prototype.isWin = function() {
  var self = this;
  

  if (self.balloons.length === 0 || self.score >= 100) {
    return true;
  } else {
    return false;
  }
};


//------------------ Creates 10 Balloon objects and adds them to the balloons array ------------//

Game.prototype.createBalloons = function () {
  var self = this;

  for (var i = 0; i < 10; i++) {
    self.balloons.push(new Balloon(self.gameScreenElement));
  };

};


//---------------- Shoot Arrow Method ---------//

Game.prototype.shootArrow = function () {
  var self = this;
  if (!self.arrow) {
    console.log("ok")
    self.createArrow();
    // self.arrowsLeft -= 1;
  }
};


//-------------- Creates a new Arrow -----------------//

Game.prototype.createArrow = function () {
  var self = this;

  self.arrow = new Arrow(self.gameScreenElement, self.player.x, self.player.y);
}


//--------- Collision Behavior-----------//

Game.prototype.checkCollision = function () {
  var self = this;
  
  if (self.arrow && self.arrow.x > document.body.clientWidth) {
    self.arrow.destroy();
    self.arrowsLeft -= 1;
    self.arrowsLeftElement.innerText = self.arrowsLeft;
    self.arrow = null;
  };

  self.balloons.forEach(function(balloon, idx) {
    if (balloon.y <= 0 - balloon.height) {
      balloon.y = document.body.clientHeight;
    }
    if (balloon.y > document.body.clientHeight && balloon.hasCollided) {
      balloon.destroy();
      self.balloons.splice(idx, 1);
    }
  });

  if (self.player.y <= 0 + (document.body.clientHeight * 0.08)) {
    self.player.y = 0 + (document.body.clientHeight * 0.08);
  } else if (self.player.y >= document.body.clientHeight - self.player.size) {
    self.player.y = document.body.clientHeight - self.player.size;
  }

  var snd = new Audio("./images for the game/aud_chomp.mp3"); // buffers automatically when created

  if (self.arrow) {
    var arrowSides = { 
      top: self.arrow.y,
      bottom: self.arrow.y + self.arrow.height,
      left: self.arrow.x,
      right: self.arrow.x + self.arrow.width
    };

    self.balloons.forEach(function (balloon, idx){
      if (balloon.hasCollided) {
        return;
      }
      var balloonSides ={
        top: balloon.y,
        bottom: balloon.y + balloon.height/2,
        left: balloon.x + 20,
        right: balloon.x + balloon.width - 20
      }

      if (balloonSides.left < arrowSides.right && arrowSides.left < balloonSides.right && balloonSides.top < arrowSides.bottom && arrowSides.top < balloonSides.bottom) {
          snd.play();
          balloon.hasCollided = true;
          self.score += 10;
          self.scoreElement.innerText = self.score;
          // console.log(self.balloons.length, "Collision!");
        }
    });
  }
};


//---------------- Checks if the game has ended ------------------//

Game.prototype.isOver = function () {
  var self = this;

  if (self.balloons.length === 0 && self.arrowsLeft != 0) {
    self.createBalloons();

  } else if (self.balloons.length === 0 && !self.arrow || self.arrowsLeft === 0) {
    console.log("ended");
    return true;
  } else {
    return false;
  }
};


//----------------- Updates the game and all of the pieces positions ---------------/

Game.prototype.update = function() {
  var self = this;
  self.checkCollision();
  self.player.update();

  if (self.arrow) {
    self.arrow.update();
  }

  self.balloons.forEach(function (balloon) {
    balloon.update();
  });

};


//---------------- Renders the objects of the game ------------------//

Game.prototype.render = function () {
  var self = this;
  self.player.render();

  if (self.arrow) { 
    self.arrow.render();
  }

  self.balloons.forEach(function(item) {
    item.render();
  })
}


//------------------- Starts the game -----------------------//

Game.prototype.start = function () {
  var self = this;
  self.arrowsLeftElement.innerText = self.arrowsLeft;
  self.intervalId = window.setInterval(function (){
    self.update();
    self.render();
    //debugger;
    if (self.isOver()) {
      clearInterval(self.intervalId);
      // document.removeEventListener("keydown", self.handleKeyDown);
      self.destroy()
      self.callback(self.isWin(), self.score);
    }
  }, 10)
};


//---------------------- Destroys the game ----------------------//

Game.prototype.destroy = function () {
  var self = this;
  self.gameScreenElement.remove();
}