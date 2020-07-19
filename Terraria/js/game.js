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
    background.src = 'images/bg/bg0.png';
    bg_under = new Image;
    bg_under.src = 'images/bg/bg1.png';
    logo = new Image;
    logo.src = 'images/logo.png';
    drawStartScreen();
  }

  function drawStartScreen() {
    var ctx = that.ctx;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(logo, LOGO.x, LOGO.y, LOGO.width, LOGO.height);
    ctx.fillText('Start', START.x, START.y);
    if (gameState == STATE.startScreen) {
      window.requestAnimationFrame(drawStartScreen);
    } else if (gameState == STATE.running) {
      ctx.translate(that.world.translated, 0);
      run();
    }
  }

  function drawPauseScreen() {
    var ctx = that.ctx;
    ctx.fillText('Paused', -that.world.translated + PAUSED.x, PAUSED.y);
    if (gameState == STATE.running) {
      run();
    } else if (gameState == STATE.paused) {
      window.requestAnimationFrame(drawPauseScreen);
    }
  }


  bossBtn.onmousedown = function (e) {
    if (gameState == STATE.running) {
      stopSound('bg');
      stopSound('night_bg');
      playSound('boss_battle');
      if (!that.bossBattle) {

        var minDist = Math.max(that.player.x - ENEMY_GEN_DIST.range, ENEMY_GEN_DIST.minMargin);
        var maxDist = Math.min(that.player.x + ENEMY_GEN_DIST.range, ENEMY_GEN_DIST.maxMargin);
        that.enemies.push(new Boss(that, Math.floor(Math.random() * (maxDist - minDist) + minDist)));

      }
      playSound('roar');
      that.bossBattle = true;
    }
  }

  timeBtn.onmousedown = function () {
    if (gameState == 1) {
      timer = (timer + DAY.quarter) % DAY.full;
    }
  }

  game.onmousemove = function (e) {
    if (gameState == STATE.running) {
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
    if (gameState == STATE.startScreen) {
      if (START.x < cursorX && cursorX < START.width && START.yAbove < cursorY && cursorY < START.y) {
        gameState = STATE.running;
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
    if (gameState == STATE.running) {
      if (e.key == 'd') {
        that.player.left = false;
        that.player.goRight = true;
        that.player.goLeft = false;
      } else if (e.key == 'a') {
        that.player.left = true;
        that.player.goLeft = true;
        that.player.goRight = false;
      } else if (e.key == ' ' && that.player.totalJumps == 3 && that.player.flyTime < PLAYER.totalFlyTime) {
        that.player.jumping = true;
        that.player.falling = false
        that.player.jumpCounter = 0;
      } else if (e.key == 'p') {
        gameState = STATE.paused;
        window.cancelAnimationFrame(runAnimation);
        drawPauseScreen();
      }

    } else if (gameState == STATE.paused) {
      if (e.key == 'p') {
        gameState = STATE.running;
        that.player.goLeft = false;
        that.player.goRight = false;
      }
    }
  })

  document.addEventListener('keyup', function (e) {
    if (gameState == STATE.running) {
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
      if (timer < DAY.full / 2) {
        stopSound('night_bg');
        playSound('bg');
      } else {
        stopSound('bg');
        playSound('night_bg');
      }
    }
  }

  function showTime(timer) {
    seconds = (timer / DAY.full) * SECONDS_IN_DAY;
    hours = Math.floor(seconds * TO_HOURS);
    seconds = seconds - hours / TO_HOURS;
    minutes = Math.floor(seconds * TO_MINS);
    seconds = Math.floor(seconds - minutes / TO_MINS);
    that.ctx.font = '20px Arial'
    var x;
    if (that.player.x < MIN_DISPLAY_POS) {
      x = MIN_DISPLAY_POS * TILE.size;
    } else if (that.player.x > MAX_DISPLAY_POS) {
      x = MAX_DISPLAY_POS * TILE.size;
    } else {
      x = that.player.x * TILE.size;
    }
    that.ctx.fillText(hours + ':' + minutes, x, TIME_HEIGHT);
  }

  function drawBackground() {
    that.ctx.clearRect(-CANVAS_WIDTH, -CANVAS_HEIGHT, 5 * CANVAS_WIDTH, 3 * CANVAS_HEIGHT);
    for (var i = -1; i < 4; i++) {
      that.ctx.drawImage(background, CANVAS_WIDTH * i, BG_POS.y, CANVAS_WIDTH, BG_POS.height)
      that.ctx.drawImage(bg_under, CANVAS_WIDTH * i, BG_POS.yUnder, CANVAS_WIDTH, BG_POS.heightUnder);
    }

    if (timer < DAY.quarter) {
      game.style.backgroundColor = '#9ed7f1';
    } else if (timer < DAY.full / 2) {
      game.style.backgroundColor = '#00acea';
    } else if (timer < DAY.quarter * 3) {
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
    var minDist = Math.max(that.player.x - ENEMY_GEN_DIST.range, ENEMY_GEN_DIST.minMargin);
    var maxDist = Math.min(that.player.x + ENEMY_GEN_DIST.range, ENEMY_GEN_DIST.maxMargin);

    if (timer % ENEMY_GEN_TIME == 0 && !that.bossBattle) {
      if (timer < DAY.full / 2) {
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



    timer = (timer + 1) % DAY.full;
    generateEnemies();
    removeDeadEnemies();


    drawInventory();
    runAnimation = window.requestAnimationFrame(run);
  }
}