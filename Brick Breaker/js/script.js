var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var ballRadius = 12;
var dx = 4;
var dy = -4;

var paddleHeight = 20;
var paddleWidth = 150;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 6;
var brickColumnCount = 11;
var brickWidth = 75;
var brickHeight = 30;
var brickPadding = 7.5;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
var specials = [];

var score = 0;
var lives = 3;

var paused = false;
var start = true;

var theta = Math.PI / 2;

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//innitialize bricks
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            display: true,
            special: !(Math.floor(Math.random() * 4))
        };
    }
}

function mouseMoveHandler(e) {
    if (start) {
        var relativeX = e.clientX - canvas.offsetLeft - canvas.width / 2;
        var relativeY = e.clientY - canvas.height + paddleHeight + ballRadius;
        theta = Math.atan(relativeY / relativeX);
        if (relativeX > 0) {
            theta = theta;
        } else if (relativeX < 0) {
            theta = Math.PI + theta;
        }
        console.log(relativeY);
        if (relativeY > 0) {
            theta = Math.abs(theta - Math.PI);
        } else {
            theta = -theta;
        }
        dx = 5 * Math.cos(theta);
        dy = -5 * Math.sin(theta);
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 32) {
        if (start) {
            start = false;
        } else {
            paused = !paused;
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

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.display && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                score++;
                b.display = false;
                if (b.special) {
                    console.log("Specialness activated");
                    var special = {
                        x: b.x + brickWidth / 2,
                        y: b.y
                    };
                    specials.push(special);
                }
                if (score === brickColumnCount * brickRowCount) {
                    alert("You Win!!!");
                    document.location.reload();
                }
            }
        }
    }
}

function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].display) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                ctx.beginPath();
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                var color = ["#9D0202", "#E48100", "#8E0CA6"];;
                ctx.fillStyle = color[ /*Math.floor(Math.random() * 3)*/ 1];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawAim() {
    ctx.beginPath();
    ctx.setLineDash([15, 15]);
    ctx.moveTo(canvas.width / 2, canvas.height - paddleHeight - ballRadius);
    ctx.lineTo(canvas.width / 2 + (150 * Math.cos(theta)), canvas.height - (150 * Math.sin(theta)));
    ctx.stroke();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    var heart = new Image(100, 200);
    heart.src = 'images/heart.png';
    //heart.onload = function() {
    for (i = 0; i < lives; i++) {
        ctx.drawImage(heart, canvas.width - 80 + i * 25, 2.5, 25, 25);
    }
}

function drawSpecial() {
    var bomb = new Image(100, 200);
    bomb.src = 'images/rocket.png';
    for (i = 0; i < specials.length; i++) {
        specials[i].y += 5;
        ctx.drawImage(bomb, specials[i].x, specials[i].y, 25, 25);
    }
    ctx.beginPath();
    ctx.fillStyle = "#eee";
    ctx.fill();
    ctx.closePath();
}

function updateBall() {
    //update ball
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert("You LOSE!!!");
                document.location.reload();
            } else {
                start = true;
                liveScreen();
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 4;
                dy = -4;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    x += dx;
    y += dy;
}

function updatePaddle() {
    //update paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function tansitionScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000AA";
    ctx.fill();
    ctx.closePath();
}

function pauseScreen() {
    tansitionScreen();
    ctx.font = "50px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Paused", canvas.width / 2 - 80, canvas.height / 2);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("press space to resume", canvas.width / 2 - 122, canvas.height / 2 + 30);
}

function liveScreen() {
    tansitionScreen();
    ctx.font = "50px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("You have " + lives + " lives left", canvas.width / 2 - 80, canvas.height / 2);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("press space to resume", canvas.width / 2 - 122, canvas.height / 2 + 30);
}

function endScreen() {
    tansitionScreen();
    ctx.font = "50px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("You Lost", canvas.width / 2 - 80, canvas.height / 2);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("press space to restart", canvas.width / 2 - 122, canvas.height / 2 + 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLives();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawBricks();
    drawSpecial();
    if (paused) {
        pauseScreen();
    } else if (start) {
        liveScreen();
        drawAim();
    } else {
        updateBall();
        updatePaddle();
    }
    requestAnimationFrame(draw);
}
draw();