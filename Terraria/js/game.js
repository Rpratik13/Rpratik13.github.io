function Game() {
  let that = this;
  let game = document.getElementById('terraria');
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
  let bg_num = 0;
  var sound;
  var logo;
  var gameState = 0;

  this.preloader = new Preloader();
  this.preloader.load(ctx, start);

  function start() {
    sound = new Sound();
    world = new World(sound);
    player = new Player(sound);
    background = [new Image, new Image];
    background[0].src = 'images/bg0.png';
    background[1].src = 'images/bg1.png';
    bg_under = new Image;
    bg_under.src = 'images/bg2.png';
    logo = new Image;
    logo.src = 'images/logo.png';
    drawStartScreen();
  }

  function drawStartScreen() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(background[0], 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(logo, 200, 100, 486, 142);
    ctx.fillText('Start', 400, 300);
    if (gameState == 0) {
      window.requestAnimationFrame(drawStartScreen);
    } else {
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

  function run() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(background[bg_num], 0, 0, CANVAS_WIDTH, 300)
    ctx.drawImage(bg_under, 0, 300, CANVAS_WIDTH, 620)
    world.drawWorld(ctx);
    world.drawDroppedTiles(ctx);

    player.draw(ctx, world.world, that);
    if (player.falling) {
      player.fall(world.world);
    } else if (player.jumping) {
      player.jump(world.world);
    } else if (player.swinging) {
      player.swing(ctx, that.enemies, world);
    }
    player.displayHealth(ctx);
    if (player.goLeft) {
      player.moveLeft(world.world);
    } else if (player.goRight) {
      player.moveRight(world.world);
    }
    if (player.showInventory) {
      player.inventory.display(ctx);
    }
    player.itemPickup(world);
    timer = (timer + 1) % 20000;
    if (timer % 500 == 0) {
      if (timer < 10000) {
        that.enemies.push(new Slime(ctx, Math.floor(Math.random() * (45 - 2) + 2), 0, sound))
        bg_num = 0;
      } else {
        that.enemies.push(new Eye(ctx, Math.floor(Math.random() * (45 - 2) + 2), 0, sound))
        that.enemies.push(new Zombie(ctx, Math.floor(Math.random() * (45 - 2) + 2), 0, sound))
        bg_num = 1;
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