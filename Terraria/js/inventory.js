/**
 * It creates the player inventory object.
 * 
 * @param {player_object} player It holds the player object. 
 */
function Inventory(player) {
  this.ctx = player.ctx;
  this.world = player.world;
  this.player = player;
  this.mouseX = 0;
  this.mouseY = 0;
  this.craftingSelected = -1;

  /**
   * It draws the inventory item image.
   * 
   * @param {string} type It holds the type of item. 
   * @param {number} x It holds the horizontal position of item. 
   * @param {number} y It holds the vertical position of item. 
   * @param {boolean} textFlag It checks if text if to be written on item.
   */
  this.drawTile = function (type, x, y, textFlag) {
    if (player.items[type] > 0) {
      this.ctx.drawImage(INV_IMAGES[type], x + INVENTORY.padding, y + INVENTORY.padding, INVENTORY.itemSize,
        INVENTORY.itemSize);


      if (player.items[type] > 0 && textFlag) {
        this.ctx.font = '10px Arial';
        this.ctx.fillText(player.items[type], x + INVENTORY.textPaddingX, y + INVENTORY.textPaddingY);
      }
    }
  }

  /**
   * It creates items if player has required materials
   */
  this.craftItem = function () {
    if (this.craftingSelected != -1) {
      var item = CRAFT_ITEM[this.craftingSelected];
      var materials = CRAFTING_MATERIAL[this.craftingSelected];

      for (var i = 0; i < materials.length; i++) {
        if (!this.player.items[materials[i][0]] || this.player.items[materials[i][0]] < materials[i][1]) {
          return;
        }
      }
      if (item in this.player.items) {
        this.player.items[item] += 1;
      } else {
        this.player.items[item] = 1;
        this.player.itemsName.push(item);
      }

      for (var i = 0; i < materials.length; i++) {
        this.player.items[materials[i][0]] -= materials[i][1];
      }
    }
  }

  /**
   * It finds the max length of string from given array of strings.
   * 
   * @param {array} arr It holds the strings. 
   */
  this.findMaxStringLength = function (arr) {
    var maxLength = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > maxLength) {
        maxLength = arr[i].length;
      }
    }
    return maxLength;
  }

  /**
   * It creates the background for item details text.
   * 
   * @param {array} arr It holds the item detail strings. 
   */
  this.drawDetailBackground = function (arr) {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(-this.world.translated + this.mouseX + INVENTORY.detailsPad, this.mouseY - INVENTORY.detailsPad,
      INVENTORY.detailsBoxWidth * this.findMaxStringLength(arr), INVENTORY.detailsBoxHeight * arr.length);
    this.ctx.fillStyle = 'white';

  }

  /**
   * It displays the details of given item.
   * 
   * @param {string} item It holds the value of what item is being hovered on. 
   */
  this.displayInventoryItemDetails = function (item) {
    if (item in ITEM_DETAILS && player.items[item]) {
      var itemDetail = ITEM_DETAILS[item];
      this.drawDetailBackground(itemDetail);
      for (var i = 0; i < itemDetail.length; i++) {
        this.ctx.fillText(itemDetail[i], -this.world.translated + this.mouseX + INVENTORY.detailsPad,
          this.mouseY + INVENTORY.detailsPad * i);
      }
    }
  }

  /**
   * It displays the details of crafting item.
   * 
   * @param {string} item It holds the value of what item is being hovered on. 
   */
  this.displayCraftingItemDetails = function () {
    if (CRAFT.x < this.mouseX && this.mouseX < CRAFT.endX &&
      CRAFT.y < this.mouseY && this.mouseY < CRAFT.endY) {
      var i = Math.floor((this.mouseX - CRAFT.x) / INVENTORY.containerSize);
      var j = Math.floor((this.mouseY - CRAFT.y) / INVENTORY.containerSize);
      var craftItem = CRAFT_ITEM[j * INVENTORY.rowSize + i];
      if (craftItem in ITEM_DETAILS) {
        var itemDetail = ITEM_DETAILS[craftItem];
        this.drawDetailBackground(itemDetail);
        for (var i = 0; i < itemDetail.length; i++) {
          this.ctx.fillText(itemDetail[i], -this.world.translated + this.mouseX + INVENTORY.detailsPad,
            this.mouseY + INVENTORY.detailsPad * i);
        }
      }
    }
  }

  /**
   * It displays the details of crafting materials.
   * 
   * @param {string} item It holds the value of what item is being hovered on. 
   */
  this.displayCraftMaterialDetails = function () {
    var material;
    if (this.craftingSelected != -1) {
      if (CRAFT_MATS.mat1X < this.mouseX && this.mouseX < CRAFT_MATS.mat1X + INVENTORY.containerSize &&
        CRAFT_MATS.matY < this.mouseY && this.mouseY < CRAFT_MATS.matY + INVENTORY.containerSize) {
        material = CRAFTING_MATERIAL[this.craftingSelected][0][0];
      } else if (CRAFT_MATS.mat2X < this.mouseX && this.mouseX < CRAFT_MATS.mat2X + INVENTORY.containerSize &&
        CRAFT_MATS.matY < this.mouseY && this.mouseY < CRAFT_MATS.matY + INVENTORY.containerSize &&
        CRAFTING_MATERIAL[this.craftingSelected].length == 2) {
        material = CRAFTING_MATERIAL[this.craftingSelected][1][0];
      }
      if (material) {
        var itemDetail = ITEM_DETAILS[material];
        this.drawDetailBackground(itemDetail);
        for (var i = 0; i < itemDetail.length; i++) {
          this.ctx.fillText(itemDetail[i], -this.world.translated + this.mouseX + INVENTORY.detailsPad,
            this.mouseY + INVENTORY.detailsPad * i);
        }
      }
    }
  }

  /**
   * It displays the details of given item.
   */
  this.displayItemDetails = function () {
    var i = Math.floor((this.mouseX - INVENTORY.x) / INVENTORY.containerSize);
    var j = Math.floor((this.mouseY - INVENTORY.y) / INVENTORY.containerSize);
    this.ctx.font = '20px Arial';
    var item = this.player.itemsName[i + INVENTORY.rowSize * j];
    this.displayInventoryItemDetails(item);
    this.displayCraftingItemDetails();
    this.displayCraftMaterialDetails();
  }

  /**
   * It displays crafting materials based on the crafting item selected.
   * 
   * @param {number} playerX It holds the horizontal position of player.
   */
  this.displayCraftMaterials = function (playerX) {
    if (this.craftingSelected != -1) {
      var materials = CRAFTING_MATERIAL[this.craftingSelected];
      for (var i = 0; i < materials.length; i++) {
        if (this.player.items[materials[i][0]] == undefined || this.player.items[materials[i][0]] < materials[i][1]) {
          this.ctx.drawImage(INV_NOT_ENOUGH, playerX + CRAFT_MAT_CONTAINER.x + i * INVENTORY.containerSize, CRAFT_MAT_CONTAINER.y, INVENTORY.containerSize, INVENTORY.containerSize);
        } else {
          this.ctx.drawImage(INV_SELECTED, playerX + CRAFT_MAT_CONTAINER.x + i * INVENTORY.containerSize, CRAFT_MAT_CONTAINER.y, INVENTORY.containerSize, INVENTORY.containerSize);
        }
        this.ctx.drawImage(INV_IMAGES[materials[i][0]], playerX + CRAFT_MAT_CONTAINER.x + INVENTORY.padding + INVENTORY.containerSize * i,
          CRAFT_MAT_CONTAINER.y + INVENTORY.padding, INVENTORY.itemSize,
          INVENTORY.itemSize);

        this.ctx.fillText(materials[i][1], playerX + CRAFT_MAT_CONTAINER.x + INVENTORY.textPaddingX + INVENTORY.containerSize * i,
          CRAFT_MAT_CONTAINER.y + INVENTORY.textPaddingY);
      }
    }
  }

  /**
   * It displays crafting table.
   * 
   * @param {number} playerX It holds the horizontal position of player.
   */
  this.displayCrafting = function (playerX) {
    for (var i = 0; i < CRAFT.colSize; i++) {
      for (var j = 0; j < CRAFT.rowSize; j++) {
        if (this.craftingSelected == i * INVENTORY.rowSize + j) {
          this.ctx.drawImage(INV_SELECTED, playerX + INVENTORY.shift + INVENTORY.containerSize * j, CRAFT.y + INVENTORY.containerSize * i,
            INVENTORY.containerSize, INVENTORY.containerSize);
        } else {
          this.ctx.drawImage(INV_CONTAINER, playerX + INVENTORY.shift + INVENTORY.containerSize * j, CRAFT.y + INVENTORY.containerSize * i,
            INVENTORY.containerSize, INVENTORY.containerSize);
        }

        this.ctx.drawImage(INV_IMAGES[CRAFT_ITEM[i * INVENTORY.rowSize + j]],
          playerX + INVENTORY.shift + INVENTORY.padding + INVENTORY.containerSize * j,
          CRAFT.y + INVENTORY.padding + INVENTORY.containerSize * i, INVENTORY.itemSize,
          INVENTORY.itemSize);

      }
    }

    this.ctx.drawImage(INV_CONTAINER, playerX + 220, 350, INVENTORY.containerSize, INVENTORY.containerSize);
    this.ctx.drawImage(INV_CONTAINER, playerX + 250, 350, INVENTORY.containerSize, INVENTORY.containerSize);
    this.ctx.drawImage(CRAFT_BTN, playerX + 230, 390, INVENTORY.containerSize, INVENTORY.containerSize);
    this.displayCraftMaterials(playerX);
  }

  /**
   * It displays armor equipped by player.
   * 
   * @param {number} playerX It holds the horizontal position of player.
   */
  this.displayArmor = function (playerX) {
    for (var i = 0; i < ARMOR_CONTAINER.num; i++) {
      this.ctx.drawImage(INV_CONTAINER, playerX + ARMOR_CONTAINER.containerX, ARMOR_CONTAINER.containerY + ARMOR_CONTAINER.marginY * i,
        INVENTORY.containerSize, INVENTORY.containerSize);
    }

    if (this.player.helm == undefined) {
      this.ctx.drawImage(UNEQUIPPED_IMG['head'], UNEQUIP.sprite[0][0], UNEQUIP.sprite[0][1], UNEQUIP.sprite[0][2], UNEQUIP.sprite[0][3],
        playerX + ARMOR_CONTAINER.containerX + (INVENTORY.containerSize - UNEQUIP.sprite[0][2]) / 2,
        ARMOR_CONTAINER.containerY + (INVENTORY.containerSize - UNEQUIP.sprite[0][3]) / 2,
        UNEQUIP.sprite[0][2], UNEQUIP.sprite[0][3]);
    } else {
      this.ctx.drawImage(INV_IMAGES[this.player.helm], playerX + ARMOR_CONTAINER.containerX + INVENTORY.padding,
        ARMOR_CONTAINER.containerY + INVENTORY.padding, INVENTORY.itemSize, INVENTORY.itemSize);

    }

    if (this.player.chest == undefined) {
      this.ctx.drawImage(UNEQUIPPED_IMG['chest'], UNEQUIP.sprite[1][0], UNEQUIP.sprite[1][1], UNEQUIP.sprite[1][2], UNEQUIP.sprite[1][3],
        playerX + ARMOR_CONTAINER.containerX + (INVENTORY.containerSize - UNEQUIP.sprite[1][2]) / 2,
        ARMOR_CONTAINER.containerY + ARMOR_CONTAINER.marginY + (INVENTORY.containerSize - UNEQUIP.sprite[1][3]) / 2,
        UNEQUIP.sprite[1][2], UNEQUIP.sprite[1][3]);
    } else {
      this.ctx.drawImage(INV_IMAGES[this.player.chest], playerX + ARMOR_CONTAINER.containerX + INVENTORY.padding,
        ARMOR_CONTAINER.containerY + ARMOR_CONTAINER.marginY + INVENTORY.padding, INVENTORY.itemSize,
        INVENTORY.itemSize);

    }

    if (this.player.boot == undefined) {
      this.ctx.drawImage(UNEQUIPPED_IMG['boot'], UNEQUIP.sprite[2][0], UNEQUIP.sprite[2][1], UNEQUIP.sprite[2][2], UNEQUIP.sprite[2][3],
        playerX + ARMOR_CONTAINER.containerX + (INVENTORY.containerSize - UNEQUIP.sprite[2][2]) / 2,
        ARMOR_CONTAINER.containerY + ARMOR_CONTAINER.marginY * 2 + (INVENTORY.containerSize - UNEQUIP.sprite[2][3]) / 2,
        UNEQUIP.sprite[2][2], UNEQUIP.sprite[2][3]);
    } else {
      this.ctx.drawImage(INV_IMAGES[this.player.boot], playerX + ARMOR_CONTAINER.containerX + INVENTORY.padding,
        ARMOR_CONTAINER.containerY + ARMOR_CONTAINER.marginY * 2 + INVENTORY.padding, INVENTORY.itemSize,
        INVENTORY.itemSize);

    }

    this.ctx.drawImage(SHIELD.img, playerX + SHIELD.x, SHIELD.y, SHIELD.width, SHIELD.height);
    this.ctx.font = '12px Arial';
    if (this.player.armor.toString().length == 1) {
      this.ctx.fillText(this.player.armor, playerX + SHIELD.txt1X, SHIELD.txtY);
    } else {
      this.ctx.fillText(this.player.armor, playerX + SHIELD.txt2X, SHIELD.txtY);
    }
  }

  /**
   * It displays weapon equipped by player.
   * 
   * @param {number} playerX It holds the horizontal position of player.
   */
  this.displayWeapon = function (playerX) {
    this.ctx.drawImage(INV_CONTAINER, playerX + EQUIPPED.weapon.x, EQUIPPED.weapon.y, INVENTORY.containerSize, INVENTORY.containerSize);
    if (this.player.weapon != undefined) {
      this.drawTile(this.player.weapon, playerX + EQUIPPED.weapon.x, EQUIPPED.weapon.y, false);
    }
  }

  /**
   * It displays accessory equipped by player.
   * 
   * @param {number} playerX It holds the horizontal position of player.
   */
  this.displayAccessory = function (playerX) {
    this.ctx.drawImage(INV_CONTAINER, playerX + EQUIPPED.accessory.x, EQUIPPED.accessory.y, INVENTORY.containerSize, INVENTORY.containerSize);
    if (this.player.accessory != undefined) {
      this.drawTile(this.player.accessory, playerX + EQUIPPED.accessory.x, EQUIPPED.accessory.y, false);
    }
  }

  /**
   * It displays inventory items.
   * 
   * @param {number} playerX It holds the horizontal position of player.
   */
  this.displayInventoryItems = function (playerX) {
    for (var i = 0; i < INVENTORY.rowSize; i++) {
      for (var j = 0; j < INVENTORY.colSize; j++) {
        this.ctx.drawImage(INV_CONTAINER, playerX + INVENTORY.shift + INVENTORY.containerSize * j, INVENTORY.y + INVENTORY.containerSize * i, INVENTORY.containerSize, INVENTORY.containerSize);
        if (this.player.itemsName.length > i * INVENTORY.rowSize + j) {
          this.drawTile(this.player.itemsName[i * INVENTORY.rowSize + j], playerX + INVENTORY.shift + INVENTORY.containerSize * j, INVENTORY.y + INVENTORY.containerSize * i, true);
        }
      }
    }
  }

  /**
   * It displays the inventory.
   */
  this.display = function () {
    var playerX = this.player.x * TILE.size - INVENTORY.displayShift;
    if (this.player.x < MIN_DISPLAY_POS) {
      playerX = MIN_DISPLAY_POS * TILE.size - INVENTORY.displayShift;
    } else if (this.player.x > MAX_DISPLAY_POS) {
      playerX = MAX_DISPLAY_POS * TILE.size - INVENTORY.displayShift;
    }
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Inventory', playerX + INVENTORY.text.inv.x, INVENTORY.text.inv.y);
    this.ctx.fillText('Crafting Menu', playerX + INVENTORY.text.craft.x, INVENTORY.text.craft.y);
    this.ctx.fillText('Equipped', playerX + INVENTORY.text.equipped.x, INVENTORY.text.equipped.y);


    this.displayInventoryItems(playerX);
    this.displayCrafting(playerX);
    this.displayArmor(playerX);
    this.displayWeapon(playerX);
    this.displayAccessory(playerX);
    this.displayItemDetails();
  }

  /**
   * It equips items on the player.
   * 
   * @param {number} x It holds horizontal mouse click position. 
   * @param {number} y It holds vertical mouse click position.
   * @param {string} item It holds the type of item clicked.
   */
  this.itemEquip = function (x, y, item) {
    if (INVENTORY.x <= x && x <= INVENTORY.endX &&
      INVENTORY.y <= y && y <= INVENTORY.endY &&
      player.items[item]) {
      if (WEAPON.placeWeapons.includes(item) || WEAPON.attackWeapons.includes(item)) {
        this.player.weapon = item;
        this.player.checkPower();
      } else if (item == 'gold_helm' || item == 'silver_helm') {
        this.player.helm = item;
        this.player.checkArmor();
      } else if (item == 'gold_chest' || item == 'silver_chest') {
        this.player.chest = item;
        this.player.checkArmor();
      } else if (item == 'gold_boot' || item == 'silver_boot') {
        this.player.boot = item;
        this.player.checkArmor();
      } else if (item == 'cloud' || item == 'rocket') {
        this.player.accessory = item;
        this.player.checkAccessory();
      }
    }
  }

  /**
   * It unequips items from player.
   * 
   * @param {number} x It holds horizontal mouse click position.
   * @param {number} y It holds vertical mouse click poistion.
   */
  this.itemUnequip = function (x, y) {
    if (UNEQUIP.weapon.x < x && x < UNEQUIP.weapon.endX &&
      UNEQUIP.weapon.y < y && y < UNEQUIP.weapon.endY) {
      this.player.weapon = undefined;
      this.player.checkPower();
    }

    if (UNEQUIP.accessory.x < x && x < UNEQUIP.accessory.endX && UNEQUIP.accessory.y < y && y < UNEQUIP.accessory.endY) {
      this.player.accessory = undefined;
      this.player.checkAccessory();
    }

    if (UNEQUIP.helm.x < x && x < UNEQUIP.helm.endX && UNEQUIP.helm.y < y && y < UNEQUIP.helm.endY) {
      this.player.helm = undefined;
      this.player.checkArmor();
    }

    if (UNEQUIP.chest.x < x && x < UNEQUIP.chest.endX && UNEQUIP.chest.y < y && y < UNEQUIP.chest.endY) {
      this.player.chest = undefined;
      this.player.checkArmor();
    }

    if (UNEQUIP.boot.x < x && x < UNEQUIP.boot.endX && UNEQUIP.boot.y < y && y < UNEQUIP.boot.endY) {
      this.player.boot = undefined;
      this.player.checkArmor();
    }

  }

  /**
   * It performs equip, unequip and craft functions.
   * 
   * @param {number} x It holds horizontal mouse click position.
   * @param {number} y It holds vertical mouse click poistion.
   */
  this.clicked = function (x, y) {
    var i = Math.floor((x - INVENTORY.x) / INVENTORY.containerSize);
    var j = Math.floor((y - INVENTORY.y) / INVENTORY.containerSize);
    var item = this.player.itemsName[i + INVENTORY.rowSize * j];

    this.itemEquip(x, y, item);
    this.itemUnequip(x, y);

    if (CRAFT.x < x && x < CRAFT.endX && CRAFT.y < y && y < CRAFT.endY) {
      var j = Math.floor((y - CRAFT.y) / INVENTORY.containerSize);
      this.craftingSelected = j * CRAFT.rowSize + i;
    }

    if (CRAFT.craftBtn.x < x && x < CRAFT.craftBtn.endX &&
      CRAFT.craftBtn.y < y && y < CRAFT.craftBtn.endY) {
      this.craftItem();
    }
  }
}