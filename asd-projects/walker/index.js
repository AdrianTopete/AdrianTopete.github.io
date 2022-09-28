/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var origin = 0; // origin position for "walker"
  var origin2 = 390; // origin position for "walker2"
  var positionX = 0; // the x-coordinate location for walker
  var positionY = 0; // the y-coordinate lacation for walker
  var speedX = 0; // the speed for walker along the x-axis
  var speedY = 0; // the speed for walker along the y-axis
  var positionX2 = 390; // the x-coordinate location for walker2
  var positionY2 = 390; // the y-coordinate location for walker2
  var speedX2 = 0; // the speed for walker2 along the x-axis
  var speedY2 = 0; // the speed for walker2 along the y-axis
  var i = Math.random(10); // variable used to randomly determine who is "it" first 
  var teal = jQuery("#teal"); // assigns "teal" variable to the same class
  var green = jQuery("#green"); // assigns "green" variable to the same class
  var points = 0; // keeps track of "walker" points
  var points2 = 0; // keeps track of "walker2" points

  // Game Item Objects
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp); // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    border();
    playersCollide();
    final();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //recognizes and displays to the console what key is being pressed
    if (event.which === KEY.LEFT) {
      speedX = -5;
    }
    if (event.which === KEY.UP) {
      speedY = -5;
    }
    if (event.which === KEY.RIGHT) {
      speedX = 5;
    }
    if (event.which === KEY.DOWN) {
      speedY = 5;
    }
    if (event.which === KEY.A) {
      speedX2 = -5;
    }
    if (event.which === KEY.W) {
      speedY2 = -5;
    }
    if (event.which === KEY.D) {
      speedX2 = 5;
    }
    if (event.which === KEY.S) {
      speedY2 = 5;
    }
  }
  function handleKeyUp(event) {
    //recognizes and displays to the console if key is not being pushed
    if (event.which === KEY.LEFT) {
      speedX = 0;
    }
    if (event.which === KEY.UP) {
      speedY = 0;
    }
    if (event.which === KEY.RIGHT) {
      speedX = 0;
    }
    if (event.which === KEY.DOWN) {
      speedY = 0;
    }
    if (event.which === KEY.A) {
      speedX2 = 0;
    }
    if (event.which === KEY.W) {
      speedY2 = 0;
    }
    if (event.which === KEY.D) {
      speedX2 = 0;
    }
    if (event.which === KEY.S) {
      speedY2 = 0;
    }
  }
  function border() {
    //keeps "walker" and "walker2" inside the border
    if (positionX < 0) {
      speedX = 0;
      positionX = 0;
    }
    if (positionY < 0) {
      speedY = 0;
      positionY = 0;
    }
    if (positionX > 390) {
      speedX = 0;
      positionX = 390;
    }
    if (positionY > 390) {
      speedY = 0;
      positionY = 390;
    }
    if (positionX2 < 0) {
      speedX2 = 0;
      positionX2 = 0;
    }
    if (positionY2 < 0) {
      speedY2 = 0;
      positionY2 = 0;
    }
    if (positionX2 > 390) {
      speedX2 = 0;
      positionX2 = 390;
    }
    if (positionY2 > 390) {
      speedY2 = 0;
      positionY2 = 390;
    }
  }
  function playersCollide() {
    // detects if "walker" and "walker2" collide and repositions them into opposites corners
    if (
      positionX + 50 >= positionX2 &&
      positionX <= positionX2 + 50 &&
      positionY + 50 >= positionY2 &&
      positionY <= positionY2 + 50 &&
      f === 1
    ) {
      positionX = origin;
      positionY = origin;
      positionX2 = origin2;
      positionY2 = origin2;
      f = 2;
      points = points + 1;
      changeTealText("Teal: " + points);
      $("#walker").css("background-color", "teal");
      $("#walker2").css("background-color", "red");
    }
    if (
      positionX + 50 >= positionX2 &&
      positionX <= positionX2 + 50 &&
      positionY + 50 >= positionY2 &&
      positionY <= positionY2 + 50 &&
      f === 2
    ) {
      positionX = origin;
      positionY = origin;
      positionX2 = origin2;
      positionY2 = origin2;
      f = 1;
      points2 = points2 + 1;
      changeGreenText("Green: " + points2);
      $("#walker").css("background-color", "red");
      $("#walker2").css("background-color", "greenyellow");
    }
  }
  function it() {
    // determines who is "it" and makes them red
    if (i < 0.5) {
      $("#walker").css("background-color", "red");
      f = 1;
      return f;
    } else {
      $("#walker2").css("background-color", "red");
      f = 2;
      return f;
    }
  }
  function final() {
    // displays the winner, changes the text to match, and ends the game
    if (points === 10) {
      endGame();
      changeTealText("Teal Wins!");
      changeGreenText("Refresh to play again");
    }
    if (points2 === 10) {
      endGame();
      changeTealText("Green Wins!");
      changeGreenText("Refresh to play again");
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  it(); // determines which player is "it" first

  function repositionGameItem() {
    // determines the position of "walker" and "walker2"
    positionX += speedX;
    positionY += speedY;
    positionX2 += speedX2;
    positionY2 += speedY2;
  }
  function redrawGameItem() {
    $("#walker").css("left", positionX); // draw "walker" in the new location, positionX pixels away from the "left"
    $("#walker").css("top", positionY); // draw "walker" in the new location, positionY pixels away from the "top"
    $("#walker2").css("left", positionX2); // draw "walker2" in the new location, positionX pixels away from the "left"
    $("#walker2").css("top", positionY2); // draw "walker2" in the new location, positionY pixels away from the "top"
  }
  function changeTealText(newText) {
    // controls what Teal's score displays
    teal.text(newText);
  }
  function changeGreenText(newText) {
    // controls what Green's score displays
    green.text(newText);
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
