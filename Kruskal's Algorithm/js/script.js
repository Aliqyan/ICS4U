
var step = 0;

document.addEventListener("keydown", keyDownHandler, false);

var start = new Date();
var startDate = start.getTime();

function keyDownHandler(e) {
  if (e.keyCode == 39) {
        if(step < changes.length-1){
            step++;
            start = new Date();
            startDate = start.getTime();
        }else{
            step = 0;
        }

    }
}

function getPosition(event) {
    var x = event.x;
    var y = event.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    if (y > canvas.height / 2 && y < canvas.height / 2 + 25) {
        if (x > 0 && x < 25 && step > 0) {
            step--;
        } else if (x > canvas.width - 25 && x < canvas.width && step < commands.length-1) {
            step++;
        }
    }
}

function drawText(text, size, posX, posY, color) {

    ctx.font = size + "px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, posX, posY);
}

function drawCircle(posX, posY , radius, color){
    ctx.beginPath();
    ctx.arc(posX, posY, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawLine(posX1, posY1, posX2, posY2, color, size){
    if(size == null){
        size = 5;
    }
    ctx.beginPath();
    ctx.moveTo(posX1,posY1);
    ctx.lineTo(posX2, posY2);
    ctx.strokeStyle = "#eeeff7";
    ctx.lineWidth = size;
    ctx.stroke();
}


function showCommands(){
    for(x in commands){
        var curr = stack[step][x];

        if(curr != null){
            
                if(curr[0] === "t"){
                drawText(curr[1], curr[2], curr[3], curr[4], curr[5]);
                }else if(curr[0] === "dc"){
                drawCircle(curr[1], curr[2], curr[3], curr[4]);
                }else if(curr[0] === "dl"){
                drawLine(curr[1], curr[2], curr[3], curr[4], curr[5]);
                }
            
        }
    }
}

//create a stack conatining eachs step to seemless transitions
var stack = [];
stack.push(commands);
for(var i = 1; i < changes.length; i++){
    var curr = {};
    for (let key in stack[i-1]) {
        curr[key] = stack[i-1][key];
    }

    for(var j = 0; j < changes[i].length; j++){
        var newCommand = changes[i][j];
        curr[newCommand[0]] = newCommand[1];
    }
    stack.push(curr)
}


function nextCommand(){
    if(times[step] !=-1){
        var curr = new Date();
        var currDate = curr.getTime();
        if(currDate - startDate > times[step]){
            step++;
            start = new Date();
            startDate = start.getTime();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showCommands();
    nextCommand();
    requestAnimationFrame(draw);
}
draw();