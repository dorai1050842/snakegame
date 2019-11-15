const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

//load alarm svg
const hurry = new Image();
hurry.src = "img/hurry.svg";

// load mp3
var bgm = new Audio();
bgm.src = "audio/bensound-summer.mp3";


//load pic
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.svg";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let alarm = new Audio();

eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
dead.src = "audio/dead.mp3";
alarm.src = "audio/alarm.mp3";

// create the snake


let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box

};

// create the food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}


// create the score var

let apple = 0;
let score = 0;
var life = 5;

//control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play();

    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}

// cheack collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything to the canvas

function draw() {



  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "white" : "#07BEB8"
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "white";
    ctx.shadowColor = "#07BEB8";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);




  }

  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    apple++;
    score += 10;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
    // we don't remove the tail
  } else {
    bgm.play();
    // remove the tail
    snake.pop();
  }
  //if score is more than 100, speedup.

  if (score == 10) {
    ctx.drawImage(hurry, 211, 271);
    alarm.play();

    if (d == "LEFT") this.snakeX -= box;
    if (d == "UP") this.snakeY -= box;
    if (d == "RIGHT") this.snakeX += box;
    if (d == "DOWN") this.snakeY += box;


  }


  // add new Head

  let newHead = {
    x: snakeX,
    y: snakeY
  }




  // game over

  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    life -= 1;
    dead.play();



    // Whenever life is decreased by-1, return to original position
    newHead = {
      x: 9 * box,
      y: 10 * box
    }


    if (life == 0) {


      clearInterval(game);
      dead.play();


      ctx.fillRect(0, 0, 608, 608);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game over", 302, 302);
      bgm.pause();

      setTimeout(function() {
        $(document).ready(function() {
          $(".form").css({
            'display': 'block'
          })
        });
      }, 1000);

    }




  }

  snake.unshift(newHead);
  ctx.fillStyle = "white";
  ctx.font = "25px arial";
  ctx.left = "100px";
  ctx.fillText(apple, 2 * box, 57);
  ctx.fillText("score:" + score, 244, 57);
  ctx.fillText("life:" + life, 508, 57);
}

// call draw function every 100 ms

let game = setInterval(draw, 100);
