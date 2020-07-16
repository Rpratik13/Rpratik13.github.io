function Boss(ctx, x, y, sound, player, game) {
  this.game = game;
  this.enemies = game.enemies;
  this.player = player;
  this.sound = sound;
  this.ctx = ctx;
  this.type = 'boss';
  this.health = 500;
  this.img = new Image;
  this.img.src = 'images/boss.png';
  this.imgPos = [[830, 0, 152, 110], [0, 0, 146, 110]];
  this.pose = 0;
  this.x = x;
  this.y = y;
  this.alive = true;
  this.horizontalDirection = player.x < this.x ? -1 / 5 : 1 / 5;
  this.verticalDirection = player.y < this.y ? -1 / 5 : 1 / 5;
  this.enemyCount = 0;
  this.damage = 0.4;


  this.checkDirection = function (player) {
    if (player.x < this.x) {
      this.left = true;
    } else if (player.x > this.x + 7) {
      this.left = false;
    }
  }

  this.draw = function (player, world) {
    this.world = world;
    this.checkDirection(player);
    if (this.health < 250) {
      this.pose = 1;
      this.damage *= 2;
    }
    ctx.save();
    if (this.alive) {
      if (this.left) {
        this.ctx.drawImage(this.img, this.imgPos[this.pose][0], this.imgPos[this.pose][1], this.imgPos[this.pose][2], this.imgPos[this.pose][3],
          this.x * 16, this.y * 16, 10 * TILE_SIZE, 7 * TILE_SIZE);
      } else {
        ctx.translate(CANVAS_WIDTH, 0);
        ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, this.imgPos[this.pose][0], this.imgPos[this.pose][1], this.imgPos[this.pose][2], this.imgPos[this.pose][3],
          CANVAS_WIDTH - 10 * TILE_SIZE - this.x * 16, this.y * 16, 10 * TILE_SIZE, 7 * TILE_SIZE);
        ctx.restore();
      }
    }

    this.playerCollision(player)

    if (player.x - 15 > this.x) {
      this.horizontalDirection = 1 / 5;
    } else if (player.x + 15 < this.x) {
      this.horizontalDirection = -1 / 5
    }
    if (player.y - 7 > this.y) {
      this.verticalDirection = 1 / 5;
    } else if (player.y + 5 < this.y) {
      this.verticalDirection = -1 / 5
    }

    this.move(world)
    this.generateEnemy();
    this.showDetails();
  }

  this.showDetails = function () {
    if (this.x * TILE_SIZE <= this.game.mouseX && this.game.mouseX <= (this.x + 10) * TILE_SIZE &&
      this.y * TILE_SIZE <= this.game.mouseY && this.game.mouseY <= (this.y + 7) * TILE_SIZE) {
      this.ctx.fillText('Eye of Cthulu: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  this.move = function (world) {
    this.x += this.horizontalDirection;
    this.y += this.verticalDirection;
    this.checkDeath(world);
  }
  this.moveRight = function (world) {
    this.x += 1 / 5;
    this.checkDeath(world);
  }

  this.moveLeft = function (world) {
    this.x -= 1 / 5;

    this.checkDeath(world);
  }

  this.playerCollision = function (player) {
    var thisX = Math.round(this.x);
    var thisY = Math.round(this.y);
    var playerX = Math.round(player.x);
    var playerY = Math.round(player.y);
    if (((thisX <= playerX && playerX <= thisX + 9) || (
        thisX <= playerX + 1 && playerX + 1 <= thisX + 9)) &&
      ((thisY <= playerY + 1 && playerY + 1 <= thisY + 6) ||
        (thisY <= playerY + 2 && playerY + 2 <= thisY + 6) ||
        (thisY <= playerY + 3 && playerY + 3 <= thisY + 6)
      )) {
      player.health = player.health - this.damage * (1 - player.armor / 20);
      this.sound.playPlayerHurt();
      this.sound.playSlimeHit();
    }
  }


  this.generateEnemy = function () {
    if (this.health > 250) {
      this.enemyCount = (this.enemyCount + 1) % 200;
      if (this.enemyCount == 0) {
        this.enemies.push(new Eye(this.ctx, this.x, this.y, this.sound, this.game));
      }
    }
  }


  this.checkDeath = function (world) {
    if (this.health < 0 || this.x < 0 || this.x > 154) {
      this.alive = false;
      this.sound.playSlimeKilled();
      this.game.bossBattle = false;
    }
  }

}