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
      player.moveRight(world.world);
    } else if (e.key == 'a') {
      player.left = true;
      player.moveLeft(world.world);
    }
  })

  document.addEventListener('keyup', function (e) {
    if (e.key == ' ') {
      player.jumping = true;
    } else if (e.key == 'i') {
      player.showInventory = !player.showInventory;
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

    if (player.showInventory) {
      player.inventory.display(ctx);
    }
    player.itemPickup(world);
    requestAnimationFrame(run);
  }
  run()
}