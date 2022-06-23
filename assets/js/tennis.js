var fps = 30;
var canvas, canvasContext;
var ballX = 200;
var ballY = 200;
var dx = 10;
var dy = 10;
var paddle1Y = 100;
var player1Score = 0;
var player2Score = 0;
var paddle2Y = 100;


var PADDLE_WIDTH = 10, PADDLE_HEIGHT = 100;

function animateGame() {
    moveElements();
    drawGame();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function moveElements() {
    botMovement();
    ballX += dx;
    ballY += dy;

    if (ballX > canvas.width) {
        
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            dx = -dx;

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            dy = deltaY * 0.35;
        } else{
            player1Score++;
            resetBall();
        }
    }

    if (ballX < 0) {
        var paddleTopLeft = paddle1Y;
        var paddleBottomLeft = paddle1Y + PADDLE_HEIGHT;
        if (paddleTopLeft - paddleBottomLeft) {
            if (ballY > paddleTopLeft && ballY < paddleBottomLeft) {
                dx = -dx

                // sa me larg nga qendra e "paddle"-it e godasim topin
                // do te kete levizje me te theksume ne boshtin y.
                const deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
                dy = deltaY * 0.35;
            } else {
                player2Score++;
                resetBall();
            }
        }
    }

    if (ballY > canvas.height || ballY < 0) {
        dy = -dy;
    }
}

function drawGame() {
    coloredRect(0, 0, canvas.width, canvas.height, "black");
    if (player1Score > 3 || player2Score > 3) {
        var winner = player1Score > 3 ? 'Player 1' : 'Player 2';
        coloredText(`Congratulations to ${winner}!`, canvas.width/2 - 50, canvas.height/4, 'white');
        coloredText(`Click anywhere to restart the game`, canvas.width/2 - 75, canvas.height - 100, 'white');
    } else {
        coloredCircle(ballX, ballY, 10, "white");
        coloredRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
        coloredRect(canvas.width- PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
    
        coloredText(player1Score, 100, 100, 'white');
        coloredText(player2Score, canvas.width - 100, 100, 'white');
    }
}

function botMovement () {
    var paddle2Ycenter = paddle2Y + PADDLE_HEIGHT / 2;
    // normalizing value e kemi vendos vetem qe te mos
    // kete levizje te quditshme "paddle2" kur topi ndodhet
    // paralel me "paddle2"
    var normalizingValue = 35;
    if (paddle2Ycenter < ballY - normalizingValue) {
        paddle2Y += 10;
    } else if (paddle2Ycenter > ballY + normalizingValue) {
        paddle2Y -= 10;
    }
}

function coloredText (text, x, y, color) {

    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y);
}

function coloredRect (x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function coloredCircle(x, y, r, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, r, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function resetGame () {
    if (player1Score > 3 || player2Score > 3) {
        player1Score = 0;
        player2Score = 0;
        resetBall();
    }
}

function updateMousePos (evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    var mouseY = evt.clientY - rect.top - root.scrollTop;

    paddle1Y = mouseY - PADDLE_HEIGHT / 2;
}

document.addEventListener('DOMContentLoaded', () => {
    canvas= document.querySelector('#drawBoard');
    canvasContext = canvas.getContext('2d');

    canvas.addEventListener('mousemove', updateMousePos);
    canvas.addEventListener('mousedown', resetGame)

    setInterval(() => animateGame(), 1000 / 30);
});
