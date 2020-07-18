function Slime(game, x, y) {
  this.game = game;
  this.player = game.player;
  this.ctx = game.ctx;
  this.world = game.world;
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

  this.draw = function () {
    if (this.alive) {
      this.ctx.drawImage(this.img, SLIME_SPRITE[0], SLIME_SPRITE[1], SLIME_SPRITE[2], SLIME_SPRITE[3],
        this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 16);
    }
    this.playerCollision()
    if (this.knockback) {
      this.knock();
    } else {
      this.fall();
      if (this.left) {
        this.moveLeft();
      } else {
        this.moveRight();
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

  this.moveRight = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    if (WALKABLE_TILES.includes(tiles[thisY][thisX + 2]) &&
      WALKABLE_TILES.includes(tiles[thisY + 1][thisX + 2])) {
      this.x += 1 / 50;
    }

    this.checkDeath();
  }

  this.moveLeft = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    if (WALKABLE_TILES.includes(tiles[thisY][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY + 1][thisX])) {
      this.x -= 1 / 50;
    }

    this.checkDeath();
  }

  this.fall = function () {
    var tiles = this.world.world;
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

  this.playerCollision = function () {
    var thisX = Math.round(this.x);
    var thisY = Math.round(this.y);
    var playerX = Math.round(this.player.x);
    var playerY = Math.round(this.player.y);
    if (this.checkXCollision(thisX, playerX) && this.checkYCollision(thisY, playerY)) {
      this.health -= 2;
      this.player.health = Math.floor(this.player.health - 10 * (1 - this.player.armor / 20));
      this.knockback = true;
      playSound('player_hurt');
      playSound('slime_hit');
    }
  }

  this.knock = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (this.x > this.player.x) {
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

  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > 154) {
      this.alive = false;
      playSound('slime_killed');

      if (Math.random() > 0.5 && this.health <= 0) {
        this.world.droppedTiles.push(new Tile(this.game, 'gel', this.x, this.y))
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