function Boss(game, x, y) {
  this.game = game;
  this.enemies = game.enemies;
  this.player = game.player;
  this.world = game.world
  this.ctx = game.ctx;
  this.type = 'boss';
  this.health = 500;
  this.img = new Image;
  this.img.src = 'images/boss.png';
  this.imgPos = [[830, 0, 152, 110], [0, 0, 146, 110]];
  this.pose = 0;
  this.x = x;
  this.y = y;
  this.alive = true;
  this.horizontalDirection = this.player.x < this.x ? -1 / 5 : 1 / 5;
  this.verticalDirection = this.player.y < this.y ? -1 / 5 : 1 / 5;
  this.enemyGenerateTime = 0;
  this.damage = 0.3;


  this.checkDirection = function () {
    if (this.player.x < this.x) {
      this.left = true;
    } else if (this.player.x > this.x + 7) {
      this.left = false;
    }
  }

  this.checkBossState = function () {
    if (this.health < 250 && this.pose == 0) {
      this.pose = 1;
      this.damage *= 2;
    }
  }

  this.draw = function () {
    this.checkDirection();
    this.checkBossState();

    this.ctx.save();
    if (this.alive) {
      if (this.left) {
        this.ctx.drawImage(this.img, this.imgPos[this.pose][0], this.imgPos[this.pose][1], this.imgPos[this.pose][2], this.imgPos[this.pose][3],
          this.x * 16, this.y * 16, 10 * TILE_SIZE, 7 * TILE_SIZE);
      } else {
        this.ctx.translate(CANVAS_WIDTH, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.img, this.imgPos[this.pose][0], this.imgPos[this.pose][1], this.imgPos[this.pose][2], this.imgPos[this.pose][3],
          CANVAS_WIDTH - 10 * TILE_SIZE - this.x * 16, this.y * 16, 10 * TILE_SIZE, 7 * TILE_SIZE);
        this.ctx.restore();
      }
    }

    this.playerCollision();
    this.checkMoveDirection();
    this.move();
    this.generateEnemy();
    this.showDetails();
  }

  this.showDetails = function () {
    if (this.x * TILE_SIZE <= this.game.mouseX && this.game.mouseX <= (this.x + 10) * TILE_SIZE &&
      this.y * TILE_SIZE <= this.game.mouseY && this.game.mouseY <= (this.y + 7) * TILE_SIZE) {
      this.ctx.fillText('Eye of Cthulu: ' + Math.floor(this.health), this.game.mouseX, this.game.mouseY);
    }
  }

  this.checkMoveDirection = function () {
    if (this.player.x - 15 > this.x) {
      this.horizontalDirection = 1 / 5;
    } else if (this.player.x + 15 < this.x) {
      this.horizontalDirection = -1 / 5
    }
    if (this.player.y - 7 > this.y) {
      this.verticalDirection = 1 / 5;
    } else if (this.player.y + 5 < this.y) {
      this.verticalDirection = -1 / 5
    }
  }

  this.move = function () {
    this.x += this.horizontalDirection;
    this.y += this.verticalDirection;
    this.checkDeath();
  }

  this.playerCollision = function () {
    var thisX = Math.round(this.x);
    var thisY = Math.round(this.y);
    var playerX = Math.round(this.player.x);
    var playerY = Math.round(this.player.y);
    if (((thisX <= playerX && playerX <= thisX + 9) || (
        thisX <= playerX + 1 && playerX + 1 <= thisX + 9)) &&
      ((thisY <= playerY + 1 && playerY + 1 <= thisY + 6) ||
        (thisY <= playerY + 2 && playerY + 2 <= thisY + 6) ||
        (thisY <= playerY + 3 && playerY + 3 <= thisY + 6)
      )) {
      this.player.health = this.player.health - this.damage * (1 - this.player.armor / 20);
      playSound('player_hurt');
      playSound('slime_hit');
    }
  }

  this.generateEnemy = function () {
    if (this.health > 250) {
      this.enemyGenerateTime = (this.enemyGenerateTime + 1) % 200;
      if (this.enemyGenerateTime == 0) {
        this.enemies.push(new Eye(this.game, this.x, this.y));
      }
    }
  }

  this.checkDeath = function () {
    if (this.health <= 0 || this.x < 0 || this.x > 154) {
      if (Math.random() > 0.95 && this.alive && this.health <= 0) {
        this.world.droppedTiles.push(new Tile(this.game, 'fire_sword', this.x, this.y))
      }
      this.alive = false;
      playSound('slime_killed');
      this.game.bossBattle = false;
    }
  }

  this.checkSwingXHit = function () {
    if (this.player.left) {
      var range = [-3, 1];
    } else {
      var range = [0, 4];
    }

    for (var i = 0; i < 10; i++) {
      if (this.player.x + range[0] <= this.x + i && this.x + i <= this.player.x + range[1]) {
        return true;
      }
    }
    return false;
  }

  this.checkSwingYHit = function () {
    for (var i = 0; i < 7; i++) {
      if (this.player.y - 2 <= this.y + i && this.y + i <= this.player.y + 3) {
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