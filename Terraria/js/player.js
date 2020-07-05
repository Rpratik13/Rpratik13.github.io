function Player() {
  this.img = new Image;
  this.img.src = 'images/player.png';
  this.x = 20;
  this.y = 14;
  this.playerPositions = [[34, 65], [34, 156], [56, 155], [79, 155], [105, 155], [131, 156], [157, 156], [182, 156], [208, 156], [235, 155], [263, 155], [34, 123], [34, 93], [56, 93], [80, 93], [104, 93]];
  this.pose = 0;
  this.falling = false;
  this.jumping = false;
  this.left = false;
  this.jumpCounter = 0;
  this.swinging = false;
  this.swingCounter = 0;
  this.showInventory = false;
  this.items = { 'sword': 1 };
  this.itemsName = ['sword'];
  this.tilesCollected = [];
  this.inventory = new Inventory(this);
  this.weapon;
  this.helm;
  this.chest;
  this.boot;
  this.armor = 0;
  this.pickPower = 1;
  this.axePower = 1;
  this.damage = 5;

  this.draw = function (ctx, tiles) {
    ctx.save()
    if (this.left) {
      ctx.translate(CANVAS_WIDTH, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, this.playerPositions[this.pose][0], this.playerPositions[this.pose][1], 16, 24, CANVAS_WIDTH - 30 - this.x * 16, this.y * 16, 32, 48);
      ctx.restore();
    } else {
      ctx.drawImage(this.img, this.playerPositions[this.pose][0], this.playerPositions[this.pose][1], 16, 24, this.x * 16, this.y * 16, 32, 48)
    }
    if (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] == 0 && tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] == 0 && !this.jumping) {
      this.falling = true;
    }
  }

  this.moveLeft = function (tiles) {
    if (!this.falling) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x > 0 &&
      ((tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] != 36) &&
      ((tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] != 36) &&
      ((tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] != 36)) {
      this.x -= 1 / 4;
    }
  }

  this.moveRight = function (tiles) {
    if (!this.falling) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x < 48 &&
      ((tiles[Math.floor(this.y) + 3][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 3][Math.floor(this.x) + 3] < 1) && tiles[Math.floor(this.y) + 3][Math.floor(this.x) + 3] != 36) &&
      ((tiles[Math.floor(this.y) + 2][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 2][Math.floor(this.x) + 3] < 1) && tiles[Math.floor(this.y) + 2][Math.floor(this.x) + 3] != 36) &&
      ((tiles[Math.floor(this.y) + 1][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 1][Math.floor(this.x) + 3] < 1) && tiles[Math.floor(this.y) + 1][Math.floor(this.x) + 3] != 36)) {
      this.x += 1 / 4;
    }
  }

  this.fall = function (tiles) {
    this.pose = 11;
    if (this.y < 36 &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] != 36) &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] != 36) &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] == 0 || tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] > 4) &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] == 0 || tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] > 4)) {
      this.y += 1 / 4;
    } else {
      this.pose = 0;
      this.falling = false;
    }
  }

  this.jump = function (tiles) {
    if (!this.falling) {
      this.pose = 11;
      this.jumping = true;
      this.y -= 1 / 4;
      this.jumpCounter += 1;
      if (this.jumpCounter == 16 ||
        (tiles[Math.ceil(this.y)][Math.round(this.x) + 2] == 36) ||
        (tiles[Math.ceil(this.y)][Math.round(this.x) + 1] == 36) ||
        (tiles[Math.ceil(this.y)][Math.round(this.x) + 2] > 0 && tiles[Math.ceil(this.y)][Math.round(this.x) + 2] < 5) ||
        (tiles[Math.ceil(this.y)][Math.round(this.x) + 1] > 0 && tiles[Math.ceil(this.y)][Math.round(this.x) + 1] < 5)) {
        this.jumpCounter = 0;
        this.jumping = false;
        this.falling = true;
      }
    }
  }

  this.swing = function () {
    if (this.pose < 12) {
      this.pose = 12;
    } else {
      if (this.swingCounter % 2 == 0) {
        this.swingCounter = 0;
        this.pose = (this.pose + 1) % 16;
        if (this.pose == 0) {
          this.swinging = false;
        }
      }
    }
    this.swingCounter += 1;

  }

  this.itemPickup = function (world) {
    var tiles = world.droppedTiles;
    for (var i = 0; i < tiles.length; i++) {
      if (Math.floor(tiles[i].tileX) > this.x + 1 || Math.ceil(tiles[i].tileX) < this.x ||
        tiles[i].tileY > this.y + 1 || tiles[i].tileY < this.y + 1) {
        if (tiles[i].tileX > this.x + 1) {
          tiles[i].moveLeft();
        } else if (tiles[i].tileX < this.x) {
          tiles[i].moveRight();
        }

        if (tiles[i].tileY > this.y + 1) {
          tiles[i].moveUp();
        } else if (tiles[i].tileY < this.y + 1) {
          tiles[i].moveDown();
        }
      } else {
        this.tilesCollected.push(i);
        if (tiles[i].type in this.items) {
          this.items[tiles[i].type] += 1;
        } else {
          this.items[tiles[i].type] = 1;
          this.itemsName.push(tiles[i].type);
        }
      }
    }

    for (var i = 0; i < this.tilesCollected.length; i++) {
      world.droppedTiles.splice(this.tilesCollected[i], 1);
      this.tilesCollected.shift();
    }
  }


  this.checkArmor = function () {
    console.log('hell')
    var chest;
    var helm
    var boot;

    if (this.helm == undefined) {
      helm = 0;
    } else if (this.helm == 'silver_helm') {
      helm = 3;
    } else if (this.helm == 'gold_helm') {
      helm = 5;
    }

    if (this.chest == undefined) {
      chest = 0;
    } else if (this.chest == 'silver_chest') {
      chest = 3;
    } else if (this.chest == 'gold_chest') {
      chest = 5;
    }

    if (this.boot == undefined) {
      boot = 0;
    } else if (this.boot == 'silver_boot') {
      boot = 3;
    } else if (this.boot == 'gold_boot') {
      boot = 5;
    }


    this.armor = helm + chest + boot;

  }

  this.checkPower = function () {
    if (this.weapon == undefined) {
      this.damage = 5;
      this.pickPower = 1;
      this.axePower = 1;
    } else if (this.weapon == 'sword') {
      this.damage = 7;
      this.pickPower = 0;
      this.axePower = 0;
    } else if (this.weapon == 'silver_sword') {
      this.damage = 9;
      this.pickPower = 0;
      this.axePower = 0;
    } else if (this.weapon == 'gold_sword') {
      this.damage = 15;
      this.pickPower = 0;
      this.axePower = 0;
    } else if (this.weapon == 'silver_pick') {
      this.damage = 5;
      this.pickPower = 2;
      this.axePower = 0;
    } else if (this.weapon == 'gold_pick') {
      this.damage = 6;
      this.pickPower = 4;
      this.axePower = 0;
    } else if (this.weapon == 'silver_axe') {
      this.damage = 5;
      this.pickPower = 0;
      this.axePower = 2;
    } else if (this.weapon == 'gold_axe') {
      this.damage = 6;
      this.pickPower = 0;
      this.axePower = 4;
    } else {
      this.damage = 5;
      this.pickPower = 0;
      this.axePower = 0;
    }
    console.log(this.axePower);
  }

}