const bird = document.getElementById('bird');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score');
let birdTop = bird.offsetTop;
let gravity = 2;
let isGameOver = false;
let score = 0;

// Function to make the bird jump
function jump() {
    if (birdTop > 0) {
        birdTop -= 40;
        bird.style.top = birdTop + 'px';
    }
}

// Function to generate pipes
function generatePipe() {
    if (isGameOver) return;

    let pipeHeight = Math.floor(Math.random() * 200) + 100;
    let pipe = document.createElement('div');
    pipe.classList.add('pipe');
    pipe.style.height = pipeHeight + 'px';
    pipe.style.right = 0;
    gameContainer.appendChild(pipe);

    let pipeMoveInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(pipeMoveInterval);
            pipe.remove();
        } else {
            let pipeRight = parseInt(pipe.style.right);
            pipe.style.right = pipeRight + 3 + 'px';

            // Check collision with pipe
            let birdBottom = bird.offsetTop + bird.offsetHeight;
            let pipeLeft = pipe.offsetLeft;
            if (pipeLeft <= bird.offsetLeft + bird.offsetWidth && 
                pipeLeft + pipe.offsetWidth >= bird.offsetLeft &&
                birdBottom >= gameContainer.offsetHeight - pipe.offsetHeight) {
                endGame();
            }

            // Increase score when bird passes a pipe
            if (pipeLeft + pipe.offsetWidth < bird.offsetLeft) {
                score++;
                scoreDisplay.textContent = `Score: ${Score}`;
            }

            // Remove pipe if it goes out of screen
            if (pipeRight > gameContainer.offsetWidth) {
                pipe.remove();
            }
        }
    }, 20);

    // Generate new pipe every 2 seconds
    setTimeout(generatePipe, 2000);
}

// Function to make the bird fall
function fall() {
    if (isGameOver) return;

    birdTop += gravity;
    bird.style.top = birdTop + 'px';

    if (birdTop + bird.offsetHeight >= gameContainer.offsetHeight) {
        endGame();
    }
}

// Function to end the game
function endGame() {
    isGameOver = true;
    alert('Game Over! Your score: ' + score);
    location.reload();
}

// Event listener for bird jump
document.addEventListener('keydown', jump);
document.addEventListener('click', jump);

// Start the game
generatePipe();
setInterval(fall, 20);
