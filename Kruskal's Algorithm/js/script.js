
var step = 0;

//document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

canvas.addEventListener("mousedown", getPosition, false);

var rightPressed = false;
var leftPressed = false;


function keyDownHandler(e) {
    if (e.keyCode == 37) {
        rightPressed = true;
        if(step > 0){
            step--;
        }

    } else if (e.keyCode == 39) {
        leftPressed = true;
        if(step < commands.length-1){
            step++;

        }

    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
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
/*
function mouseMoveHandler(e) {
    var x = event.x;
    var y = event.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    if (y > canvas.height / 2 && y < canvas.height / 2 + 25) {
        if (x > 0 && x < 25) {
            step--;
        } else if (x > canvas.width - 25 && x < canvas.width) {
            step++;
        }
    }
}
*/
function drawText(text, size, posX, posY, color) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = size + "px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, posX, posY);
}

function drawArrows() {
    var prev = new Image(100, 100);
    prev.src = 'images/prev.png';
    ctx.drawImage(prev, 0, canvas.height / 2, 25, 25);
    var next = new Image(100, 100);
    next.src = 'images/next.png';
    ctx.drawImage(next, canvas.width - 25, canvas.height / 2, 25, 25);
}

function drawCircle(posX, posY , radius, color){
    ctx.beginPath();
    ctx.arc(posX, posY, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawLine(posX1, posY1, posX2, posY2){
    ctx.beginPath();
    ctx.moveTo(posX1,posY1);
    ctx.lineTo(posX2, posY2);
    ctx.lineWidth = 5;
    ctx.stroke();
}

function drawCurrent(){
    curr = commands[step];
    for(var i = 0; i < curr.length; i++){
        if(curr[i][0] == "t"){
            drawText(curr[i][1], curr[i][2], curr[i][3], curr[i][4], curr[i][5]);
        }else if(curr[i][0] == "dc"){
            drawCircle(curr[i][1], curr[i][2], curr[i][3], curr[i][4]);
        }else if(curr[i][0] == "dl"){
            drawLine(curr[i][1], curr[i][2], curr[i][3], curr[i][4]);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawArrows();
    drawCurrent();


    requestAnimationFrame(draw);
}
draw();