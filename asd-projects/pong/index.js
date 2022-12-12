/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  // Game Item Objects
  var Lpaddle = Item("#leftPaddle");
  var Rpaddle = Item("#rightPaddle");
  var Ball = Item("#ball");
  var end = false;
  var fm = false;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  };
  var updatedScore1 = 0;
  var updatedScore2 = 0;
  var button = $("#b");
  var button1 = $("#buttonm1");
  var button2 = $("#buttonm2");
  var button3 = $("#buttonm3");
  var button4 = $("#buttonm4");
  var pause = false;
  var originx = 70;
  var originy = 275;
  var originx2 = 1200;
  var originy2 = 275;

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  button.on("click", handleButtonClick);
  button1.on("click", handleButtonClick1);
  button2.on("click", handleButtonClick2);
  button3.on("click", handleButtonClick3);
  button4.on("click", handleButtonClick4);
  // button5.on("click", handleButtonClick5);
  startBall();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(Lpaddle);
    repositionGameItem(Rpaddle);
    repositionGameItem(Ball);
    wallCollision(Ball);
    wallCollision(Lpaddle);
    wallCollision(Rpaddle);
    doCollide(Ball, Lpaddle);
    doCollide(Ball, Rpaddle);
    hitL = collisionSide(Ball, Lpaddle);
    hitR = collisionSide(Ball, Rpaddle);
    bounce();
    endGame();
  }
  //boarder

  /* 
  
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (fm === true) {
      if (event.which === KEY.LEFT) {
        Rpaddle.speedX = -10;
      }
      if (event.which === KEY.RIGHT) {
        Rpaddle.speedX = 10;
      }
      if (event.which === KEY.A) {
        Lpaddle.speedX = -10;
      }
      if (event.which === KEY.D) {
        Lpaddle.speedX = 10;
      }
    }
    if (event.which === KEY.UP) {
      Rpaddle.speedY = -10;
    }
    if (event.which === KEY.DOWN) {
      Rpaddle.speedY = 10;
    }
    if (event.which === KEY.W) {
      Lpaddle.speedY = -10;
    }
    if (event.which === KEY.S) {
      Lpaddle.speedY = 10;
    }
  }

  function handleKeyUp(event) {
    if (fm === true) {
      if (event.which === KEY.LEFT) {
        Rpaddle.speedX = 0;
      }
      if (event.which === KEY.RIGHT) {
        Rpaddle.speedX = 0;
      }
      if (event.which === KEY.A) {
        Lpaddle.speedX = 0;
      }
      if (event.which === KEY.D) {
        Lpaddle.speedX = 0;
      }
    }
    if (event.which === KEY.UP) {
      Rpaddle.speedY = 0;
    }
    if (event.which === KEY.DOWN) {
      Rpaddle.speedY = 0;
    }
    if (event.which === KEY.W) {
      Lpaddle.speedY = 0;
    }
    if (event.which === KEY.S) {
      Lpaddle.speedY = 0;
    }
  }

  function handleButtonClick() {
    updatedScore1 = 0;
    updatedScore2 = 0;
    $("#score1").text(updatedScore1);
    $("#score2").text(updatedScore2);
    startBall();
    if (end === true) {
      interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
      end = false;
    }
    fm = false;
    Lpaddle.x = originx;
    Lpaddle.y = originy;
    Rpaddle.x = originx2;
    Rpaddle.y = originy2;
  }
  function handleButtonClick1() {
    if (Ball.speedX > 0) {
      Ball.speedX += 1;
    }
    if (Ball.speedY > 0) {
      Ball.speedY += 1;
    }
    if (Ball.speedX < 0) {
      Ball.speedX -= 1;
    }
    if (Ball.speedY < 0) {
      Ball.speedY -= 1;
    }
  }
  function handleButtonClick2() {
    if (Ball.speedX < 0) {
      if (Ball.speedX > -1) {
        Ball.speedX = Ball.speedX;
      } else {
        Ball.speedX += 1;
      }
    }
    if (Ball.speedY < 0) {
      if (Ball.speedY > -1) {
        Ball.speedY = Ball.speedY;
      } else {
        Ball.speedY += 1;
      }
    }
    if (Ball.speedX > 0) {
      if (Ball.speedX < 1) {
        Ball.speedX = Ball.speedX;
      } else {
        Ball.speedX -= 1;
      }
    }
    if (Ball.speedY > 0) {
      if (Ball.speedY < 1) {
        Ball.speedY = Ball.speedY;
      } else {
        Ball.speedY -= 1;
      }
    }
  }

  function handleButtonClick3() {
    if (pause === false) {
      clearInterval(interval);
      pause = true;
      $("#score2").text("PAUSE");
      $("#score1").text("");
    } else if (pause === true) {
      interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
      pause = false;
      $("#score2").text(updatedScore2);
      $("#score1").text(updatedScore1);
    }
  }

  function handleButtonClick4() {
    if (fm === true) {
      fm = false;
    } else {
      fm = true;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function endGame() {
    if (updatedScore1 === 10 || updatedScore2 === 10) {
      // stop the interval timer
      clearInterval(interval);
      end = true;
      // turn off event handlers
      if (updatedScore1 === 10) {
        $("#score2").text("GREEN WON!");
        $("#score1").text(" ");
      } else {
        $("#score2").text("BLUE WON!");
        $("#score1").text(" ");
      }
    }
  }

  function Item(id) {
    var item = {};
    item.id = id;
    item.x = parseFloat($(id).css("left"));
    item.y = parseFloat($(id).css("top"));
    item.width = $(id).width();
    item.height = $(id).height();
    item.speedX = 0;
    item.speedY = 0;
    return item;
  }

  function repositionGameItem(item) {
    item.x += item.speedX;
    item.y += item.speedY;
    $(item.id).css("left", item.x);
    $(item.id).css("top", item.y);
  }

  function startBall() {
    Ball.x = 650;
    Ball.y = 325;
    Ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    Ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function wallCollision(item) {
    if (item.x < 0) {
      item.x = 0;
      updatedScore1 += 1;
      $("#score1").text(updatedScore1);
      startBall();
    }
    if (item.y < 0) {
      item.y = 0;
    }
    if (item.x + item.width > BOARD_WIDTH) {
      item.x = BOARD_WIDTH - item.height;
      updatedScore2 += 1;
      $("#score2").text(updatedScore2);
      startBall();
    }
    if (item.y + item.height > BOARD_HEIGHT) {
      item.y = BOARD_HEIGHT - item.height;
    }
  }

  function doCollide(item1, item2) {
    if (
      item1.x + item1.width >= item2.x &&
      item1.x <= item2.x + item2.width &&
      item1.y + item1.height >= item2.y &&
      item1.y <= item2.y + item2.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  function bounce() {
    if (Ball.y > 0) {
      Ball.speedY = -Ball.speedY;
    }
    if (Ball.y + Ball.height < BOARD_HEIGHT) {
      Ball.speedY = -Ball.speedY;
    }
    if (hitL === "right") {
      Ball.speedX = -Ball.speedX + 1;
    }
    if (hitL === "left") {
      Ball.speedX = Ball.speedX;
    }
    if (hitL === "top") {
      Ball.speedY = -Ball.speedY;
    }
    if (hitL === "bottom") {
      Ball.speedY = -Ball.speedY;
    }
    if (hitR === "right") {
      Ball.speedX = Ball.speedX;
    }
    if (hitR === "left") {
      Ball.speedX = -Ball.speedX - 1;
    }
    if (hitR === "top") {
      Ball.speedY = -Ball.speedY;
    }
    if (hitR === "bottom") {
      Ball.speedY = -Ball.speedY;
    }
  }

  function collisionSide(ball, paddle) {
    if (!doCollide(ball, paddle)) {
      return "none";
    }

    // get the center values
    var centerxB = ball.x + ball.width / 2;
    var centeryB = ball.y + ball.height / 2;
    var centerxP = paddle.x + paddle.width / 2;
    var centeryP = paddle.y + paddle.height / 2;

    // get the ratio of width to height for the paddle
    var ratioP = paddle.width / paddle.height;

    // get normalized coordinates for the ball with respect to the paddle
    var normalxB = centerxB - centerxP;
    var normalyB = (centeryB - centeryP) * ratioP;
    // determine if the ball is relatively more left or right than up or down
    var leftRight = Math.abs(normalxB) > Math.abs(normalyB);

    // if more left or right, then decide which side it was on compared to the paddle
    if (leftRight) {
      if (normalxB > 0) {
        return "right";
      }
      return "left";
    }
    // if more up or down, then do the same but for up and down
    else {
      if (normalyB > 0) {
        return "bottom";
      }
      return "top";
    }
  }
}
