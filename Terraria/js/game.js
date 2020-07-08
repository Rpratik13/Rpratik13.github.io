function Game() {
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
  let enemies = [new Eye(ctx, 18, 14), new Eye(ctx, 28, 14)];
  let timer = 0;

  game.onmousedown = function (e) {
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

    world.drawWorld(ctx);
    world.drawDroppedTiles(ctx);
    player.draw(ctx, world.world);
    if (player.falling) {
      player.fall(world.world);
    } else if (player.jumping) {
      player.jump(world.world);
    } else if (player.swinging) {
      player.swing(ctx);
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
    timer += 1;
    // if (timer == 100) {
    //   enemies.push(new Zombie(ctx, Math.floor(Math.random() * (45 - 2) + 2), 0))
    // }

    for (var i = 0; i < enemies.length; i++) {
      enemies[i].draw(player, world);
    }
    requestAnimationFrame(run);
  }
  run()
}