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

  this.bossBattle = false;
  let ctx = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  ctx.font = "40px Arial";
  ctx.fillStyle = 'white';
  this.enemies = [];
  let timer = 0;
  let enemiesDead = [];
  var world;
  var player;
  var background;
  var bg_under;
  var sound;
  var logo;
  var gameState = 0;
  this.fireBalls = [];
  this.removeFireballs = [];
  this.preloader = new Preloader();
  this.preloader.load(ctx, start);
  this.mouseX = 0;
  this.mouseY = 0;

  function start() {
    sound = new Sound();
    world = new World(sound);
    player = new Player(sound, world);
    background = new Image;
    background.src = 'images/bg0.png';
    bg_under = new Image;
    bg_under.src = 'images/bg2.png';
    logo = new Image;
    logo.src = 'images/logo.png';
    drawStartScreen();

  }

  function drawStartScreen() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(logo, 200, 100, 486, 142);
    ctx.fillText('Start', 400, 300);
    if (gameState == 0) {
      window.requestAnimationFrame(drawStartScreen);
    } else {
      ctx.translate(world.translated, 0);
      run();
    }
  }


  bossBtn.onmousedown = function (e) {
    if (gameState == 1) {
      if (!that.bossBattle) {

        var minDist = Math.max(player.x - 20, 0);
        var maxDist = Math.min(player.x + 20, 150);
        that.enemies.push(new Boss(ctx, Math.floor(Math.random() * (maxDist - minDist) + minDist), 8, sound, player, that));

      }
      sound.playRoar();
      that.bossBattle = true;
    }
  }

  game.onmousemove = function (e) {
    if (gameState == 1) {
      if (player.showInventory) {
        player.inventory.mouseX = e.pageX;
        player.inventory.mouseY = e.pageY;
      } else {
        that.mouseX = -world.translated + e.pageX;
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
        ctx.font = '10px Arial';
        sound.playBackground();
      }
    } else {
      if (player.showInventory) {
        player.inventory.clicked(cursorX, cursorY);
      } else {
        player.swinging = true;
        that.cursorX = cursorX;
        that.cursorY = cursorY;
        world.clicked(cursorX, cursorY, player);
      }
    }
  }

  document.addEventListener('keydown', function (e) {
    if (gameState == 1) {
      if (e.key == 'd') {
        player.left = false;
        player.goRight = true;
        player.goLeft = false;
      } else if (e.key == 'a') {
        player.left = true;
        player.goLeft = true;
        player.goRight = false;
      } else if (e.key == ' ' && player.totalJumps == 3 && player.flyTime < 50) {
        player.jumping = true;
        player.falling = false
        player.jumpCounter = 0;
      }

    }
  })

  document.addEventListener('keyup', function (e) {
    if (gameState == 1) {
      if (e.key == ' ' && player.jumps < player.totalJumps && player.totalJumps < 3) {
        player.jumping = true;
        player.falling = false;
        player.jumps += 1;
      } else if (e.key == 'i') {
        player.showInventory = !player.showInventory;
        player.inventory.craftingSelected = -1;
      } else if (e.key == 'd') {
        player.goRight = false;
        player.pose = 0;
      } else if (e.key == 'a') {
        player.goLeft = false;
        player.pose = 0;
      }
    }
  })

  function showTime(timer) {
    seconds = (timer / 20000) * 86400;
    hours = Math.floor(seconds / 3600);
    seconds = seconds - hours * 3600;
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - minutes * 60);
    ctx.font = '20px Arial'
    var x;
    if (player.x < 25) {
      x = 25 * TILE_SIZE;
    } else if (player.x > 128) {
      x = 128 * TILE_SIZE;
    } else {
      x = player.x * TILE_SIZE;
    }
    ctx.fillText(hours + ':' + minutes, x, 40);
  }

  function drawBackground() {
    ctx.clearRect(-CANVAS_WIDTH, -CANVAS_HEIGHT, 5 * CANVAS_WIDTH, 3 * CANVAS_HEIGHT);
    for (var i = -1; i < 4; i++) {
      ctx.drawImage(background, CANVAS_WIDTH * i, 0, CANVAS_WIDTH, 300)
      ctx.drawImage(bg_under, CANVAS_WIDTH * i, 300, CANVAS_WIDTH, 620);
    }

    if (timer < 5000) {
      game.style.backgroundColor = '#00acea';
    } else if (timer < 10000) {
      game.style.backgroundColor = '#9ed7f1';
    } else if (timer < 15000) {
      game.style.backgroundColor = '#ff8b59';
    } else {
      game.style.backgroundColor = '#1d2855';
    }

  }

  function drawFireball() {
    for (var i = 0; i < that.fireBalls.length; i++) {
      that.fireBalls[i].throw(ctx);
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
    if (player.falling) {
      player.fall(world.world);
    } else if (player.jumping) {
      player.jump(world.world);
    } else if (player.swinging) {
      player.swing(ctx, that.enemies, world, that);
    }
    if (player.goLeft) {
      player.moveLeft(world.world, ctx);
    } else if (player.goRight) {
      player.moveRight(world.world, ctx);
    }
  }

  function drawInventory() {
    if (player.showInventory) {
      player.inventory.display(ctx);
    }
  }

  function generateEnemies() {
    var minDist = Math.max(player.x - 20, 0);
    var maxDist = Math.min(player.x + 20, 150);

    if (timer % 500 == 0 && !that.bossBattle) {
      if (timer > 10000) {
        that.enemies.push(new Slime(ctx, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0, sound, that))
      } else {
        that.enemies.push(new Eye(ctx, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0, sound, that))
        that.enemies.push(new Zombie(ctx, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0, sound, that))
      }
    }
  }

  function removeDeadEnemies() {
    for (var i = 0; i < that.enemies.length; i++) {
      that.enemies[i].draw(player, world);
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
    drawBackground();
    showTime(timer);

    world.drawWorld(ctx);
    world.drawDroppedTiles(ctx);
    drawFireball();


    player.draw(ctx, world.world, that);
    player.displayHealth(ctx);
    player.displayMana(ctx);
    player.itemPickup(world);
    movePlayer();



    timer = (timer + 1) % 20000;
    generateEnemies();
    removeDeadEnemies();


    drawInventory();
    requestAnimationFrame(run);
  }
}