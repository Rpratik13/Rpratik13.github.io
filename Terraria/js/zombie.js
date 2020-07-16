function Zombie(ctx, x, y, sound, game) {
  this.game = game;
  this.sound = sound;
  this.ctx = ctx;
  this.health = 70;
  this.type = 'zombie';
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
    this.playerCollision(player, world)
    if (this.knockback) {
      this.knock(player);
    } else {
      this.fall(world.world);
      if (this.left) {
        this.moveLeft(world.world);
      } else {
        this.moveRight(world.world);
      }
    }
    this.showDetails();
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

    if (((tiles[thisY + 3][thisX + 2] > 4 || tiles[thisY + 3][thisX + 2] < 1) && tiles[thisY][thisX] != 36) &&
      ((tiles[thisY + 1][thisX + 2] > 4 || tiles[thisY + 1][thisX + 2] < 1) && tiles[thisY + 1][thisX] != 36) &&
      ((tiles[thisY + 2][thisX + 2] > 4 || tiles[thisY + 2][thisX + 2] < 1) && tiles[thisY + 1][thisX] != 36)) {
      this.x += 1 / 50;
    }
    this.checkDeath();
  }

  this.moveLeft = function (tiles) {
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (((tiles[thisY + 3][thisX] > 4 || tiles[thisY + 3][thisX] < 1) && tiles[thisY][thisX] != 36) &&
      ((tiles[thisY + 1][thisX] > 4 || tiles[thisY + 1][thisX] < 1) && tiles[thisY + 1][thisX] != 36) &&
      ((tiles[thisY + 2][thisX] > 4 || tiles[thisY + 2][thisX] < 1) && tiles[thisY + 1][thisX] != 36)) {
      this.x -= 1 / 50;
    }
    this.checkDeath();
  }

  this.fall = function (tiles) {
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);
    if (this.y < 39 &&
      (tiles[thisY + 4][thisX + 1] != 36) &&
      (tiles[thisY + 4][thisX + 2] != 36) &&
      (tiles[thisY + 4][thisX + 1] == 0 || tiles[thisY + 4][thisX + 1] > 4) &&
      (tiles[thisY + 4][thisX + 2] == 0 || tiles[thisY + 4][thisX + 2] > 4)) {
      this.y += 1 / 4;
    } else {
      this.falling = false;
    }
  }

  this.playerCollision = function (player, world) {
    var thisX = Math.round(this.x);
    var thisY = Math.round(this.y);
    var playerX = Math.round(player.x);
    var playerY = Math.round(player.y);
    if (!this.left) {
      if ((thisX + 3 == playerX + 1 || thisX + 3 == playerX + 2 ||
          thisX + 2 == playerX + 2 || thisX + 2 == playerX + 2) &&
        (thisY == playerY + 1 || thisY + 1 == playerY + 1 || thisY + 2 == playerY + 1 ||
          thisY == playerY + 2 || thisY + 1 == playerY + 2 || thisY + 2 == playerY + 2 ||
          thisY == playerY + 3 || thisY + 1 == playerY + 3 || thisY + 2 == playerY + 3)) {
        this.health -= 2;
        player.health -= 20;
        this.knockback = true;
        this.sound.playPlayerHurt();
        this.sound.playZombieHit();
      }
    } else if ((thisX + 2 == playerX + 1 || thisX + 2 == playerX + 2 ||
        thisX + 1 == playerX + 1 || thisX + 1 == playerX + 2) &&
      (thisY == playerY + 1 || thisY + 1 == playerY + 1 || thisY + 2 == playerY + 1 ||
        thisY == playerY + 2 || thisY + 1 == playerY + 2 || thisY + 2 == playerY + 2 ||
        thisY == playerY + 3 || thisY + 1 == playerY + 3 || thisY + 2 == playerY + 3)) {
      this.health -= 2;
      player.health = Math.floor(player.health - 20 * (1 - player.armor / 20));
      this.knockback = true;
      this.sound.playPlayerHurt();
      this.sound.playZombieHit();
    }
    this.checkDeath(world);
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
    if (this.health <= 0 || this.x < 0 || this.x > 154) {
      this.alive = false;
      this.sound.playZombieKilled();
      if (Math.random() > 0.8) {
        world.droppedTiles.push(new Tile('zombie_drop', this.x, this.y))
      }
    }
  }

}