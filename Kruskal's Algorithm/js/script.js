
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
            /*for(var i = 0; i<= step ;i++){
                updateCommands(i);
            }*/
        }

    } else if (e.keyCode == 39) {
        leftPressed = true;
        if(step < changes.length-1){
            step++;
            //updateCommands(step);

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


function drawTextConstrainted(text, size, posX, posY, color, limitX) {
    ctx.font = size + "px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    var newText = text.split(/(\s+)/);
    var line  = "";
    for(var i = 0; i < newText.length; i++){
        if(ctx.measureText(line).width >= limitX){
                ctx.fillText(line, posX, posY);
                line = "";
                posY += 20;
        }

        if(!(line === "" && newText[i] === " ")){
            line += newText[i];
        }


    }
    if(line !== ""){
        ctx.fillText(line, posX, posY);

    }

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

function drawLine(posX1, posY1, posX2, posY2, size){
    if(size == null){
        size = 5;
    }
    ctx.beginPath();
    ctx.moveTo(posX1,posY1);
    ctx.lineTo(posX2, posY2);
    ctx.strokeStyle = "#d3d0cb";
    ctx.lineWidth = size;
    ctx.stroke();
}

function drawCurrent(){

    /*
    curr = commands[step];
    for(var i = 0; i < curr.length; i++){
        if(curr[i][0] == "t"){
            drawText(curr[i][1], curr[i][2], curr[i][3], curr[i][4], curr[i][5]);
        }else if(curr[i][0] == "tc"){
            drawTextConstrainted(curr[i][1], curr[i][2], curr[i][3], curr[i][4], curr[i][5], curr[i][6]);
        }else if(curr[i][0] == "dc"){
            drawCircle(curr[i][1], curr[i][2], curr[i][3], curr[i][4]);
        }else if(curr[i][0] == "dl"){
            drawLine(curr[i][1], curr[i][2], curr[i][3], curr[i][4], curr[i][5]);
        }
    }
    */
}

function showCommands(){
    for(x in commands){
        var curr = stack[step][x];
        //if(curr[0]){}
        if(curr != null){
            if(curr[0] === "t"){
            drawText(curr[1], curr[2], curr[3], curr[4], curr[5]);
            }else if(curr[0] === "tc"){
            drawTextConstrainted(curr[1], curr[2], curr[3], curr[4], curr[5], curr[6]);
            }else if(curr[0] === "dc"){
            drawCircle(curr[1], curr[2], curr[3], curr[4]);
            }else if(curr[0] === "dl"){
            drawLine(curr[1], curr[2], curr[3], curr[4]);
            }
        }
        //}
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

/*
var graph = {
    a = {
        ["dc", v.a.x, v.a.y, 20, "#000"], // A
    ["t", "A", 30, v.a.x, v.a.y + 10, "#d3d0cb"],

    },

    b = {
    ["dc", v.b.x, v.b.y, 20, "#000"], // B
    ["t", "B", 30, v.b.x, v.b.y + 10, "#d3d0cb"],

    },

    c ={
    ["dc", v.c.x, v.c.y, 20, "#000"], // C
        ["t", "C", 30, v.c.x, v.c.y + 10, "#d3d0cb"],

    },

    d = {
    ["dc", v.d.x, v.d.y, 20, "#000"], // D
        ["t", "D", 30, v.d.x, v.d.y + 10, "#d3d0cb"],


    },
    e = {
    ["dc", v.e.x, v.e.y, 20, "#000"], // E


    } ,
    f = {
    ["dc", v.f.x, v.f.y, 20, "#000"], // F

    }
    g = {
    ["dc", v.g.x, v.g.y, 20, "#000"], // G
    }, 


    ["dl", v.a.x, v.a.y, v.b.x, v.b.y], // A-B
    ["dl", v.a.x, v.a.y, v.c.x, v.c.y], // A-C
    ["dl", v.a.x, v.a.y, v.e.x, v.e.y], // A-E
    ["dl", v.a.x, v.a.y, v.f.x, v.f.y], // A-F
    ["dl", v.b.x, v.b.y, v.c.x, v.c.y], // B-C
    ["dl", v.b.x, v.b.y, v.d.x, v.d.y], // B-D
    ["dl", v.c.x, v.c.y, v.d.x, v.d.y], // C-D
    ["dl", v.c.x, v.c.y, v.e.x, v.e.y], // C-E
    ["dl", v.f.x, v.f.y, v.g.x, v.g.y], // F-G
    ["dl", v.e.x, v.e.y, v.f.x, v.f.y], // E-F
    ["dl", v.e.x, v.e.y, v.g.x, v.g.y], // E-G
    ["dl", v.d.x, v.d.y, v.g.x, v.g.y], // D-G


    ["t", "F", 30, v.f.x, v.f.y + 10, "#d3d0cb"],
    ["t", "G", 30, v.g.x, v.g.y + 10, "#d3d0cb"],


};
*/

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawArrows();
    showCommands();

    requestAnimationFrame(draw);
}
draw();