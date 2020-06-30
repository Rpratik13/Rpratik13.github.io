var canvas = document.createElement('canvas');
canvas.setAttribute('class', 'canvas');
carGame = document.getElementsByClassName('car-lane')[0];
carGame.appendChild(canvas);
ctx = canvas.getContext("2d");
var interval;
var start = false;
canvas.width = 1350
canvas.height = 600;

laneDividers = [-125, 0, 125, 250, 375, 500]

var player = new Car();
var img = new Image;
img.src = player.image;
var score = 0;
var highscore;

var enemies = [new Enemy(0), new Enemy(1), new Enemy(2), new Enemy(0), new Enemy(1), new Enemy(2)]
var enemiesInGame = [enemies[0].inGame, enemies[1].inGame, enemies[2].inGame, enemies[3].inGame, enemies[4].inGame, enemies[5].inGame]
var eimg = new Image;
eimg.src = 'images/enemy.png';
var counter = 0;
var checkCounter = -1;
var index = 0;
var speed = 1;

document.addEventListener('keydown', logKey);

drawLanes()
ctx.font = "30px Arial ";
ctx.fillStyle = "red";
ctx.fillText('Welcome', 50, 50);
ctx.fillText('to', 100, 80);
ctx.fillText('Car Lane', 50, 110);

ctx.fillText('Press', 70, 200);
ctx.fillText('Enter', 70, 230);
ctx.fillText('to', 90, 260);
ctx.fillText('Start', 70, 290);

ctx.fillText('Use', 85, 380);
ctx.fillText('Arrows', 70, 410);
ctx.fillText('to', 90, 440);
ctx.fillText('Move', 70, 470);

function logKey(e) {
  if (e.code == 'ArrowLeft') {
    if (player.position > 0) {
      player.position -= 1;
    }
  }

  if (e.code == 'ArrowRight') {
    if (player.position < 2) {
      player.position += 1;
    }
  }

  if (e.code == 'Enter' && !start) {
    start = true;

    highscore = window.localStorage.getItem('score');
    move();
  }
}


function move() {
  interval = setInterval(function () {

      if (score != 0 && score % 10 == 0 && Math.round(speed * 100) / 100 != 1 + 0.25 * score / 10) {
        speed += 0.25;
        console.log(speed);
      }
      ctx.clearRect(0, 0, 230, 600);
      ctx.beginPath()
      ctx.drawImage(img, 20 + 80 * player.position, 530);


      counter += 1;
      if (counter > checkCounter) {
        checkCounter = enemies[index].generateEnemy(speed);
        enemiesInGame = [enemies[0].inGame, enemies[1].inGame, enemies[2].inGame, enemies[3].inGame, enemies[4].inGame, enemies[5].inGame]
        counter = 0;
        if (checkCounter != 80) {
          index = (index + 1) % 6
        }
      }
      for (var i = 0; i < enemies.length; i++) {
        if (enemiesInGame[i]) {
          ctx.drawImage(eimg, enemies[i].x, enemies[i].y);
          enemies[i].y += speed;

          if (enemies[i].y > 600) {
            enemies[i].y = -60;
            enemies[i].inGame = false;
            enemiesInGame[i] = false;
            score += 1;
          }
        }
      }
      for (var i = 0; i < laneDividers.length; i++) {
        ctx.rect(70, laneDividers[i], 10, 100)
        ctx.rect(150, laneDividers[i], 10, 100)
        ctx.fillStyle = '#fff';
        ctx.fill()
        laneDividers[i] += speed;
        if (laneDividers[i] > 600) {
          laneDividers[i] = -149;
        }
      }
      ctx.font = "30px Arial ";
      ctx.fillStyle = "#000";
      if (window.localStorage.getItem('score') == null) {
        ctx.fillText('High Score: ' + 0, 10, 50);
      } else if (window.localStorage.getItem('score') < score) {
        ctx.fillText("High Score: " + score, 10, 50);

      } else {
        ctx.fillText("High Score: " + window.localStorage.getItem('score'), 10, 50);
      }
      ctx.fillText("Score: " + score, 50, 80);
      if (player.checkCollision(enemies, score)) {
        endGame();
      };
    },
    17);
}

function drawLanes() {
  for (var i = 0; i < laneDividers.length; i++) {
    ctx.rect(70, laneDividers[i], 10, 100)
    ctx.rect(150, laneDividers[i], 10, 100)
    ctx.fillStyle = '#fff';
    ctx.fill()
  }
}

function endGame() {
  ctx.clearRect(0, 0, 230, 600);
  drawLanes()
  start = false;
  speed = 1;
  enemies = [new Enemy(0), new Enemy(1), new Enemy(2), new Enemy(0), new Enemy(1), new Enemy(2)]
  enemiesInGame = [enemies[0].inGame, enemies[1].inGame, enemies[2].inGame, enemies[3].inGame, enemies[4].inGame, enemies[5].inGame]
  ctx.font = "30px Arial ";
  ctx.fillStyle = "red";
  ctx.fillText('Game', 80, 50);
  ctx.fillText('Over', 80, 80);

  if (score > highscore) {
    ctx.fillText('New High Score', 5, 200);
    ctx.fillText(score, 100, 230);
  } else {
    ctx.fillText('Score', 75, 200);
    ctx.fillText(score, 100, 230);
  }
  score = 0;
  ctx.fillText('Press', 85, 380);
  ctx.fillText('Enter', 70, 410);
  ctx.fillText('to', 90, 440);
  ctx.fillText('Play', 70, 470);
  ctx.fillText('Again', 70, 500);

}


var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'css/style.css');
document.head.appendChild(link);
// move();