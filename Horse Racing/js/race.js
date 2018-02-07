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
    timer = setInterval(draw, 10);

}
function race(){
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
var timer = setInterval(draw, 10);


function distributeBets(){
    var winningPlayers = "";
    var losingPlayers = "";
    for(var i = 0; i<players.length;i++){
        if(players[i].bet !==0 ){
            var hasWon = false;
            for(var j = 0; j<winningAnimals.length;j++){
                if(winningAnimals[j] === players[i].animal){
                    hasWon = true;
                    var winnings = players[i].bet;
                    players[i].wallet += players[i].bet;
                    winningPlayers += players[i].name + ", " ;

                    //mad calculation add
                    break;
                }
            }
        
            if(!hasWon){
                players[i].wallet -= players[i].bet;
                losingPlayers += players[i].name + ", ";
            }
        }

    }
    if(winningPlayers.length !== 0){
        winningPlayers =winningPlayers.substring(0, winningPlayers.length-2);
        $("#final-message").append("<h2>The folowing players have won: " + winningPlayers + "</h2>");
    }
    if(losingPlayers.length !== 0){
        losingPlayers = losingPlayers.substring(0, losingPlayers.length-2);
        $("#final-message").append("<h2>The folowing players have lost: " + losingPlayers+ "</h2>");
    }
    removeBrokePlayers();
}

function removeBrokePlayers(){
    var brokePlayers = "";
            for(var i = players.length-1; i>=0;i--){
                if(players[i].wallet === 0 ){
                    brokePlayers += players[i].name + ", ";
                    players.splice(i, 1);
                }
            }
            if(brokePlayers.length !== 0){
                brokePlayers = brokePlayers.substring(0, brokePlayers.length-2);
                $("#final-message").append("<h2>The folowing players are broke and will be removed: " + brokePlayers + "</h2>");
            }  
    


}

function displayWinningAnimals(){
        var winners = "";
        for(var i = 0; i<winningAnimals.length;i++){
            winners+= winningAnimals[i].name + ", ";
        }

        if(winners.length !== 0){
            winners = winners.substring(0, winners.length-2);
            $("#final-message").append("<h2>The folowing animals have won: " + winners+ "</h2>");
        }       
}
function processRaceEnd(){
        displayWinningAnimals()
        distributeBets();
        removeBrokePlayers();
        resultDialog.dialog("open");
}
