var a=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

$(".btn").click(function(){
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);

        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    })


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    console.log("User input: "+ userClickedPattern);
    console.log("Game pattern: "+ gamePattern)
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success")
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");
  
        playSound("wrong");
  
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        }

       
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    }

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomColor=a[randomNumber];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeOut(150).fadeIn(150);

    var audio = new Audio("sounds/"+randomColor+".mp3");
    audio.play();

}