function Eye(ctx, x, y, sound, game) {
  this.game = game;
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


  this.checkDirection = function (player) {
    if (player.x + 3 < this.x) {
      this.left = true;
    } else if (player.x - 3 > this.x) {
      this.left = false;
    }
  }

  this.draw = function (player, world) {
    if (this.alive) {
      ctx.save();

      this.checkDirection(player);

      if (this.left) {
        this.ctx.drawImage(this.img, EYE_SPRITE[0], EYE_SPRITE[1], EYE_SPRITE[2], EYE_SPRITE[3],
          this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 16);
      } else {
        ctx.translate(CANVAS_WIDTH, 0);
        ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, EYE_SPRITE[0], EYE_SPRITE[1], EYE_SPRITE[2], EYE_SPRITE[3],
          CANVAS_WIDTH - 35 - this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 16);
      }
      ctx.restore();
    }

    this.playerCollision(player)
    this.move(player);
    this.checkDeath(world);
    this.showDetails();
  }

  this.move = function (player) {
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
    }
  }

  this.showDetails = function () {
    if (this.x * TILE_SIZE <= this.game.mouseX && this.game.mouseX <= (this.x + 2) * TILE_SIZE &&
      this.y * TILE_SIZE <= this.game.mouseY && this.game.mouseY <= (this.y + 1) * TILE_SIZE) {
      this.ctx.fillText('Demon Eye: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
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
    for (var i = 0; i < 3; i++) {
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
      this.sound.playSlimeHit();
    }
  }

  this.knock = function (player) {
    if (this.x > player.x) {
      this.x += 1 / 4;
    } else if (this.x < player.x) {
      this.x -= 1 / 4;
    }
    this.y -= 1 / 4;

    this.knockbackCount = (this.knockbackCount + 1) % 10;

    if (this.knockbackCount == 0) {
      this.knockback = false;
    }

  }

  this.checkDeath = function (world) {
    if (this.health <= 0 || this.x < 0 || this.x > 154) {
      this.alive = false;
      this.sound.playSlimeKilled();

      if (Math.random() > 0.7 && this.health <= 0) {
        world.droppedTiles.push(new Tile('lens', this.x, this.y))
      }
    }
  }

}