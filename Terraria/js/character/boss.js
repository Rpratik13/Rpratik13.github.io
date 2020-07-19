/**
 * It creates the boss object.
 *
 * @param {game_object} game It is the main game object.
 * @param {number} x It holds the horizontal tile position of the boss.
 */
function Boss(game, x) {
  this.game = game;
  this.enemies = game.enemies;
  this.player = game.player;
  this.world = game.world
  this.ctx = game.ctx;
  this.type = 'boss';
  this.health = BOSS.fullHealth;
  this.img = new Image;
  this.img.src = 'images/enemy/boss.png';
  this.pose = 0;
  this.x = x;
  this.y = BOSS.startY;
  this.alive = true;
  this.dx = this.player.x < this.x ? -BOSS.speed : BOSS.speed;
  this.dy = this.player.y < this.y ? -BOSS.speed : BOSS.speed;
  this.enemyGenerateTime = 0;
  this.damage = BOSS.damage;


  /**
   * It sets the facing direction of the boss based on player position. 
   */
  this.checkDirection = function () {
    if (this.player.x < this.x) {
      this.left = true;
    } else if (this.player.x > this.x + BOSS.width) {
      this.left = false;
    }
  }

  /**
   * It sets the boss battle to stage 2 when boss health is less than half. 
   */

  this.checkBossState = function () {
    if (this.health < (BOSS.fullHealth / 2) && this.pose == 0) {
      this.pose = 1;
      this.damage *= 2;
    }
  }

  /**
   * It draws the boss on the canvas. 
   */
  this.draw = function () {
    this.checkDirection();
    this.checkBossState();

    this.ctx.save();
    if (this.alive) {
      if (this.left) {
        this.ctx.drawImage(this.img, BOSS.sprite[this.pose][0], BOSS.sprite[this.pose][1], BOSS.sprite[this.pose][2], BOSS.sprite[this.pose][3],
          this.x * TILE.size, this.y * TILE.size, BOSS.width * TILE.size, BOSS.height * TILE.size);
      } else {
        this.ctx.translate(CANVAS_WIDTH, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, BOSS.sprite[this.pose][0], BOSS.sprite[this.pose][1], BOSS.sprite[this.pose][2], BOSS.sprite[this.pose][3],
          CANVAS_WIDTH - (BOSS.leftTile + this.x) * TILE.size, this.y * TILE.size, BOSS.width * TILE.size, BOSS.height * TILE.size);
        this.ctx.restore();
      }
    }

    this.playerCollision();
    this.checkMoveDirection();
    this.move();
    this.generateEnemy();
    this.showDetails();
  }


  /**
   * It shows the name and current health of the boss when mouse is hovered over the boss. 
   */
  this.showDetails = function () {
    if (this.x * TILE.size <= this.game.mouseX && this.game.mouseX <= (this.x + BOSS.width) * TILE.size &&
      this.y * TILE.size <= this.game.mouseY && this.game.mouseY <= (this.y + BOSS.height) * TILE.size) {
      this.ctx.fillText('Eye of Cthulu: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  /**
   * It sets the moving direction of the boss based on player position.
   */
  this.checkMoveDirection = function () {
    if (this.player.x - BOSS.width > this.x) {
      this.dx = BOSS.speed;
    } else if (this.player.x + BOSS.width < this.x) {
      this.dx = -BOSS.speed;
    }
    if (this.player.y - BOSS.height > this.y) {
      this.dy = BOSS.speed;
    } else if (this.player.y + BOSS.height < this.y) {
      this.dy = -BOSS.speed;
    }
  }

  /**
   * It moves the boss. 
   */
  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.checkDeath();
  }

  /**
   * It checks if the boss has collided with the player horizontally.
   */
  this.checkXCollision = function () {
    for (var j = 0; j <= PLAYER.width; j++) {
      if (this.x <= this.player.x + j && this.player.x + j <= this.x + BOSS.width) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks if the boss has collided with the player vertically.
   */
  this.checkYCollision = function () {
    for (var j = 0; j <= PLAYER.height; j++) {
      if (this.y <= this.player.y + j && this.player.y + j <= this.y + BOSS.height) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks if the boss has collided with the player. 
   */

  this.playerCollision = function () {
    if (this.checkXCollision() && this.checkYCollision()) {
      this.player.health = this.player.health - this.damage * (1 - this.player.armor / PLAYER.armorDiv);
      playSound('player_hurt');
      playSound('slime_hit');
    }
  }

  /**
   * It generates demon eye enemy near the boss.
   */
  this.generateEnemy = function () {
    if (this.health > BOSS.fullHealth / 2) {
      this.enemyGenerateTime = (this.enemyGenerateTime + 1) % BOSS.enemyGenerateTime;
      if (this.enemyGenerateTime == 0) {
        this.enemies.push(new Eye(this.game, this.x, this.y));
      }
    }
  }

  /**
   * It checks if the boss has died. 
   */
  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > TILE.mapWidth) {
      if (Math.random() < DROP_CHANCE.fireSword && this.alive && this.health <= 0) {
        this.world.droppedTiles.push(new Tile(this.game, 'fire_sword', this.x, this.y))
      }
      this.alive = false;
      playSound('slime_killed');
      stopSound('boss_battle');
      this.game.bossBattle = false;
    }
  }

  /**
   * It checks if the boss has collided with player weapon horizontally.
   */
  this.checkSwingXHit = function () {
    if (this.player.left) {
      var range = [-(PLAYER.width + WEAPON.size) + 1, 1];
    } else {
      var range = [0, PLAYER.width + WEAPON.size];
    }

    for (var i = 0; i <= BOSS.width; i++) {
      if (this.player.x + range[0] <= this.x + i && this.x + i <= this.player.x + range[1]) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks if the boss has collided with player weapon vertically.
   */
  this.checkSwingYHit = function () {
    for (var i = 0; i <= BOSS.height; i++) {
      if (this.player.y - WEAPON.size <= this.y + i && this.y + i <= this.player.y + WEAPON.size + 1) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks if the boss has collided with player weapon.
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