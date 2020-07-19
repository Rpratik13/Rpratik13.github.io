/**
 * It creates the world object.
 */
function World() {
  this.translated = -CANVAS_WIDTH;
  this.tileHealth = [];
  this.droppedTiles = [];

  /**
   * It initializes the world object.
   * 
   * @param {game_object} game It is the main game object.
   */
  this.init = function (game) {
    this.game = game;
    this.world = tilemap;
    this.ctx = game.ctx;
    this.player = game.player;

  }

  /**
   * It initializes the health of each tile.
   */
  this.initTileHealth = function () {
    for (var i = 0; i < this.world.length; i++) {
      var row = [];
      for (var j = 0; j < this.world[0].length; j++) {
        if (this.world[i][j] != 0) {
          row.push(TILE.fullHealth);
        } else { row.push(0); }
      }
      this.tileHealth.push(row)
    }
  }


  /**
   * It moves the camera according to player movement.
   * 
   * @param {number} val It holds the value for how much the camera is to be moved. 
   */
  this.cameraMove = function (val) {
    this.ctx.translate(-this.translated, 0);
    this.translated += val;

    if (this.translated > 0) {
      this.translated = 0;
    } else if (this.translated < -TILE.size * MAX_TRANSLATE) {
      this.translated = -TILE.size * MAX_TRANSLATE;
    }

    this.ctx.translate(this.translated, 0);
  }

  /**
   * It resets the camera to original position.
   */

  this.resetCamera = function () {
    this.ctx.translate(-this.translated, 0);
    this.translated = -CANVAS_WIDTH;
    this.ctx.translate(this.translated, 0);
  }

  /**
   * It draws trees.
   * 
   * @param {number} i It holds vertical tile position of tree base.
   * @param {number} j It holds horizontal tile position of tree base.
   */
  this.drawTree = function (i, j) {
    var tree = this.world[i][j];
    var treeNum = tree - TREE.shift;
    if (tree == TREE.trunk) {
      if (this.world[i - 1][j] != TREE.trunk && this.world[i - 1][j] != TREE.treeTopBase) {
        treeNum = TREE.treeTopStart;
      }
    }
    this.ctx.drawImage(TILE_IMAGES['tree'][treeNum], TILE.size * (j - 1), TILE.size * (i - 1), TILE.size, TILE.size);
  }

  /**
   * It draws the tiles according to tile map.
   * 
   * @param {number} i It holds the vertical tile position of the tile to be drawn. 
   * @param {number} j It holds the horizontal tile position of the tile to be drawn.
   * @param {string} type It holds what type of tile is to be drawn.
   */
  this.drawTile = function (i, j, type) {
    if (type == 'wood') {

      var up = this.world[i - 1][j] == TILE.wood;
      var down = this.world[i + 1][j] == TILE.wood;
      var right = this.world[i][j + 1] == TILE.wood;
      var left = this.world[i][j - 1] == TILE.wood;
    } else {
      var up = this.world[i - 1][j] != TILE.empty;
      var down = this.world[i + 1][j] != TILE.empty;
      var right = this.world[i][j + 1] != TILE.empty;
      var left = this.world[i][j - 1] != TILE.empty;
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
      this.world[i][j] = TILE.dirt;
    } else {
      this.ctx.drawImage(TILE_IMAGES[type][tileNum],
        TILE.size * (j - 1), TILE.size * (i - 1), TILE.size, TILE.size);
    }
  }

  /**
   * It draws the world.
   */
  this.drawWorld = function () {
    for (var i = 1; i < this.world.length - 1; i++) {
      for (var j = 1; j < this.world[0].length - 1; j++) {
        if (TILE.notWalkable.includes(this.world[i][j])) {
          this.drawTile(i, j, TILE_MAP_VAL[this.world[i][j]]);
        } else if (TILE.tree.includes(this.world[i][j])) {
          this.drawTree(i, j);
        }
      }
    }
  }

  /**
   * It draws the dropped tiles.
   */
  this.drawDroppedTiles = function () {
    for (var i = 0; i < this.droppedTiles.length; i++) {
      this.droppedTiles[i].draw();
    }
  }

  /**
   * It removes trees if base is destroyed.
   * 
   * @param {number} x It holds the horizontal tile position of tree base. 
   * @param {number} y It holds the vertical tile position of tree base.
   */
  this.removeTree = function (x, y) {
    while (this.world[y][x] != TILE.treeTopStart && this.world[y][x] != 0) {
      this.droppedTiles.push(new Tile(this.game, 'wood', x, y));
      this.tileHealth[y][x] = 0;
      this.world[y][x] = 0;
      y -= 1;

      if (this.world[y][x] == TILE.treeTopStart) {
        for (var i = -2; i < 3; i++) {
          for (var j = -3; j < 3; j++) {
            this.tileHealth[y + j][x + i] = 0;
            this.world[y + j][x + i] = 0;
          }
        }
      }
    }
  }

  /**
   * It checks if the placed tile is on player position.
   * 
   * @param {number} x It holds the horizontal tile position of placed tile. 
   * @param {number} y It holds the vertical tile position of placed tile.
   */
  this.notOnPlayer = function (x, y) {
    var player = this.player;
    if ((player.x <= x && x <= player.x + PLAYER.width) &&
      (player.y <= y && y <= player.y + PLAYER.height)) {
      return false;
    }
    return true;
  }

  /**
   * It reduces the health of tile when player hits a tile.
   * 
   * @param {number} tileVal It holds the type of the hit tile.
   * @param {number} x It holds the horizontal tile position of the hit tile.
   * @param {number} y It holds the vertical tile position of the hit tile.
   */
  this.hitTile = function (tileVal, x, y) {
    var player = this.player;
    if (Math.abs(x - (player.x + PLAYER.width / 2)) < PLAYER.placeRange && Math.abs(y - (PLAYER.height / 2 + player.y)) < PLAYER.placeRange) {
      if (TILE.diggable.includes(tileVal) && player.pickPower && !TILE.treeBase.includes(this.world[y - 1][x])) {
        this.tileHealth[y][x] -= player.pickPower;
        playSound('dig');
      } else if (TILE.woodTiles.includes(tileVal) && player.axePower) {
        this.tileHealth[y][x] -= player.axePower;
        playSound('tree_hit');
      }
    }
  }

  /**
   * It places a tile if player is holding placable tile.
   * 
   * @param {number} tileX It holds horizontal tile position of placed tile.
   * @param {number} tileY It holds vertical tile position of placed tile.
   * @param {number} tileVal It holds the value of tile position where the tile is to be placed.
   */
  this.placeTile = function (tileX, tileY, tileVal) {
    var player = this.player;
    if (Math.abs(tileX - (player.x + PLAYER.width / 2)) < PLAYER.placeRange &&
      Math.abs(tileY - (player.y + PLAYER.height / 2)) < PLAYER.placeRange) {
      if (WEAPON.placeWeapons.includes(player.weapon) &&
        player.items[player.weapon] > 0 &&
        this.notOnPlayer(tileX, tileY, player) &&
        tileVal == TILE.empty) {
        this.world[tileY][tileX] = TILE_PLACE_VAL[player.weapon];
        this.tileHealth[tileY][tileX] = TILE.fullHealth;
        player.items[player.weapon] -= 1;
        if (player.items[player.weapon] == 0) {
          player.weapon = undefined;
          player.checkPower();
        }
      }
    }

  }

  /**
   * It removes tile if tile health if zero.
   * 
   * @param {number} tileX It holds horizontal tile position of tile to be removed.
   * @param {number} tileY It holds vertical tile position of tile to be removed.
   */
  this.removeTile = function (tileX, tileY) {
    var tileVal = this.world[tileY][tileX];
    if (this.tileHealth[tileY][tileX] <= 0 && tileVal != TILE.empty) {
      this.droppedTiles.push(new Tile(this.game, TILE_DROP[tileVal], tileX, tileY))
      if (tileVal == TILE.treeBaseCenter) {
        if (this.world[tileY][tileX + 1] == TILE.treeBaseRight) {
          this.tileHealth[tileY][tileX + 1] = 0;
          this.removeTile(tileX + 1, tileY);
        }
        if (this.world[tileY][tileX - 1] == TILE.treeBaseLeft) {
          this.tileHealth[tileY][tileX - 1] = 0;
          this.removeTile(tileX - 1, tileY);
        }
        this.removeTree(tileX, tileY);
      } else if (tileVal == TILE.treeTrunk) {
        this.removeTree(tileX, tileY);
      }
      this.world[tileY][tileX] = 0;
      this.tileHealth[tileY][tileX] = 0;
    }
  }



  /*
   * It performs place, hit and remove actions based on mouse click position. 
   */
  this.clicked = function (x, y) {
    var tileX = Math.floor((x - this.translated) / TILE.size) + 1;
    var tileY = Math.floor(y / TILE.size) + 1;
    var tileVal = this.world[tileY][tileX];

    this.placeTile(tileX, tileY, tileVal);
    this.hitTile(tileVal, tileX, tileY);
    this.removeTile(tileX, tileY);
  }
}