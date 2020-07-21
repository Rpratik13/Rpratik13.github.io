/**
 * It creates the slime enemy object.
 *
 * @param {game_object} game It is the main game object.
 * @param {number} x It holds the horizontal tile position.
 * @param {number} y It holds the vertical tile position.
 */
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
  this.knockback = false; //Used to push enemy backward when it is hit or collides with the player.
  this.alive = true;
  this.knockbackCount = 0;

  /**
   * It draws the slime object.
   */
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

  /**
   * It shows the name and current health of enemy when hovered.
   */
  this.showDetails = function () {
    if (this.x * TILE.size <= this.game.mouseX && this.game.mouseX <= (this.x + SLIME.width) * TILE.size &&
      this.y * TILE.size <= this.game.mouseY && this.game.mouseY <= (this.y + SLIME.height) * TILE.size) {
      this.ctx.fillText('Slime: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  /**
   * It moves the slime in right direction.
   */
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

  /**
   * It moves the slime in left direction.
   */
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

  /**
   * It moves the slime downwards when there is not tile below it.
   */

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

  /**
   * It checks horizontal collision with player.
   */
  this.checkXCollision = function () {
    for (var j = 0; j <= PLAYER.width; j++) {
      if (this.x <= this.player.x + j && this.player.x + j <= this.x + SLIME.width) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks vertical collision with player.
   */
  this.checkYCollision = function () {
    for (var j = 0; j <= PLAYER.height; j++) {
      if (this.y <= this.player.y + j && this.player.y + j <= this.y + SLIME.height) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks collision with player.
   */
  this.playerCollision = function () {
    if (this.checkXCollision() && this.checkYCollision()) {
      this.health -= PLAYER.collisionDamage;
      this.player.health = Math.floor(this.player.health - SLIME.damage * (1 - this.player.armor / PLAYER.armorDiv));
      this.knockback = true;
      playSound('player_hurt');
      playSound('slime_hit');
    }
  }

  /**
   * It pushes the slime back when it collides with player or is hit.
   */
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

  /**
   * It checks if the slime has died.
   */
  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > TILE.mapWidth) {
      this.alive = false;
      if (this.health <= 0) {
        playSound('slime_killed');
        if (Math.random() > DROP_CHANCE.gel) {
          this.world.droppedTiles.push(new Tile(this.game, 'gel', this.x, this.y));
        }
      }
    }
  }

  /**
   * It checks horizontal collision with player weapon.
   */
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

  /**
   * It checks vertical collision with player weapon.
   */
  this.checkSwingYHit = function () {
    for (var i = 0; i <= SLIME.height; i++) {
      if (this.player.y - WEAPON.size <= this.y + i &&
        this.y + i <= this.player.y + WEAPON.size + 1) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks collision with player weapon.
   */
  this.checkSwingHit = function () {
    if (this.checkSwingXHit() && this.checkSwingYHit()) {
      this.knockback = true;
      this.health -= this.player.damage;
      playSound('slime_hit');
      this.checkDeath();
    }
  }
}