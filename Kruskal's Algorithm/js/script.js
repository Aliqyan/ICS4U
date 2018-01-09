
var step = 0;//changes.length-4;

//document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//canvas.addEventListener("mousedown", getPosition, false);




var s2 = new Date();
var start2 = s2.getTime();

function keyDownHandler(e) {
    /*if (e.keyCode == 37) {
        rightPressed = true;
        if(step > 0){
            step--;
            /*for(var i = 0; i<= step ;i++){
                updateCommands(i);
            }
        }

    } else*/ if (e.keyCode == 39) {
        if(step < changes.length-1){
            step++;

            s2 = new Date();
            start2 = s2.getTime();
            //updateCommands(step);

        }else{
            step = 0;
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

    ctx.font = size + "px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, posX, posY);
}


/*function drawTextConstrainted(text, size, posX, posY, color, limitX) {
    ctx.font = size + "px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    var newText = text.split(/(\s+)/);
    var line  = "";
    for(var i = 0; i < newText.length; i++){
        if(ctx.measureText(line).width >= limitX){
                ctx.fillText(line, posX, posY);
                line = "";
                posY += 25;
        }

        if(!(line === "" && newText[i] === " ")){
            line += newText[i];
        }


    }
    if(line !== ""){
        ctx.fillText(line, posX, posY);

    }

}*/

/*function drawArrows() {
    var prev = new Image(100, 100);
    prev.src = 'images/prev.png';
    ctx.drawImage(prev, 0, canvas.height / 2, 25, 25);
    var next = new Image(100, 100);
    next.src = 'images/next.png';
    ctx.drawImage(next, canvas.width - 25, canvas.height / 2, 25, 25);
}*/

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
    ctx.strokeStyle = color;
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



//create a stack conatining eachs step to allow easy switching between steps
var stack = [];
stack.push(commands);
for(var i = 1; i < changes.length; i++){
    var curr = {};
    for (let key in stack[i-1]) {
        curr[key] = stack[i-1][key];
    }

    //var curr = JSON.parse(JSON.stringify(stack[i-1]));


    for(var j = 0; j < changes[i].length; j++){
        var newCommand = changes[i][j];
        /*if(newCommands[i][1] === "del"){
            delete curr[0];
        }else{*/
                    //onsole.log(curr["hi"] = newCommand[1]);
            //Object.defineProperty(curr, newCommand[0],  newCommand[1]); 
            curr[newCommand[0]] = newCommand[1];
        //}
    }
    stack.push(curr)
}
//console.log(stack.length);


function nextCommand(){
    if(times[step] !=-1){
        var n2 = new Date();
        var now2 = n2.getTime();
        if(now2 - start2 > times[step]){
            step++;
            s2 = new Date();
            start2 = s2.getTime();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawArrows();
    showCommands();
    nextCommand();


    requestAnimationFrame(draw);
}
draw();