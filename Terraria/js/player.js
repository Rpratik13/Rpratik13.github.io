function Player(sound, world) {
  this.world = world;
  this.sound = sound;
  this.health = 100;
  this.mana = 100;
  this.healthRegen = 0;
  this.manaRegen = 0;
  this.img = new Image;
  this.img.src = 'images/player.png';
  this.x = 75;
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
  this.items = { 'fire_sword': 1, 'cloud': 1, 'rocket': 1, 'gold_bar': 50 };
  this.itemsName = ['fire_sword', 'cloud', 'rocket', 'gold_bar'];
  this.tilesCollected = [];
  this.inventory = new Inventory(this, this.world);
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
  this.totalJumps = 1;
  this.jumps = 0;
  this.flyTime = 0;
  this.heart = new Image;
  this.heart.src = 'images/heart.png';
  this.star = new Image;
  this.star.src = 'images/mana.png';

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


  this.weapons = [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image];
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
  this.weapons[11].src = 'images/fire_sword.png';

  this.healthRegeneration = function () {
    if (this.health < 100) {
      this.healthRegen = (this.healthRegen + 1) % 70;
      if (this.healthRegen == 0) {
        this.health += 1;
      }
    }
  }

  this.manaRegeneration = function () {
    if (this.mana < 100) {
      this.manaRegen = (this.manaRegen + 1) % 50;
      if (this.manaRegen == 0) {
        this.mana += 1;
      }
    }
  }

  this.displayHealth = function (ctx) {
    var playerX = this.x * TILE_SIZE
    if (this.x < 25) {
      playerX = 25 * TILE_SIZE;
    } else if (this.x > 128) {
      playerX = 128 * TILE_SIZE;
    }
    ctx.font = '20px Arial'

    ctx.drawImage(this.heart, playerX + 250, 123);
    ctx.fillText(Math.floor(this.health), playerX + 275, 140);
    this.healthRegeneration();
  }

  this.displayMana = function (ctx) {
    var playerX = this.x * TILE_SIZE
    if (this.x < 25) {
      playerX = 25 * TILE_SIZE;
    } else if (this.x > 128) {
      playerX = 128 * TILE_SIZE;
    }
    ctx.font = '20px Arial'

    ctx.drawImage(this.star, playerX + 250, 143);
    ctx.fillText(this.mana, playerX + 275, 165);
    this.manaRegeneration();
  }

  this.draw = function (ctx, tiles, game) {
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
    this.checkDeath(game, ctx);
  }

  this.moveLeft = function (tiles, ctx) {
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);
    if (!this.falling && !this.swinging && !this.jumping) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x > 0 &&
      ((tiles[thisY + 3][thisX] > 4 || tiles[thisY + 3][thisX] < 1) && tiles[thisY + 3][thisX] != 36) &&
      ((tiles[thisY + 2][thisX] > 4 || tiles[thisY + 2][thisX] < 1) && tiles[thisY + 2][thisX] != 36) &&
      ((tiles[thisY + 1][thisX] > 4 || tiles[thisY + 1][thisX] < 1) && tiles[thisY + 1][thisX] != 36)) {
      this.x -= 1 / 8;
      if (thisX > 25 && thisX < 128) {
        this.world.cameraMove(ctx, 2);
      }
    }
  }


  this.moveRight = function (tiles, ctx) {
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);
    if (!this.falling && !this.swinging && !this.jumping) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x < 151 &&
      ((tiles[thisY + 3][thisX + 2] > 4 || tiles[thisY + 3][thisX + 2] < 1) && tiles[thisY + 3][thisX + 2] != 36) &&
      ((tiles[thisY + 2][thisX + 2] > 4 || tiles[thisY + 2][thisX + 2] < 1) && tiles[thisY + 2][thisX + 2] != 36) &&
      ((tiles[thisY + 1][thisX + 2] > 4 || tiles[thisY + 1][thisX + 2] < 1) && tiles[thisY + 1][thisX + 2] != 36)) {
      this.x += 1 / 8;
      if (thisX < 128 && thisX > 25) {
        this.world.cameraMove(ctx, -2);
      }
    }
  }

  this.fall = function (tiles) {
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    this.pose = 11;
    if (this.y < 36 &&
      (tiles[thisY + 4][thisX + 1] != 36) &&
      (tiles[thisY + 4][thisX + 2] != 36) &&
      (tiles[thisY + 4][thisX + 1] == 0 || tiles[thisY + 4][thisX + 1] > 4) &&
      (tiles[thisY + 4][thisX + 2] == 0 || tiles[thisY + 4][thisX + 2] > 4)) {
      this.y += 1 / 4;
    } else {
      this.pose = 0;
      this.falling = false;
      this.jumps = 0;
      this.flyTime = 0;
    }
  }

  this.jump = function (tiles) {
    var thisX = Math.round(this.x);
    var thisY = Math.ceil(this.y);
    if (!this.falling) {
      this.pose = 11;
      this.jumping = true;
      this.flyTime += 1;
      if (this.y > 0) {
        this.y -= 1 / 4;
      }
      this.jumpCounter += 1;
      if (this.jumpCounter == 16 ||
        (tiles[thisY][thisX + 2] == 36) ||
        (tiles[thisY][thisX + 1] == 36) ||
        (tiles[thisY][thisX + 2] > 0 && tiles[thisY][thisX + 2] < 5) ||
        (tiles[thisY][thisX + 1] > 0 && tiles[thisY][thisX + 1] < 5)) {
        this.jumpCounter = 0;
        this.jumping = false;
        this.falling = true;
      }
    }
  }

  this.swing = function (ctx, enemies, world, game) {
    this.sound.playSwing();
    var playerX = Math.round(this.x);
    var playerY = Math.round(this.y);
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
            this.weapon == 'gold_axe' ||
            this.weapon == 'fire_sword') {
            for (var i = 0; i < enemies.length; i++) {
              var enemiesX = Math.round(enemies[i].x);
              var enemiesY = Math.round(enemies[i].y);
              if (enemies[i].type == 'slime' || enemies[i].type == 'eye') {
                if ((this.left && (playerX - 4 <= enemiesX && enemiesX <= playerX + 1) ||
                    (!this.left && (playerX - 1 <= enemiesX && enemiesX <= playerX + 3))) &&
                  (playerY - 2 <= enemiesY && enemiesY <= playerY + 3)) {
                  enemies[i].knockback = true;
                  enemies[i].health -= this.damage;
                  this.sound.playSlimeHit();
                }
              } else if (enemies[i].type == 'zombie') {
                if (((this.left && (playerX - 4 <= enemiesX && enemiesX <= playerX - 2)) ||
                    (!this.left && (playerX + 1 <= enemiesX && enemiesX <= playerX + 3))) &&
                  ((enemiesY == playerY - 1 || enemiesY == playerY - 2 || enemiesY == playerY + 1 || enemiesY == playerY + 2 || enemiesY == playerY) ||
                    (enemiesY + 1 == playerY - 1 || enemiesY + 1 == playerY - 2 || enemiesY + 1 == playerY + 1 || enemiesY + 1 == playerY + 2 || enemiesY + 1 == playerY + 3) || enemiesY + 1 == playerY ||
                    (enemiesY + 2 == playerY - 1 || enemiesY + 2 == playerY - 2 || enemiesY + 2 == playerY + 1 || enemiesY + 2 == playerY + 2 || enemiesY + 2 == playerY + 3) || enemiesY + 2 == playerY)) {
                  enemies[i].knockback = true;
                  enemies[i].health -= this.damage;
                  this.sound.playZombieHit();

                }
              } else if (enemies[i].type == 'boss') {
                if (((this.left && (enemiesX <= playerX - 4 && playerX - 4 <= enemiesX + 9) || (
                      enemiesX <= playerX - 2 && playerX - 2 <= enemiesX + 9)) ||
                    (this.left && (enemiesX <= playerX + 1 && playerX + 1 <= enemiesX + 9) || (
                      enemiesX <= playerX + 3 && playerX + 3 <= enemiesX + 9))) &&
                  ((enemiesY <= playerY - 2 && playerY - 2 <= enemiesY + 6) ||
                    (enemiesY <= playerY + 2 && playerY + 2 <= enemiesY + 6)
                  )) {
                  enemies[i].health -= this.damage;
                  this.sound.playZombieHit();

                }
              }
              enemies[i].checkDeath(world);

            }
            if (this.weapon == 'fire_sword' && this.mana >= 20) {
              this.mana -= 20;
              game.fireBalls.push(new Fireball(this, enemies, game.cursorX, game.cursorY, this.world))
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
          this.weapon == 'silver_axe' ||
          this.weapon == 'fire_sword') {
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
          this.weapon == 'silver_axe' ||
          this.weapon == 'fire_sword') {
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
          this.weapon == 'silver_axe' ||
          this.weapon == 'fire_sword') {
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
          this.weapon == 'silver_axe' ||
          this.weapon == 'fire_sword') {
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
      } else if (this.weapon == 'fire_sword') {
        image = this.weapons[11]
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
    } else if (this.weapon == 'fire_sword') {
      this.damage = 2;
      this.pickPower = 0;
      this.axePower = 0;
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

  this.checkDeath = function (game, ctx) {
    if (this.health <= 0) {
      game.enemies = [];
      game.bossBattle = false;
      this.health = 100;
      this.x = 75;
      this.y = 1;
      this.falling = true;
      ctx.translate(-this.world.translated, 0);
      this.world.translated = -CANVAS_WIDTH;
      ctx.translate(this.world.translated, 0);
    }

  }

  this.checkAccessory = function () {
    if (this.accessory == 'cloud') {
      this.totalJumps = 2;
    } else if (this.accessory == 'rocket') {
      this.totalJumps = 3;
    } else {
      this.totalJumps = 1;
    }
  }
}