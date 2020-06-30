function Game(idx) {

  var canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'canvas');
  var carGame = document.getElementById('car-lane' + idx);
  carGame.style.position = 'absolute';
  carGame.style.top = '10px'
  carGame.style.left = 10 + 240 * idx + 'px';
  carGame.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var interval;
  canvas.width = 230
  canvas.height = 600;
  var destp1;
  var destp2;



  var laneDividers = [-125, 0, 125, 250, 375, 500]
  var bullets = []
  var tempBullets;
  var bimg = new Image;
  bimg.src = 'images/bullet.png';
  var player = new Car(2);
  var player2 = new Car(0);
  var img = new Image;
  img.src = 'images/player.png';
  var imgp2 = new Image;
  imgp2.src = 'images/player2.png';
  var gameState = 0;
  var power = new Image;
  power.src = 'images/powerup.png';
  var powerup = [false, 0, -30];
  var score = 0;
  var highscore = window.localStorage.getItem('score' + idx);
  if (highscore == null) {
    highscore = 0;
    window.localStorage.setItem('score' + idx, 0);
  }
  var powerupCounter = 0;

  var enemies = [new Enemy(0), new Enemy(1), new Enemy(2), new Enemy(0), new Enemy(1), new Enemy(2)]
  var enemiesInGame = [enemies[0].inGame, enemies[1].inGame, enemies[2].inGame, enemies[3].inGame, enemies[4].inGame, enemies[5].inGame]
  var eimg = new Image;
  eimg.src = 'images/enemy.png';
  var counter = 0;
  var checkCounter = -1;
  var index = 0;
  var speed = 1;


  var logKey = function (e) {

    if (e.code == 'ArrowLeft' && gameState == 1) {
      if (player.position > 0 && !player.goLeft && !player.goRight) {
        player.goLeft = true;
        destp1 = player.position - 1;
      }
    }

    if (e.code == 'ArrowRight' && gameState == 1) {
      if (player.position < 2 && !player.goLeft && !player.goRight) {
        player.goRight = true;
        destp1 = player.position + 1;
      }
    }

    if (e.code == 'ArrowUp' && player.bullet > 0 && gameState == 1 && !player.goLeft && !player.goRight) {
      player.bullet -= 1;
      bullets.push([20 + 80 * player.position, 530, player.position])
    }
    if (e.code == 'KeyA' && gameState == 1) {
      if (player2.position > 0 && !player2.goLeft && !player2.goRight) {
        player2.goLeft = true;
        destp2 = player2.position - 1;
      }
    }

    if (e.code == 'KeyD' && gameState == 1) {
      if (player2.position < 2 && !player2.goLeft && !player2.goRight) {
        player2.goRight = true;
        destp2 = player2.position + 1;
      }
    }

    if (e.code == 'KeyW' && player2.bullet > 0 && gameState == 1 && !player2.goLeft && !player2.goRight) {
      player2.bullet -= 1;
      bullets.push([20 + 80 * player2.position, 530, player2.position])
    }
  }

  carGame.addEventListener('keydown', logKey);


  var drawLanes = function () {
    for (var i = 0; i < laneDividers.length; i++) {
      ctx.rect(70, laneDividers[i], 10, 100)
      ctx.rect(150, laneDividers[i], 10, 100)
      ctx.fillStyle = '#fff';
      ctx.fill()
    }
  }

  drawLanes()
  ctx.font = "30px Arial ";
  ctx.fillStyle = "blue";
  ctx.fillText('Welcome', 50, 50);
  ctx.fillText('to', 100, 80);
  ctx.fillText('Car Lane', 50, 110);

  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.rect(45, 200, 140, 80)
  ctx.fill()
  ctx.fillStyle = 'white';
  ctx.fillText('Start', 85, 250);
  ctx.fillStyle = "blue";
  ctx.fillText('P1: Arrow', 50, 380);
  ctx.fillText('P2: WASD', 50, 410);

  ctx.fillStyle = "green";
  ctx.fillText('High Score: ' + highscore, 20, 530);


  carGame.onmousedown = function (e) {
    carGame.setAttribute('tabIndex', -1);
    var cursorX = e.pageX - parseFloat(carGame.style.left);
    var cursorY = e.pageY - parseFloat(carGame.style.top);
    if (gameState == 0 || gameState == 2) {
      if (cursorX <= 192 && cursorX >= 45 && cursorY >= 200 && cursorY <= 287) {
        gameState = 1;
        move();
      }
    }
  }


  var checkSpeed = function () {
    if (score != 0 && score % 10 == 0 && Math.round(speed * 100) / 100 != 1 + 0.25 * score / 10) {
      speed += 0.25;
    }
  }

  var drawPlayer = function () {
    ctx.beginPath()
    ctx.drawImage(img, 20 + 80 * player.position, 530);
    ctx.drawImage(imgp2, 20 + 80 * player2.position, 530);
  }

  var createEnemy = function () {
    counter += 1;
    if (counter > checkCounter) {
      checkCounter = enemies[index].generateEnemy(speed);
      enemiesInGame = [enemies[0].inGame, enemies[1].inGame, enemies[2].inGame, enemies[3].inGame, enemies[4].inGame, enemies[5].inGame]
      counter = 0;
      if (checkCounter != 80) {
        index = (index + 1) % 6
      }
    }
  }

  var fireBullet = function () {
    tempBullets = bullets;
    for (var i = 0; i < bullets.length; i++) {
      ctx.drawImage(bimg, bullets[i][0], bullets[i][1]);
      bullets[i][1] -= 1;
      if (bullets[i][1] < -30) {
        tempBullets.shift()
      }
    }
  }

  var drawEnemy = function () {
    for (var i = 0; i < enemies.length; i++) {
      var bulletIndex = enemies[i].checkBulletCollision(bullets);
      if (bulletIndex) {
        if (bullets[bulletIndex - 1][1] > 0) {
          score += 1;
        }
        bullets.splice(bulletIndex - 1, 1)
      };
      enemiesInGame = [enemies[0].inGame, enemies[1].inGame, enemies[2].inGame, enemies[3].inGame, enemies[4].inGame, enemies[5].inGame]
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
    bullets = tempBullets;
  }

  var createLanes = function () {
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
  }

  var createPowerUp = function () {
    if (!powerup[0]) {
      powerupCounter += 1
    }

    if (powerupCounter > 900) {
      var powerLane = Math.floor(Math.random() * 2);
      if (enemies[powerLane].y > 60 || enemies[powerLane].y < 0) {
        powerup = [true, powerLane, -30];
        powerupCounter = 0;
      } else {
        powerupCounter = 820;
      }
    }
    if (powerup[0]) {
      ctx.drawImage(power, 20 + 80 * powerup[1], powerup[2]);
      powerup[2] += speed;
      if (powerup[2] > 600) {
        powerup[0] = false;
      }
    }
    if (player.powerUp(powerup) || player2.powerUp(powerup)) {
      powerup[0] = false;
    };
  }

  var changeLane = function () {
    var dest;
    var current = player.position;
    if (player.goLeft) {
      player.position -= 0.1;
      img.src = 'images/player_left.png';
      if (Math.ceil(player.position) == destp1) {
        player.position = destp1;
        player.goLeft = false;
        img.src = 'images/player.png'
      }
    } else if (player.goRight) {
      player.position += 0.1;
      img.src = 'images/player_right.png';
      if (Math.floor(player.position) == destp1) {
        player.position = destp1;
        player.goRight = false;
        img.src = 'images/player.png'
      }
    }

    if (player2.goLeft) {
      player2.position -= 0.1;
      imgp2.src = 'images/player2_left.png';
      if (Math.ceil(player2.position) == destp2) {
        player2.position = destp2;
        player2.goLeft = false;
        imgp2.src = 'images/player2.png'
      }
    } else if (player2.goRight) {
      player2.position += 0.1;
      imgp2.src = 'images/player2_right.png';
      if (Math.floor(player2.position) == destp2) {
        player2.position = destp2;
        player2.goRight = false;
        imgp2.src = 'images/player2.png'
      }
    }
  }

  function move() {
    interval = setInterval(function () {
        ctx.clearRect(0, 0, 230, 600);
        checkSpeed();
        createLanes();
        drawPlayer();
        createEnemy();
        fireBullet();
        drawEnemy();
        createPowerUp();
        changeLane();

        ctx.font = "30px Arial ";
        ctx.fillStyle = "green";
        ctx.fillText("Score: " + score, 60, 30);
        if (player.checkCollision(enemies, score, idx) || player2.checkCollision(enemies, score, idx)) {
          clearInterval(interval);
          endGame();
        };
      },
      17);
  }



  var endGame = function () {
    powerupCounter = 0;
    gameState = 2;
    ctx.clearRect(0, 0, 230, 600);
    drawLanes()
    bullets = []
    start = false;
    player.position = 2;
    player2.position = 0;
    player.bullet = 10;
    player2.bullet = 10;
    player.goLeft = false;
    player.goRight = false;
    player2.goLeft = false;
    player2.goRight = false;
    img.src = 'images/player.png';
    imgp2.src = 'images/player2.png'
    destp1 = 2;
    destp2 = 0;
    speed = 1;
    enemies = [new Enemy(0), new Enemy(1), new Enemy(2), new Enemy(0), new Enemy(1), new Enemy(2)]
    enemiesInGame = [enemies[0].inGame, enemies[1].inGame, enemies[2].inGame, enemies[3].inGame, enemies[4].inGame, enemies[5].inGame]
    ctx.font = "30px Arial ";
    ctx.fillStyle = "red";
    ctx.fillText('Game', 75, 50);
    ctx.fillText('Over', 80, 80);
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.rect(45, 200, 140, 80)
    ctx.fill()
    ctx.fillStyle = 'white';
    ctx.fillText('Replay?', 65, 250);

    ctx.fillStyle = "green";
    if (score > highscore) {
      ctx.fillText('New High Score', 5, 400);
      ctx.fillText(score, 100, 430);
    } else {
      ctx.fillText('Score', 75, 400);
      ctx.fillText(score, 100, 430);
    }
    score = 0;
  }

}
var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'css/style.css');
document.head.appendChild(link);
// move();