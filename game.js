const buttonColours = ["red", "blue", "green", "yellow"];

const gamePattern = [];
const userClickedPattern = [];

var started = false;
var level = 0;

$("body").on( "keypress", function() {
    if (!started) {
    nextSequence();
    started = true;
    }
});


$( ".btn" ).on( "click", function() {

    var userChosenColour = this.id;
    userClickedPattern.push( userChosenColour );
    
    playSound( userChosenColour );

    animatePress( userChosenColour );

    checkAnswer( userClickedPattern.length - 1 );

});

function checkAnswer ( currentLevel ) {
    
    if ( gamePattern[ currentLevel ] === userClickedPattern[ currentLevel ] ) {
    
        console.log( "success" );

        if ( gamePattern.length === userClickedPattern.length ) {

        setTimeout( function() {
            nextSequence();
        }, 1000);

        };

    } else {
        console.log( "wrong" );
        var wrong = new Audio("./sounds/wrong.mp3");
	    wrong.play();
        $("body").addClass("game-over");
        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    };

};

function nextSequence() {
    
    userClickedPattern.length = 0;

    level++

    if (level === 0) {
        $("h1").text("Level 0");
    } else { 
        $("h1").text(`Level ${level}`);
    };

    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColour = buttonColours[randomNumber];
    gamePattern.push(chosenColour);

    $("#" + chosenColour).animate({opacity:0}, 100 );
    playSound(chosenColour);

    setTimeout(function(){
    $("#" + chosenColour).animate({opacity:1}, 100 );
    }, 100);

};

function playSound(soundEvent) {
    var sound = new Audio("./sounds/" + soundEvent + ".mp3");
	sound.play();
};

function animatePress(currentColour) {

    $( "#" + currentColour ).addClass("pressed");
    setTimeout(function(){
    $( "#" + currentColour ).removeClass("pressed");
    }, 100);

};

function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = false;
    // $("h1").text("Press A Key to Start");
};