
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
            if(curr[0] == "t"){
            drawText(curr[1], curr[2], curr[3], curr[4], curr[5]);
            }else if(curr[0] == "tc"){
            drawTextConstrainted(curr[1], curr[2], curr[3], curr[4], curr[5], curr[6]);
            }else if(curr[0] == "dc"){
            drawCircle(curr[1], curr[2], curr[3], curr[4]);
            }else if(curr[0] == "dl"){
            drawLine(curr[1], curr[2], curr[3], curr[4]);
            }
        //}
    }
}

var commands = {
    // connecting lines
    "a-b": ["dl", v.a.x, v.a.y, v.b.x, v.b.y], // A-B
    "a-c": ["dl", v.a.x, v.a.y, v.c.x, v.c.y], // A-C
    "a-e": ["dl", v.a.x, v.a.y, v.e.x, v.e.y], // A-E
    "a-f": ["dl", v.a.x, v.a.y, v.f.x, v.f.y], // A-F
    "b-c": ["dl", v.b.x, v.b.y, v.c.x, v.c.y], // B-C
    "b-d": ["dl", v.b.x, v.b.y, v.d.x, v.d.y], // B-D
    "c-d": ["dl", v.c.x, v.c.y, v.d.x, v.d.y], // C-D
    "c-e": ["dl", v.c.x, v.c.y, v.e.x, v.e.y], // C-E
    "f-g": ["dl", v.f.x, v.f.y, v.g.x, v.g.y], // F-G
    "e-f": ["dl", v.e.x, v.e.y, v.f.x, v.f.y], // E-F
    "e-g": ["dl", v.e.x, v.e.y, v.g.x, v.g.y], // E-G
    "d-g": ["dl", v.d.x, v.d.y, v.g.x, v.g.y], // D-G

    "a-b val": ["t", "2", 30, (v.a.x + v.b.x) / 2 - 5, (v.a.y + v.b.y) / 2 - 10, "#d3d0cb"], // A-B
    "a-c val": ["t", "11", 30, (v.a.x + v.c.x) / 2, (v.a.y + v.c.y) / 2 - 10, "#d3d0cb"], // A-C
    "a-e val": ["t", "6", 30, (v.a.x + v.e.x) / 2, (v.a.y + v.e.y) / 2 + 45, "#d3d0cb"], // A-E
    "a-f val": ["t", "4", 30, (v.a.x + v.f.x) / 2 - 25, (v.a.y + v.f.y) / 2 + 15, "#d3d0cb"], // A-F
    "b-c val": ["t", "3", 30, (v.b.x + v.c.x) / 2 - 25, (v.b.y + v.c.y) / 2, "#d3d0cb"], // B-C
    "b-d val": ["t", "9", 30, (v.b.x + v.d.x) / 2, (v.b.y + v.d.y) / 2 - 10, "#d3d0cb"], // B-D
    "c-d val": ["t", "7", 30, (v.c.x + v.d.x) / 2, (v.c.y + v.d.y) / 2 - 5, "#d3d0cb"], // C-D
    "c-e val": ["t", "2", 30, (v.c.x + v.e.x) / 2 + 15, (v.c.y + v.e.y) / 2 + 30, "#d3d0cb"], // C-E
    "f-g val": ["t", "12", 30, (v.f.x + v.g.x) / 2, (v.f.y + v.g.y) / 2 + 35, "#d3d0cb"], // F-G
    "e-f val": ["t", "7", 30, (v.e.x + v.f.x) / 2 + 25, (v.e.y + v.f.y) / 2 + 15, "#d3d0cb"], // E-F
    "e-g val": ["t", "8", 30, (v.e.x + v.g.x) / 2, (v.e.y + v.g.y) / 2 - 10, "#d3d0cb"], // E-G
    "d-g val": ["t", "5", 30, (v.d.x + v.g.x) / 2 + 20, (v.d.y + v.g.y) / 2 - 5, "#d3d0cb"], // D-G

};

// to del put the key and "del"
 var changes = [
    [

    ],
    [
        ["a-c", "del"],
        ["a-b", ["dl", v.a.x, v.a.y, v.b.x, v.b.y]], // A-B



    ],

];

//create a stack conatining eachs step to allow easy switching between steps
var stack = [];
stack.push(commands);
for(var i = 1; i < changes.length; i++){
    var curr = JSON.parse(JSON.stringify(stack[i-1]));

    var newCommands = changes[i];
    for(var i = 0; i < newCommands.length; i++){
        if(newCommands[1] === "del"){
                delete curr[0];
        }
        curr[newCommands[i][0]] = newCommands[i][1];
    }
    stack.push(curr)
}


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

    ["t", "2", 30, (v.a.x + v.b.x) / 2 - 5, (v.a.y + v.b.y) / 2 - 10, "#d3d0cb"], // A-B
    ["t", "11", 30, (v.a.x + v.c.x) / 2, (v.a.y + v.c.y) / 2 - 10, "#d3d0cb"], // A-C
    ["t", "6", 30, (v.a.x + v.e.x) / 2, (v.a.y + v.e.y) / 2 + 45, "#d3d0cb"], // A-E
    ["t", "4", 30, (v.a.x + v.f.x) / 2 - 25, (v.a.y + v.f.y) / 2 + 15, "#d3d0cb"], // A-F
    ["t", "3", 30, (v.b.x + v.c.x) / 2 - 25, (v.b.y + v.c.y) / 2, "#d3d0cb"], // B-C
    ["t", "9", 30, (v.b.x + v.d.x) / 2, (v.b.y + v.d.y) / 2 - 10, "#d3d0cb"], // B-D
    ["t", "7", 30, (v.c.x + v.d.x) / 2, (v.c.y + v.d.y) / 2 - 5, "#d3d0cb"], // C-D
    ["t", "2", 30, (v.c.x + v.e.x) / 2 + 15, (v.c.y + v.e.y) / 2 + 30, "#d3d0cb"], // C-E
    ["t", "12", 30, (v.f.x + v.g.x) / 2, (v.f.y + v.g.y) / 2 + 35, "#d3d0cb"], // F-G
    ["t", "7", 30, (v.e.x + v.f.x) / 2 + 25, (v.e.y + v.f.y) / 2 + 15, "#d3d0cb"], // E-F
    ["t", "8", 30, (v.e.x + v.g.x) / 2, (v.e.y + v.g.y) / 2 - 10, "#d3d0cb"], // E-G
    ["t", "5", 30, (v.d.x + v.g.x) / 2 + 20, (v.d.y + v.g.y) / 2 - 5, "#d3d0cb"], // D-G
};
*/

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawArrows();
    showCommands();

    requestAnimationFrame(draw);
}
draw();