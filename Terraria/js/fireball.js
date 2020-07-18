function Fireball(game, x, y) {
  this.world = game.world;
  this.player = game.player;
  this.enemies = game.enemies;
  this.ctx = game.ctx;
  this.active = true;
  this.img = new Image;
  this.img.src = 'images/fireball.png';
  this.tileX = Math.floor((x - this.world.translated) / TILE_SIZE) + 1;
  this.tileY = Math.floor(y / TILE_SIZE) + 1;
  this.lifeTime = 0;


  this.slope = (this.tileY - this.player.y) / (this.tileX - this.player.x);

  if (Math.abs(this.tileY - this.player.y) > Math.abs(this.tileX - this.player.x)) {
    this.dy = this.tileY < this.player.y ? -0.1 : 0.1;
    this.dx = (1 / this.slope) * this.dy;
  } else {
    this.dx = this.tileX < this.player.x ? -0.1 : 0.1;
    this.dy = this.slope * this.dx;
  }

  this.x = this.player.x;
  this.y = this.player.y;


  this.throw = function () {
    this.ctx.drawImage(this.img, this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    this.enemyCollision();
    this.x += this.dx;
    this.y += this.dy;
    this.lifeTime += 1;
    if (this.lifeTime == 200) {
      this.active = false;
    }
  }

  this.enemyCollision = function () {
    var thisX = Math.round(this.x);
    var enemies = this.enemies;
    for (var i = 0; i < this.enemies.length; i++) {
      if (enemies[i].type == 'slime' || enemies[i].type == 'eye') {
        if (((enemies[i].x <= thisX && thisX <= enemies[i].x + 2) ||
            (enemies[i].x <= thisX + 1 && thisX + 1 <= enemies[i].x + 2)) &&
          ((enemies[i].y <= this.y && this.y <= enemies[i].y + 1) ||
            (enemies[i].y <= this.y + 1 && this.y + 1 <= enemies[i].y + 1))) {
          enemies[i].knockback = true;
          enemies[i].health -= 10;
          this.active = false;
          playSound('slime_hit');
          break;
        }
      } else if (enemies[i].type == 'zombie') {
        if (((enemies[i].x <= thisX && thisX <= enemies[i].x + 1) ||
            (enemies[i].x <= thisX + 1 && thisX + 1 <= enemies[i].x + 1)) &&
          ((enemies[i].y <= this.y && this.y <= enemies[i].y + 3) ||
            (enemies[i].y <= this.y + 1 && this.y + 1 <= enemies[i].y + 3))) {
          enemies[i].knockback = true;
          enemies[i].health -= 10;
          this.active = false;
          playSound('zombie_hit');
          break;
        }
      } else if (enemies[i].type == 'boss') {
        if (((enemies[i].x <= thisX && thisX <= enemies[i].x + 9) ||
            (enemies[i].x <= thisX + 1 && thisX + 1 <= enemies[i].x + 9)) &&
          ((enemies[i].y <= this.y && this.y <= enemies[i].y + 6) ||
            (enemies[i].y <= this.y + 1 && this.y + 1 <= enemies[i].y + 6))) {
          enemies[i].knockback = true;
          enemies[i].health -= 10;
          this.active = false;
          playSound('zombie_hit');
          break;
        }
      }
    }
  }

}