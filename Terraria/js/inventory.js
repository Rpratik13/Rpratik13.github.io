function Inventory(player, world) {
  this.world = world;
  this.player = player;
  this.mouseX = 0;
  this.mouseY = 0;
  this.invContainer = new Image;
  this.invContainer.src = 'images/inv.png';
  this.unequipped = [new Image, new Image, new Image, new Image];
  this.unequipped[0].src = 'images/player_head.png';
  this.unequipped[1].src = 'images/player_shirt.png';
  this.unequipped[2].src = 'images/player_pant.png';
  this.unequippedPos = [[12, 12, 18, 18], [8, 24, 24, 20], [12, 42, 18, 12]];
  this.dirt = new Image;
  this.dirt.src = 'images/dirt_drop.png';
  this.wood = new Image;
  this.wood.src = 'images/wood_drop.png';
  this.gold = new Image;
  this.gold.src = 'images/gold_drop.png';
  this.silver = new Image;
  this.silver.src = 'images/silver_drop.png';
  this.sword = new Image;
  this.sword.src = 'images/sword.png';
  this.fireSword = new Image;
  this.fireSword.src = 'images/fire_sword.png';
  this.craft = [];
  this.craftBtn = new Image;
  this.craftBtn.src = 'images/craft_btn.png';
  this.craftingSelected = -1;
  this.shield = new Image;
  this.shield.src = 'images/shield.png';
  this.gel = new Image;
  this.gel.src = 'images/gel.png';
  this.zombieDrop = new Image;
  this.zombieDrop.src = 'images/zombie_drop.png';
  this.lens = new Image;
  this.lens.src = 'images/lens.png';
  this.cloud = new Image;
  this.cloud.src = 'images/cloud.png';
  this.rocket = new Image;
  this.rocket.src = 'images/rocket.png';

  for (var i = 0; i < 14; i++) {
    this.craft.push(new Image);
    this.craft[i].src = 'images/craft' + i + '.png';
  }


  this.drawTile = function (ctx, type, x, y, textFlag) {
    if (type == 'sword' && player.items['sword'] > 0) {
      ctx.drawImage(this.sword, x + 5, y + 5, 20, 20)
    } else if (type == 'dirt' && player.items['dirt'] > 0) {
      ctx.drawImage(this.dirt, x + 9, y + 9, 12, 12);
    } else if (type == 'wood' && player.items['wood'] > 0) {
      ctx.drawImage(this.wood, x + 9, y + 9, 12, 12);
    } else if (type == 'gold' && player.items['gold'] > 0) {
      ctx.drawImage(this.gold, x + 9, y + 9, 12, 12);
    } else if (type == 'silver' && player.items['silver'] > 0) {
      ctx.drawImage(this.silver, x + 9, y + 9, 12, 12);
    } else if (type == 'silver_bar' && player.items['silver_bar'] > 0) {
      ctx.drawImage(this.craft[13], x + 5, y + 5, 20, 20);
    } else if (type == 'gold_bar' && player.items['gold_bar'] > 0) {
      ctx.drawImage(this.craft[12], x + 5, y + 5, 20, 20);
    } else if (type == 'silver_sword' && player.items['silver_sword'] > 0) {
      ctx.drawImage(this.craft[0], x + 5, y + 5, 20, 20);
    } else if (type == 'silver_pick' && player.items['silver_pick'] > 0) {
      ctx.drawImage(this.craft[1], x + 5, y + 5, 20, 20);
    } else if (type == 'silver_axe' && player.items['silver_axe'] > 0) {
      ctx.drawImage(this.craft[2], x + 5, y + 5, 20, 20);
    } else if (type == 'silver_helm' && player.items['silver_helm'] > 0) {
      ctx.drawImage(this.craft[3], x + 5, y + 5, 20, 20);
    } else if (type == 'silver_chest' && player.items['silver_chest'] > 0) {
      ctx.drawImage(this.craft[4], x + 5, y + 5, 20, 20);
    } else if (type == 'silver_boot' && player.items['silver_boot'] > 0) {
      ctx.drawImage(this.craft[5], x + 5, y + 5, 20, 20);
    } else if (type == 'gold_sword' && player.items['gold_sword'] > 0) {
      ctx.drawImage(this.craft[6], x + 5, y + 5, 20, 20);
    } else if (type == 'gold_pick' && player.items['gold_pick'] > 0) {
      ctx.drawImage(this.craft[7], x + 5, y + 5, 20, 20);
    } else if (type == 'gold_axe' && player.items['gold_axe'] > 0) {
      ctx.drawImage(this.craft[8], x + 5, y + 5, 20, 20);
    } else if (type == 'gold_helm' && player.items['gold_helm'] > 0) {
      ctx.drawImage(this.craft[9], x + 5, y + 5, 20, 20);
    } else if (type == 'gold_chest' && player.items['gold_chest'] > 0) {
      ctx.drawImage(this.craft[10], x + 5, y + 5, 20, 20);
    } else if (type == 'gold_boot' && player.items['gold_boot'] > 0) {
      ctx.drawImage(this.craft[11], x + 5, y + 5, 20, 20);
    } else if (type == 'gel' && player.items['gel'] > 0) {
      ctx.drawImage(this.gel, x + 5, y + 5, 20, 20);
    } else if (type == 'zombie_drop' && player.items['zombie_drop'] > 0) {
      ctx.drawImage(this.zombieDrop, x + 5, y + 5, 20, 20);
    } else if (type == 'lens' && player.items['lens'] > 0) {
      ctx.drawImage(this.lens, x + 5, y + 5, 20, 20);
    } else if (type == 'fire_sword' && player.items['fire_sword'] > 0) {
      ctx.drawImage(this.fireSword, x + 5, y + 5, 20, 20);
    } else if (type == 'cloud' && player.items['cloud'] > 0) {
      ctx.drawImage(this.cloud, x + 5, y + 5, 20, 20);
    } else if (type == 'rocket' && player.items['rocket'] > 0) {
      ctx.drawImage(this.rocket, x + 5, y + 5, 20, 20);
    }

    if (player.items[type] > 0 && textFlag) {
      ctx.font = '10px Arial';
      ctx.fillText(player.items[type], x + 2, y + 10);
    }
  }


  this.craftItem = function () {
    if (this.craftingSelected == 0) {
      if (this.player.items['silver_bar'] > 2) {
        if ('silver_sword' in this.player.items) {
          this.player.items['silver_sword'] += 1;
        } else {
          this.player.items['silver_sword'] = 1;
          this.player.itemsName.push('silver_sword');
        }
        this.player.items['silver_bar'] -= 3;
      }
    } else if (this.craftingSelected == 1) {
      if (this.player.items['silver_bar'] > 1 && this.player.items['wood'] > 1) {
        if ('silver_pick' in this.player.items) {
          this.player.items['silver_pick'] += 1;
        } else {
          this.player.items['silver_pick'] = 1;
          this.player.itemsName.push('silver_pick');
        }
        this.player.items['silver_bar'] -= 2;
        this.player.items['wood'] -= 2;
      }
    } else if (this.craftingSelected == 2) {
      if (this.player.items['silver_bar'] > 1 && this.player.items['wood'] > 1) {
        if ('silver_axe' in this.player.items) {
          this.player.items['silver_axe'] += 1;
        } else {
          this.player.items['silver_axe'] = 1;
          this.player.itemsName.push('silver_axe');
        }
        this.player.items['silver_bar'] -= 2;
        this.player.items['wood'] -= 2;
      }
    } else if (this.craftingSelected == 3) {
      if (this.player.items['silver_bar'] > 3) {
        if ('silver_helm' in this.player.items) {
          this.player.items['silver_helm'] += 1;
        } else {
          this.player.items['silver_helm'] = 1;
          this.player.itemsName.push('silver_helm');
        }
        this.player.items['silver_bar'] -= 4;
      }
    } else if (this.craftingSelected == 4) {
      if (this.player.items['silver_bar'] > 3) {
        if ('silver_chest' in this.player.items) {
          this.player.items['silver_chest'] += 1;
        } else {
          this.player.items['silver_chest'] = 1;
          this.player.itemsName.push('silver_chest');
        }
        this.player.items['silver_bar'] -= 4;
      }
    } else if (this.craftingSelected == 5) {
      if (this.player.items['silver_bar'] > 3) {
        if ('silver_boot' in this.player.items) {
          this.player.items['silver_boot'] += 1;
        } else {
          this.player.items['silver_boot'] = 1;
          this.player.itemsName.push('silver_boot');
        }
        this.player.items['silver_bar'] -= 4;
      }
    } else if (this.craftingSelected == 6) {
      if (this.player.items['gold_bar'] > 1) {
        if ('gold_sword' in this.player.items) {
          this.player.items['gold_sword'] += 1;
        } else {
          this.player.items['gold_sword'] = 1;
          this.player.itemsName.push('gold_sword');
        }
        this.player.items['gold_bar'] -= 2;
      }
    } else if (this.craftingSelected == 7) {
      if (this.player.items['gold_bar'] > 1 && this.player.items['wood'] > 1) {
        if ('gold_pick' in this.player.items) {
          this.player.items['gold_pick'] += 1;
        } else {
          this.player.items['gold_pick'] = 1;
          this.player.itemsName.push('gold_pick');
        }
        this.player.items['gold_bar'] -= 2;
        this.player.items['wood'] -= 2;
      }
    } else if (this.craftingSelected == 8) {
      if (this.player.items['gold_bar'] > 1 && this.player.items['wood'] > 1) {
        if ('gold_axe' in this.player.items) {
          this.player.items['gold_axe'] += 1;
        } else {
          this.player.items['gold_axe'] = 1;
          this.player.itemsName.push('gold_axe');
        }
        this.player.items['gold_bar'] -= 2;
        this.player.items['wood'] -= 2;
      }
    } else if (this.craftingSelected == 9) {
      if (this.player.items['gold_bar'] > 3) {
        if ('gold_helm' in this.player.items) {
          this.player.items['gold_helm'] += 1;
        } else {
          this.player.items['gold_helm'] = 1;
          this.player.itemsName.push('gold_helm');
        }
        this.player.items['gold_bar'] -= 4;
      }
    } else if (this.craftingSelected == 10) {
      if (this.player.items['gold_bar'] > 3) {
        if ('gold_chest' in this.player.items) {
          this.player.items['gold_chest'] += 1;
        } else {
          this.player.items['gold_chest'] = 1;
          this.player.itemsName.push('gold_chest');
        }
        this.player.items['gold_bar'] -= 4;
      }
    } else if (this.craftingSelected == 11) {
      if (this.player.items['gold_bar'] > 3) {
        if ('gold_boot' in this.player.items) {
          this.player.items['gold_boot'] += 1;
        } else {
          this.player.items['gold_boot'] = 1;
          this.player.itemsName.push('gold_boot');
        }
        this.player.items['gold_bar'] -= 4;
      }
    } else if (this.craftingSelected == 12) {
      if (this.player.items['gold']) {
        if ('gold_bar' in this.player.items) {
          this.player.items['gold_bar'] += 1;
        } else {
          this.player.items['gold_bar'] = 1;
          this.player.itemsName.push('gold_bar');
        }
        this.player.items['gold'] -= 1;
      }
    } else if (this.craftingSelected == 13) {
      if (this.player.items['silver']) {
        if ('silver_bar' in this.player.items) {
          this.player.items['silver_bar'] += 1;
        } else {
          this.player.items['silver_bar'] = 1;
          this.player.itemsName.push('silver_bar');
        }
        this.player.items['silver'] -= 1;
      }
    }
  }

  this.displayItemDetails = function (ctx) {
    var i = Math.floor((this.mouseX - 200) / 30);
    var j = Math.floor((this.mouseY - 150) / 30);
    ctx.font = '20px Arial';
    if (this.player.itemsName[i + 5 * j] == 'dirt') {
      ctx.fillText('Dirt', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Can be placed', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'wood' ||
      ((this.craftingSelected == 1 || this.craftingSelected == 2 || this.craftingSelected == 7 || this.craftingSelected == 8) && (400 < this.mouseX && this.mouseX < 430 && 350 < this.mouseY && this.mouseY < 380))) {
      ctx.fillText('Wood', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Can be placed', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'gold' ||
      ((this.craftingSelected == 12) && (370 < this.mouseX && this.mouseX < 400 && 350 < this.mouseY && this.mouseY < 380))) {
      ctx.fillText('Gold', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Can be placed', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'silver' ||
      ((this.craftingSelected == 13) && (370 < this.mouseX && this.mouseX < 400 && 350 < this.mouseY && this.mouseY < 380))) {
      ctx.fillText('Silver', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Can be placed', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'sword') {
      ctx.fillText('Wooden Sword', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Damage: 7', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'silver_sword' || (200 < this.mouseX && this.mouseX < 230 && 350 < this.mouseY && this.mouseY < 380)) {
      ctx.fillText('Silver Sword', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Damage: 9', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'silver_pick' || (230 < this.mouseX && this.mouseX < 260 && 350 < this.mouseY && this.mouseY < 380)) {
      ctx.fillText('Silver Pickaxe', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Pick Power: 2', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'silver_axe' || (260 < this.mouseX && this.mouseX < 290 && 350 < this.mouseY && this.mouseY < 380)) {
      ctx.fillText('Silver Axe', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Axe Power: 2', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'silver_helm' || (290 < this.mouseX && this.mouseX < 320 && 350 < this.mouseY && this.mouseY < 380)) {
      ctx.fillText('Silver Helmet', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Armor: 3', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'silver_chest' || (320 < this.mouseX && this.mouseX < 350 && 350 < this.mouseY && this.mouseY < 380)) {
      ctx.fillText('Silver Chest', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Armor: 3', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'silver_boot' || (200 < this.mouseX && this.mouseX < 230 && 380 < this.mouseY && this.mouseY < 410)) {
      ctx.fillText('Silver Boots', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Armor: 3', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'gold_sword' || (230 < this.mouseX && this.mouseX < 260 && 380 < this.mouseY && this.mouseY < 410)) {
      ctx.fillText('Gold Sword', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Damage: 15', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'gold_pick' || (260 < this.mouseX && this.mouseX < 290 && 380 < this.mouseY && this.mouseY < 410)) {
      ctx.fillText('Gold Pickaxe', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Pick Power: 4', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'gold_axe' || (290 < this.mouseX && this.mouseX < 320 && 380 < this.mouseY && this.mouseY < 410)) {
      ctx.fillText('Gold Axe', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Axe Power: 4', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'gold_helm' || (320 < this.mouseX && this.mouseX < 350 && 380 < this.mouseY && this.mouseY < 410)) {
      ctx.fillText('Gold Helmet', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Armor: 5', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'gold_chest' || (200 < this.mouseX && this.mouseX < 230 && 410 < this.mouseY && this.mouseY < 440)) {
      ctx.fillText('Gold Chest', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Armor: 5', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'gold_boot' || (230 < this.mouseX && this.mouseX < 260 && 410 < this.mouseY && this.mouseY < 440)) {
      ctx.fillText('Gold Boots', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Armor: 5', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'gold_bar' ||
      (260 < this.mouseX && this.mouseX < 290 && 410 < this.mouseY && this.mouseY < 440) ||
      ((6 <= this.craftingSelected && this.craftingSelected < 11) && (370 < this.mouseX && this.mouseX < 400 && 350 < this.mouseY && this.mouseY < 380))) {
      ctx.fillText('Gold Bar', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
    } else if (this.player.itemsName[i + 5 * j] == 'silver_bar' ||
      (290 < this.mouseX && this.mouseX < 320 && 410 < this.mouseY && this.mouseY < 440) ||
      ((0 <= this.craftingSelected && this.craftingSelected < 6) && (370 < this.mouseX && this.mouseX < 400 && 350 < this.mouseY && this.mouseY < 380))) {
      ctx.fillText('Silver Bar', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
    } else if (this.player.itemsName[i + 5 * j] == 'cloud') {
      ctx.fillText('Cloud in a Bottle', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Allows double jump', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'rocket') {
      ctx.fillText('Rocket Boot', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Allows flight for a short time', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
    } else if (this.player.itemsName[i + 5 * j] == 'fire_sword') {
      ctx.fillText('Fire Staff', -this.world.translated + this.mouseX + 20, this.mouseY + 10);
      ctx.fillText('Can throw fireball', -this.world.translated + this.mouseX + 20, this.mouseY + 30);
      ctx.fillText('Damage: 10', -this.world.translated + this.mouseX + 20, this.mouseY + 50);
      ctx.fillText('Mana Cost: 20', -this.world.translated + this.mouseX + 20, this.mouseY + 70);

    }


  }

  this.displayCraftMaterials = function (ctx, playerX) {
    if (this.craftingSelected == 0) {
      ctx.drawImage(this.craft[13], playerX + 225, 355, 20, 20);
      ctx.fillText(3, playerX + 222, 360);
    } else if (this.craftingSelected == 1) {
      ctx.drawImage(this.craft[13], playerX + 225, 355, 20, 20);
      ctx.fillText(2, playerX + 222, 360);
      ctx.drawImage(this.wood, playerX + 255, 355, 20, 20);
      ctx.fillText(2, playerX + 252, 360);
    } else if (this.craftingSelected == 2) {
      ctx.drawImage(this.craft[13], playerX + 225, 355, 20, 20);
      ctx.fillText(2, playerX + 222, 360);
      ctx.drawImage(this.wood, playerX + 255, 355, 20, 20);
      ctx.fillText(2, playerX + 252, 360);
    } else if (this.craftingSelected == 3) {
      ctx.drawImage(this.craft[13], playerX + 225, 355, 20, 20);
      ctx.fillText(4, playerX + 222, 360);
    } else if (this.craftingSelected == 4) {
      ctx.drawImage(this.craft[13], playerX + 225, 355, 20, 20);
      ctx.fillText(4, playerX + 222, 360);
    } else if (this.craftingSelected == 5) {
      ctx.drawImage(this.craft[13], playerX + 225, 355, 20, 20);
      ctx.fillText(4, playerX + 222, 360);
    } else if (this.craftingSelected == 6) {
      ctx.drawImage(this.craft[12], playerX + 225, 355, 20, 20);
      ctx.fillText(2, playerX + 222, 360);
    } else if (this.craftingSelected == 7) {
      ctx.drawImage(this.craft[12], playerX + 225, 355, 20, 20);
      ctx.fillText(2, playerX + 222, 360);
      ctx.drawImage(this.wood, playerX + 255, 355, 20, 20);
      ctx.fillText(2, playerX + 252, 360);
    } else if (this.craftingSelected == 8) {
      ctx.drawImage(this.craft[12], playerX + 225, 355, 20, 20);
      ctx.fillText(2, playerX + 222, 360);
      ctx.drawImage(this.wood, playerX + 255, 355, 20, 20);
      ctx.fillText(2, playerX + 252, 360);
    } else if (this.craftingSelected == 9) {
      ctx.drawImage(this.craft[12], playerX + 225, 355, 20, 20);
      ctx.fillText(4, playerX + 222, 360);
    } else if (this.craftingSelected == 10) {
      ctx.drawImage(this.craft[12], playerX + 225, 355, 20, 20);
      ctx.fillText(4, playerX + 222, 360);
    } else if (this.craftingSelected == 11) {
      ctx.drawImage(this.craft[12], playerX + 225, 355, 20, 20);
      ctx.fillText(4, playerX + 222, 360);
    } else if (this.craftingSelected == 12) {
      ctx.drawImage(this.gold, playerX + 229, 359, 12, 12);
      ctx.fillText(1, playerX + 222, 360);
    } else if (this.craftingSelected == 13) {
      ctx.drawImage(this.silver, playerX + 229, 359, 12, 12);
      ctx.fillText(1, playerX + 222, 360);
    }

  }

  this.displayCrafting = function (ctx, playerX) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 5; j++) {
        ctx.drawImage(this.invContainer, playerX + 50 + 30 * j, 350 + 30 * i, 30, 30);
        if (this.craft.length > i * 5 + j) {
          ctx.drawImage(this.craft[i * 5 + j], playerX + 55 + 30 * j, 355 + 30 * i, 20, 20);
        }
      }
    }

    ctx.drawImage(this.invContainer, playerX + 220, 350, 30, 30);
    ctx.drawImage(this.invContainer, playerX + 250, 350, 30, 30);
    ctx.drawImage(this.craftBtn, playerX + 230, 390, 30, 30);
    this.displayCraftMaterials(ctx, playerX);
  }

  this.displayArmor = function (ctx, playerX) {
    if (this.player.helm == undefined) {
      ctx.drawImage(this.unequipped[0], this.unequippedPos[0][0], this.unequippedPos[0][1], this.unequippedPos[0][2], this.unequippedPos[0][3],
        playerX + 550 + (30 - this.unequippedPos[0][2]) / 2, 250 + (30 - this.unequippedPos[0][3]) / 2, this.unequippedPos[0][2], this.unequippedPos[0][3]);
    } else if (this.player.helm == 'silver_helm') {
      ctx.drawImage(this.craft[3], playerX + 555, 255, 20, 20)
    } else if (this.player.helm == 'gold_helm') {
      ctx.drawImage(this.craft[9], playerX + 555, 255, 20, 20)
    }

    if (this.player.chest == undefined) {
      ctx.drawImage(this.unequipped[1], this.unequippedPos[1][0], this.unequippedPos[1][1], this.unequippedPos[1][2], this.unequippedPos[1][3],
        playerX + 550 + (30 - this.unequippedPos[1][2]) / 2, 290 + (30 - this.unequippedPos[1][3]) / 2, this.unequippedPos[1][2], this.unequippedPos[1][3]);
    } else if (this.player.chest == 'silver_chest') {
      ctx.drawImage(this.craft[4], playerX + 555, 295, 20, 20)
    } else if (this.player.chest == 'gold_chest') {
      ctx.drawImage(this.craft[10], playerX + 555, 295, 20, 20)
    }

    if (this.player.boot == undefined) {
      ctx.drawImage(this.unequipped[2], this.unequippedPos[2][0], this.unequippedPos[2][1], this.unequippedPos[2][2], this.unequippedPos[2][3],
        playerX + 550 + (30 - this.unequippedPos[2][2]) / 2, 330 + (30 - this.unequippedPos[2][3]) / 2, this.unequippedPos[2][2], this.unequippedPos[2][3]);
    } else if (this.player.boot == 'silver_boot') {
      ctx.drawImage(this.craft[5], playerX + 555, 335, 20, 20)
    } else if (this.player.boot == 'gold_boot') {
      ctx.drawImage(this.craft[11], playerX + 555, 335, 20, 20)
    }
  }

  this.display = function (ctx) {
    var playerX = this.player.x * 16 - 250
    ctx.font = '20px Arial';
    ctx.fillText('Inventory', playerX + 50, 140);
    ctx.fillText('Crafting Menu', playerX + 50, 340);
    ctx.fillText('Equipped', playerX + 500, 240);
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        ctx.drawImage(this.invContainer, playerX + 50 + 30 * j, 150 + 30 * i, 30, 30);
        if (this.player.itemsName.length > i * 5 + j) {
          this.drawTile(ctx, this.player.itemsName[i * 5 + j], playerX + 50 + 30 * j, 150 + 30 * i, true);
        }
      }
    }

    this.displayCrafting(ctx, playerX);

    for (var i = 0; i < 3; i++) {
      ctx.drawImage(this.invContainer, playerX + 550, 250 + 40 * i, 30, 30);
    }

    this.displayArmor(ctx, playerX);
    ctx.drawImage(this.invContainer, playerX + 510, 290, 30, 30);
    ctx.drawImage(this.invContainer, playerX + 510, 330, 30, 30);
    if (this.player.weapon != undefined) {
      this.drawTile(ctx, this.player.weapon, playerX + 510, 290, false);
    }

    if (this.player.accessory != undefined) {
      this.drawTile(ctx, this.player.accessory, playerX + 510, 330, false);
    }

    ctx.drawImage(this.shield, playerX + 550, 400, 32, 26);
    if (this.player.armor.toString().length == 1) {
      ctx.fillText(this.player.armor, playerX + 562, 417);
    } else {
      ctx.fillText(this.player.armor, playerX + 559, 417);
    }

    this.displayItemDetails(ctx);
  }

  this.clicked = function (x, y) {
    var i = Math.floor((x - 50) / 30) - 5;
    var j = Math.floor((y - 50) / 30) - 3;
    if (200 <= x && x <= 350 && 150 <= y && y <= 300) {
      if (this.player.itemsName[i + 5 * j] == 'dirt' ||
        this.player.itemsName[i + 5 * j] == 'wood' ||
        this.player.itemsName[i + 5 * j] == 'gold' ||
        this.player.itemsName[i + 5 * j] == 'silver' ||
        this.player.itemsName[i + 5 * j] == 'gold_sword' ||
        this.player.itemsName[i + 5 * j] == 'gold_pick' ||
        this.player.itemsName[i + 5 * j] == 'gold_axe' ||
        this.player.itemsName[i + 5 * j] == 'silver_sword' ||
        this.player.itemsName[i + 5 * j] == 'silver_pick' ||
        this.player.itemsName[i + 5 * j] == 'silver_axe' ||
        this.player.itemsName[i + 5 * j] == 'sword' ||
        this.player.itemsName[i + 5 * j] == 'fire_sword') {
        this.player.weapon = this.player.itemsName[i + 5 * j];
        this.player.checkPower();
      } else if (this.player.itemsName[i + 5 * j] == 'gold_helm' ||
        this.player.itemsName[i + 5 * j] == 'silver_helm') {
        this.player.helm = this.player.itemsName[i + 5 * j];
        this.player.checkArmor();
      } else if (this.player.itemsName[i + 5 * j] == 'gold_chest' ||
        this.player.itemsName[i + 5 * j] == 'silver_chest') {
        this.player.chest = this.player.itemsName[i + 5 * j];
        this.player.checkArmor();
      } else if (this.player.itemsName[i + 5 * j] == 'gold_boot' ||
        this.player.itemsName[i + 5 * j] == 'silver_boot') {
        this.player.boot = this.player.itemsName[i + 5 * j];
        this.player.checkArmor();
      } else if (this.player.itemsName[i + 5 * j] == 'cloud' ||
        this.player.itemsName[i + 5 * j] == 'rocket') {
        this.player.accessory = this.player.itemsName[i + 5 * j];
        this.player.checkAccessory();
      }
    }

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


    if (200 < x && x < 350 && 350 < y && y < 440) {
      this.craftingSelected = (j - 7) * 5 + i;
    }
    if (380 < x && x < 410 && 390 < y && y < 420) {
      this.craftItem();
    }
  }



}