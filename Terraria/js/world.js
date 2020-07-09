function World() {
  this.world = tilemap;

  this.tileHealth = [];
  this.droppedTiles = [];
  for (var i = 0; i < 41; i++) {
    var row = [];
    for (var j = 0; j < 52; j++) {
      if (this.world[i][j] != 0) {
        row.push(4);
      } else { row.push(0); }
    }
    this.tileHealth.push(row)
  }
  this.dirt = [];
  this.gold = [];
  this.silver = [];
  this.grass = [];
  this.tree = [];
  this.wood = [];
  for (var i = 0; i < 30; i++) {
    this.tree.push(new Image);
    this.tree[i].src = 'images/tree' + i + '.png';
  }
  for (var i = 0; i < 8; i++) {
    this.grass.push(new Image);
    this.grass[i].src = 'images/grass' + i + '.png';
  }
  for (var i = 0; i < 16; i++) {
    this.dirt.push(new Image);
    this.dirt[i].src = 'images/dirt' + i + '.png';
    this.gold.push(new Image);
    this.gold[i].src = 'images/gold' + i + '.png';
    this.silver.push(new Image);
    this.silver[i].src = 'images/silver' + i + '.png';
    this.wood.push(new Image);
    this.wood[i].src = 'images/wood' + i + '.png';
  }



  this.drawTree = function (ctx, i, j) {
    var tree = this.world[i][j];
    var treeNum;
    if (tree == 5) {
      treeNum = 0;
    } else if (tree == 6) {
      treeNum = 1;
    } else if (tree == 7) {
      treeNum = 2;
    } else if (tree == 8) {
      if (this.world[i - 1][j] != 8 && this.world[i - 1][j] != 33) {
        treeNum = 29;
      } else {
        treeNum = 3;
      }
    } else {
      treeNum = tree - 5;
    }
    ctx.drawImage(this.tree[treeNum], TILE_SIZE * (j - 1), TILE_SIZE * (i - 1), TILE_SIZE, TILE_SIZE)
  }

  this.drawGrass = function (ctx, i, j) {
    var up = this.world[i - 1][j] != 0;
    var down = this.world[i + 1][j] != 0;
    var right = this.world[i][j + 1] != 0;
    var left = this.world[i][j - 1] != 0;
    if (up) {
      this.world[i][j] = 2;
    } else {
      if (!down && !left && !right) {
        grassNum = 0;
      } else if (down && left && right) {
        grassNum = 1;
      } else if (down && !left && right) {
        grassNum = 2;
      } else if (down && left && !right) {
        grassNum = 3;
      } else if (!down && left && right) {
        grassNum = 4;
      } else if (!down && left && !right) {
        grassNum = 5;
      } else if (down && !left && !right) {
        grassNum = 6;
      } else if (!down && !left && right) {
        grassNum = 7;
      }
      ctx.drawImage(this.grass[grassNum], TILE_SIZE * (j - 1), TILE_SIZE * (i - 1), TILE_SIZE, TILE_SIZE);
    }
  }

  this.drawTile = function (ctx, i, j, type) {
    var up = this.world[i - 1][j] != 0;
    var down = this.world[i + 1][j] != 0;
    var right = this.world[i][j + 1] != 0;
    var left = this.world[i][j - 1] != 0;
    var tileNum = 0;
    if (up && down && right && left) {
      tileNum = 0;
    } else if (!up && !down && !right && !left) {
      tileNum = 1;
    } else if (!up && !down && right && !left) {
      tileNum = 2;
    } else if (!up && down && !right && !left) {
      tileNum = 3;
    } else if (!up && !down && !right && left) {
      tileNum = 4;
    } else if (up && !down && !right && !left) {
      tileNum = 5;
    } else if (!up && down && !right && left) {
      tileNum = 6;
    } else if (up && !down && right && !left) {
      tileNum = 7;
    } else if (!up && down && right && !left) {
      tileNum = 8;
    } else if (up && !down && !right && left) {
      tileNum = 9;
    } else if (up && down && !right && !left) {
      tileNum = 10;
    } else if (!up && !down && right && left) {
      tileNum = 11;
    } else if (!up && down && right && left) {
      tileNum = 12;
    } else if (up && !down && right && left) {
      tileNum = 13;
    } else if (up && down && !right && left) {
      tileNum = 14;
    } else if (up && down && right && !left) {
      tileNum = 15;
    }
    if (type == 'gold') {
      ctx.drawImage(this.gold[tileNum], TILE_SIZE * (j - 1), TILE_SIZE * (i - 1), TILE_SIZE, TILE_SIZE);
    } else if (type == 'silver') {
      ctx.drawImage(this.silver[tileNum], TILE_SIZE * (j - 1), TILE_SIZE * (i - 1), TILE_SIZE, TILE_SIZE);
    } else if (type == 'dirt') {
      ctx.drawImage(this.dirt[tileNum], TILE_SIZE * (j - 1), TILE_SIZE * (i - 1), TILE_SIZE, TILE_SIZE);
    }

  }

  this.drawWood = function (ctx, i, j) {
    var up = this.world[i - 1][j] == 36;
    var down = this.world[i + 1][j] == 36;
    var right = this.world[i][j + 1] == 36;
    var left = this.world[i][j - 1] == 36;
    var tileNum = 0;
    if (up && down && right && left) {
      tileNum = 0;
    } else if (!up && !down && !right && !left) {
      tileNum = 1;
    } else if (!up && !down && right && !left) {
      tileNum = 2;
    } else if (!up && down && !right && !left) {
      tileNum = 3;
    } else if (!up && !down && !right && left) {
      tileNum = 4;
    } else if (up && !down && !right && !left) {
      tileNum = 5;
    } else if (!up && down && !right && left) {
      tileNum = 6;
    } else if (up && !down && right && !left) {
      tileNum = 7;
    } else if (!up && down && right && !left) {
      tileNum = 8;
    } else if (up && !down && !right && left) {
      tileNum = 9;
    } else if (up && down && !right && !left) {
      tileNum = 10;
    } else if (!up && !down && right && left) {
      tileNum = 11;
    } else if (!up && down && right && left) {
      tileNum = 12;
    } else if (up && !down && right && left) {
      tileNum = 13;
    } else if (up && down && !right && left) {
      tileNum = 14;
    } else if (up && down && right && !left) {
      tileNum = 15;
    }
    ctx.drawImage(this.wood[tileNum], TILE_SIZE * (j - 1), TILE_SIZE * (i - 1), TILE_SIZE, TILE_SIZE);

  }


  this.drawWorld = function (ctx) {
    for (var i = 1; i < this.world.length - 1; i++) {
      for (var j = 1; j < this.world[0].length - 1; j++) {
        if (this.world[i][j] == 1) {
          this.drawGrass(ctx, i, j);
        } else if (this.world[i][j] == 2) {
          this.drawTile(ctx, i, j, 'dirt');
        } else if (this.world[i][j] == 3) {
          this.drawTile(ctx, i, j, 'gold');
        } else if (this.world[i][j] == 4) {
          this.drawTile(ctx, i, j, 'silver');
        } else if (4 < this.world[i][j] && this.world[i][j] < 34) {
          this.drawTree(ctx, i, j);
        } else if (this.world[i][j] == 36) {
          this.drawWood(ctx, i, j);
        }
      }
    }
  }

  this.drawDroppedTiles = function (ctx) {
    for (var i = 0; i < this.droppedTiles.length; i++) {
      this.droppedTiles[i].draw(ctx);
      // this.moveDroppedTiles(i);
    }
  }

  // this.moveDroppedTiles = function (idx) {
  //   if ((this.droppedTiles[idx].y + TILE_DROP_SIZE) % 16 != 0 ||
  //     (this.world[this.droppedTiles[idx].tileY + 1][this.droppedTiles[idx].tileX] == 0 ||
  //       (5 < this.world[this.droppedTiles[idx].tileY + 1][this.droppedTiles[idx].tileX] &&
  //         this.world[this.droppedTiles[idx].tileY + 1][this.droppedTiles[idx].tileX] < 34))) {
  //     this.droppedTiles[idx].moveDown();
  //   }
  // }

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
    if ((x == Math.floor(player.x + 1) || x == Math.floor(player.x + 2)) && (y == player.y + 1 || y == player.y + 2 || y == player.y + 3)) {
      return false;
    }
    return true;
  }

  this.hitTile = function (tileVal, x, y, player) {
    if (tileVal == 1 || tileVal == 2 || tileVal == 3 || tileVal == 4) {
      this.tileHealth[y][x] -= player.pickPower;
    } else if (tileVal == 5 || tileVal == 6 || tileVal == 7 || tileVal == 8) {
      this.tileHealth[y][x] -= player.axePower;
      console.log(player.axePower);
    }
  }

  this.clicked = function (x, y, player) {
    var tileX = Math.floor(x / TILE_SIZE) + 1;
    var tileY = Math.floor(y / TILE_SIZE) + 1;
    var tileVal = this.world[tileY][tileX];
    if (Math.abs(tileX - player.x - 1) < 3 && Math.abs(tileY - 2 - player.y) < 3) {
      if (player.weapon == 'dirt' && player.items['dirt'] > 0 && this.notOnPlayer(tileX, tileY, player)) {
        if (tileVal == 0) {
          this.world[tileY][tileX] = 2;
          this.tileHealth[tileY][tileX] = 4;
          player.items['dirt'] -= 1;
          if (player.items['dirt'] == 0) {
            player.weapon = undefined;
            player.checkPower();
          }
        }
      } else if (player.weapon == 'wood' && player.items['wood'] > 0 && this.notOnPlayer(tileX, tileY, player)) {
        if (tileVal == 0) {
          this.world[tileY][tileX] = 36;
          this.tileHealth[tileY][tileX] = 4;
          player.items['wood'] -= 1;
          if (player.items['wood'] == 0) {
            player.weapon = undefined;
            player.checkPower();
          }
        }
      } else if (player.weapon == 'gold' && player.items['gold'] > 0 && this.notOnPlayer(tileX, tileY, player)) {
        if (tileVal == 0) {
          this.world[tileY][tileX] = 3;
          this.tileHealth[tileY][tileX] = 4;
          player.items['gold'] -= 1;
          if (player.items['gold'] == 0) {
            player.weapon = undefined;
            player.checkPower();
          }
        }
      } else if (player.weapon == 'silver' && player.items['silver'] > 0 && this.notOnPlayer(tileX, tileY, player)) {
        if (tileVal == 0) {
          this.world[tileY][tileX] = 4;
          this.tileHealth[tileY][tileX] = 4;
          player.items['silver'] -= 1;
          if (player.items['silver'] == 0) {
            player.weapon = undefined;
            player.checkPower();
          }
        }
      } else if (tileVal != 0 && (tileVal < 9 || tileVal > 32) && (this.world[tileY - 1][tileX] != 5 && this.world[tileY - 1][tileX] != 6 && this.world[tileY - 1][tileX] != 7)) {
        this.hitTile(tileVal, tileX, tileY, player);

        if (this.tileHealth[tileY][tileX] <= 0) {
          if (tileVal == 1 || tileVal == 2) {
            this.droppedTiles.push(new Tile('dirt', tileX, tileY));
          } else if (tileVal == 3) {
            this.droppedTiles.push(new Tile('gold', tileX, tileY));
          } else if (tileVal == 4) {
            this.droppedTiles.push(new Tile('silver', tileX, tileY));
          } else if ((4 < tileVal && tileVal < 34) || tileVal == 36) {
            if (tileVal == 5 || tileVal == 6 || tileVal == 36) {
              this.droppedTiles.push(new Tile('wood', tileX, tileY));
            } else if (tileVal == 7) {
              if (this.world[tileY][tileX + 1] == 5) {
                this.droppedTiles.push(new Tile('wood', tileX + 1, tileY));
                this.tileHealth[tileX][tileX + 1] = 0;
                this.world[tileY][tileX + 1] = 0;
              }
              if (this.world[tileY][tileX - 1] == 6) {
                this.droppedTiles.push(new Tile('wood', tileX - 1, tileY));
                this.tileHealth[tileX][tileX - 1] = 0;
                this.world[tileY][tileX - 1] = 0;
              }
              this.droppedTiles.push(new Tile('wood', tileX, tileY));
              this.removeTree(tileX, tileY);
            } else if (tileVal == 8 || tileVal == 33) {
              this.removeTree(tileX, tileY);
            }
          }
          this.world[tileY][tileX] = 0;
          this.tileHealth[tileY][tileX] = 0;
        }
      }
    }
  }
}