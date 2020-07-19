function Zombie(game, x, y) {
  this.game = game;
  this.ctx = game.ctx;
  this.player = game.player;
  this.world = game.world;
  this.health = ZOMBIE.fullHealth;
  this.type = 'zombie';
  this.img = new Image;
  this.img.src = 'images/enemy/zombie.png';
  this.imgDirection = 1;
  this.pose = 0;
  this.poseCounter = 0;
  this.falling = false;
  this.x = x;
  this.y = y;

  this.alive = true;
  this.knockback = false;
  this.knockbackCount = 0;

  playSound('zombie_create');

  this.checkZombiePose = function () {
    this.poseCounter = (this.poseCounter + 1) % ZOMBIE.poseChange;
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
        this.ctx.drawImage(this.img, ZOMBIE.sprite[this.pose][0], ZOMBIE.sprite[this.pose][1], ZOMBIE.sprite[this.pose][2], ZOMBIE.sprite[this.pose][3],
          this.x * TILE.size, this.y * TILE.size, ZOMBIE.width * TILE.size, ZOMBIE.height * TILE.size);
      } else {
        this.ctx.translate(CANVAS_WIDTH, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, ZOMBIE.sprite[this.pose][0], ZOMBIE.sprite[this.pose][1], ZOMBIE.sprite[this.pose][2], ZOMBIE.sprite[this.pose][3],
          CANVAS_WIDTH - (ZOMBIE.leftTile + this.x) * TILE.size, this.y * TILE.size, ZOMBIE.width * TILE.size, ZOMBIE.height * TILE.size);
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
    if (this.x * TILE.size <= this.game.mouseX && this.game.mouseX <= (this.x + ZOMBIE.width) * TILE.size &&
      this.y * TILE.size <= this.game.mouseY && this.game.mouseY <= (this.y + ZOMBIE.height) * TILE.size) {
      this.ctx.fillText('Zombie: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  this.moveRight = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);

    for (var i = 1; i <= ZOMBIE.height; i++) {
      if (!TILE.walkable.includes(tiles[thisY + i][thisX + ZOMBIE.width])) {
        return
      }
    }
    this.x += ENEMY_SPEED;

    this.checkDeath();
  }

  this.moveLeft = function () {
    var tiles = this.world.world;
    var thisX = Math.ceil(this.x);
    var thisY = Math.floor(this.y);
    for (var i = 1; i <= ZOMBIE.height; i++) {
      if (!TILE.walkable.includes(tiles[thisY + i][thisX])) {
        return
      }
    }
    this.x -= ENEMY_SPEED;

    this.checkDeath();
  }

  this.fall = function () {
    var tiles = this.world.world;
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);
    if (this.y < 39 &&
      TILE.walkable.includes(tiles[thisY + ZOMBIE.height + 1][thisX + ZOMBIE.width - 1]) &&
      TILE.walkable.includes(tiles[thisY + ZOMBIE.height + 1][thisX + ZOMBIE.width])) {
      this.y += FALL_SPEED;
    } else {
      this.falling = false;
    }
  }

  this.checkXCollision = function () {
    for (var j = 0; j <= PLAYER.width; j++) {
      if (this.x <= this.player.x + j && this.player.x + j <= this.x + ZOMBIE.width) {
        return true;
      }
    }
    return false;
  }

  this.checkYCollision = function () {
    for (var j = 0; j <= PLAYER.height; j++) {
      if (this.y <= this.player.y + j && this.player.y + j <= this.y + ZOMBIE.height) {
        return true;
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
      this.player.health -= (ZOMBIE.damage * (1 - this.player.armor / PLAYER.armorDiv));
      this.health -= KNOCKBACK.damage;
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
      if (TILE.walkable.includes(tiles[thisY + 1][thisX + 2]) &&
        TILE.walkable.includes(tiles[thisY + 2][thisX + 2]) &&
        TILE.walkable.includes(tiles[thisY + 3][thisX + 2])) {
        this.x += KNOCKBACK.speed;
      }
    } else {
      if (TILE.walkable.includes(tiles[thisY + 1][thisX]) &&
        TILE.walkable.includes(tiles[thisY + 2][thisX]) &&
        TILE.walkable.includes(tiles[thisY + 3][thisX])) {
        this.x -= KNOCKBACK.speed;
      }
    }
    if (TILE.walkable.includes(tiles[thisY][thisX]) &&
      TILE.walkable.includes(tiles[thisY][thisX + 1])) {
      this.y -= KNOCKBACK.speed;
    }

    this.knockbackCount = (this.knockbackCount + 1) % KNOCKBACK.time;

    if (this.knockbackCount == 0) {
      this.knockback = false;
    }

  }

  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > 154) {
      playSound('zombie_killed');
      if (this.health <= 0) {
        if (Math.random() < DROP_CHANCE.zombieDrop) {
          this.world.droppedTiles.push(new Tile(this.game, 'zombie_drop', this.x, this.y))
        } else if (Math.random() < DROP_CHANCE.rocket && this.alive) {
          this.world.droppedTiles.push(new Tile(this.game, 'rocket', this.x, this.y))
        }
        this.alive = false;
      }
    }
  }

  this.checkSwingXHit = function () {
    if (this.player.left) {
      var range = [-(PLAYER.width + WEAPON.size) + 1, 1];
    } else {
      var range = [0, PLAYER.width + WEAPON.size];
    }

    for (var i = 0; i <= ZOMBIE.width; i++) {
      if (this.player.x + range[0] <= this.x + i && this.x + i <= this.player.x + range[1]) {
        return true;
      }
    }
    return false;
  }

  this.checkSwingYHit = function () {
    for (var i = 0; i <= ZOMBIE.height; i++) {
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
      playSound('zombie_hit');
      this.checkDeath();
    }
  }

}