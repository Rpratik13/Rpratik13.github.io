function Player() {
  this.health = PLAYER_MAX_HEALTH;
  this.mana = PLAYER_MAX_MANA;
  this.healthRegenTimer = 0;
  this.manaRegenTimer = 0;
  this.x = PLAYER_START_X;
  this.y = PLAYER_START_Y;
  this.pose = 0;
  this.falling = false;
  this.jumping = false;
  this.left = false;
  this.jumpCounter = 0;
  this.swinging = false;
  this.swingCounter = 0;
  this.showInventory = false;
  this.items = { 'gold_sword': 1, 'cloud': 1, 'rocket': 1, 'gold_bar': 50, 'gel': 10, 'fire_sword': 1, 'silver_bar': 50 };
  this.itemsName = Object.keys(this.items);
  this.tilesCollected = [];
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

  this.init = function (game) {
    this.game = game;
    this.ctx = game.ctx;
    this.world = game.world;
    this.inventory = new Inventory(this);

  }

  this.healthRegeneration = function () {
    if (this.health < PLAYER_MAX_HEALTH) {
      this.healthRegenTimer = (this.healthRegenTimer + 1) % HEALTH_REGEN_TIME;
      if (this.healthRegenTimer == 0) {
        this.health += 1;
      }
    }
  }

  this.manaRegeneration = function () {
    if (this.mana < PLAYER_MAX_MANA) {
      this.manaRegenTimer = (this.manaRegenTimer + 1) % MANA_REGEN_TIME;
      if (this.manaRegenTimer == 0) {
        this.mana += 1;
      }
    }
  }

  this.displayHealth = function () {
    var playerX = this.x * TILE_SIZE
    if (this.x < 25) {
      playerX = 25 * TILE_SIZE;
    } else if (this.x > 128) {
      playerX = 128 * TILE_SIZE;
    }
    this.ctx.font = '20px Arial'

    this.ctx.drawImage(HEART_IMG, playerX + 250, 123);
    this.ctx.fillText(Math.floor(this.health), playerX + 275, 140);
    this.healthRegeneration();
  }

  this.displayMana = function () {
    var playerX = this.x * TILE_SIZE
    if (this.x < 25) {
      playerX = 25 * TILE_SIZE;
    } else if (this.x > 128) {
      playerX = 128 * TILE_SIZE;
    }
    this.ctx.font = '20px Arial'

    this.ctx.drawImage(MANA_IMG, playerX + 250, 143);
    this.ctx.fillText(this.mana, playerX + 275, 165);
    this.manaRegeneration();
  }

  this.draw = function () {
    var tiles = this.world.world;
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    this.ctx.save()

    if (this.left) {
      this.ctx.translate(CANVAS_WIDTH, 0);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(PLAYER_IMG, PLAYER_SPRITE[this.pose][0], PLAYER_SPRITE[this.pose][1], 16, 24,
        CANVAS_WIDTH - 30 - this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 48);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(PLAYER_IMG, PLAYER_SPRITE[this.pose][0], PLAYER_SPRITE[this.pose][1], 16, 24,
        this.x * TILE_SIZE, this.y * TILE_SIZE, 32, 48)
    }

    this.drawChest(this.ctx);
    this.drawBoot(this.ctx);

    if (!this.jumping &&
      WALKABLE_TILES.includes(tiles[thisY + 4][thisX + 1]) &&
      WALKABLE_TILES.includes(tiles[thisY + 4][thisX + 2])) {
      this.falling = true;
    }

    this.checkDeath();
  }

  this.moveLeft = function () {
    var tiles = this.world.world;
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);

    if (!this.falling && !this.swinging && !this.jumping) {
      this.pose = (this.pose + 1) % 11;
    }

    if (this.x > 0 &&
      WALKABLE_TILES.includes(tiles[thisY + 3][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY + 2][thisX]) &&
      WALKABLE_TILES.includes(tiles[thisY + 1][thisX])) {

      this.x -= 1 / 8;

      if (thisX > 25 && thisX < 128) {
        this.world.cameraMove(2);
      }
    }
  }

  this.moveRight = function () {
    var tiles = this.world.world;
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);
    if (!this.falling && !this.swinging && !this.jumping) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x < 151 &&
      WALKABLE_TILES.includes(tiles[thisY + 3][thisX + 2]) &&
      WALKABLE_TILES.includes(tiles[thisY + 2][thisX + 2]) &&
      WALKABLE_TILES.includes(tiles[thisY + 1][thisX + 2])) {

      this.x += 1 / 8;

      if (thisX < 128 && thisX > 25) {
        this.world.cameraMove(-2);
      }
    }
  }

  this.fall = function () {
    var tiles = this.world.world;
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    this.pose = 11;
    if (this.y < 36 &&
      WALKABLE_TILES.includes(tiles[thisY + 4][thisX + 1]) &&
      WALKABLE_TILES.includes(tiles[thisY + 4][thisX + 2])) {
      this.y += 1 / 4;
    } else {
      this.pose = 0;
      this.falling = false;
      this.jumps = 0;
      this.flyTime = 0;
    }
  }

  this.jump = function () {
    var tiles = this.world.world;
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
        NOT_WALKABLE_TILES.includes(tiles[thisY][thisX + 1]) ||
        NOT_WALKABLE_TILES.includes(tiles[thisY][thisX + 2])) {
        this.jumpCounter = 0;
        this.jumping = false;
        this.falling = true;
      }
    }
  }

  this.throwFireball = function () {
    if (this.weapon == 'fire_sword' && this.mana >= 20) {
      this.mana -= 20;
      this.game.fireBalls.push(new Fireball(this.game, this.game.cursorX, this.game.cursorY))
      playSound('fireball');
    }
  }

  this.swing = function () {
    var enemies = this.game.enemies;
    playSound('swing');
    if (this.pose < 12) {
      this.pose = 12;
    } else {
      if (this.swingCounter % 2 == 0) {
        this.swingCounter = 0;
        this.pose = (this.pose + 1) % 16;

        if (this.pose == 0) {
          this.swinging = false;
          if (ATTACK_WEAPONS.includes(this.weapon)) {
            for (var i = 0; i < enemies.length; i++) {
              enemies[i].checkSwingHit();
            }

            this.throwFireball();
          }
        }
      }
      if (this.pose != 0) {
        this.displayWeapon();
      }
      this.swingCounter += 1;

    }
  }

  this.displayWeapon = function () {
    if (this.weapon != undefined) {
      this.ctx.save();
      if (PLACE_WEAPONS.includes(this.weapon)) {
        start_width = this.x * TILE_SIZE + PLACE_WEAPONS_POS[this.pose][0];
        start_height = this.y * TILE_SIZE + PLACE_WEAPONS_POS[this.pose][1];
        end_width = TILE_DROP_SIZE;
        end_height = TILE_DROP_SIZE;
        if (this.left) {
          start_width += PLACE_WEAPONS_LEFT_POS[this.pose];
        }
      } else if (ATTACK_WEAPONS.includes(this.weapon)) {
        this.ctx.translate(this.x * TILE_SIZE, this.y * TILE_SIZE - 20);
        this.ctx.rotate(ATTACK_WEAPON_ROTATE[this.pose]);
        start_width = ATTACK_WEAPON_POS[this.pose][0];
        start_height = ATTACK_WEAPON_POS[this.pose][1];
        end_width = WEAPON_SIZE;
        end_height = WEAPON_SIZE;
        if (this.left) {
          this.ctx.scale(ATTACK_WEAPON_SCALE[this.pose][0], ATTACK_WEAPON_SCALE[this.pose][1]);
          start_width += ATTACK_WEAPONS_LEFT_POS[this.pose][0];
          start_height += ATTACK_WEAPONS_LEFT_POS[this.pose][1];
        }
      }

      this.ctx.drawImage(WEAPON_IMGS[this.weapon], start_width, start_height, end_width, end_height);
      this.ctx.restore();
    }
  }

  this.itemPickup = function () {
    var tiles = this.world.droppedTiles;
    for (var i = 0; i < tiles.length; i++) {
      if (Math.floor(tiles[i].tileX) > this.x + 1 || Math.ceil(tiles[i].tileX) < this.x ||
        tiles[i].tileY > this.y + 2 || tiles[i].tileY < this.y) {
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
      this.world.droppedTiles.splice(this.tilesCollected[i], 1);
      this.tilesCollected.shift();
    }
  }

  this.checkArmor = function () {
    var helm = HELM_ARMOR[this.helm];
    var chest = CHEST_ARMOR[this.chest];
    var boot = BOOT_ARMOR[this.boot];
    this.armor = helm + chest + boot;
  }

  this.checkPower = function () {
    this.damage = WEAPON_DAMAGES[this.weapon][0]
    this.pickPower = WEAPON_DAMAGES[this.weapon][1]
    this.axePower = WEAPON_DAMAGES[this.weapon][2]
  }

  this.drawChest = function () {
    if (this.chest) {
      var start_width = this.x * TILE_SIZE + CHEST_EQUIP_POS[this.pose][0];
      var start_height = this.y * TILE_SIZE + CHEST_EQUIP_POS[this.pose][1];
      var end_width = CHEST_EQUIP_POS[this.pose][2]
      var end_height = CHEST_EQUIP_POS[this.pose][3]

      this.ctx.save();
      if (this.left) {
        start_width = getLeftChestEquipPos(this.pose) - start_width;
        this.ctx.translate(CANVAS_WIDTH, 0);
        this.ctx.scale(-1, 1);
      }

      this.ctx.drawImage(CHEST_IMG[this.chest],
        CHEST_SPRITE[this.pose][0], CHEST_SPRITE[this.pose][1], CHEST_SPRITE[this.pose][2], CHEST_SPRITE[this.pose][3],
        start_width, start_height, end_width, end_height);
      this.ctx.restore();
    }
  }

  this.drawBoot = function () {
    if (this.boot) {
      var start_width = this.x * TILE_SIZE + BOOT_EQUIP_POS[this.pose][0];
      var start_height = this.y * TILE_SIZE + BOOT_EQUIP_POS[this.pose][1];
      var end_width = BOOT_EQUIP_POS[this.pose][2];
      var end_height = BOOT_EQUIP_POS[this.pose][3];

      this.ctx.save();
      if (this.left) {
        start_width = BOOT_LEFT_EQUIP_POS[this.pose] - start_width;
        this.ctx.translate(CANVAS_WIDTH, 0);
        this.ctx.scale(-1, 1);
      }

      this.ctx.drawImage(BOOT_IMG[this.boot],
        BOOT_SPRITE[this.pose][0], BOOT_SPRITE[this.pose][1], BOOT_SPRITE[this.pose][2], BOOT_SPRITE[this.pose][3],
        start_width, start_height, end_width, end_height);
      this.ctx.restore();
    }
  }

  this.removeHalfItems = function () {
    for (var i = 0; i < this.itemsName.length; i++) {
      if (this.items[this.itemsName[i]] > 1) {
        this.items[this.itemsName[i]] = Math.floor(this.items[this.itemsName[i]] / 2);
      }
    }
  }

  this.resetPlayer = function () {
    this.health = PLAYER_MAX_HEALTH;
    this.mana = PLAYER_MAX_MANA;
    this.x = PLAYER_START_X;
    this.y = 1;
    this.falling = true;
  }

  this.checkDeath = function () {
    if (this.health <= 0) {
      this.game.enemies = [];
      this.game.bossBattle = false;
      this.resetPlayer();
      this.removeHalfItems();
      this.world.resetCamera();
    }
  }

  this.checkAccessory = function () {
    this.totalJumps = ACCESSORY_JUMPS[this.accessory];
  }
}