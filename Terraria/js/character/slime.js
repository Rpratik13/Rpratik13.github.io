function Slime(game, x, y) {
  this.game = game;
  this.player = game.player;
  this.ctx = game.ctx;
  this.world = game.world;
  this.type = 'slime';
  this.health = SLIME.fullHealth;
  this.img = new Image;
  this.img.src = 'images/enemy/slime.png';
  this.falling = false;
  this.x = x;
  this.y = y;
  this.left = Math.random() > 0.5 ? true : false;
  this.knockback = false;
  this.alive = true;
  this.knockbackCount = 0;

  this.draw = function () {
    if (this.alive) {
      this.ctx.drawImage(this.img, SLIME.sprite[0], SLIME.sprite[1], SLIME.sprite[2], SLIME.sprite[3],
        this.x * TILE.size, this.y * TILE.size, TILE.size * SLIME.width, TILE.size * SLIME.height);
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
    if (this.x * TILE.size <= this.game.mouseX && this.game.mouseX <= (this.x + SLIME.width) * TILE.size &&
      this.y * TILE.size <= this.game.mouseY && this.game.mouseY <= (this.y + SLIME.height) * TILE.size) {
      this.ctx.fillText('Slime: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  this.moveRight = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    if (TILE.walkable.includes(tiles[thisY][thisX + SLIME.width]) &&
      TILE.walkable.includes(tiles[thisY + SLIME.height][thisX + SLIME.width])) {
      this.x += ENEMY_SPEED;
    }

    this.checkDeath();
  }

  this.moveLeft = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    if (TILE.walkable.includes(tiles[thisY][thisX]) &&
      TILE.walkable.includes(tiles[thisY + SLIME.height][thisX])) {
      this.x -= ENEMY_SPEED;
    }

    this.checkDeath();
  }

  this.fall = function () {
    var tiles = this.world.world;
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);
    if (this.y < TILE.mapHeight &&
      TILE.walkable.includes(tiles[thisY + SLIME.height + 1][thisX + SLIME.width - 1]) &&
      TILE.walkable.includes(tiles[thisY + SLIME.height + 1][thisX + SLIME.width])) {
      this.y += FALL_SPEED;
    } else {
      this.falling = false;
    }
  }

  this.checkXCollision = function () {
    for (var j = 0; j <= PLAYER.width; j++) {
      if (this.x <= this.player.x + j && this.player.x + j <= this.x + SLIME.width) {
        return true;
      }
    }
    return false;
  }

  this.checkYCollision = function () {
    for (var j = 0; j <= PLAYER.height; j++) {
      if (this.y <= this.player.y + j && this.player.y + j <= this.y + SLIME.height) {
        return true;
      }
    }
    return false;
  }

  this.playerCollision = function () {
    if (this.checkXCollision() && this.checkYCollision()) {
      this.health -= PLAYER.collisionDamage;
      this.player.health = Math.floor(this.player.health - SLIME.damage * (1 - this.player.armor / PLAYER.armorDiv));
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
      if (TILE.walkable.includes(tiles[thisY][thisX + SLIME.width]) &&
        TILE.walkable.includes(tiles[thisY + SLIME.height][thisX + SLIME.width])) {
        this.x += KNOCKBACK.speed;
      }
    } else {
      if (TILE.walkable.includes(tiles[thisY][thisX]) &&
        TILE.walkable.includes(tiles[thisY + SLIME.height][thisX])) {
        this.x -= KNOCKBACK.speed;
      }
    }

    thisX = Math.floor(this.x);
    if (TILE.walkable.includes(tiles[thisY][thisX + SLIME.width - 1]) &&
      TILE.walkable.includes(tiles[thisY][thisX + SLIME.width])) {
      this.y -= KNOCKBACK.speed;
    }

    this.knockbackCount = (this.knockbackCount + 1) % KNOCKBACK.time;

    if (this.knockbackCount == 0) {
      this.knockback = false;
    }
  }

  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > TILE.mapWidth) {
      this.alive = false;
      playSound('slime_killed');

      if (Math.random() > DROP_CHANCE.gel && this.health <= 0) {
        this.world.droppedTiles.push(new Tile(this.game, 'gel', this.x, this.y))
      }
    }
  }

  this.checkSwingXHit = function () {
    if (this.player.left) {
      var range = [-(PLAYER.width + WEAPON.size) + 1, 1];
    } else {
      var range = [0, PLAYER.width + WEAPON.size];
    }

    for (var i = 0; i <= SLIME.width; i++) {
      if (this.player.x + range[0] <= this.x + i && this.x + i <= this.player.x + range[1]) {
        return true;
      }
    }
    return false;
  }

  this.checkSwingYHit = function () {
    for (var i = 0; i <= SLIME.height; i++) {
      if (this.player.y - WEAPON.size <= this.y + i &&
        this.y + i <= this.player.y + WEAPON.size + 1) {
        return true;
      }
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