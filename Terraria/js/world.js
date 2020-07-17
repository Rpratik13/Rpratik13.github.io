function World(sound) {
  this.world = tilemap;
  this.sound = sound;
  this.translated = -CANVAS_WIDTH;
  this.tileHealth = [];
  this.droppedTiles = [];

  this.initTileHealth = function () {
    for (var i = 0; i < this.world.length; i++) {
      var row = [];
      for (var j = 0; j < this.world[0].length; j++) {
        if (this.world[i][j] != 0) {
          row.push(4);
        } else { row.push(0); }
      }
      this.tileHealth.push(row)
    }
  }

  this.initTileHealth();

  this.cameraMove = function (ctx, val) {
    ctx.translate(-this.translated, 0);
    this.translated += val;

    if (this.translated > 0) {
      this.translated = -0;
    } else if (this.translated < -TILE_SIZE * 103) {
      this.translated = -TILE_SIZE * 103;
    }

    ctx.translate(this.translated, 0);
  }

  this.drawTree = function (ctx, i, j) {
    var tree = this.world[i][j];
    var treeNum = tree - 5;
    if (tree == 8) {
      if (this.world[i - 1][j] != 8 && this.world[i - 1][j] != 33) {
        treeNum = 29;
      }
    }
    ctx.drawImage(TILE_IMAGES['tree'][treeNum], TILE_SIZE * (j - 1), TILE_SIZE * (i - 1), TILE_SIZE, TILE_SIZE)
  }

  this.drawTile = function (ctx, i, j, type) {
    if (type == 'wood') {

      var up = this.world[i - 1][j] == 36;
      var down = this.world[i + 1][j] == 36;
      var right = this.world[i][j + 1] == 36;
      var left = this.world[i][j - 1] == 36;
    } else {
      var up = this.world[i - 1][j] != 0;
      var down = this.world[i + 1][j] != 0;
      var right = this.world[i][j + 1] != 0;
      var left = this.world[i][j - 1] != 0;
    }

    var dirArray = [up, down, left, right];
    var binary = '';
    for (var k = 0; k < dirArray.length; k++) {
      if (dirArray[k]) {
        binary += '1';
      } else {
        binary += '0';
      }
    }

    tileNum = parseInt(binary, 2);
    if (type == 'grass' && up) {
      this.world[i][j] = 2;
    } else {
      ctx.drawImage(TILE_IMAGES[type][tileNum], TILE_SIZE * (j - 1), TILE_SIZE * (i - 1), TILE_SIZE, TILE_SIZE);
    }
  }

  this.drawWorld = function (ctx) {
    for (var i = 1; i < this.world.length - 1; i++) {
      for (var j = 1; j < this.world[0].length - 1; j++) {
        if (0 < this.world[i][j] && this.world[i][j] < 5 || this.world[i][j] == 36) {
          this.drawTile(ctx, i, j, TILE_MAP_VAL[this.world[i][j]]);
        } else if (4 < this.world[i][j] && this.world[i][j] < 34) {
          this.drawTree(ctx, i, j);
        }
      }
    }
  }

  this.drawDroppedTiles = function (ctx) {
    for (var i = 0; i < this.droppedTiles.length; i++) {
      this.droppedTiles[i].draw(ctx);
    }
  }

  this.removeTree = function (x, y) {
    while (this.world[y][x] != 26 && this.world[y][x] != 0) {
      this.droppedTiles.push(new Tile('wood', x, y));
      this.tileHealth[y][x] = 0;
      this.world[y][x] = 0;
      y -= 1;

      if (this.world[y][x] == 26) {
        for (var i = -2; i < 3; i++) {
          for (var j = -3; j < 3; j++) {
            this.tileHealth[y + j][x + i] = 0;
            this.world[y + j][x + i] = 0;
          }
        }
      }
    }
  }

  this.notOnPlayer = function (x, y, player) {
    if ((x == Math.floor(player.x + 1) || x == Math.floor(player.x + 2)) &&
      (player.y + 1 <= y && y <= player.y + 3)) {
      return false;
    }
    return true;
  }

  this.hitTile = function (tileVal, x, y, player) {
    if (0 < tileVal && tileVal < 5) {
      this.tileHealth[y][x] -= player.pickPower;
      this.sound.playDig();
    } else if (4 < tileVal && tileVal < 9 || tileVal == 36) {
      this.tileHealth[y][x] -= player.axePower;
      this.sound.playTreeHit();
    }
  }

  this.placeTile = function (tileX, tileY, tileVal, player) {
    if (Math.abs(tileX - player.x - 1) < 3 && Math.abs(tileY - 2 - player.y) < 3) {
      if (PLACE_WEAPONS.includes(player.weapon) &&
        player.items[player.weapon] > 0 &&
        this.notOnPlayer(tileX, tileY, player) &&
        tileVal == 0) {
        this.world[tileY][tileX] = TILE_PLACE_VAL[player.weapon];
        this.tileHealth[tileY][tileX] = 4;
        player.items[player.weapon] -= 1;
        if (player.items[player.weapon] == 0) {
          player.weapon = undefined;
          player.checkPower();
        }
      }
    }

  }

  this.removeTile = function (tileX, tileY) {
    var tileVal = this.world[tileY][tileX];
    if (this.tileHealth[tileY][tileX] <= 0 && tileVal != 0) {
      this.droppedTiles.push(new Tile(TILE_DROP[tileVal], tileX, tileY))
      if (tileVal == 7) {
        if (this.world[tileY][tileX + 1] == 5) {
          this.droppedTiles.push(new Tile('wood', tileX + 1, tileY));
          this.tileHealth[tileY][tileX + 1] = 0;
          this.world[tileY][tileX + 1] = 0;
        }
        if (this.world[tileY][tileX - 1] == 6) {
          this.droppedTiles.push(new Tile('wood', tileX - 1, tileY));
          this.tileHealth[tileY][tileX - 1] = 0;
          this.world[tileY][tileX - 1] = 0;
        }
        this.removeTree(tileX, tileY);
      } else if (tileVal == 8) {
        this.removeTree(tileX, tileY);
      }
      this.world[tileY][tileX] = 0;
      this.tileHealth[tileY][tileX] = 0;
    }
  }



  this.clicked = function (x, y, player) {
    var tileX = Math.floor((x - this.translated) / TILE_SIZE) + 1;
    var tileY = Math.floor(y / TILE_SIZE) + 1;
    var tileVal = this.world[tileY][tileX];

    this.placeTile(tileX, tileY, tileVal, player);
    this.hitTile(tileVal, tileX, tileY, player);
    this.removeTile(tileX, tileY);

  }
}