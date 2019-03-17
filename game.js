
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  //select random color and push to gamePattern
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //blink color
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);

  //play color audio
  var sound = new Audio("sounds/" + randomChosenColor + ".mp3");
  sound.play();
}
