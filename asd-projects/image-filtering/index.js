// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
   applyFilter(reddify); 
   applyFilterNoBackground(decreaseBlue);
   applyFilterNoBackground(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var i = 0; i < image.length; i++) {
    var row = image [i];
    for (var c = 0; c < row.length; c++) {
      var rgbString = image[i][c];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers); 
      image[i][c] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  backgroundColor = image[0][0]; 
  for (var i = 0; i < image.length; i++) {
    var row = image [i];
    for (var c = 0; c < row.length; c++) {
      if(image[i][c] !== backgroundColor){
      var rgbString = image[i][c];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][c] = rgbString;
      }
    }
  }
}
// TODO 5: Create the keepInBounds function
function keepInBounds(limit){
  var result = Math.max(limit, 0)
  result = Math.min(result, 255)
  return result; 
}
// TODO 3: Create reddify function
function reddify(change){
  change[RED]=200;
}
// TODO 6: Create more filter functions
 function decreaseBlue(change){
  change[BLUE] = keepInBounds(change[BLUE] - 50); 
 }
 function increaseGreenByBlue(change){
  change[GREEN] = keepInBounds(change[BLUE] + change[GREEN])
 }
// CHALLENGE code goes below here