function Eye(game, x, y) {
  this.game = game;
  this.ctx = game.ctx;
  this.player = game.player;
  this.health = 10;
  this.world = game.world;
  this.type = 'eye';
  this.img = new Image;
  this.img.src = 'images/eye.png';
  this.imgDirection = 1;
  this.poseCounter = 0;
  this.falling = false;
  this.x = x;
  this.y = y;
  this.knockback = false;
  this.alive = true;
  this.knockbackCount = 0;


  this.checkDirection = function () {
    if (this.player.x + 3 < this.x) {
      this.left = true;
    } else if (this.player.x - 3 > this.x) {
      this.left = false;
    }
  }

  this.draw = function () {
    if (this.alive) {
      this.ctx.save();

      this.checkDirection();

      if (this.left) {
        this.ctx.drawImage(this.img, EYE_SPRITE[0], EYE_SPRITE[1], EYE_SPRITE[2], EYE_SPRITE[3],
          this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 16);
      } else {
        this.ctx.translate(CANVAS_WIDTH, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, EYE_SPRITE[0], EYE_SPRITE[1], EYE_SPRITE[2], EYE_SPRITE[3],
          CANVAS_WIDTH - 35 - this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 16);
      }
      this.ctx.restore();
    }

    this.playerCollision()
    this.move();
    this.checkDeath();
    this.showDetails();
  }

  this.move = function () {
    if (this.knockback) {
      this.knock();
    } else {
      if (this.left) {
        this.x -= 1 / 50;
      } else {
        this.x += 1 / 50;
      }

      if (this.y < this.player.y) {
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

  this.playerCollision = function () {
    var thisX = Math.round(this.x);
    var thisY = Math.round(this.y);
    var playerX = Math.round(this.player.x);
    var playerY = Math.round(this.player.y);

    if (this.checkXCollision(thisX, playerX) && this.checkYCollision(thisY, playerY)) {
      this.health -= 2;
      this.player.health = Math.floor(this.player.health - 10 * (1 - this.player.armor / 20));
      this.knockback = true;
      playSound('slime_hit');
    }
  }

  this.knock = function () {
    if (this.x > this.player.x) {
      this.x += 1 / 4;
    } else if (this.x < this.player.x) {
      this.x -= 1 / 4;
    }
    this.y -= 1 / 4;

    this.knockbackCount = (this.knockbackCount + 1) % 10;

    if (this.knockbackCount == 0) {
      this.knockback = false;
    }

  }

  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > 154) {
      this.alive = false;
      playSound('slime_killed');
      if (Math.random() > 0.7 && this.health <= 0) {
        this.world.droppedTiles.push(new Tile(this.game, 'lens', this.x, this.y))
      }
    }
  }

  this.checkSwingXHit = function () {
    if (this.player.left) {
      var range = [-3, 1];
    } else {
      var range = [0, 4];
    }

    for (var i = 0; i < 2; i++) {
      if (this.player.x + range[0] <= this.x + i && this.x + i <= this.player.x + range[1]) {
        return true;
      }
    }
    return false;
  }

  this.checkSwingYHit = function () {
    if (this.player.y - 2 <= this.y && this.y <= this.player.y + 3) {
      return true;
    }
    return false;
  }

  this.checkSwingHit = function () {
    if (this.checkSwingXHit() && this.checkSwingYHit()) {
      this.knockback = true;
      this.health -= this.player.damage;
      playSound('slime_hit');
      this.checkDeath();
    }
  }

}