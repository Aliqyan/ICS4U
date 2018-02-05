var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var animalsize = 48;
var finishLine = 1275;
var isRacing = false;
var raceOver = false;
var winningAnimals = [];
var winningPlayers = [];

function innitializeRace(){
    animalsize = 48;
    finishLine = 1275;
    isRacing = false;
    raceOver = false;
    winningAnimals = [];
    winningPlayers = [];
}
function race(){
    loadAnimals();
    isRacing = true;
}

function loadAnimals(){
    var track = Math.floor(4-animals.length/2);
    for(var i = 0; i<animals.length; i++){
        
        animals[i].sX = Math.floor(Math.random()*4)*(3*48);
        animals[i].sY = Math.floor(Math.random()*2)*(4*48)+ 96;
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
        animals[i].x += Math.random() * 100 * (1 + animals[i].ranking/10 );//(animals[i].rank/10));
        animals[i].sprite++;
        animals[i].sprite %= 3;
        if(animals[i].x > finishLine){
            raceOver = true;
            winningAnimals.push(animals[i]);
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

    function findWinningPlayers(){
        for(var i = 0; i<players.length;i++){
            for(var j = 0; j<winningAnimals.length; j++){
                if(players[i].animal === winningAnimals[j]){
                    winningPlayers.push(players[i]);
                }
            }
        }
    }
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(raceOver){
        var winners = "";
        for(var i = 0; i<winningAnimals.length-1;i++){
            winners+= winningAnimals[i].name + ", ";
        }
        winners += winningAnimals[winningAnimals.length-1].name;
        //findWinningPlayers();
        alert("Horses: " + winners);
        distributeBets();
        console.log('ed')
        reset();
    }else if(isRacing){
        updateAnimals();
        drawFinishLine();
        drawTrackLines();
        drawAnimals();
    }
}
setInterval(draw, 80);


function distributeBets(){
    //give bets back
}
