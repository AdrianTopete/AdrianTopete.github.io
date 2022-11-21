/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
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
  var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
  };
  var updatedScore1 = 0; 
  var updatedScore2 = 0; 
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
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
    wallCollision(Ball)
    wallCollision(Lpaddle);
    wallCollision(Rpaddle); 
    doCollide(Ball, Lpaddle);
    doCollide(Ball, Rpaddle); 
    bounce(); 
    endGame(); 
  }
  //boarder 
  
  /* 
  
  Called in response to events.
  */
  function handleKeyDown(event) {
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
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    if(updatedScore1 === 10 || updatedScore2 === 10){
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
    }
  }

  function Item(id){
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
  
  
  function repositionGameItem(item){
    item.x += item.speedX;
    item.y += item.speedY; 
    $(item.id).css("left", item.x); 
    $(item.id).css("top", item.y);   
  }
  
  function startBall(){
  Ball.x = 650; 
  Ball.y = 325; 
  Ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  Ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }
  
  function wallCollision(item) {
    if (item.x < 0) {
      item.x = 0;
      updatedScore1 +=1; 
      $("#score1").text(updatedScore1);
      startBall();     
    }
    if (item.y < 0) {
      item.y = 0;
    }
    if (item.x + item.width > BOARD_WIDTH) {
      item.x = BOARD_WIDTH-item.height;
      updatedScore2 +=1; 
      $("#score2").text(updatedScore2);
      startBall();  
    }
    if (item.y + item.height > BOARD_HEIGHT) {
      item.y = BOARD_HEIGHT-item.height ;
    }
  } 

  function doCollide(item1, item2){
    if (item1.x + item1.width >= item2.x &&
      item1.x <= item2.x + item2.width &&
      item1.y + item1.height >= item2.y &&
      item1.y <= item2.y + item2.height){
        return true;
      }
    else{
        return false;
        
    }
  }

  function bounce(){
    if (doCollide(Ball, Lpaddle)) {
      Ball.speedX = -Ball.speedX;
      Ball.speedX += 1;
      console.log(Ball.speedX);
    }
    if (doCollide(Ball, Rpaddle)){
      Ball.speedX = -Ball.speedX;
      Ball.speedX -= 1; 
      console.log(Ball.speedX);
    }
    if (Ball.y > 0) {
      Ball.speedY = -Ball.speedY;
    }
    if (Ball.y + Ball.height < BOARD_HEIGHT){
      Ball.speedY = -Ball.speedY; 
    }
  }
}

