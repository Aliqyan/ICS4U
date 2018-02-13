var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var animalsize = 48;
var finishLine = 1075;
var isRacing = false;
var raceOver = false;
var winningAnimals = [];

function innitializeRace(){
    isRacing = false;
    raceOver = false;
    winningAnimals = [];
    winningPlayers = [];
    $("#final-message").empty();
     $("#final-message").append("<p id = 'display-winner'></p> <div id = 'display-winner'></div>");

    timer = setInterval(draw, 60);

}
function race(){
    $("#background-opacity").show();

    loadAnimals();
    isRacing = true;
}

function loadAnimals(){

    var track = Math.floor(4-animals.length/2);
    for(var i = 0; i<animals.length; i++){
        
        animals[i].sX = ((animals[i].picNum-1)%4)*(3*48);
        animals[i].sY = Math.floor((animals[i].picNum-1)/4)*(4*48)+ 96;
        animals[i].x = 0;
        animals[i].y = 80*(i+track)-20;

        animals[i].sprite = 0;
    }
        //ctx.drawImage(img, (bear.type * 3 + c) * bear.x, bear.y, width, height, bear.xPos, bear.yPos, 90, 45);
    
}
function drawAnimals(){
    for(var i = 0; i<animals.length; i++){
        var img = new Image();
        img.src = 'images/'+ animals[i].type +'.png';
        var a = animals[i];
        ctx.drawImage(img, a.sX + 48*a.sprite +1, a.sY+1, 46, 46, a.x, a.y, 100, 100);
     }
}

function updateAnimals(){

    for(var i = 0; i< animals.length; i++){
        animals[i].x += Math.random() * 8 * (1 + animals[i].ranking/10 );//(animals[i].rank/10));
        animals[i].sprite++;
        animals[i].sprite %= 3;
        if(animals[i].x > finishLine){
            raceOver = true;
            winningAnimals.push(animals[i]);
            clearInterval(timer);
            processRaceEnd();
        }
    }
}

function drawFinishLine(){
    for(var i=0; i< 2; i++){
        ctx.beginPath();
        ctx.moveTo(finishLine+10*i, 0);
        ctx.lineWidth=5;
        ctx.strokeStyle ="#fff";
        ctx.lineTo(finishLine+10*i, canvas.height);
        ctx.stroke();
    }

}
function drawTrackLines(){
    for(var i=0; i< 8; i++){
        ctx.beginPath();
        ctx.moveTo(0, i*82);
        ctx.lineWidth=5;
        ctx.strokeStyle ="#fff";
        ctx.lineTo(canvas.width, i*82);
        ctx.stroke();
    }

}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(isRacing && !raceOver){
        updateAnimals();
    }
    drawFinishLine();
    drawTrackLines();
    drawAnimals();
}
var timer = setInterval(draw, 60);


function distributeBets(){
    var winningPlayers = [];
    var losingPlayers = [];
    for(var i = 0; i<players.length;i++){
        if(players[i].bet !==0 ){
            var hasWon = false;
            for(var j = 0; j<winningAnimals.length;j++){
                if(winningAnimals[j] === players[i].animal){
                    hasWon = true;
                    var winnings = players[i].bet;
                    players[i].reward = Math.floor(players[i].bet * (2.5/players[i].animal.ranking));
                    players[i].wallet += players[i].reward;
                    winningPlayers.push(players[i]);

                    //mad calculation add
                    break;
                }
            }
        
            if(!hasWon){
                players[i].wallet -= players[i].bet;
                losingPlayers.push(players[i]);
            }
        }

    }
        for(var i = 0; i<winningPlayers.length;i++){
            $("#final-message").append("<p>Congratulations, " + winningPlayers[i].name + ". After you have won $" + winningPlayers[i].reward + ", adjusted for animal ranking, your new wallet amount is $" + winningPlayers[i].wallet + ".</p>");
        }
    
        for(var i = 0; i<losingPlayers.length;i++){
            var removalMessage = "";
            if(losingPlayers[i].wallet === 0 ){
                removalMessage = "As you are broke you will be removed from the game.";
            }
            $("#final-message").append("<p>Sorry, " + losingPlayers[i].name + ". You have lost $" + losingPlayers[i].bet + ", your new wallet amount is $" + losingPlayers[i].wallet + ". " + removalMessage + "</p>");
        }
        removeBrokePlayers();
}

function removeBrokePlayers(){
            for(var i = players.length-1; i>=0;i--){
                if(players[i].wallet === 0 ){
                    players.splice(i, 1);
                }
            }
}

function displayWinningAnimals(){
        $("#text-winner").append("The folowing animals have won: ");
        for(var i = 0; i<winningAnimals.length;i++){
            var imgSrc = 'images/faces/' + winningAnimals[i].type + winningAnimals[i].picNum + 'face.png';
            $("#display-winner").append("<div><img class ='animHeadShot' src = '" + imgSrc + "'><h3>"
             + winningAnimals[i].name + "</h3><h4> the "+winningAnimals[i].type+"</h4><h4> Rank: "+winningAnimals[i].ranking+"</h4></div>");        
        }
}
function processRaceEnd(){
    console.log(winningAnimals)
        displayWinningAnimals()
        distributeBets();
        removeBrokePlayers();
        $("#background-opacity").css("z-index", 3);

        resultDialog.dialog("open");
}
