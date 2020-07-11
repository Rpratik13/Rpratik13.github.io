function Slime(ctx, x, y, sound) {
  this.sound = sound;
  this.ctx = ctx;
  this.type = 'slime';
  this.health = 20;
  this.img = new Image;
  this.img.src = 'images/slime.png';
  this.imgPos = [[0, 2, 44, 30], [2, 34, 40, 32]];
  this.pose = 0;
  this.falling = false;
  this.x = x;
  this.y = y;
  if (this.x < 25) {
    this.left = false;
  } else { this.left = true; }
  this.knockback = false;
  this.alive = true;
  this.knockbackCount = 0;

  this.draw = function (player, world) {
    this.world = world;
    if (this.alive) {
      this.ctx.drawImage(this.img, this.imgPos[this.pose][0], this.imgPos[this.pose][1], this.imgPos[this.pose][2], this.imgPos[this.pose][3],
        this.x * 16, this.y * 16, 32, 16);
    }
    this.playerCollision(player)
    if (this.knockback) {
      this.knock(player);
    } else {
      this.fall(world.world);
      if (this.left) {
        this.moveLeft(world.world, world);
      } else {
        this.moveRight(world.world, world);
      }
    }
  }

  this.moveRight = function (tiles, world) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (((tiles[thisY][thisX + 2] > 4 || tiles[thisY][thisX + 2] < 1) && tiles[thisY][thisX + 2] != 36) &&
      ((tiles[thisY + 1][thisX + 2] > 4 || tiles[thisY + 1][thisX + 2] < 1) && tiles[thisY + 1][thisX + 2] != 36)) {
      this.x += 1 / 50;
    }
    this.checkDeath(world);
  }

  this.moveLeft = function (tiles, world) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (((tiles[thisY][thisX] > 4 || tiles[thisY][thisX] < 1) && tiles[thisY][thisX] != 36) &&
      ((tiles[thisY + 1][thisX] > 4 || tiles[thisY + 1][thisX] < 1) && tiles[thisY + 1][thisX] != 36)) {
      this.x -= 1 / 50;
    }
    this.checkDeath(world);
  }

  this.fall = function (tiles) {
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    if (this.y < 39 &&
      (tiles[thisY + 2][thisX + 1] != 36) &&
      (tiles[thisY + 2][thisX + 2] != 36) &&
      (tiles[thisY + 2][thisX + 1] == 0 || tiles[thisY + 2][thisX + 1] > 4) &&
      (tiles[thisY + 2][thisX + 2] == 0 || tiles[thisY + 2][thisX + 2] > 4)) {
      this.y += 1 / 4;
    } else {
      this.falling = false;
    }
  }

  this.playerCollision = function (player) {
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    var playerX = Math.floor(player.x);
    var playerY = Math.floor(player.y);
    if ((thisX + 1 == playerX + 1 || thisX + 1 == playerX + 2 ||
        thisX + 2 == playerX + 1 || thisX + 2 == playerX + 2) &&
      (thisY == playerY + 1 || thisY + 1 == playerY + 1 ||
        thisY == playerY + 2 || thisY + 1 == playerY + 2 ||
        thisY == playerY + 3 || thisY + 1 == playerY + 3)) {
      this.health -= 2;
      player.health = Math.floor(player.health - 10 * (1 - player.armor / 20));
      this.knockback = true;
      this.sound.playPlayerHurt();
      this.sound.playSlimeHit();
    }
  }



  this.knock = function (player) {
    if (this.x > player.x) {
      this.x += 1 / 4;
    } else {
      this.x -= 1 / 4;
    }
    this.y -= 1 / 4;

    this.knockbackCount = (this.knockbackCount + 1) % 10;

    if (this.knockbackCount == 0) {
      this.knockback = false;
    }

  }


  this.checkDeath = function (world) {
    if (this.health < 0 || this.x < 0 || this.x > 154) {
      this.alive = false;
      this.sound.playSlimeKilled();

      if (Math.random() > 0.5) {
        world.droppedTiles.push(new Tile('gel', this.x, this.y))
      }
    }
  }

}