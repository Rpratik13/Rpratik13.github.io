/**
 * It creates the fireball object.
 * 
 * @param {game_object} game It is the main game object. 
 * @param {number} x It holds the horizontal click position. 
 * @param {number} y It holds the vertical click position.
 */
function Fireball(game, x, y) {
  this.world = game.world;
  this.player = game.player;
  this.enemies = game.enemies;
  this.ctx = game.ctx;
  this.active = true;
  this.img = new Image;
  this.img.src = 'images/weapon/fireball.png';
  this.tileX = Math.floor((x - this.world.translated) / TILE.size) + 1;
  this.tileY = Math.floor(y / TILE.size) + 1;
  this.lifeTime = 0;


  this.slope = (this.tileY - this.player.y) / (this.tileX - this.player.x);

  if (Math.abs(this.tileY - this.player.y) > Math.abs(this.tileX - this.player.x)) {
    this.dy = this.tileY < this.player.y ? -FIREBALL.moveSpeed : FIREBALL.moveSpeed;
    this.dx = (1 / this.slope) * this.dy;
  } else {
    this.dx = this.tileX < this.player.x ? -FIREBALL.moveSpeed : FIREBALL.moveSpeed;
    this.dy = this.slope * this.dx;
  }

  this.x = this.player.x;
  this.y = this.player.y;


  /**
   * It draws and moves the fireball.
   */
  this.throw = function () {
    this.ctx.drawImage(this.img, this.x * TILE.size, this.y * TILE.size, TILE.size, TILE.size);
    this.enemyCollision();
    this.x += this.dx;
    this.y += this.dy;
    this.lifeTime += 1;
    if (this.lifeTime == FIREBALL.life) {
      this.active = false;
    }
  }


  /**
   * It checks if the fireball has collided with enemy horizontally.
   * 
   * @param {enemy_object} enemy It holds eye, slime, zombie or boss object. 
   */
  this.enemyXCollision = function (enemy) {
    var xRange = {
      'slime': SLIME.width,
      'eye': EYE.width,
      'zombie': ZOMBIE.width,
      'boss': BOSS.width
    };

    for (var j = 0; j <= FIREBALL.size; j++) {
      if (enemy.x <= this.x + j && this.x + j <= enemy.x + xRange[enemy.type]) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks if the fireball has collided with enemy vertically.
   * 
   * @param {enemy_object} enemy It holds eye, slime, zombie or boss object. 
   */
  this.enemyYCollision = function (enemy) {
    var yRange = {
      'slime': SLIME.height,
      'eye': EYE.height,
      'zombie': ZOMBIE.height,
      'boss': BOSS.height
    };

    for (var j = 0; j <= FIREBALL.size; j++) {
      if (enemy.y <= this.y + j && this.y + j <= enemy.y + yRange[enemy.type]) {
        return true;
      }
    }
    return false;
  }

  /**
   * It checks if the fireball has collided with enemy.
   */
  this.enemyCollision = function () {
    var enemies = this.enemies;
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemyXCollision(enemies[i]) && this.enemyYCollision(enemies[i])) {
        enemies[i].knockback = true;
        enemies[i].health -= FIREBALL.damage;
        this.active = false;
        if (enemies[i].type == 'slime' || enemies[i].type == 'eye') {
          playSound('slime_hit');
        } else {
          playSound('zombie_hit');
        }

        break;
      }
    }
  }

}