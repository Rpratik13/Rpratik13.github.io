function Fireball(player, enemies, x, y, world) {
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
    if (this.tileY < player.y) {
      this.dy = -0.1;
    } else {
      this.dy = 0.1;
    }
    this.dx = (1 / this.slope) * this.dy;
  } else {
    if (this.tileX < player.x) {
      this.dx = -0.1;
    } else {
      this.dx = 0.1;
    }
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
    var thisY = Math.round(this.y);
    for (var i = 0; i < this.enemies.length; i++) {
      var enemyX = Math.round(enemies[i].x);
      var enemyY = Math.round(enemies[i].y);
      if (enemies[i].type == 'slime' || enemies[i].type == 'eye') {
        if ((enemyX <= thisX && thisX <= enemyX + 1) && thisY == enemyY) {
          enemies[i].knockback = true;
          enemies[i].health -= 10;
          this.active = false;
        }
      } else if (enemies[i].type == 'zombie') {
        if ((enemyX <= thisX && thisX <= enemyX + 1) && (enemyY <= thisY && thisY <= enemyY + 3)) {
          enemies[i].knockback = true;
          enemies[i].health -= 10;
          this.active = false;
        }
      }
    }
  }

}