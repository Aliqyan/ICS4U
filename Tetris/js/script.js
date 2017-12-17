var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var rows = 11;
var cols = 10;
var blockSize = 60;
var board = [
    []
];
for (var i = 0; i < rows; i++) {
    board[i] = [];
    for (var j = 0; j < cols; j++) {
        board[i][j] = {
            x: j * blockSize,
            y: i * blockSize,
            colour: "#000000"
        }
    }
} 

function mouseMoveHandler(e) {}

function keyDownHandler(e) {
    if (e.keyCode === 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        }
        if (e.keyCode === 32) {
            if (start) {
                start = false;
            } else {
                paused = !paused;
            }
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode === 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }

    function drawBoard() {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var block = board[i][j];
                ctx.beginPath();
                ctx.rect(block.x, block.y, blockSize, blockSize);
                ctx.strokeStyle = "#FFFFFF";
                ctx.stroke();
                ctx.rect(block.x+2, block.y+2, blockSize-4, blockSize-4);
                ctx.fillStyle = block.colour;
                ctx.fill();

                ctx.closePath();
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard();
        requestAnimationFrame(draw);
    }
    draw();