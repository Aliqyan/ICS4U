//keeps track of what slide to display
var step = 0;
document.addEventListener("keydown", keyDownHandler, false);

//keep track of time for automatic slides
var start = new Date();
var startDate = start.getTime();

//create a stack conatining eachs step(slide) to ensure seemless transitions
var stack = [];
stack.push(commands);
for (var i = 1; i < changes.length; i++) {
    //coppies the commands in previous step
    var curr = {};
    for (let key in stack[i - 1]) {
        curr[key] = stack[i - 1][key];
    }
    //add the new commands for this step
    for (var j = 0; j < changes[i].length; j++) {
        var newCommand = changes[i][j];
        curr[newCommand[0]] = newCommand[1];
    }
    stack.push(curr)
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        if (step < changes.length - 1) {
            step++;
            //reset the starting time
            start = new Date();
            startDate = start.getTime();
        } else {
            step = 0;
        }
    }
}

function drawText(text, size, posX, posY, color) {
    ctx.font = size + "px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, posX, posY);
}

function drawCircle(posX, posY, radius, color) {
    ctx.beginPath();
    ctx.arc(posX, posY, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawLine(posX1, posY1, posX2, posY2, color) {
    ctx.beginPath();
    ctx.moveTo(posX1, posY1);
    ctx.lineTo(posX2, posY2);
    ctx.strokeStyle = "#eeeff7";
    ctx.lineWidth = 5;
    ctx.stroke();
}
//draws each command in the current step
function showCommands() {
    for (x in commands) {
        var curr = stack[step][x];
        if (curr != null) {
            if (curr[0] === "t") { // text
                drawText(curr[1], curr[2], curr[3], curr[4], curr[5]);
            } else if (curr[0] === "dc") { // circle
                drawCircle(curr[1], curr[2], curr[3], curr[4]);
            } else if (curr[0] === "dl") { // line
                drawLine(curr[1], curr[2], curr[3], curr[4]);
            }
        }
    }
}
//moves to next slide if it is a  timed slide
function nextCommand() {
    if (times[step] != -1) {
        var curr = new Date();
        var currDate = curr.getTime();
        if (currDate - startDate > times[step]) {
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