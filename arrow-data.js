'use strict'

//------------------ Arrow Constructor --------------//

function Arrow (parentElement, playerPositionX, playerPositionY) {
  var self = this;
  
  self.parentElement = parentElement;

  self.x = playerPositionX;
  self.y = playerPositionY + 25;
  self.height = document.body.clientHeight * 0.12;
  self.width = self.height;

  self.speed =  4 * SPEED;
  self.img = null;
  self.arrowElement = null;

  self.build(parentElement);
};


//----------------- Builds the arrow element ---------------//

Arrow.prototype.build = function (parentElement) {
  var self = this;

  self.arrowElement = createHtml(`<div id="arrow-div">
    <img src="./images for the game/greta-arrow-1.png" height="` + self.height + `" width="` + self.width + `">
    </div>`);

  self.parentElement.appendChild(self.arrowElement);
}

//-------------- Moves the arrow in an horizontal axis--------------//

Arrow.prototype.update = function () {
  var self = this;
  self.x += 1 * self.speed;
};

Arrow.prototype.render = function() {
  var self = this;
  self.arrowElement.style.left = self.x + "px";
  self.arrowElement.style.top = self.y + "px";
};


Arrow.prototype.destroy = function() {
  var self = this;
  self.arrowElement.remove();
};