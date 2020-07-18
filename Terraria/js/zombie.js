function Zombie(game, x, y) {
  this.game = game;
  this.ctx = game.ctx;
  this.player = game.player;
  this.world = game.world;
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

  this.checkDirection = function () {
    if (this.player.x < this.x) {
      this.left = true;
    } else {
      this.left = false;
    }
  }

  this.draw = function () {
    if (this.alive) {
      this.ctx.save();

      this.checkDirection();

      if (this.left) {
        this.ctx.drawImage(this.img, 0, ZOMBIE_SPRITE[this.pose], 34, 46,
          this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 48);
      } else {
        this.ctx.translate(CANVAS_WIDTH, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, 0, ZOMBIE_SPRITE[this.pose], 34, 46,
          CANVAS_WIDTH - 35 - this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 48);
      }

      this.ctx.restore();
    }

    this.checkZombiePose();
    this.playerCollision();
    this.move();

    this.showDetails();
  }

  this.move = function () {
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
  }

  this.showDetails = function () {
    if (this.x * TILE_SIZE <= this.game.mouseX && this.game.mouseX <= (this.x + 2) * TILE_SIZE &&
      this.y * TILE_SIZE <= this.game.mouseY && this.game.mouseY <= (this.y + 3) * TILE_SIZE) {
      this.ctx.fillText('Zombie: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  this.moveRight = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    if (WALKABLE_TILES.includes(tiles[thisY + 1][thisX + 2]) &&
      WALKABLE_TILES.includes(tiles[thisY + 2][thisX + 2]) &&
      WALKABLE_TILES.includes(tiles[thisY + 3][thisX + 2])) {
      this.x += 1 / 50;
    }

    this.checkDeath();
  }

  this.moveLeft = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (WALKABLE_TILES.includes(tiles[thisY + 1][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY + 2][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY + 3][thisX])) {
      this.x -= 1 / 50;
    }

    this.checkDeath();
  }

  this.fall = function () {
    var tiles = this.world.world;
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

  this.playerCollision = function () {
    var thisX = Math.round(this.x);
    var thisY = Math.round(this.y);
    var playerX = Math.round(this.player.x);
    var playerY = Math.round(this.player.y);

    if (this.checkXCollision(thisX, playerX) && this.checkYCollision(thisY, playerY)) {
      this.player.health -= (20 * (1 - this.player.armor / 20));
      this.health -= 2;
      this.knockback = true;
      playSound('player_hurt');
      playSound('zombie_hit');
    }
    this.checkDeath();
  }

  this.knock = function () {
    var tiles = this.world.world
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    if (this.x > this.player.x) {
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

  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > 154) {
      playSound('zombie_killed');
      if (this.health <= 0) {
        if (Math.random() > 0.7) {
          this.world.droppedTiles.push(new Tile(this.game, 'zombie_drop', this.x, this.y))
        } else if (Math.random() > 0.9 && this.alive) {
          this.world.droppedTiles.push(new Tile(this.game, 'rocket', this.x, this.y))
        }
        this.alive = false;
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
    for (var i = 0; i < 4; i++) {
      if (this.player.y - 2 <= this.y + i && this.y + i <= this.player.y + 3) {
        return true;
      }
    }
    return false;
  }

  this.checkSwingHit = function () {
    if (this.checkSwingXHit() && this.checkSwingYHit()) {
      this.knockback = true;
      this.health -= this.player.damage;
      playSound('zombie_hit');
      this.checkDeath();
    }
  }

}