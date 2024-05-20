// Get the canvas element from the HTML document
let canvas = document.getElementById('gameCanvas');

// Get the 2D rendering context for the canvas
let context = canvas.getContext('2d');

// Define the size of each box (or grid cell) on the canvas
let box = 20;

// Initialize the snake as an array of objects, each representing a box on the canvas
let snake = [];
snake[0] = {x: 10 * box, y: 10 * box}; // The snake starts with one box in the middle of the canvas

// Define the initial direction of the snake
let direction = "RIGHT";

// Create the food object at a random position on the canvas
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Define the draw function that will be called in each frame of the game
function draw() {
    // Clear the entire canvas
    context.fillStyle = "white";
    context.fillRect(0, 0, 20 * box, 20 * box);

    // Draw each box of the snake
    for(let i = 0; i < snake.length; i++) {
        // The head of the snake is drawn in green and the rest of the snake is drawn in green
        context.fillStyle = (i == 0) ? "green" : "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    // Save the old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the position of the head according to the direction
    if(direction == "RIGHT") snakeX += box;
    if(direction == "LEFT") snakeX -= box;
    if(direction == "UP") snakeY -= box;
    if(direction == "DOWN") snakeY += box;

    // Check if the snake has eaten the food
    if(snakeX == food.x && snakeY == food.y) {
        // Create new food
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } else {
        // Remove the tail of the snake
        snake.pop();
    }

    // Create the new head of the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Check if the game is over
    if(snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19 * box || collision(newHead, snake)) {
        clearInterval(game);
    }

    // Add the new head to the beginning of the snake
    snake.unshift(newHead);
}

// Check if the head of the snake has collided with the rest of the snake
function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Update the direction based on the arrow key pressed
function directionUpdate(event) {
    let key = event.keyCode;
    if(key == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if(key == 38 && direction != "DOWN") {
        direction = "UP";
    } else if(key == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if(key == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

// Listen for arrow key presses
document.addEventListener('keydown', directionUpdate);

// Call the draw function every 100 milliseconds
let game = setInterval(draw, 100);