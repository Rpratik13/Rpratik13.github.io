/**
 * It creates the demon eye enemy object.
 *
 * @param {game_object} game It is the main game object.
 * @param {number} x It holds the horizontal tile position.
 * @param {number} y It holds the vertical tile position.
 */
function Eye(game, x, y) {
  this.game = game;
  this.ctx = game.ctx;
  this.player = game.player;
  this.health = EYE.fullHealth;
  this.world = game.world;
  this.type = 'eye';
  this.img = new Image;
  this.img.src = 'images/enemy/eye.png';
  this.x = x;
  this.y = y;
  this.knockback = false; //Used to push enemy backward when it is hit or collides with the player.
  this.knockbackCount = 0;
  this.alive = true;

  /**
   * It set the direction of the enemy based on player position.
   */
  this.checkDirection = function () {
    if (this.player.x + EYE.width < this.x) {
      this.left = true;
    } else if (this.player.x - EYE.width > this.x) {
      this.left = false;
    }
  }

  /**
   * It draws the demon eye.
   */
  this.draw = function () {
    if (this.alive) {
      this.ctx.save();

      this.checkDirection();

      if (this.left) {
        this.ctx.drawImage(this.img, EYE.sprite[0], EYE.sprite[1], EYE.sprite[2], EYE.sprite[3],
          this.x * TILE.size, this.y * TILE.size, EYE.width * TILE.size, EYE.height * TILE.size);
      } else {
        this.ctx.translate(CANVAS_WIDTH, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, EYE.sprite[0], EYE.sprite[1], EYE.sprite[2], EYE.sprite[3],
          CANVAS_WIDTH - (EYE.leftTile + this.x) * TILE.size, this.y * TILE.size, EYE.width * TILE.size, EYE.height * TILE.size);
      }
      this.ctx.restore();
    }

    this.playerCollision();
    this.move();
    this.checkDeath();
    this.showDetails();
  }

  /**
   * It moves the demon eye.
   */
  this.move = function () {
    if (this.knockback) {
      this.knock();
    } else {
      if (this.left) {
        this.x -= ENEMY_SPEED;
      } else {
        this.x += ENEMY_SPEED;
      }

      if (this.y < this.player.y) {
        this.y += ENEMY_SPEED;
      } else {
        this.y -= ENEMY_SPEED;
      }
    }
  }

  /**
   * It shows the name and current health of enemy when hovered.
   */
  this.showDetails = function () {
    if (this.x * TILE.size <= this.game.mouseX && this.game.mouseX <= (this.x + EYE.width) * TILE.size &&
      this.y * TILE.size <= this.game.mouseY && this.game.mouseY <= (this.y + EYE.height) * TILE.size) {
      this.ctx.fillText('Demon Eye: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  /**
   * It checks horizontal collision with player.
   */
  this.checkXCollision = function () {
    for (var j = 0; j <= PLAYER.width; j++) {
      if (this.x <= this.player.x + j && this.player.x + j <= this.x + EYE.width) {
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
      if (this.y <= this.player.y + j && this.player.y + j <= this.y + EYE.height) {
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
      this.player.health = Math.floor(this.player.health - EYE.damage * (1 - this.player.armor / PLAYER.armorDiv));
      this.knockback = true;
      playSound('player_hurt');
      playSound('slime_hit');
    }
  }

  /**
   * It pushes the enemy back when it collides with player or is hit.
   */
  this.knock = function () {
    if (this.x > this.player.x) {
      this.x += KNOCKBACK_SPEED;
    } else if (this.x < this.player.x) {
      this.x -= KNOCKBACK_SPEED;
    }
    this.y -= KNOCKBACK_SPEED;

    this.knockbackCount = (this.knockbackCount + 1) % KNOCKBACK_TIME;

    if (this.knockbackCount == 0) {
      this.knockback = false;
    }

  }

  /**
   * It checks if the enemy has died.
   */
  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > TILE.mapWidth) {
      this.alive = false;
      playSound('slime_killed');
      if (Math.random() < DROP_CHANCE.lens && this.health <= 0) {
        this.world.droppedTiles.push(new Tile(this.game, 'lens', this.x, this.y));
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

    for (var i = 0; i <= EYE.width; i++) {
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
    for (var i = 0; i <= EYE.height; i++) {
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