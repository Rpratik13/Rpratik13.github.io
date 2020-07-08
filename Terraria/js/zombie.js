function Zombie(ctx, x, y) {
  this.ctx = ctx;
  this.health = 70;
  this.img = new Image;
  this.img.src = 'images/zombie.png';
  this.imgPos = [0, 48, 96];
  this.imgDirection = 1;
  this.pose = 0;
  this.poseCounter = 0;
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
    if (this.alive) {
      ctx.save();
      if (player.x < this.x) {
        this.left = true;
      } else {
        this.left = false;
      }
      if (this.left) {
        this.ctx.drawImage(this.img, 0, this.imgPos[this.pose], 34, 46,
          this.x * 16, this.y * 16, 32, 48);
      } else {
        ctx.translate(CANVAS_WIDTH, 0);
        ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, 0, this.imgPos[this.pose], 34, 46,
          CANVAS_WIDTH - 35 - this.x * 16, this.y * 16, 32, 48);
      }
      ctx.restore();
    }
    this.poseCounter = (this.poseCounter + 1) % 4;
    if (this.poseCounter == 0) {
      this.pose += this.imgDirection;
    }
    if (this.pose == 0) {
      this.imgDirection = 1;
    } else if (this.pose == 2) {
      this.imgDirection = -1;
    }
    this.playerCollision(player)
    if (this.knockback) {
      this.knock();
    } else {
      this.fall(world.world);
      if (this.left) {
        this.moveLeft(world.world);
      } else {
        this.moveRight(world.world);
      }
    }
  }

  this.moveRight = function (tiles) {
    if (((tiles[Math.floor(this.y) + 3][Math.ceil(this.x) + 2] > 4 || tiles[Math.floor(this.y) + 3][Math.ceil(this.x) + 2] < 1) && tiles[Math.floor(this.y)][Math.ceil(this.x)] != 36) &&
      ((tiles[Math.floor(this.y) + 1][Math.ceil(this.x) + 2] > 4 || tiles[Math.floor(this.y) + 1][Math.ceil(this.x) + 2] < 1) && tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] != 36) &&
      ((tiles[Math.floor(this.y) + 2][Math.ceil(this.x) + 2] > 4 || tiles[Math.floor(this.y) + 2][Math.ceil(this.x) + 2] < 1) && tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] != 36)) {
      this.x += 1 / 50;
    }
    this.checkDeath();
  }

  this.moveLeft = function (tiles) {
    if (((tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y)][Math.ceil(this.x)] != 36) &&
      ((tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] != 36) &&
      ((tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] != 36)) {
      this.x -= 1 / 50;
    }
    this.checkDeath();
  }

  this.fall = function (tiles) {
    if (this.y < 39 &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] != 36) &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] != 36) &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] == 0 || tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] > 4) &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] == 0 || tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] > 4)) {
      this.y += 1 / 4;
    } else {
      this.falling = false;
    }
  }

  this.playerCollision = function (player) {
    if (!this.left) {
      if ((Math.floor(this.x) + 3 == Math.floor(player.x + 1) || Math.floor(this.x) + 3 == Math.floor(player.x + 2) ||
          Math.floor(this.x) + 2 == Math.floor(player.x + 1) || Math.floor(this.x) + 2 == Math.floor(player.x + 2)) &&
        (Math.floor(this.y) == Math.floor(player.y + 1) || Math.floor(this.y) + 1 == Math.floor(player.y + 1) || Math.floor(this.y) + 2 == Math.floor(player.y + 1) ||
          Math.floor(this.y) == Math.floor(player.y + 2) || Math.floor(this.y) + 1 == Math.floor(player.y + 2) || Math.floor(this.y) + 2 == Math.floor(player.y + 1) ||
          Math.floor(this.y) == Math.floor(player.y + 3) || Math.floor(this.y) + 1 == Math.floor(player.y + 3) || Math.floor(this.y) + 2 == Math.floor(player.y + 1))) {
        this.health -= 2;
        player.health -= 20;
        this.knockback = true;
      }
    } else if ((Math.floor(this.x) + 2 == Math.floor(player.x + 1) || Math.floor(this.x) + 2 == Math.floor(player.x + 2) ||
        Math.floor(this.x) + 1 == Math.floor(player.x + 1) || Math.floor(this.x) + 1 == Math.floor(player.x + 2)) &&
      (Math.floor(this.y) == Math.floor(player.y + 1) || Math.floor(this.y) + 1 == Math.floor(player.y + 1) || Math.floor(this.y) + 2 == Math.floor(player.y + 1) ||
        Math.floor(this.y) == Math.floor(player.y + 2) || Math.floor(this.y) + 1 == Math.floor(player.y + 2) || Math.floor(this.y) + 2 == Math.floor(player.y + 1) ||
        Math.floor(this.y) == Math.floor(player.y + 3) || Math.floor(this.y) + 1 == Math.floor(player.y + 3) || Math.floor(this.y) + 2 == Math.floor(player.y + 1))) {
      this.health -= 2;
      player.health -= 20;
      this.knockback = true;
    }
  }



  this.knock = function () {
    if (this.left) {
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


  this.checkDeath = function () {
    if (this.health < 0 || this.x < 0 || this.x > 50) {
      this.alive = false;
    }
  }

}