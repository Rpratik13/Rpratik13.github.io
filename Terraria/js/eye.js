function Eye(ctx, x, y) {
  this.ctx = ctx;
  this.health = 10;
  this.img = new Image;
  this.img.src = 'images/eye.png';
  this.imgDirection = 1;
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
        this.ctx.drawImage(this.img, 0, 0, 36, 22,
          this.x * 16, this.y * 16, 32, 16);
      } else {
        ctx.translate(CANVAS_WIDTH, 0);
        ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, 0, 0, 36, 22,
          CANVAS_WIDTH - 35 - this.x * 16, this.y * 16, 32, 16);
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
      if (this.left) {
        this.x -= 1 / 50;
      } else {
        this.x += 1 / 50;
      }

      if (this.y < player.y) {
        this.y += 1 / 50
      } else {
        this.y -= 1 / 50
      }
      this.checkDeath();
    }
  }

  this.moveRight = function (tiles) {
    this.x += 1 / 50;
    this.checkDeath();
  }

  this.moveLeft = function (tiles) {
    this.x -= 1 / 50;
    this.checkDeath();
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
      player.health -= 5;
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