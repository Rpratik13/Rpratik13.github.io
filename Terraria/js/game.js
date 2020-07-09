function Game() {
  let that = this;
  let game = document.getElementById('terraria');
  let canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'canvas');
  game.appendChild(canvas);
  let ctx = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  let world = new World();
  let player = new Player();
  ctx.font = "10px Arial";
  ctx.fillStyle = 'white';
  let enemies = [];
  let timer = 0;
  let enemiesDead = [];

  let background = [new Image, new Image];
  background[0].src = 'images/bg0.png';
  background[1].src = 'images/bg1.png';
  let bg_under = new Image;
  bg_under.src = 'images/bg2.png';
  let bg_num = 0;
  let sound = document.createElement("audio");
  sound.src = 'audio/bg.mp3';
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(sound);
  this.die = sound;
  this.die.load();
  this.preloader = new Preloader();
  this.preloader.load(ctx, run);


  document.onmousedown = function (e) {
    console.log(this)
    that.die.play();

    var cursorX = e.pageX;
    var cursorY = e.pageY;
    if (player.showInventory) {
      player.inventory.clicked(cursorX, cursorY);
    } else {
      player.swinging = true;
      world.clicked(cursorX, cursorY, player);
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key == 'd') {
      player.left = false;
      player.goRight = true;
      player.goLeft = false;
    } else if (e.key == 'a') {
      player.left = true;
      player.goLeft = true;
      player.goRight = false;
    }
  })

  document.addEventListener('keyup', function (e) {
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
  })

  function run() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(background[bg_num], 0, 0, CANVAS_WIDTH, 300)
    ctx.drawImage(bg_under, 0, 300, CANVAS_WIDTH, 620)
    world.drawWorld(ctx);
    world.drawDroppedTiles(ctx);
    player.draw(ctx, world.world);
    if (player.falling) {
      player.fall(world.world);
    } else if (player.jumping) {
      player.jump(world.world);
    } else if (player.swinging) {
      player.swing(ctx, enemies);
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
    // slime.draw(player, world);
    timer = (timer + 1) % 20000;
    if (timer % 500 == 0) {
      if (timer < 10000) {
        enemies.push(new Slime(ctx, Math.floor(Math.random() * (45 - 2) + 2), 0))
        bg_num = 0;
      } else {
        enemies.push(new Eye(ctx, Math.floor(Math.random() * (45 - 2) + 2), 0))
        enemies.push(new Zombie(ctx, Math.floor(Math.random() * (45 - 2) + 2), 0))
        bg_num = 1;
      }
    }

    for (var i = 0; i < enemies.length; i++) {
      enemies[i].draw(player, world);
      if (!enemies[i].alive) {
        enemiesDead.push(i)
      }
    }

    for (var i = 0; i < enemiesDead.length; i++) {
      enemies.splice(enemiesDead[i], 1);
    }
    enemiesDead = [];
    requestAnimationFrame(run);
  }
}