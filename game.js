var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).on("keydown", function()
{
    if(level === 0){nextSequence();}
});



$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
})



function playSound(name)
{
    var audio = new Audio(name + ".mp3");
    audio.play();

}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


function nextSequence() {

    level++;
    $("#level-title").text("Level "+ level);
	var randomNumber = Math.floor(Math.random()*4);    
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    
    for(let a = 0; a < gamePattern.length ; a++){
        setTimeout(function (){
          $("#"+gamePattern[a]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          playSound(gamePattern[a]);
        }, a * 650)
      } 
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("SUCCESS!!");
        if(currentLevel == gamePattern.length -1)
        {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else
    {
        console.log("WRONG!!");
        playSound("wrong");
        $("#level-title").text("Game Over! Press a key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function startOver()
{
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}




