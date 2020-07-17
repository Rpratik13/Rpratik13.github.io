function Zombie(ctx, x, y, sound, game) {
  this.game = game;
  this.sound = sound;
  this.ctx = ctx;
  this.health = 70;
  this.type = 'zombie';
  this.img = new Image;
  this.img.src = 'images/zombie.png';
  this.imgDirection = 1;
  this.pose = 0;
  this.poseCounter = 0;
  this.falling = false;
  this.x = x;
  this.y = y;

  this.alive = true;
  this.knockback = false;
  this.knockbackCount = 0;


  this.checkZombiePose = function () {
    this.poseCounter = (this.poseCounter + 1) % 4;
    if (this.poseCounter == 0) {
      this.pose += this.imgDirection;
    }

    if (this.pose == 0) {
      this.imgDirection = 1;
    } else if (this.pose == 2) {
      this.imgDirection = -1;
    }
  }

  this.checkDirection = function (player) {
    if (player.x < this.x) {
      this.left = true;
    } else {
      this.left = false;
    }
  }

  this.draw = function (player, world) {
    if (this.alive) {
      ctx.save();

      this.checkDirection(player);

      if (this.left) {
        this.ctx.drawImage(this.img, 0, ZOMBIE_SPRITE[this.pose], 34, 46,
          this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 48);
      } else {
        ctx.translate(CANVAS_WIDTH, 0);
        ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, 0, ZOMBIE_SPRITE[this.pose], 34, 46,
          CANVAS_WIDTH - 35 - this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 48);
      }

      ctx.restore();
    }

    this.checkZombiePose();
    this.playerCollision(player, world);
    this.move(player, world);

    this.showDetails();
  }

  this.move = function (player, world) {
    if (this.knockback) {
      this.knock(player, world.world);
    } else {
      this.fall(world.world);
      if (this.left) {
        this.moveLeft(world.world);
      } else {
        this.moveRight(world.world);
      }
    }
  }

  this.showDetails = function () {
    if (this.x * TILE_SIZE <= this.game.mouseX && this.game.mouseX <= (this.x + 2) * TILE_SIZE &&
      this.y * TILE_SIZE <= this.game.mouseY && this.game.mouseY <= (this.y + 3) * TILE_SIZE) {
      this.ctx.fillText('Zombie: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  this.moveRight = function (tiles) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    if (WALKABLE_TILES.includes(tiles[thisY + 1][thisX + 2]) &&
      WALKABLE_TILES.includes(tiles[thisY + 2][thisX + 2]) &&
      WALKABLE_TILES.includes(tiles[thisY + 3][thisX + 2])) {
      this.x += 1 / 50;
    }

    this.checkDeath();
  }

  this.moveLeft = function (tiles) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (WALKABLE_TILES.includes(tiles[thisY + 1][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY + 2][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY + 3][thisX])) {
      this.x -= 1 / 50;
    }

    this.checkDeath();
  }

  this.fall = function (tiles) {
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);
    if (this.y < 39 &&
      WALKABLE_TILES.includes(tiles[thisY + 4][thisX + 1]) &&
      WALKABLE_TILES.includes(tiles[thisY + 4][thisX + 2])) {
      this.y += 1 / 4;
    } else {
      this.falling = false;
    }
  }

  this.checkXCollision = function (thisX, playerX) {
    if (!this.left) {
      var x = [2, 3];
    } else {
      var x = [1, 2];
    }

    for (var i = 0; i < x.length; i++) {
      for (var j = 1; j < 3; j++) {
        if (thisX + x[i] == playerX + j) {
          return true;
        }
      }
    }
    return false;
  }

  this.checkYCollision = function (thisY, playerY) {
    for (var i = 1; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        if (thisY + i == playerY + j) {
          return true;
        }
      }
    }
    return false;
  }

  this.playerCollision = function (player, world) {
    var thisX = Math.round(this.x);
    var thisY = Math.round(this.y);
    var playerX = Math.round(player.x);
    var playerY = Math.round(player.y);

    if (this.checkXCollision(thisX, playerX) && this.checkYCollision(thisY, playerY)) {
      player.health -= (20 * (1 - player.armor / 20));
      this.health -= 2;
      this.knockback = true;
      this.sound.playPlayerHurt();
      this.sound.playZombieHit();
    }
    this.checkDeath(world);
  }

  this.knock = function (player, tiles) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (this.x > player.x) {
      if (WALKABLE_TILES.includes(tiles[thisY + 1][thisX + 2]) &&
        WALKABLE_TILES.includes(tiles[thisY + 2][thisX + 2]) &&
        WALKABLE_TILES.includes(tiles[thisY + 3][thisX + 2])) {
        this.x += 1 / 4;
      }
    } else {
      if (WALKABLE_TILES.includes(tiles[thisY + 1][thisX]) &&
        WALKABLE_TILES.includes(tiles[thisY + 2][thisX]) &&
        WALKABLE_TILES.includes(tiles[thisY + 3][thisX])) {
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

      this.sound.playZombieKilled();
      if (this.health <= 0) {
        if (Math.random() > 0.7) {
          world.droppedTiles.push(new Tile('zombie_drop', this.x, this.y))
        } else if (Math.random() > 0.9 && this.alive) {
          world.droppedTiles.push(new Tile('rocket', this.x, this.y))
        }
        this.alive = false;
      }
    }
  }

}