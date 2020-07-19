/**
 * It creates the player object.
 */

function Player() {
  this.health = PLAYER.maxHealth;
  this.mana = PLAYER.maxMana;
  this.healthRegenTimer = 0;
  this.manaRegenTimer = 0;
  this.x = PLAYER.startX;
  this.y = PLAYER.startY;
  this.pose = 0; // Used to take right image from sprite.
  this.falling = false;
  this.jumping = false;
  this.left = false; // Current direction of player.
  this.jumpCounter = 0;
  this.swinging = false;
  this.swingCounter = 0;
  this.showInventory = false;
  this.items = {
    'gold_sword': 1,
    'cloud': 1,
    'rocket': 1,
    'gold_bar': 50,
    'gel': 10,
    'fire_sword': 1,
    'silver_bar': 50
  };
  this.itemsName = Object.keys(this.items);
  this.tilesCollected = [];
  this.weapon;
  this.helm;
  this.chest = 'gold_chest';
  this.boot = 'gold_boot';
  this.armor = 0;
  this.damage = WEAPON.damage[this.weapon][0];
  this.pickPower = WEAPON.damage[this.weapon][1];
  this.axePower = WEAPON.damage[this.weapon][2];
  this.goLeft = false;
  this.goRight = false;
  this.totalJumps = 1;
  this.jumps = 0;
  this.flyTime = 0;

  /**
   * It initializes the player object.
   *
   * @param {game_object} game It is the main game object.
   */
  this.init = function (game) {
    this.game = game;
    this.ctx = game.ctx;
    this.world = game.world;
    this.inventory = new Inventory(this);

  }

  /**
   * It regenerates the player health over time if player health not full.
   */
  this.healthRegeneration = function () {
    if (this.health < PLAYER.maxHealth) {
      this.healthRegenTimer = (this.healthRegenTimer + 1) % PLAYER.healthRegenTime;
      if (this.healthRegenTimer == 0) {
        this.health += 1;
      }
    }
  }

  /**
   * It regenerates the player mana over time if player health not full.
   */
  this.manaRegeneration = function () {
    if (this.mana < PLAYER.maxMana) {
      this.manaRegenTimer = (this.manaRegenTimer + 1) % PLAYER.manaRegenTime;
      if (this.manaRegenTimer == 0) {
        this.mana += 1;
      }
    }
  }

  /**
   * It displays current health of player.
   */
  this.displayHealth = function () {
    var playerX = this.x * TILE.size;
    if (this.x < MIN_DISPLAY_POS) {
      playerX = MIN_DISPLAY_POS * TILE.size;
    } else if (this.x > MAX_DISPLAY_POS) {
      playerX = MAX_DISPLAY_POS * TILE.size;
    }

    this.ctx.font = '20px Arial';

    this.ctx.drawImage(STATS.heartImg, playerX + STATS.picPos, STATS.healthPicHeight);
    this.ctx.fillText(Math.floor(this.health), playerX + STATS.pos, STATS.healthHeight);
    this.healthRegeneration();
  }

  /**
   * It displays current mana of player.
   */
  this.displayMana = function () {
    var playerX = this.x * TILE.size;
    if (this.x < MIN_DISPLAY_POS) {
      playerX = MIN_DISPLAY_POS * TILE.size;
    } else if (this.x > MAX_DISPLAY_POS) {
      playerX = MAX_DISPLAY_POS * TILE.size;
    }
    this.ctx.font = '20px Arial';

    this.ctx.drawImage(STATS.manaImg, playerX + STATS.picPos, STATS.manaPicHeight);
    this.ctx.fillText(this.mana, playerX + STATS.pos, STATS.manaHeight);
    this.manaRegeneration();
  }

  /**
   * It draw the player object.
   */
  this.draw = function () {
    var tiles = this.world.world;
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    this.ctx.save();

    if (this.left) {
      this.ctx.translate(CANVAS_WIDTH, 0);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(PLAYER.img, PLAYER.sprite.val[this.pose][0], PLAYER.sprite.val[this.pose][1], PLAYER.sprite.width, PLAYER.sprite.height,
        CANVAS_WIDTH - (PLAYER.leftTile + this.x) * TILE.size, this.y * TILE.size, PLAYER.width * TILE.size, PLAYER.height * TILE.size);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(PLAYER.img, PLAYER.sprite.val[this.pose][0], PLAYER.sprite.val[this.pose][1], PLAYER.sprite.width, PLAYER.sprite.height,
        this.x * TILE.size, this.y * TILE.size, PLAYER.width * TILE.size, PLAYER.height * TILE.size);
    }

    this.drawChest(this.ctx);
    this.drawBoot(this.ctx);

    if (!this.jumping &&
      TILE.walkable.includes(tiles[thisY + PLAYER.height + 1][thisX + PLAYER.width - 1]) &&
      TILE.walkable.includes(tiles[thisY + PLAYER.height + 1][thisX + PLAYER.width])) {
      this.falling = true;
    }

    this.checkDeath();
  }

  /**
   * It moves player in the left direction.
   */
  this.moveLeft = function () {
    var tiles = this.world.world;
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);

    if (!this.falling && !this.swinging && !this.jumping) {
      this.pose = (this.pose + 1) % PLAYER.movePoses;
    }

    if (this.x > 0) {
      for (var i = 1; i <= PLAYER.height; i++) {
        if (TILE.notWalkable.includes(tiles[thisY + i][thisX + 1])) {
          return;
        }
      }


      this.x -= PLAYER.speed;

      if (thisX > MIN_DISPLAY_POS && thisX < MAX_DISPLAY_POS) {
        this.world.cameraMove(CAMERA_MOVE_VAL);
      }
    }
  }

  /**
   * It moves player in the right direction.
   */
  this.moveRight = function () {
    var tiles = this.world.world;
    var thisX = Math.round(this.x);
    var thisY = Math.floor(this.y);
    if (!this.falling && !this.swinging && !this.jumping) {
      this.pose = (this.pose + 1) % PLAYER.movePoses;
    }
    if (this.x < (TILE.mapWidth - PLAYER.width - 1)) {
      for (var i = 1; i <= PLAYER.height; i++) {
        if (TILE.notWalkable.includes(tiles[thisY + i][thisX + PLAYER.width])) {
          return;
        }
      }

      this.x += PLAYER.speed;

      if (thisX < MAX_DISPLAY_POS && thisX > MIN_DISPLAY_POS) {
        this.world.cameraMove(-CAMERA_MOVE_VAL);
      }
    }
  }

  /**
   * It moves player downward when there are not tiles under the player.
   */
  this.fall = function () {
    var tiles = this.world.world;
    var thisX = Math.floor(this.x);
    var thisY = Math.floor(this.y);
    this.pose = PLAYER.jumpPose;
    if (this.y < (TILE.mapHeight - PLAYER.height) &&
      TILE.walkable.includes(tiles[thisY + PLAYER.height + 1][thisX + PLAYER.width - 1]) &&
      TILE.walkable.includes(tiles[thisY + PLAYER.height + 1][thisX + PLAYER.width])) {
      this.y += FALL_SPEED;
    } else {
      this.pose = 0;
      this.falling = false;
      this.jumps = 0;
      this.flyTime = 0;
    }
  }

  /**
   * It moves player upwards.
   */
  this.jump = function () {
    var tiles = this.world.world;
    var thisX = Math.round(this.x);
    var thisY = Math.ceil(this.y);
    if (!this.falling) {
      this.pose = PLAYER.jumpPose;
      this.jumping = true;
      this.flyTime += 1;
      if (this.y > 0) {
        this.y -= FALL_SPEED;
      }
      this.jumpCounter += 1;
      if (this.jumpCounter == PLAYER.jumpHeight ||
        TILE.notWalkable.includes(tiles[thisY][thisX + PLAYER.width - 1]) ||
        TILE.notWalkable.includes(tiles[thisY][thisX + PLAYER.width])) {
        this.jumpCounter = 0;
        this.jumping = false;
        this.falling = true;
      }
    }
  }

  /**
   * It creates fireball if player is using fire staff and has enough mana.
   */
  this.throwFireball = function () {
    if (this.weapon == 'fire_sword' && this.mana >= FIREBALL.manaCost) {
      this.mana -= FIREBALL.manaCost;
      this.game.fireBalls.push(new Fireball(this.game, this.game.cursorX, this.game.cursorY));
      playSound('fireball');
    }
  }

  /**
   * It swings the player weapon.
   */
  this.swing = function () {
    var enemies = this.game.enemies;
    playSound('swing');
    if (this.pose < PLAYER.swingFirstPose) {
      this.pose = PLAYER.swingFirstPose;
    } else {
      if (this.swingCounter % 2 == 0) {
        this.swingCounter = 0;
        this.pose = (this.pose + 1) % PLAYER.swingPoses;

        if (this.pose == 0) {
          this.swinging = false;
          if (WEAPON.attackWeapons.includes(this.weapon)) {
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

  /**
   * It displays player weapon when swinging.
   */
  this.displayWeapon = function () {
    if (this.weapon != undefined) {
      this.ctx.save();
      if (WEAPON.placeWeapons.includes(this.weapon)) {
        start_width = this.x * TILE.size + WEAPON.placeWeaponsPos[this.pose][0];
        start_height = this.y * TILE.size + WEAPON.placeWeaponsPos[this.pose][1];
        end_width = TILE.dropSize;
        end_height = TILE.dropSize;
        if (this.left) {
          start_width += WEAPON.placeWeaponsLeftPos[this.pose];
        }
      } else if (WEAPON.attackWeapons.includes(this.weapon)) {
        this.ctx.translate(this.x * TILE.size, this.y * TILE.size - 20);
        this.ctx.rotate(WEAPON.attackWeaponRotate[this.pose]);
        start_width = WEAPON.attackWeaponPos[this.pose][0];
        start_height = WEAPON.attackWeaponPos[this.pose][1];
        end_width = TILE.size * WEAPON.size;
        end_height = TILE.size * WEAPON.size;
        if (this.left) {
          this.ctx.scale(WEAPON.attackWeaponScale[this.pose][0], WEAPON.attackWeaponScale[this.pose][1]);
          start_width += WEAPON.attackWeaponsLeftPos[this.pose][0];
          start_height += WEAPON.attackWeaponsLeftPos[this.pose][1];
        }
      }

      this.ctx.drawImage(WEAPON.imgs[this.weapon], start_width, start_height, end_width, end_height);
      this.ctx.restore();
    }
  }

  /**
   * It pickups dropped tiles and items.
   */
  this.itemPickup = function () {
    var tiles = this.world.droppedTiles;
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].tileX > this.x + PLAYER.width || tiles[i].tileX < this.x ||
        tiles[i].tileY > this.y + PLAYER.height || tiles[i].tileY < this.y) {
        if (tiles[i].tileX > this.x + PLAYER.width) {
          tiles[i].moveLeft();
        } else if (tiles[i].tileX < this.x) {
          tiles[i].moveRight();
        }

        if (tiles[i].tileY > this.y + PLAYER.height) {
          tiles[i].moveUp();
        } else if (tiles[i].tileY < this.y) {
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

  /**
   * It checks the current armor value of player.
   */
  this.checkArmor = function () {
    var helm = ARMOR.helm[this.helm];
    var chest = ARMOR.chest[this.chest];
    var boot = ARMOR.boot[this.boot];
    this.armor = helm + chest + boot;
  }

  /**
   * It checks the damage, pickpower and axepower of player.
   */
  this.checkPower = function () {
    this.damage = WEAPON.damage[this.weapon][0];
    this.pickPower = WEAPON.damage[this.weapon][1];
    this.axePower = WEAPON.damage[this.weapon][2];
  }

  /**
   * It draws the chest armor on the player.
   */
  this.drawChest = function () {
    if (this.chest) {
      var start_width = this.x * TILE.size + CHEST_EQUIP_POS[this.pose][0];
      var start_height = this.y * TILE.size + CHEST_EQUIP_POS[this.pose][1];
      var end_width = CHEST_EQUIP_POS[this.pose][2];
      var end_height = CHEST_EQUIP_POS[this.pose][3];

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

  /**
   * It draws the boot armor on the player.
   */
  this.drawBoot = function () {
    if (this.boot) {
      var start_width = this.x * TILE.size + BOOT_EQUIP_POS[this.pose][0];
      var start_height = this.y * TILE.size + BOOT_EQUIP_POS[this.pose][1];
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

  /**
   * It removes half of the player's items in the inventory.
   */
  this.removeHalfItems = function () {
    for (var i = 0; i < this.itemsName.length; i++) {
      if (this.items[this.itemsName[i]] > 1) {
        this.items[this.itemsName[i]] = Math.floor(this.items[this.itemsName[i]] / 2);
      }
    }
  }

  /**
   * It resets the player's health, mana and position. 
   */
  this.resetPlayer = function () {
    this.health = PLAYER.maxHealth;
    this.mana = PLAYER.maxMana;
    this.x = PLAYER.startX;
    this.y = 1;
    this.falling = true;
  }

  /**
   * It checks if player has died. 
   */
  this.checkDeath = function () {
    if (this.health <= 0) {
      this.game.enemies = [];
      this.game.bossBattle = false;
      this.resetPlayer();
      this.removeHalfItems();
      this.world.resetCamera();
      stopSound('boss_battle');

    }
  }

  /**
   * It checks what accessory the player is wearing and its benefits. 
   */
  this.checkAccessory = function () {
    this.totalJumps = ACCESSORY_JUMPS[this.accessory];
  }
}