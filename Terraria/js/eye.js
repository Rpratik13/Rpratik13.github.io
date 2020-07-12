function Eye(ctx, x, y, sound) {
  this.sound = sound;
  this.ctx = ctx;
  this.health = 10;
  this.type = 'eye';
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

    this.playerCollision(player)
    if (this.knockback) {
      this.knock(player);
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
      this.checkDeath(world);
    }
  }

  this.playerCollision = function (player) {
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    var playerX = Math.floor(player.x);
    var playerY = Math.floor(player.y);

    if (!this.left) {
      if ((thisX + 3 == playerX + 1 || thisX + 3 == playerX + 2 ||
          thisX + 2 == playerX + 1 || thisX + 2 == playerX + 2) &&
        (thisY == playerY + 1 || thisY + 1 == playerY + 1 || thisY + 2 == playerY + 1 ||
          thisY == playerY + 2 || thisY + 1 == playerY + 2 || thisY + 2 == playerY + 1 ||
          thisY == playerY + 3 || thisY + 1 == playerY + 3 || thisY + 2 == playerY + 1)) {
        this.health -= 2;
        player.health = Math.floor(player.health - 10 * (1 - player.armor / 20));
        this.knockback = true;
        this.sound.playSlimeHit();

      }
    } else if ((thisX + 2 == playerX + 1 || thisX + 2 == playerX + 2 ||
        thisX + 1 == playerX + 1 || thisX + 1 == playerX + 2) &&
      (thisY == playerY + 1 || thisY + 1 == playerY + 1 || thisY + 2 == playerY + 1 ||
        thisY == playerY + 2 || thisY + 1 == playerY + 2 || thisY + 2 == playerY + 1 ||
        thisY == playerY + 3 || thisY + 1 == playerY + 3 || thisY + 2 == playerY + 1)) {
      this.health -= 2;
      player.health -= 5;
      this.knockback = true;
      this.sound.playSlimeHit();

    }
  }



  this.knock = function (player) {
    if (this.x > player.x && this.x < 50) {
      this.x += 1 / 4;
    } else if (this.x < player.x && this.x > 0) {
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

      if (Math.random() > 0.7) {
        world.droppedTiles.push(new Tile('lens', this.x, this.y))
      }
    }
  }

}