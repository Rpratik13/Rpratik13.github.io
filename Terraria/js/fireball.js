function Fireball(player, enemies, x, y, world) {
  this.sound = player.sound;
  this.world = world;
  this.player = player;
  this.enemies = enemies;
  this.active = true;
  this.img = new Image;
  this.img.src = 'images/fireball.png';
  this.tileX = Math.floor((x - world.translated) / TILE_SIZE) + 1;
  this.tileY = Math.floor(y / TILE_SIZE) + 1;
  this.lifeTime = 0;


  this.slope = (this.tileY - player.y) / (this.tileX - player.x);

  if (Math.abs(this.tileY - player.y) > Math.abs(this.tileX - player.x)) {
    this.dy = this.tileY < player.y ? -0.1 : 0.1;
    this.dx = (1 / this.slope) * this.dy;
  } else {
    this.dx = this.tileX < player.x ? -0.1 : 0.1;
    this.dy = this.slope * this.dx;
  }

  this.x = player.x;
  this.y = player.y;


  this.throw = function (ctx) {
    ctx.drawImage(this.img, this.x * 16, this.y * 16, TILE_SIZE, TILE_SIZE);
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
    for (var i = 0; i < this.enemies.length; i++) {
      if (enemies[i].type == 'slime' || enemies[i].type == 'eye') {
        if (((enemies[i].x <= thisX && thisX <= enemies[i].x + 2) ||
            (enemies[i].x <= thisX + 1 && thisX + 1 <= enemies[i].x + 2)) &&
          ((enemies[i].y <= this.y && this.y <= enemies[i].y + 1) ||
            (enemies[i].y <= this.y + 1 && this.y + 1 <= enemies[i].y + 1))) {
          enemies[i].knockback = true;
          enemies[i].health -= 10;
          this.active = false;
          this.sound.playSlimeHit();
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
          this.sound.playZombieHit();
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
          this.sound.playZombieHit();
          break;
        }
      }
    }
  }

}