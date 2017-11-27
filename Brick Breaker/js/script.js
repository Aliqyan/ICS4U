
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

var bricks = [];
for(c = 0; c<brickColumnCount; c++){
	bricks[c] = [];
	for(r = 0; r<brickRowCount; r++){
		bricks[c][r] = {x:0, y:0};
	}
}

function drawBricks(){
	for(c = 0; c<brickColumnCount; c++){
		for(r = 0; r<brickRowCount; r++){
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			ctx.beginPath();
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			var color = ["#9D0202", "#E48100", "#8E0CA6"];;
			ctx.fillStyle = color[Math.floor(Math.random() * 3)];
			ctx.fill();
			ctx.closePath();
		}
	}
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();

	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawBricks();

	//update ball

	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
		dx = -dx;
	}
	if(y + dy < ballRadius){
		dy = -dy;
	}else if( y + dy > canvas.height - ballRadius ){
		if(x > paddleX && x < paddleX + paddleWidth){
			dy = -dy;
		}else{
			alert("You LOSE!!!");
			document.location.reload();
		}
	}
	x+=dx;
	y+=dy;

	//update paddle
	if(rightPressed && paddleX < canvas.width-paddleWidth){
		paddleX +=7;
	}
	if(leftPressed && paddleX > 0){
		paddleX -= 7;
	}
}setInterval(draw, 10);

