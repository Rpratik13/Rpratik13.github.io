function Game() {
  let that = this;

  let game = document.getElementById('terraria');
  game.style.backgroundColor = '#00acea';

  let canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'canvas');
  game.appendChild(canvas);

  let bossBtn = document.createElement('button');
  bossBtn.setAttribute('class', 'boss');
  bossBtn.innerHTML = 'Boss Battle';
  document.body.appendChild(bossBtn);


  let timeBtn = document.createElement('button');
  timeBtn.setAttribute('class', 'time');
  timeBtn.innerHTML = 'Add Time';
  document.body.appendChild(timeBtn);

  this.ctx = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  this.ctx.font = "40px Arial";
  this.ctx.fillStyle = 'white';
  this.enemies = [];
  let timer = 0;
  let enemiesDead = [];
  var background;
  var bg_under;
  var logo;
  var gameState = 0;
  var runAnimation;

  this.bossBattle = false;
  this.fireBalls = [];
  this.removeFireballs = [];
  this.preloader = new Preloader();
  this.preloader.load(this, start);
  this.mouseX = 0;
  this.mouseY = 0;
  this.player;

  function start() {
    that.world = new World();
    that.player = new Player();
    that.world.init(that);
    that.player.init(that);
    that.world.initTileHealth();
    background = new Image;
    background.src = 'images/bg0.png';
    bg_under = new Image;
    bg_under.src = 'images/bg2.png';
    logo = new Image;
    logo.src = 'images/logo.png';
    drawStartScreen();
  }

  function drawStartScreen() {
    var ctx = that.ctx;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(logo, 200, 100, 486, 142);
    ctx.fillText('Start', 400, 300);
    if (gameState == 0) {
      window.requestAnimationFrame(drawStartScreen);
    } else if (gameState == 1) {
      ctx.translate(that.world.translated, 0);
      run();
    }
  }

  function drawPauseScreen() {
    var ctx = that.ctx;
    ctx.fillText('Paused', -that.world.translated + 400, 300);
    if (gameState == 1) {
      run();
    } else if (gameState == 2) {
      window.requestAnimationFrame(drawPauseScreen);
    }
  }


  bossBtn.onmousedown = function (e) {
    if (gameState == 1) {
      stopSound('bg');
      stopSound('night_bg');
      playSound('boss_battle');
      if (!that.bossBattle) {

        var minDist = Math.max(that.player.x - 20, 0);
        var maxDist = Math.min(that.player.x + 20, 150);
        that.enemies.push(new Boss(that, Math.floor(Math.random() * (maxDist - minDist) + minDist), 8));

      }
      playSound('roar');
      that.bossBattle = true;
    }
  }

  timeBtn.onmousedown = function (e) {
    if (gameState == 1) {
      timer = (timer + 5000) % 20000;
    }
  }

  game.onmousemove = function (e) {
    if (gameState == 1) {
      if (that.player.showInventory) {
        that.player.inventory.mouseX = e.pageX;
        that.player.inventory.mouseY = e.pageY;
      } else {
        that.mouseX = -that.world.translated + e.pageX;
        that.mouseY = e.pageY;
      }
    }
  }

  game.onmousedown = function (e) {

    var cursorX = e.pageX;
    var cursorY = e.pageY;
    if (gameState == 0) {
      if (400 < cursorX && cursorX < 485 && 270 < cursorY && cursorY < 300) {
        gameState = 1;
        that.ctx.font = '10px Arial';
      }
    } else {
      if (that.player.showInventory) {
        that.player.inventory.clicked(cursorX, cursorY);
      } else {
        that.player.swinging = true;
        that.cursorX = cursorX;
        that.cursorY = cursorY;
        that.world.clicked(cursorX, cursorY);
      }
    }
  }

  document.addEventListener('keydown', function (e) {
    if (gameState == 1) {
      if (e.key == 'd') {
        that.player.left = false;
        that.player.goRight = true;
        that.player.goLeft = false;
      } else if (e.key == 'a') {
        that.player.left = true;
        that.player.goLeft = true;
        that.player.goRight = false;
      } else if (e.key == ' ' && that.player.totalJumps == 3 && that.player.flyTime < 50) {
        that.player.jumping = true;
        that.player.falling = false
        that.player.jumpCounter = 0;
      } else if (e.key == 'p') {
        gameState = 2;
        window.cancelAnimationFrame(runAnimation);
        drawPauseScreen();
      }

    } else if (gameState == 2) {
      if (e.key == 'p') {
        gameState = 1;
        that.player.goLeft = false;
        that.player.goRight = false;
      }
    }
  })

  document.addEventListener('keyup', function (e) {
    if (gameState == 1) {
      if (e.key == ' ' && that.player.jumps < that.player.totalJumps && that.player.totalJumps < 3) {
        that.player.jumping = true;
        that.player.falling = false;
        that.player.jumps += 1;
      } else if (e.key == 'i') {
        that.player.showInventory = !that.player.showInventory;
        that.player.inventory.craftingSelected = -1;
      } else if (e.key == 'd') {
        that.player.goRight = false;
        that.player.pose = 0;
      } else if (e.key == 'a') {
        that.player.goLeft = false;
        that.player.pose = 0;
      }
    }
  })

  function playBackgroundMusic(timer) {
    if (!that.bossBattle) {
      if (timer < 10000) {
        stopSound('night_bg');
        playSound('bg');
      } else {
        stopSound('bg');
        playSound('night_bg');
      }
    }
  }

  function showTime(timer) {
    seconds = (timer / 20000) * 86400;
    hours = Math.floor(seconds / 3600);
    seconds = seconds - hours * 3600;
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - minutes * 60);
    that.ctx.font = '20px Arial'
    var x;
    if (that.player.x < 25) {
      x = 25 * TILE_SIZE;
    } else if (that.player.x > 128) {
      x = 128 * TILE_SIZE;
    } else {
      x = that.player.x * TILE_SIZE;
    }
    that.ctx.fillText(hours + ':' + minutes, x, 40);
  }

  function drawBackground() {
    that.ctx.clearRect(-CANVAS_WIDTH, -CANVAS_HEIGHT, 5 * CANVAS_WIDTH, 3 * CANVAS_HEIGHT);
    for (var i = -1; i < 4; i++) {
      that.ctx.drawImage(background, CANVAS_WIDTH * i, 0, CANVAS_WIDTH, 300)
      that.ctx.drawImage(bg_under, CANVAS_WIDTH * i, 300, CANVAS_WIDTH, 620);
    }

    if (timer < 5000) {
      game.style.backgroundColor = '#9ed7f1';
    } else if (timer < 10000) {
      game.style.backgroundColor = '#00acea';
    } else if (timer < 15000) {
      game.style.backgroundColor = '#ff8b59';
    } else {
      game.style.backgroundColor = '#1d2855';
    }

  }

  function drawFireball() {
    for (var i = 0; i < that.fireBalls.length; i++) {
      that.fireBalls[i].throw();
      if (!that.fireBalls[i].active) {
        that.removeFireballs.push(i);
      }
    }

    for (var i = 0; i < that.removeFireballs.length; i++) {
      that.fireBalls.splice(that.removeFireballs[i], 1);
    }
    that.removeFireballs = [];
  }


  function movePlayer() {
    if (that.player.falling) {
      that.player.fall();
    } else if (that.player.jumping) {
      that.player.jump();
    } else if (that.player.swinging) {
      that.player.swing();
    }
    if (that.player.goLeft) {
      that.player.moveLeft();
    } else if (that.player.goRight) {
      that.player.moveRight();
    }
  }

  function drawInventory() {
    if (that.player.showInventory) {
      that.player.inventory.display();
    }
  }

  function generateEnemies() {
    var minDist = Math.max(that.player.x - 20, 0);
    var maxDist = Math.min(that.player.x + 20, 150);

    if (timer % 500 == 0 && !that.bossBattle) {
      if (timer < 10000) {
        that.enemies.push(new Slime(that, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0))
      } else {
        that.enemies.push(new Eye(that, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0))
        that.enemies.push(new Zombie(that, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0))
      }
    }
  }

  function removeDeadEnemies() {
    for (var i = 0; i < that.enemies.length; i++) {
      that.enemies[i].draw();
      if (!that.enemies[i].alive) {
        enemiesDead.push(i)
      }
    }

    for (var i = 0; i < enemiesDead.length; i++) {
      that.enemies.splice(enemiesDead[i], 1);
    }
    enemiesDead = [];
  }

  function run() {
    playBackgroundMusic(timer);
    drawBackground();
    showTime(timer);

    that.world.drawWorld();
    that.world.drawDroppedTiles();
    drawFireball();


    that.player.draw();
    that.player.displayHealth();
    that.player.displayMana();
    that.player.itemPickup();
    movePlayer();



    timer = (timer + 1) % 20000;
    generateEnemies();
    removeDeadEnemies();


    drawInventory();
    runAnimation = window.requestAnimationFrame(run);
  }
}