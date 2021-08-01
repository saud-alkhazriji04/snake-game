const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 6;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

xVelocity = 0;
yVelocity = 0;

let score = 0;

const sound = new Audio('sounds/gulp1.mp3');

function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if(result) {
        return
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    if(score > 2) {
        speed+1;
    }

    if(score > 4) {
        speed = 8;
    }

    if(score > 6) {
        speed = 10;
    }

    if(score > 8) {
        speed = 12;
    }

    if(score > 10) {
        speed+1;
    }

    if(score > 12) {
        speed = 14;
    }
    setTimeout(drawGame, 1000/speed);
}

function isGameOver() {
    let gameOver = false;

    if(xVelocity === 0 && yVelocity === 0) {
        return false;
    }

    //wall
    if(headX < 0) {
        gameOver = true;
    } 

    else if(headX > tileCount - 1) {
        gameOver = true;
    }

    else if(headY < 0) {
        gameOver = true;
    }

    else if(headY > tileCount - 1) {
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        ctx.fillStyle = 'white';//I can leave it empty because the default color is white 
        ctx.font = '50px san-serif';
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

function clearScreen() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '10px san-serif';
    ctx.fillText('score: ' + score, canvas.width - 50, 10)
}

function drawSnake() {
    
    ctx.fillStyle = 'green'
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    
    snakeParts.push(new snakePart(headX, headY));
    while(snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

}


function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if(appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        sound.play();
    }
}

document.addEventListener('keydown', keyDown);

function keyDown(event) {

    //up
    if(event.keyCode == 38) {
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity =  0;
    }

    //down
    if(event.keyCode == 40) {
        if(yVelocity == -1)
            return
        yVelocity = 1;
        xVelocity =  0;
    }

    //left
    if(event.keyCode == 37) {
        if(xVelocity == 1)
            return
        yVelocity = 0;
        xVelocity =  -1;
    }

    //right
    if(event.keyCode == 39) {
        if(xVelocity == -1)
            return
        yVelocity = 0;
        xVelocity =  1;
    }
}

drawGame()