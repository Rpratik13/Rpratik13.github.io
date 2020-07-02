function Game(idx) {
  let gameState = 0;
  let sprite = new Sprite();
  let player = new Flappy();
  let preloader = new Preloader();
  preloader.load();
  var tunnels = [new Tunnel(0), new Tunnel(1), new Tunnel(2), new Tunnel(3)]
  let base = [0, 144, 288, 432, 576];
  let flappyDiv = document.getElementById('flappy' + idx);
  flappyDiv.style.top = '10px';
  flappyDiv.style.left = 10 + (CANVAS_WIDTH + 20) * idx + 'px';
  let startInterval;
  let gameInterval;
  let endInterval;
  let wingCounter = 0;
  let canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'canvas');
  flappyDiv.appendChild(canvas);
  let ctx = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;


  flappyDiv.onmousedown = function (e) {
    var cursorX = e.pageX - parseFloat(flappyDiv.style.left);
    var cursorY = e.pageY - parseFloat(flappyDiv.style.top);
    if (gameState == 0 || gameState == 2) {
      if (262 <= cursorX && cursorX <= 314 && 225 <= cursorY && cursorY <= 254) {
        clearInterval(startInterval);
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameState = 1;
        startGame();
      }
    }
  }

  flappyDiv.addEventListener('keydown', function (e) {
    if (e.key == ' ' && gameState == 1) {
      if (!player.goUp && !player.workedOnce) {
        player.goUp = true;
      }
    }
  })

  flappyDiv.addEventListener('keyup', function (e) {
    if (e.key == ' ' && gameState == 1) {
      player.workedOnce = false;
    }
  })


  function drawBackground() {
    for (var i = 0; i < base.length; i++) {
      ctx.drawImage(sprite.img, sprite.bg[0], sprite.bg[1], sprite.bg[2], sprite.bg[3], base[i], 0, 144, CANVAS_HEIGHT - 15);
    }
  }

  function drawPlayer() {
    if (player.wingPosition == 0) {
      player.wingDirection = 1;
    } else if (player.wingPosition == 2) {
      player.wingDirection = -1;
    }
    let wing = sprite.flappy[player.wingPosition];
    ctx.save()
    ctx.translate(PLAYER_X + BIRD_WIDTH / 2, player.y + BIRD_HEIGHT / 2);
    ctx.rotate(player.angle * TO_RADIAN)
    ctx.drawImage(sprite.img, wing[0], wing[1], wing[2], wing[3], -BIRD_WIDTH / 2, -BIRD_HEIGHT / 2, BIRD_WIDTH, BIRD_HEIGHT);
    ctx.restore();
    if (wingCounter == 13) {
      player.wingPosition += player.wingDirection;
      wingCounter = 0;
    }
  }



  function drawStartScreen() {
    startInterval = setInterval(function () {
      ctx.beginPath();
      drawBackground();
      ctx.drawImage(sprite.img, sprite.start[0], sprite.start[1], sprite.start[2], sprite.start[3], 262, 225, 52, 29);
      ctx.drawImage(sprite.img, sprite.logo[0], sprite.logo[1], sprite.logo[2], sprite.logo[3], 197, 125, 182, 48);
      drawBase();

    }, 17)
  }

  function drawTunnels() {
    for (var i = 0; i < tunnels.length; i++) {
      tunnels[i].move();
      ctx.drawImage(sprite.img, sprite.tunnelUp[0], sprite.tunnelUp[1], sprite.tunnelUp[2], sprite.tunnelUp[3], tunnels[i].x, tunnels[i].height - 3 * sprite.tunnelUp[3], TUNNEL_WIDTH, 3 * sprite.tunnelUp[3]);
      ctx.drawImage(sprite.img, sprite.tunnelDown[0], sprite.tunnelDown[1], sprite.tunnelDown[2], sprite.tunnelDown[3], tunnels[i].x, tunnels[i].height + TUNNEL_GAP, TUNNEL_WIDTH, 3 * sprite.tunnelDown[3]);
    }
  }

  function displayScore() {
    var scoreString = player.score.toString();
    var numDist = 280;
    for (var i = scoreString.length - 1; i >= 0; i--) {
      let num = parseInt(scoreString[i]);
      ctx.drawImage(sprite.img, sprite.numBig[num][0], sprite.numBig[num][1], sprite.numBig[num][2], sprite.numBig[num][3], numDist, 10, sprite.numBig[num][2], sprite.numBig[num][3]);
      numDist -= 13;
    }

  }

  function drawBase() {
    for (var i = 0; i < base.length; i++) {
      ctx.drawImage(sprite.img, sprite.base[0], sprite.base[1], sprite.base[2], sprite.base[3], base[i], 600, 144, 15);
    }
  }

  function moveBase() {
    for (var i = 0; i < base.length; i++) {
      base[i] -= 2;
      if (base[i] == -144) {
        base[i] = CANVAS_WIDTH;
      }
    }
  }

  function startGame() {
    gameInterval = setInterval(function () {
      wingCounter += 1;
      ctx.beginPath();
      drawBackground();
      player.move();
      drawPlayer();
      drawTunnels();
      drawBase();
      moveBase();
      player.addScore(tunnels);
      displayScore();
      if (player.checkWallCollision() || player.checkTunnelCollision(tunnels, idx)) {
        endGame();
      }
    }, 17)
  }


  function drawScoreBoard() {
    ctx.drawImage(sprite.img, sprite.scoreBoard[0], sprite.scoreBoard[1], sprite.scoreBoard[2], sprite.scoreBoard[3], 175, 325, sprite.scoreBoard[2] * 2, sprite.scoreBoard[3] * 2);
    var scoreString = player.score.toString();
    var numDist = 365;
    for (var i = scoreString.length - 1; i >= 0; i--) {
      let num = parseInt(scoreString[i]);
      ctx.drawImage(sprite.img, sprite.numSmall[num][0], sprite.numSmall[num][1], sprite.numSmall[num][2], sprite.numSmall[num][3], numDist, 360, sprite.numSmall[num][2] * 2, sprite.numSmall[num][3] * 2);
      numDist -= 13;
    }
    if (window.localStorage.getItem('score' + idx) == null) { window.localStorage.setItem('score' + idx, 0) };
    var scoreString = window.localStorage.getItem('score' + idx).toString();
    numDist = 365;
    for (var i = scoreString.length - 1; i >= 0; i--) {
      let num = parseInt(scoreString[i]);
      ctx.drawImage(sprite.img, sprite.numSmall[num][0], sprite.numSmall[num][1], sprite.numSmall[num][2], sprite.numSmall[num][3], numDist, 400, sprite.numSmall[num][2] * 2, sprite.numSmall[num][3] * 2);
      numDist -= 13;
    }

    if (player.score >= 50) {
      ctx.drawImage(sprite.img, sprite.medalGold[0], sprite.medalGold[1], sprite.medalGold[2], sprite.medalGold[3], 200, 368, sprite.medalGold[2] * 2, sprite.medalGold[3] * 2);
    } else if (player.score >= 15) {
      ctx.drawImage(sprite.img, sprite.medalSilver[0], sprite.medalSilver[1], sprite.medalSilver[2], sprite.medalSilver[3], 200, 368, sprite.medalSilver[2] * 2, sprite.medalSilver[3] * 2);
    } else if (player.score >= 5) {
      ctx.drawImage(sprite.img, sprite.medalBronze[0], sprite.medalBronze[1], sprite.medalBronze[2], sprite.medalBronze[3], 200, 368, sprite.medalBronze[2] * 2, sprite.medalBronze[3] * 2);
    }
  }

  function endGame() {
    gameState = 2;
    clearInterval(gameInterval);
    drawBackground();
    drawPlayer();
    drawTunnels();
    drawBase();
    drawScoreBoard();
    player.reset();
    for (var i = 0; i < tunnels.length; i++) {
      tunnels[i].reset();
    }
    ctx.beginPath();
    ctx.drawImage(sprite.img, sprite.gameOver[0], sprite.gameOver[1], sprite.gameOver[2], sprite.gameOver[3], 197, 125, 182, 48);
    ctx.drawImage(sprite.img, sprite.start[0], sprite.start[1], sprite.start[2], sprite.start[3], 262, 225, 52, 29);
    base = [0, 144, 288, 432, 576];
    wingCounter = 0;

  }

  drawStartScreen();
}