
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

//Detecting first keypress
$(document).on("keydown", function() {
  if(level===0) {
  $("#level-title").text("Level " + level);

  setTimeout(function() {
    nextSequence();
  }, 1000);
  }
});

function nextSequence() {
  //select random color and push to gamePattern
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //blink color
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
  //play color audio
  playSound(randomChosenColor);
  //Level 1 erhöhen und Überschrift anpassen
  level++;
  $("#level-title").text("Level " + level);
  //Set User Array empty again for next level
  userClickedPattern = [];
}

//Save user clicked buttons in var userClickedPattern, adding EventListener
$(".btn").on("click", function(event) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //play corresponding sound
  playSound(userChosenColor);
  //animate clicked buttons
  animatePress(userChosenColor);
  //check the Answer
  checkAnswer(userClickedPattern.length - 1);
});

//Funktion um Sound abzuspielen
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//Animationen für User Clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Check User Answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    wrongAnswer();
    startOver();
  }
}

function wrongAnswer() {
  //playing "wrong sound"
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  //Animation "Wrong"
  $("body").addClass("game-over");
  setTimeout(function(){
  $("body").removeClass("game-over");
  }, 200);
  //Change heading
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver() {
  level = 0;
  gamePattern = [];
}
