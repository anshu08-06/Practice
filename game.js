const bike = document.getElementById('bike');
const gameContainer = document.getElementById('game-container');
let bikePositionX = 50;
let bikePositionY = gameContainer.offsetHeight - 100;
let speed = 10;
let obstacles = [];
let gameInterval;

const bikeWidth = 80;
const bikeHeight = 60;

document.addEventListener('keydown', moveBike);

function moveBike(event) {
    if (event.key === 'ArrowLeft' && bikePositionX > 0) {
        bikePositionX -= speed;
    } else if (event.key === 'ArrowRight' && bikePositionX < gameContainer.offsetWidth - bikeWidth) {
        bikePositionX += speed;
    }
    bike.style.left = bikePositionX + 'px';
    bike.style.top = bikePositionY + 'px';
}

function createObstacle() {
    const obstacleType = Math.random() < 0.5 ? 'cow' : 'rickshaw';  // Randomly choose between cow and rickshaw
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle', obstacleType);
    obstacle.style.left = Math.random() * (gameContainer.offsetWidth - 50) + 'px';
    obstacle.style.top = -50 + 'px';
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        const obstacleTop = parseInt(obstacle.style.top.replace('px', ''));
        if (obstacleTop < gameContainer.offsetHeight) {
            obstacle.style.top = obstacleTop + 5 + 'px';
        } else {
            gameContainer.removeChild(obstacle);
            obstacles.splice(index, 1);
        }
    });
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const bikeRect = bike.getBoundingClientRect();
        if (obstacleRect.top < bikeRect.bottom && obstacleRect.bottom > bikeRect.top &&
            obstacleRect.left < bikeRect.right && obstacleRect.right > bikeRect.left) {
            alert('Game Over! You collided with an obstacle.');
            clearInterval(gameInterval);
            window.location.reload();
        }
    });
}

function gameLoop() {
    createObstacle();
    moveObstacles();
    checkCollision();
}

gameInterval = setInterval(gameLoop, 100);
