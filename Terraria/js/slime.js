function Slime(ctx, x, y, sound, game) {
  this.game = game;
  this.sound = sound;
  this.ctx = ctx;
  this.type = 'slime';
  this.health = 20;
  this.img = new Image;
  this.img.src = 'images/slime.png';
  this.falling = false;
  this.x = x;
  this.y = y;
  this.left = Math.random() > 0.5 ? true : false;
  this.knockback = false;
  this.alive = true;
  this.knockbackCount = 0;

  this.draw = function (player, world) {
    this.world = world;
    if (this.alive) {
      this.ctx.drawImage(this.img, SLIME_SPRITE[0], SLIME_SPRITE[1], SLIME_SPRITE[2], SLIME_SPRITE[3],
        this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 16);
    }
    this.playerCollision(player)
    if (this.knockback) {
      this.knock(player, world.world);
    } else {
      this.fall(world.world);
      if (this.left) {
        this.moveLeft(world.world, world);
      } else {
        this.moveRight(world.world, world);
      }
    }

    this.showDetails();
  }

  this.showDetails = function () {
    if (this.x * TILE_SIZE <= this.game.mouseX && this.game.mouseX <= (this.x + 2) * TILE_SIZE &&
      this.y * TILE_SIZE <= this.game.mouseY && this.game.mouseY <= (this.y + 1) * TILE_SIZE) {
      this.ctx.fillText('Slime: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  this.moveRight = function (tiles, world) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    if (WALKABLE_TILES.includes(tiles[thisY][thisX + 2]) &&
      WALKABLE_TILES.includes(tiles[thisY + 1][thisX + 2])) {
      this.x += 1 / 50;
    }

    this.checkDeath(world);
  }

  this.moveLeft = function (tiles, world) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    if (WALKABLE_TILES.includes(tiles[thisY][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY + 1][thisX])) {
      this.x -= 1 / 50;
    }

    this.checkDeath(world);
  }

  this.fall = function (tiles) {
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    if (this.y < 39 &&
      WALKABLE_TILES.includes(tiles[thisY + 2][thisX + 1]) &&
      WALKABLE_TILES.includes(tiles[thisY + 2][thisX + 2])) {
      this.y += 1 / 4;
    } else {
      this.falling = false;
    }
  }

  this.checkXCollision = function (thisX, playerX) {
    for (var i = 1; i < 3; i++) {
      for (var j = 1; j < 3; j++) {
        if (thisX + i == playerX + j) {
          return true;
        }
      }
    }
    return false;
  }

  this.checkYCollision = function (thisY, playerY) {
    for (var i = 0; i < 2; i++) {
      for (var j = 1; j < 4; j++) {
        if (thisY + i == playerY + j) {
          return true;
        }
      }
    }
    return false;
  }

  this.playerCollision = function (player) {
    var thisX = Math.round(this.x);
    var thisY = Math.round(this.y);
    var playerX = Math.round(player.x);
    var playerY = Math.round(player.y);
    if (this.checkXCollision(thisX, playerX) && this.checkYCollision(thisY, playerY)) {
      this.health -= 2;
      player.health = Math.floor(player.health - 10 * (1 - player.armor / 20));
      this.knockback = true;
      this.sound.playPlayerHurt();
      this.sound.playSlimeHit();
    }
  }

  this.knock = function (player, tiles) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (this.x > player.x) {
      if (WALKABLE_TILES.includes(tiles[thisY][thisX + 2]) &&
        WALKABLE_TILES.includes(tiles[thisY + 1][thisX + 2])) {
        this.x += 1 / 4;
      }
    } else {
      if (WALKABLE_TILES.includes(tiles[thisY][thisX]) &&
        WALKABLE_TILES.includes(tiles[thisY + 1][thisX])) {
        this.x -= 1 / 4;
      }
    }

    if (WALKABLE_TILES.includes(tiles[thisY][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY][thisX + 1])) {
      this.y -= 1 / 4;
    }

    this.knockbackCount = (this.knockbackCount + 1) % 10;

    if (this.knockbackCount == 0) {
      this.knockback = false;
    }
  }

  this.checkDeath = function (world) {
    if (this.health <= 0 || this.x < 0 || this.x > 154) {
      this.alive = false;
      this.sound.playSlimeKilled();

      if (Math.random() > 0.5 && this.health <= 0) {
        world.droppedTiles.push(new Tile('gel', this.x, this.y))
      }
    }
  }
}