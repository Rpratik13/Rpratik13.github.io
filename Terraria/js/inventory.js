function Inventory(player) {
  this.player = player;
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

  for (var i = 0; i < 14; i++) {
    this.craft.push(new Image);
    this.craft[i].src = 'images/craft' + i + '.png';
  }


  this.drawTile = function (ctx, type, x, y, textFlag) {
    if (type == 'sword') {
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



  this.displayCraftMaterials = function (ctx) {
    if (this.craftingSelected == 0) {
      ctx.drawImage(this.craft[13], 225, 355, 20, 20);
      ctx.fillText(3, 222, 360);
    } else if (this.craftingSelected == 1) {
      ctx.drawImage(this.craft[13], 225, 355, 20, 20);
      ctx.fillText(2, 222, 360);
      ctx.drawImage(this.wood, 255, 355, 20, 20);
      ctx.fillText(2, 252, 360);
    } else if (this.craftingSelected == 2) {
      ctx.drawImage(this.craft[13], 225, 355, 20, 20);
      ctx.fillText(2, 222, 360);
      ctx.drawImage(this.wood, 255, 355, 20, 20);
      ctx.fillText(2, 252, 360);
    } else if (this.craftingSelected == 3) {
      ctx.drawImage(this.craft[13], 225, 355, 20, 20);
      ctx.fillText(4, 222, 360);
    } else if (this.craftingSelected == 4) {
      ctx.drawImage(this.craft[13], 225, 355, 20, 20);
      ctx.fillText(4, 222, 360);
    } else if (this.craftingSelected == 5) {
      ctx.drawImage(this.craft[13], 225, 355, 20, 20);
      ctx.fillText(4, 222, 360);
    } else if (this.craftingSelected == 6) {
      ctx.drawImage(this.craft[12], 225, 355, 20, 20);
      ctx.fillText(2, 222, 360);
    } else if (this.craftingSelected == 7) {
      ctx.drawImage(this.craft[12], 225, 355, 20, 20);
      ctx.fillText(2, 222, 360);
      ctx.drawImage(this.wood, 255, 355, 20, 20);
      ctx.fillText(2, 252, 360);
    } else if (this.craftingSelected == 8) {
      ctx.drawImage(this.craft[12], 225, 355, 20, 20);
      ctx.fillText(2, 222, 360);
      ctx.drawImage(this.wood, 255, 355, 20, 20);
      ctx.fillText(2, 252, 360);
    } else if (this.craftingSelected == 9) {
      ctx.drawImage(this.craft[12], 225, 355, 20, 20);
      ctx.fillText(4, 222, 360);
    } else if (this.craftingSelected == 10) {
      ctx.drawImage(this.craft[12], 225, 355, 20, 20);
      ctx.fillText(4, 222, 360);
    } else if (this.craftingSelected == 11) {
      ctx.drawImage(this.craft[12], 225, 355, 20, 20);
      ctx.fillText(4, 222, 360);
    } else if (this.craftingSelected == 12) {
      ctx.drawImage(this.gold, 229, 359, 12, 12);
      ctx.fillText(1, 222, 360);
    } else if (this.craftingSelected == 13) {
      ctx.drawImage(this.silver, 229, 359, 12, 12);
      ctx.fillText(1, 222, 360);
    }

  }

  this.displayCrafting = function (ctx) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 5; j++) {
        ctx.drawImage(this.invContainer, 50 + 30 * j, 350 + 30 * i, 30, 30);
        if (this.craft.length > i * 5 + j) {
          ctx.drawImage(this.craft[i * 5 + j], 55 + 30 * j, 355 + 30 * i, 20, 20);
        }
      }
    }

    ctx.drawImage(this.invContainer, 220, 350, 30, 30);
    ctx.drawImage(this.invContainer, 250, 350, 30, 30);
    ctx.drawImage(this.craftBtn, 230, 390, 30, 30);
    this.displayCraftMaterials(ctx);
  }

  this.displayArmor = function (ctx) {
    if (this.player.helm == undefined) {
      ctx.drawImage(this.unequipped[0], this.unequippedPos[0][0], this.unequippedPos[0][1], this.unequippedPos[0][2], this.unequippedPos[0][3],
        750 + (30 - this.unequippedPos[0][2]) / 2, 250 + (30 - this.unequippedPos[0][3]) / 2, this.unequippedPos[0][2], this.unequippedPos[0][3]);
    } else if (this.player.helm == 'silver_helm') {
      ctx.drawImage(this.craft[3], 755, 255, 20, 20)
    } else if (this.player.helm == 'gold_helm') {
      ctx.drawImage(this.craft[9], 755, 255, 20, 20)
    }

    if (this.player.chest == undefined) {
      ctx.drawImage(this.unequipped[1], this.unequippedPos[1][0], this.unequippedPos[1][1], this.unequippedPos[1][2], this.unequippedPos[1][3],
        750 + (30 - this.unequippedPos[1][2]) / 2, 290 + (30 - this.unequippedPos[1][3]) / 2, this.unequippedPos[1][2], this.unequippedPos[1][3]);
    } else if (this.player.chest == 'silver_chest') {
      ctx.drawImage(this.craft[4], 755, 295, 20, 20)
    } else if (this.player.chest == 'gold_chest') {
      ctx.drawImage(this.craft[10], 755, 295, 20, 20)
    }

    if (this.player.boot == undefined) {
      ctx.drawImage(this.unequipped[2], this.unequippedPos[2][0], this.unequippedPos[2][1], this.unequippedPos[2][2], this.unequippedPos[2][3],
        750 + (30 - this.unequippedPos[2][2]) / 2, 330 + (30 - this.unequippedPos[2][3]) / 2, this.unequippedPos[2][2], this.unequippedPos[2][3]);
    } else if (this.player.boot == 'silver_boot') {
      ctx.drawImage(this.craft[5], 755, 335, 20, 20)
    } else if (this.player.boot == 'gold_boot') {
      ctx.drawImage(this.craft[11], 755, 335, 20, 20)
    }
  }

  this.display = function (ctx) {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        ctx.drawImage(this.invContainer, 50 + 30 * j, 50 + 30 * i, 30, 30);
        if (this.player.itemsName.length > i * 5 + j) {
          this.drawTile(ctx, this.player.itemsName[i * 5 + j], 50 + 30 * j, 50 + 30 * i, true);
        }
      }
    }

    this.displayCrafting(ctx);

    for (var i = 0; i < 3; i++) {
      ctx.drawImage(this.invContainer, 750, 250 + 40 * i, 30, 30);
    }

    this.displayArmor(ctx);
    ctx.drawImage(this.invContainer, 710, 290, 30, 30);
    if (this.player.weapon != undefined) {
      this.drawTile(ctx, this.player.weapon, 710, 290, false);
    }

    ctx.drawImage(this.shield, 750, 400, 32, 26);
    if (this.player.armor.toString().length == 1) {
      ctx.fillText(this.player.armor, 762, 417);
    } else {
      ctx.fillText(this.player.armor, 759, 417);
    }
  }

  this.clicked = function (x, y) {
    var i = Math.floor((x - 50) / 30);
    var j = Math.floor((y - 50) / 30);
    if (50 < x && x < 200 && 50 < y && y < 200) {
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
        this.player.itemsName[i + 5 * j] == 'sword') {
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
      }
    }

    if (710 < x && x < 740 && 290 < y && y < 320) {
      this.player.weapon = undefined;
      this.player.checkPower();
    }

    if (750 < x && x < 780 && 250 < y && y < 280) {
      this.player.helm = undefined;
      this.player.checkArmor();
    }
    if (750 < x && x < 780 && 290 < y && y < 320) {
      this.player.chest = undefined;
      this.player.checkArmor();
    }
    if (750 < x && x < 780 && 330 < y && y < 360) {
      this.player.boot = undefined;
      this.player.checkArmor();
    }


    if (50 < x && x < 200 && 350 < y && y < 440) {
      this.craftingSelected = (j - 10) * 5 + i;
    }
    if (230 < x && x < 260 && 390 < y && y < 420) {
      this.craftItem();
    }
  }
}