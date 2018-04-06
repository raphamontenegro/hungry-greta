'use strict'

//-------------- Balloon Constructor -------------//

function Balloon (parentElement) {
  var self = this;

  self.parentElement = parentElement;

  self.x = Math.floor(Math.random()*(document.body.clientWidth - 300)+ 200);
  self.y = /*document.body.clientHeight;*/  Math.floor(Math.random()*(document.body.clientHeight - 300)+ 200);
  self.height = document.body.clientHeight * 0.08;
  self.width = self.height;

  self.hasCollided = false;
  self.img = null;
  self.balloonElement = null;
  self.speed = SPEED;
  self.build(parentElement);
};




//------------------- Creates the balloons ---------------------//

Balloon.prototype.build = function () {
  var self = this;

  self.balloonElement = createHtml(`<div id="balloon-div">
    <img src="./images for the game/greta-balloon-photoshopped.png" height="`+self.height+`" width="`+self.width+`">
    </div>`);

  self.parentElement.appendChild(self.balloonElement);
};

//-------------- Moves the balloon in a vertical axis--------------//

Balloon.prototype.update = function () {
  var self = this;

  self.y += self.hasCollided ? 2 : -1;
};

Balloon.prototype.render = function() {
  var self = this;

  self.balloonElement.style.left = self.x + "px";
  self.balloonElement.style.top = self.y + "px";

  self.balloonElement.style.opacity = self.hasCollided ? 0.5 : 1;
};


Balloon.prototype.destroy = function () {
  var self = this;
  self.balloonElement.remove();
};