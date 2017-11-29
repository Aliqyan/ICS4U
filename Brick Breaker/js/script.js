//test
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballRadius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
var specials = [];
var score = 0;
var lives = 3;
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            display: true,
            special: !(Math.floor(Math.random()*4))
        };
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > paddleWidth/2  && relativeX + paddleWidth/2 < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
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
            if (b.display && x > b.x && x  < b.x + brickWidth && y > b.y && y  < b.y + brickHeight) {
            	dy = -dy;
            	score++;
                b.display = false;
                if(b.special){
                    console.log("Specialness activated");
                    var special = {x: b.x + brickWidth/2, y: b.y};
                    specials.push(special);
                }
                if(score === brickColumnCount * brickRowCount){
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
        	if(bricks[c][r].display){
	            var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
	            var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
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

function drawScore(){
	ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ score, 8, 20);
}

function drawLives() {
    /*ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    */

    var heart = new Image(100, 200);
    heart.src = 'images/heart.png';
    //heart.onload = function() {
    for(i = 0; i< lives; i++){
        ctx.drawImage(heart, canvas.width-80  + i * 25 , 2.5, 25, 25);
    }
             /*   ctx.beginPath();
            //ctx.rect(canvas.width - 80 , 2.5, (lives-3)*25, 25);
            ctx.fillStyle = "#eee";
            ctx.fill();
            ctx.closePath();
            */
    //}
    


  
}

function drawSpecial(){
    var bomb = new Image(100, 200);
    bomb.src = 'images/rocket.png';
    for(i = 0; i< specials.length; i++){
        specials[i].y += 5;
        ctx.drawImage(bomb, specials[i].x, specials[i].y, 25, 25);
    }
            ctx.beginPath();
            //ctx.rect(canvas.width - 80 , 2.5, (lives-3)*25, 25);
            ctx.fillStyle = "#eee";
            ctx.fill();
            ctx.closePath();
    //}
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



        	if(!lives){
	        	alert("You LOSE!!!");
	            document.location.reload();
        	}else{
        		x = canvas.width/2;
        		y = canvas.height - 30;
        		dx = 2;
        		dy = -2;
    			paddleX = (canvas.width-paddleWidth)/2; 
           	}


        }
    }
    x += dx;
    y += dy;
    //update paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    requestAnimationFrame(draw);
}

draw();