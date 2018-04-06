'use strict'

//Robado del boiler plate de André

function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
}

function main () {
 var mainContent = document.getElementById("main-content");

  
  
  //--------------Intro and Instructions Screen--------//
  
  var introScreen = null;
  var startGameButton = null;
  
  //--------------- Kills the splash screen and loads the game screen ----------//
  
  function handleStartGame() {
    destroyIntroScreen();
    buildGameScreen();
  };

  //----------------------Opens Intro screen ------------------//
  
  function buildIntroScreen(){
    
    introScreen = createHtml(`<div id="intro">
      <h1>Hungry Greta is hungry</h1>
      <div id="intro-background"><img src="./images for the game/greta-sunglasses.png"></div>
      <div class ="button-div"><button>Start game </button></div>
      <div id="instructions">
        <p>Help Greta reach the donuts.</p>
        <p>Move her using the W and S keys and try to grab a bite with K</p>
        <p>You have 10 trys. If you fail, she'll pee on your bed.</p>
      </div>
    </div>`);

    mainContent.appendChild(introScreen);
    startGameButton = introScreen.querySelector("button");
    startGameButton.addEventListener("click", handleStartGame);
  };
    
  
  //-------------Leaves the Intro screen and removes the button  event listener ----------------------//
  
  function destroyIntroScreen() {
    introScreen.remove();
    startGameButton.removeEventListener('click', handleStartGame);
  };


  //----------------Adds the the game div with the whole game.-----------------//

  function buildGameScreen() {
    var game = new Game(mainContent);
    game.build();
  
    game.onEnded(function(isWin, score) {
      endGame(isWin, score);
    });
  };
  

  //------------ Finishes the game and loads the End Game screen --------------------//

  function endGame(isWin, score) {
    // destroyGameScreen();
    buildEndGameScreen(isWin, score);
  };

  var endGameScreen = null;
  var restartGameButton = null;

  //---------- creates the end game screen ---------------//

  function buildEndGameScreen(isWin, score) {
      if (isWin) {
      endGameScreen = createHtml(` <div id="end-game">
      <h1 class="win">Yaaaaay!! The donuts are in her belly and you on her heart!</h1>
      <div id="end-background"><img src="./images for the game/greta-champion.png"></div>
      <h1>You scored `+score+`</h1>
       <div class ="button-div"><button>Click here to play again</button></div>
    </div>`);
    } else {
      endGameScreen = createHtml(` <div id="end-game">
     <h2 class="lose">Poor Brown Potato, better luck next time.</h2>
      <div id="end-background"><img src="./images for the game/greta-game-over image.png"></div>
      <div class="button-div"><button>Click here to play again</button></div>
      </div>`);
    }

    mainContent.appendChild(endGameScreen);
    restartGameButton = endGameScreen.querySelector('button');
    restartGameButton.addEventListener('click', restartGame);
  };


  function destroyEndGameScreen() {
    endGameScreen.remove();
    restartGameButton.removeEventListener('click', restartGame);
  };

  //------------------- restarts the game -------------//
  function restartGame() {
    destroyEndGameScreen();
    buildIntroScreen();
  };

  //--------------Start the game--------------//

  buildIntroScreen();
  
};

window.addEventListener("load", main);  
