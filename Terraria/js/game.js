function Game() {
  let that = this;
  let game = document.getElementById('terraria');
  game.style.backgroundColor = '#00acea';
  let canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'canvas');
  game.appendChild(canvas);
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


  document.onmousedown = function (e) {

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
      }
    }
  })

  document.addEventListener('keyup', function (e) {
    if (gameState == 1) {
      if (e.key == ' ') {
        player.jumping = true;
      } else if (e.key == 'i') {
        player.showInventory = !player.showInventory;
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
    ctx.fillText(hours + ':' + minutes, player.x * 16, 40);
  }

  function run() {
    ctx.clearRect(-CANVAS_WIDTH, -CANVAS_HEIGHT, 5 * CANVAS_WIDTH, 3 * CANVAS_HEIGHT);
    for (var i = -1; i < 4; i++) {
      ctx.drawImage(background, CANVAS_WIDTH * i, 0, CANVAS_WIDTH, 300)
      ctx.drawImage(bg_under, CANVAS_WIDTH * i, 300, CANVAS_WIDTH, 620);
    }
    showTime(timer);

    world.drawWorld(ctx);
    world.drawDroppedTiles(ctx);

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
    player.draw(ctx, world.world, that);
    if (player.falling) {
      player.fall(world.world);
    } else if (player.jumping) {
      player.jump(world.world);
    } else if (player.swinging) {
      player.swing(ctx, that.enemies, world, that);
    }
    player.displayHealth(ctx);
    if (player.goLeft) {
      player.moveLeft(world.world, ctx);
    } else if (player.goRight) {
      player.moveRight(world.world, ctx);
    }
    if (player.showInventory) {
      player.inventory.display(ctx);
    }
    player.itemPickup(world);
    timer = (timer + 1) % 20000;
    var minDist = Math.max(player.x - 20, 0);
    var maxDist = Math.min(player.x + 20, 150);
    if (timer < 5000) {
      game.style.backgroundColor = '#00acea';
    } else if (timer < 10000) {
      game.style.backgroundColor = '#9ed7f1';
    } else if (timer < 15000) {
      game.style.backgroundColor = '#ff8b59';
    } else {
      game.style.backgroundColor = '#1d2855';
    }
    if (timer % 500 == 0) {
      if (timer < 10000) {
        that.enemies.push(new Slime(ctx, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0, sound))
      } else {
        that.enemies.push(new Eye(ctx, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0, sound))
        that.enemies.push(new Zombie(ctx, Math.floor(Math.random() * (maxDist - minDist) + minDist), 0, sound))
      }
    }

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
    requestAnimationFrame(run);
  }
}