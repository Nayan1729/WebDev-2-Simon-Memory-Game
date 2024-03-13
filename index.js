var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var userChosenColour;
var flag=false;
$("body").bind("keydown touchstart",function(){
    if(!started && !flag)
    {
        flag= true;
        started =true;
        setTimeout(function(){
             nextSequence();
            flag=false;
        },100);
       
    }
});
$(".btn").bind("click touchstart",function(){
    if(started && !flag)
    {
        flag=true;
        setTimeout(function(){
             var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        sound(userChosenColour);
        animationOnPress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
            flag=false;
        });
       
    }
})
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    sound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);;
}

function sound(soundName)
{
    var audio = new Audio("./sounds/"+soundName+".mp3");
    audio.play();
}
function animationOnPress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function checkAnswer(colorChosenInALevel){
    if(userClickedPattern[colorChosenInALevel] === gamePattern[colorChosenInALevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        gameOver();
    }
}
function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
    sound("wrong");
    $("#level-title").text("Game over!!! Press any key to restart");
    level=0;
    gamePattern= [];
    started = false;
}
