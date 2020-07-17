function Inventory(player, world) {
  this.world = world;
  this.player = player;
  this.mouseX = 0;
  this.mouseY = 0;
  this.craftingSelected = -1;

  this.drawTile = function (ctx, type, x, y, textFlag) {
    if (player.items[type] > 0) {
      ctx.drawImage(INV_IMAGES[type], x + 5, y + 5, 20, 20)

      if (player.items[type] > 0 && textFlag) {
        ctx.font = '10px Arial';
        ctx.fillText(player.items[type], x + 2, y + 10);
      }
    }
  }

  this.craftItem = function () {
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

  this.displayInventoryItemDetails = function (ctx, item) {
    if (item in ITEM_DETAILS) {
      var itemDetail = ITEM_DETAILS[item];
      for (var i = 0; i < itemDetail.length; i++) {
        ctx.fillText(itemDetail[i], -this.world.translated + this.mouseX + 20, this.mouseY + 10 + 20 * i);
      }
    }
  }

  this.displayCraftingItemDetails = function (ctx) {
    if (200 < this.mouseX && this.mouseX < 350 && 350 < this.mouseY && this.mouseY < 440) {
      var i = Math.floor((this.mouseX - 200) / INV_CONTAINER_SIZE);
      var j = Math.floor((this.mouseY - 350) / INV_CONTAINER_SIZE);
      var craftItem = CRAFT_ITEM[j * 5 + i];
      if (craftItem in ITEM_DETAILS) {
        var itemDetail = ITEM_DETAILS[craftItem];
        for (var i = 0; i < itemDetail.length; i++) {
          ctx.fillText(itemDetail[i], -this.world.translated + this.mouseX + 20, this.mouseY + 10 + 20 * i);
        }
      }
    }
  }

  this.displayCraftMaterialDetails = function (ctx) {
    var material;
    if (this.craftingSelected != -1) {
      if (370 < this.mouseX && this.mouseX < 400 && 350 < this.mouseY && this.mouseY < 380) {
        material = CRAFTING_MATERIAL[this.craftingSelected][0][0];
      } else if (400 < this.mouseX && this.mouseX < 430 &&
        350 < this.mouseY && this.mouseY < 380 &&
        CRAFTING_MATERIAL[this.craftingSelected].length == 2) {
        material = CRAFTING_MATERIAL[this.craftingSelected][1][0];
      }
      if (material) {
        var itemDetail = ITEM_DETAILS[material];
        for (var i = 0; i < itemDetail.length; i++) {
          ctx.fillText(itemDetail[i], -this.world.translated + this.mouseX + 20, this.mouseY + 10 + 20 * i);
        }
      }
    }
  }

  this.displayItemDetails = function (ctx) {
    var i = Math.floor((this.mouseX - 200) / INV_CONTAINER_SIZE);
    var j = Math.floor((this.mouseY - 150) / INV_CONTAINER_SIZE);
    ctx.font = '20px Arial';
    var item = this.player.itemsName[i + 5 * j];
    this.displayInventoryItemDetails(ctx, item);
    this.displayCraftingItemDetails(ctx);
    this.displayCraftMaterialDetails(ctx);
  }

  this.displayCraftMaterials = function (ctx, playerX) {
    if (this.craftingSelected != -1) {
      var materials = CRAFTING_MATERIAL[this.craftingSelected];
      for (var i = 0; i < materials.length; i++) {
        ctx.drawImage(INV_IMAGES[materials[i][0]], playerX + 225 + INV_CONTAINER_SIZE * i, 355, 20, 20);
        ctx.fillText(materials[i][1], playerX + 222 + INV_CONTAINER_SIZE * i, 360);
      }
    }
  }

  this.displayCrafting = function (ctx, playerX) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 5; j++) {
        if (this.craftingSelected == i * 5 + j) {
          ctx.drawImage(INV_SELECTED, playerX + 50 + INV_CONTAINER_SIZE * j, 350 + INV_CONTAINER_SIZE * i, INV_CONTAINER_SIZE, INV_CONTAINER_SIZE);
        } else {
          ctx.drawImage(INV_CONTAINER, playerX + 50 + INV_CONTAINER_SIZE * j, 350 + INV_CONTAINER_SIZE * i, INV_CONTAINER_SIZE, INV_CONTAINER_SIZE);
        }

        ctx.drawImage(INV_IMAGES[CRAFT_ITEM[i * 5 + j]], playerX + 55 + INV_CONTAINER_SIZE * j, 355 + INV_CONTAINER_SIZE * i, 20, 20);
      }
    }

    ctx.drawImage(INV_CONTAINER, playerX + 220, 350, INV_CONTAINER_SIZE, INV_CONTAINER_SIZE);
    ctx.drawImage(INV_CONTAINER, playerX + 250, 350, INV_CONTAINER_SIZE, INV_CONTAINER_SIZE);
    ctx.drawImage(CRAFT_BTN, playerX + 230, 390, INV_CONTAINER_SIZE, INV_CONTAINER_SIZE);
    this.displayCraftMaterials(ctx, playerX);
  }

  this.displayArmor = function (ctx, playerX) {
    for (var i = 0; i < 3; i++) {
      ctx.drawImage(INV_CONTAINER, playerX + 550, 250 + 40 * i, INV_CONTAINER_SIZE, INV_CONTAINER_SIZE);
    }

    if (this.player.helm == undefined) {
      ctx.drawImage(UNEQUIPPED_IMG['head'], UNEQP_SPRITE[0][0], UNEQP_SPRITE[0][1], UNEQP_SPRITE[0][2], UNEQP_SPRITE[0][3],
        playerX + 550 + (30 - UNEQP_SPRITE[0][2]) / 2, 250 + (30 - UNEQP_SPRITE[0][3]) / 2, UNEQP_SPRITE[0][2], UNEQP_SPRITE[0][3]);
    } else {
      ctx.drawImage(INV_IMAGES[this.player.helm], playerX + 555, 255, 20, 20)
    }

    if (this.player.chest == undefined) {
      ctx.drawImage(UNEQUIPPED_IMG['chest'], UNEQP_SPRITE[1][0], UNEQP_SPRITE[1][1], UNEQP_SPRITE[1][2], UNEQP_SPRITE[1][3],
        playerX + 550 + (30 - UNEQP_SPRITE[1][2]) / 2, 290 + (30 - UNEQP_SPRITE[1][3]) / 2, UNEQP_SPRITE[1][2], UNEQP_SPRITE[1][3]);
    } else {
      ctx.drawImage(INV_IMAGES[this.player.chest], playerX + 555, 295, 20, 20)
    }

    if (this.player.boot == undefined) {
      ctx.drawImage(UNEQUIPPED_IMG['boot'], UNEQP_SPRITE[2][0], UNEQP_SPRITE[2][1], UNEQP_SPRITE[2][2], UNEQP_SPRITE[2][3],
        playerX + 550 + (30 - UNEQP_SPRITE[2][2]) / 2, 330 + (30 - UNEQP_SPRITE[2][3]) / 2, UNEQP_SPRITE[2][2], UNEQP_SPRITE[2][3]);
    } else {
      ctx.drawImage(INV_IMAGES[this.player.boot], playerX + 555, 335, 20, 20)
    }

    ctx.drawImage(SHIELD, playerX + 550, 400, 32, 26);
    if (this.player.armor.toString().length == 1) {
      ctx.fillText(this.player.armor, playerX + 562, 417);
    } else {
      ctx.fillText(this.player.armor, playerX + 559, 417);
    }
  }

  this.displayWeapon = function (ctx, playerX) {
    ctx.drawImage(INV_CONTAINER, playerX + 510, 290, 30, 30);
    if (this.player.weapon != undefined) {
      this.drawTile(ctx, this.player.weapon, playerX + 510, 290, false);
    }
  }

  this.displayAccessory = function (ctx, playerX) {
    ctx.drawImage(INV_CONTAINER, playerX + 510, 330, 30, 30);
    if (this.player.accessory != undefined) {
      this.drawTile(ctx, this.player.accessory, playerX + 510, 330, false);
    }
  }

  this.displayInventoryItems = function (ctx, playerX) {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        ctx.drawImage(INV_CONTAINER, playerX + 50 + 30 * j, 150 + 30 * i, 30, 30);
        if (this.player.itemsName.length > i * 5 + j) {
          this.drawTile(ctx, this.player.itemsName[i * 5 + j], playerX + 50 + 30 * j, 150 + 30 * i, true);
        }
      }
    }
  }

  this.display = function (ctx) {
    var playerX = this.player.x * TILE_SIZE - 250
    if (this.player.x < 25) {
      playerX = 25 * TILE_SIZE - 250;
    } else if (this.player.x > 128) {
      playerX = 128 * TILE_SIZE - 250;
    }

    ctx.font = '20px Arial';
    ctx.fillText('Inventory', playerX + 50, 140);
    ctx.fillText('Crafting Menu', playerX + 50, 340);
    ctx.fillText('Equipped', playerX + 500, 240);


    this.displayInventoryItems(ctx, playerX);
    this.displayCrafting(ctx, playerX);
    this.displayArmor(ctx, playerX);
    this.displayWeapon(ctx, playerX);
    this.displayAccessory(ctx, playerX);
    this.displayItemDetails(ctx);
  }

  this.itemEquip = function (x, y, item) {
    if (200 <= x && x <= 350 && 150 <= y && y <= 300) {
      if (PLACE_WEAPONS.includes(item) || ATTACK_WEAPONS.includes(item)) {
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

  this.itemUnequip = function (x, y) {
    if (660 < x && x < 690 && 290 < y && y < 320) {
      this.player.weapon = undefined;
      this.player.checkPower();
    }

    if (660 < x && x < 690 && 330 < y && y < 370) {
      this.player.accessory = undefined;
      this.player.checkAccessory();
    }

    if (700 < x && x < 730 && 250 < y && y < 280) {
      this.player.helm = undefined;
      this.player.checkArmor();
    }

    if (700 < x && x < 730 && 290 < y && y < 320) {
      this.player.chest = undefined;
      this.player.checkArmor();
    }

    if (700 < x && x < 730 && 330 < y && y < 360) {
      this.player.boot = undefined;
      this.player.checkArmor();
    }

  }

  this.clicked = function (x, y) {
    var i = Math.floor((x - 200) / INV_CONTAINER_SIZE);
    var j = Math.floor((y - 150) / INV_CONTAINER_SIZE);
    var item = this.player.itemsName[i + 5 * j];

    this.itemEquip(x, y, item);
    this.itemUnequip(x, y);

    if (200 < x && x < 350 && 350 < y && y < 440) {
      var j = Math.floor((y - 350) / INV_CONTAINER_SIZE);
      this.craftingSelected = j * 5 + i;
    }

    if (380 < x && x < 410 && 390 < y && y < 420) {
      this.craftItem();
    }
  }
}