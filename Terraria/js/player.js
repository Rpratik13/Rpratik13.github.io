function Player() {
  this.health = 100;
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
  this.goLeft = false;
  this.goRight = false;

  this.chestImg = [new Image, new Image];
  this.chestImg[0].src = 'images/silver_chest.png'
  this.chestImg[1].src = 'images/gold_chest.png'
  this.chestPos = [[6, 24, 26, 20], [6, 360, 28, 18], [4, 414, 32, 20], [4, 470, 32, 20], [4, 526, 32, 20], [4, 584, 32, 20], [6, 640, 30, 18],
   [6, 696, 28, 18], [6, 752, 28, 18], [6, 806, 28, 18], [6, 862, 26, 20], [6, 296, 28, 26], [6, 72, 28, 26], [6, 128, 26, 28], [6, 192, 26, 18],
   [6, 248, 24, 20]];

  this.bootImg = [new Image, new Image];
  this.bootImg[0].src = 'images/silver_boot.png'
  this.bootImg[1].src = 'images/gold_boot.png'
  this.bootPos = [[12, 42, 18, 12], [14, 378, 14, 12], [10, 434, 20, 12], [10, 490, 22, 12], [10, 546, 22, 12], [10, 602, 20, 12], [12, 658, 18, 12],
   [14, 714, 14, 12], [12, 770, 18, 12], [10, 826, 22, 12], [10, 882, 22, 12], [8, 322, 28, 12], [12, 42, 18, 12], [12, 42, 18, 12], [12, 42, 18, 12], [12, 42, 18, 12]];


  this.weapons = [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image];
  this.weapons[0].src = 'images/dirt_drop.png';
  this.weapons[1].src = 'images/wood_drop.png';
  this.weapons[2].src = 'images/gold_drop.png';
  this.weapons[3].src = 'images/silver_drop.png';
  this.weapons[4].src = 'images/sword.png';
  this.weapons[5].src = 'images/craft6.png';
  this.weapons[6].src = 'images/craft7.png';
  this.weapons[7].src = 'images/craft8.png';
  this.weapons[8].src = 'images/craft0.png';
  this.weapons[9].src = 'images/craft1.png';
  this.weapons[10].src = 'images/craft2.png';


  this.displayHealth = function (ctx) {
    ctx.fillText(this.health + '/100', 700, 100);
  }

  this.draw = function (ctx, tiles) {
    ctx.save()
    if (this.left) {
      ctx.translate(CANVAS_WIDTH, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, this.playerPositions[this.pose][0], this.playerPositions[this.pose][1], 16, 24,
        CANVAS_WIDTH - 30 - this.x * 16, this.y * 16, 32, 48);
      ctx.restore();
    } else {
      ctx.drawImage(this.img, this.playerPositions[this.pose][0], this.playerPositions[this.pose][1], 16, 24, this.x * 16, this.y * 16, 32, 48)
    }
    this.drawChest(ctx);
    this.drawBoot(ctx);
    if (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] == 0 && tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] == 0 && !this.jumping) {
      this.falling = true;
    }
  }

  this.moveLeft = function (tiles) {
    if (!this.falling && !this.swinging && !this.jumping) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x > 0 &&
      ((tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] != 36) &&
      ((tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] != 36) &&
      ((tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] < 1) && tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] != 36)) {
      this.x -= 1 / 8;
    }
  }

  this.moveRight = function (tiles) {
    if (!this.falling && !this.swinging && !this.jumping) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x < 48 &&
      ((tiles[Math.floor(this.y) + 3][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 3][Math.floor(this.x) + 3] < 1) && tiles[Math.floor(this.y) + 3][Math.floor(this.x) + 3] != 36) &&
      ((tiles[Math.floor(this.y) + 2][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 2][Math.floor(this.x) + 3] < 1) && tiles[Math.floor(this.y) + 2][Math.floor(this.x) + 3] != 36) &&
      ((tiles[Math.floor(this.y) + 1][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 1][Math.floor(this.x) + 3] < 1) && tiles[Math.floor(this.y) + 1][Math.floor(this.x) + 3] != 36)) {
      this.x += 1 / 8;
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
  this.swing = function (ctx, enemies) {
    if (this.pose < 12) {
      this.pose = 12;
    } else {
      if (this.swingCounter % 2 == 0) {
        this.swingCounter = 0;
        this.pose = (this.pose + 1) % 16;

        if (this.pose == 0) {
          this.swinging = false;
          if (this.weapon == 'sword' ||
            this.weapon == 'silver_sword' ||
            this.weapon == 'silver_axe' ||
            this.weapon == 'silver_pick' ||
            this.weapon == 'gold_sword' ||
            this.weapon == 'gold_pick' ||
            this.weapon == 'gold_axe') {
            for (var i = 0; i < enemies.length; i++) {
              if (enemies[i].type == 'slime' || enemies[i].type == 'eye') {
                if (((this.left && (Math.round(enemies[i].x) == Math.round(this.x) - 4 || Math.round(enemies[i].x) == Math.round(this.x) - 2 || Math.round(enemies[i].x) == Math.round(this.x) - 3)) ||
                    (!this.left && (Math.round(enemies[i].x) == Math.round(this.x) + 2 || Math.round(enemies[i].x) == Math.round(this.x) + 1 || Math.round(enemies[i].x) == Math.round(this.x) + 3))) &&
                  (Math.round(enemies[i].y) == Math.round(this.y) - 1 || Math.round(enemies[i].y) == Math.round(this.y) - 2 || Math.round(enemies[i].y) == Math.round(this.y) + 1 || Math.round(enemies[i].y) == Math.round(this.y) + 2 || Math.round(enemies[i].y) == Math.round(this.y))) {
                  enemies[i].knockback = true;
                  enemies[i].health -= this.damage;
                }
              } else if (enemies[i].type == 'zombie') {
                if (((this.left && (Math.round(enemies[i].x) == Math.round(this.x) - 4 || Math.round(enemies[i].x) == Math.round(this.x) - 2 || Math.round(enemies[i].x) == Math.round(this.x) - 3)) ||
                    (!this.left && (Math.round(enemies[i].x) == Math.round(this.x) + 2 || Math.round(enemies[i].x) == Math.round(this.x) + 1 || Math.round(enemies[i].x) == Math.round(this.x) + 3))) &&
                  ((Math.round(enemies[i].y) == Math.round(this.y) - 1 || Math.round(enemies[i].y) == Math.round(this.y) - 2 || Math.round(enemies[i].y) == Math.round(this.y) + 1 || Math.round(enemies[i].y) == Math.round(this.y) + 2 || Math.round(enemies[i].y) == Math.round(this.y)) ||
                    (Math.round(enemies[i].y) + 1 == Math.round(this.y) - 1 || Math.round(enemies[i].y) + 1 == Math.round(this.y) - 2 || Math.round(enemies[i].y + 1) == Math.round(this.y) + 1 || Math.round(enemies[i].y) + 1 == Math.round(this.y) + 2) || Math.round(enemies[i].y) + 1 == Math.round(this.y)) ||
                  (Math.round(enemies[i].y) + 2 == Math.round(this.y) - 1 || Math.round(enemies[i].y) + 2 == Math.round(this.y) - 2 || Math.round(enemies[i].y + 2) == Math.round(this.y) + 1 || Math.round(enemies[i].y) + 2 == Math.round(this.y) + 2) || Math.round(enemies[i].y) + 2 == Math.round(this.y)) {
                  enemies[i].knockback = true;
                  enemies[i].health -= this.damage;

                }
              }
            }
          }
        }
      }
      if (this.pose != 0) {
        this.displayWeapon(ctx);
      }
      this.swingCounter += 1;

    }
  }


  this.displayWeapon = function (ctx) {
    var image;
    if (this.weapon != undefined) {
      ctx.save();
      if (this.pose == 12) {
        if (this.weapon == 'dirt' || this.weapon == 'wood' || this.weapon == 'gold' || this.weapon == 'silver') {
          start_width = this.x * 16;
          start_height = this.y * 16;
          end_width = 12;
          end_height = 12;
          if (this.left) {
            start_width += 20;
          }
        } else if (this.weapon == 'sword' ||
          this.weapon == 'gold_sword' ||
          this.weapon == 'gold_pick' ||
          this.weapon == 'gold_axe' ||
          this.weapon == 'silver_sword' ||
          this.weapon == 'silver_pick' ||
          this.weapon == 'silver_axe') {
          ctx.translate(this.x * 16, this.y * 16 - 20);
          start_width = -17;
          start_height = -3
          end_width = 32;
          end_height = 32;
          if (this.left) {
            ctx.scale(-1, 1);
            ctx.rotate(-Math.PI / 4);
            start_width -= 22;
            start_height -= 22;
          } else {
            ctx.rotate(-Math.PI / 4);
          }
        }
      } else if (this.pose == 13) {
        if (this.weapon == 'dirt' || this.weapon == 'wood' || this.weapon == 'gold' || this.weapon == 'silver') {
          start_width = this.x * 16 + 20;
          start_height = this.y * 16;
          end_width = 12;
          end_height = 12;
          if (this.left) {
            start_width -= 20;
          }
        } else if (this.weapon == 'sword' ||
          this.weapon == 'gold_sword' ||
          this.weapon == 'gold_pick' ||
          this.weapon == 'gold_axe' ||
          this.weapon == 'silver_sword' ||
          this.weapon == 'silver_pick' ||
          this.weapon == 'silver_axe') {
          ctx.translate(this.x * 16, this.y * 16 - 20);
          start_width = 25;
          start_height = -3
          end_width = 32;
          end_height = 32;
          if (this.left) {
            ctx.scale(-1, 1);
            start_width -= 32;
            start_height -= 0;
          }
        }
      } else if (this.pose == 14) {
        if (this.weapon == 'dirt' || this.weapon == 'wood' || this.weapon == 'gold' || this.weapon == 'silver') {
          start_width = this.x * 16 + 27;
          start_height = this.y * 16 + 22;
          end_width = 12;
          end_height = 12;
          if (this.left) {
            start_width -= 35;
          }
        } else if (this.weapon == 'sword' ||
          this.weapon == 'gold_sword' ||
          this.weapon == 'gold_pick' ||
          this.weapon == 'gold_axe' ||
          this.weapon == 'silver_sword' ||
          this.weapon == 'silver_pick' ||
          this.weapon == 'silver_axe') {
          ctx.translate(this.x * 16, this.y * 16 - 20);
          ctx.rotate(Math.PI / 4);
          start_width = 55;
          start_height = -16;
          end_width = 32;
          end_height = 32;
          if (this.left) {
            ctx.scale(-1, -1);
            start_width -= 92;
            start_height -= 45;
          }
        }

      } else if (this.pose == 15) {
        if (this.weapon == 'dirt' || this.weapon == 'wood' || this.weapon == 'gold' || this.weapon == 'silver') {
          start_width = this.x * 16 + 25;
          start_height = this.y * 16 + 30;
          end_width = 12;
          end_height = 12;
          if (this.left) {
            start_width -= 33;
          }
        } else if (this.weapon == 'sword' ||
          this.weapon == 'gold_sword' ||
          this.weapon == 'gold_pick' ||
          this.weapon == 'gold_axe' ||
          this.weapon == 'silver_sword' ||
          this.weapon == 'silver_pick' ||
          this.weapon == 'silver_axe') {
          ctx.translate(this.x * 16, this.y * 16 - 20);
          ctx.rotate(Math.PI / 2);
          start_width = 55;
          start_height = -55;
          end_width = 32;
          end_height = 32;
          if (this.left) {
            ctx.scale(1, -1);
            start_height = -25;
          }
        }

      }



      if (this.weapon == 'dirt') {
        image = this.weapons[0];
      } else if (this.weapon == 'wood') {
        image = this.weapons[1]
      } else if (this.weapon == 'gold') {
        image = this.weapons[2]
      } else if (this.weapon == 'silver') {
        image = this.weapons[3]
      } else if (this.weapon == 'sword') {
        image = this.weapons[4]
      } else if (this.weapon == 'gold_sword') {
        image = this.weapons[5]
      } else if (this.weapon == 'gold_pick') {
        image = this.weapons[6]
      } else if (this.weapon == 'gold_axe') {
        image = this.weapons[7]
      } else if (this.weapon == 'silver_sword') {
        image = this.weapons[8]
      } else if (this.weapon == 'silver_pick') {
        image = this.weapons[9]
      } else if (this.weapon == 'silver_axe') {
        image = this.weapons[10]
      }

      ctx.drawImage(image, start_width, start_height, end_width, end_height);
      ctx.restore();

    }
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
  }

  this.drawChest = function (ctx) {
    var start_width;
    var start_height;
    var end_width;
    var end_height;

    if (this.pose == 0) {
      start_width = this.x * 16 + 1;
      start_height = this.y * 16 + 18;
      end_width = 28;
      end_height = 19;
    } else if (this.pose == 1) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 18;
      end_width = 28;
      end_height = 18;
    } else if (this.pose == 2) {
      start_width = this.x * 16 + 1;
      start_height = this.y * 16 + 18;
      end_width = 31;
      end_height = 19;
    } else if (this.pose == 3) {
      start_width = this.x * 16;
      start_height = this.y * 16 + 18;
      end_width = 32;
      end_height = 19;
    } else if (this.pose == 4) {
      start_width = this.x * 16;
      start_height = this.y * 16 + 18;
      end_width = 32;
      end_height = 19;
    } else if (this.pose == 5) {
      start_width = this.x * 16;
      start_height = this.y * 16 + 18;
      end_width = 32;
      end_height = 20;
    } else if (this.pose == 6) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 18;
      end_width = 30;
      end_height = 18;
    } else if (this.pose == 7) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 18;
      end_width = 28;
      end_height = 18;
    } else if (this.pose == 8) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 18;
      end_width = 28;
      end_height = 18;
    } else if (this.pose == 9) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 18;
      end_width = 28;
      end_height = 18;
    } else if (this.pose == 10) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 18;
      end_width = 26;
      end_height = 18;
    } else if (this.pose == 11) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 10;
      end_width = 28;
      end_height = 26;
    } else if (this.pose == 12) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 10;
      end_width = 27;
      end_height = 26;
    } else if (this.pose == 13) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 10;
      end_width = 27;
      end_height = 28;
    } else if (this.pose == 14) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 17;
      end_width = 25;
      end_height = 19;
    } else if (this.pose == 14) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 17;
      end_width = 25;
      end_height = 19;
    } else if (this.pose == 15) {
      start_width = this.x * 16 + 2;
      start_height = this.y * 16 + 18;
      end_width = 24;
      end_height = 20;
    }
    ctx.save();
    if (this.left) {
      if (this.pose == 0 || this.pose == 2 || this.pose == 5) {
        start_width = CANVAS_WIDTH - 29 - start_width;
      } else if (this.pose == 3 || this.pose == 4 || this.pose == 5) {
        start_width = CANVAS_WIDTH - 30 - start_width;
      } else {
        start_width = CANVAS_WIDTH - 26 - start_width;
      }
      ctx.save();
      ctx.translate(CANVAS_WIDTH, 0);
      ctx.scale(-1, 1);

    }
    if (this.chest == 'silver_chest') {
      var chest = 0;
      ctx.drawImage(this.chestImg[chest], this.chestPos[this.pose][0], this.chestPos[this.pose][1], this.chestPos[this.pose][2], this.chestPos[this.pose][3],
        start_width, start_height, end_width, end_height);
    } else if (this.chest == 'gold_chest') {
      var chest = 1;
      ctx.drawImage(this.chestImg[chest], this.chestPos[this.pose][0], this.chestPos[this.pose][1], this.chestPos[this.pose][2], this.chestPos[this.pose][3],
        start_width, start_height, end_width, end_height);

    }
    ctx.restore();
  }

  this.drawBoot = function (ctx) {
    var start_width;
    var start_height;
    var end_width;
    var end_height;

    if (this.pose == 0 || this.pose == 12 || this.pose == 13 || this.pose == 14 || this.pose == 15) {
      start_width = this.x * 16 + 8;
      start_height = this.y * 16 + 35;
      end_width = 17;
      end_height = 13;
    } else if (this.pose == 1) {
      start_width = this.x * 16 + 10;
      start_height = this.y * 16 + 36;
      end_width = 14;
      end_height = 12;
    } else if (this.pose == 2) {
      start_width = this.x * 16 + 7;
      start_height = this.y * 16 + 36;
      end_width = 18;
      end_height = 12;
    } else if (this.pose == 3) {
      start_width = this.x * 16 + 7;
      start_height = this.y * 16 + 36;
      end_width = 20;
      end_height = 12;
    } else if (this.pose == 4) {
      start_width = this.x * 16 + 7;
      start_height = this.y * 16 + 36;
      end_width = 19;
      end_height = 12;
    } else if (this.pose == 5) {
      start_width = this.x * 16 + 6;
      start_height = this.y * 16 + 36;
      end_width = 19;
      end_height = 12;
    } else if (this.pose == 6) {
      start_width = this.x * 16 + 8;
      start_height = this.y * 16 + 36;
      end_width = 18;
      end_height = 12;
    } else if (this.pose == 7) {
      start_width = this.x * 16 + 9;
      start_height = this.y * 16 + 36;
      end_width = 15;
      end_height = 12;
    } else if (this.pose == 8) {
      start_width = this.x * 16 + 9;
      start_height = this.y * 16 + 36;
      end_width = 16;
      end_height = 12;
    } else if (this.pose == 9) {
      start_width = this.x * 16 + 8;
      start_height = this.y * 16 + 36;
      end_width = 19;
      end_height = 13;
    } else if (this.pose == 10) {
      start_width = this.x * 16 + 8;
      start_height = this.y * 16 + 36;
      end_width = 19;
      end_height = 13;
    } else if (this.pose == 11) {
      start_width = this.x * 16 + 5;
      start_height = this.y * 16 + 36;
      end_width = 26;
      end_height = 13;
    }
    ctx.save();
    if (this.left) {
      if (this.pose == 0 || this.pose == 12 || this.pose == 13 || this.pose == 14 || this.pose == 15) {
        start_width = CANVAS_WIDTH - 13 - start_width;
      } else if (this.pose == 2 || this.pose == 3 || this.pose == 4) {
        start_width = CANVAS_WIDTH - 16 - start_width;
      } else if (this.pose == 5) {
        start_width = CANVAS_WIDTH - 17 - start_width;
      } else if (this.pose == 6 || this.pose == 9 || this.pose == 10) {
        start_width = CANVAS_WIDTH - 14 - start_width;
      } else if (this.pose == 8) {
        start_width = CANVAS_WIDTH - 12 - start_width;
      } else if (this.pose == 11) {
        start_width = CANVAS_WIDTH - 20 - start_width;
      } else {
        start_width = CANVAS_WIDTH - 10 - start_width;
      }
      ctx.save();
      ctx.translate(CANVAS_WIDTH, 0);
      ctx.scale(-1, 1);

    }
    if (this.boot == 'silver_boot') {
      var boot = 0;
      ctx.drawImage(this.bootImg[boot], this.bootPos[this.pose][0], this.bootPos[this.pose][1], this.bootPos[this.pose][2], this.bootPos[this.pose][3],
        start_width, start_height, end_width, end_height);
    } else if (this.boot == 'gold_boot') {
      var boot = 1;
      ctx.drawImage(this.bootImg[boot], this.bootPos[this.pose][0], this.bootPos[this.pose][1], this.bootPos[this.pose][2], this.bootPos[this.pose][3],
        start_width, start_height, end_width, end_height);

    }
    ctx.restore();
  }
}