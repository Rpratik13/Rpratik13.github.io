PLAYER_IMG = new Image;
PLAYER_IMG.src = 'images/player.png';

PLAYER_SPRITE = [[34, 65], [34, 156], [56, 155], [79, 155], [105, 155], [131, 156],
                 [157, 156], [182, 156], [208, 156], [235, 155], [263, 155], [34, 123],
                 [34, 93], [56, 93], [80, 93], [104, 93]
                ];


HEART_IMG = new Image;
HEART_IMG.src = 'images/heart.png';

MANA_IMG = new Image;
MANA_IMG.src = 'images/mana.png';

CHEST_IMG = {
  'silver_chest': new Image,
  'gold_chest': new Image
};
CHEST_IMG['silver_chest'].src = 'images/silver_chest.png'
CHEST_IMG['gold_chest'].src = 'images/gold_chest.png'

CHEST_SPRITE = [[6, 24, 26, 20], [6, 360, 28, 18], [4, 414, 32, 20], [4, 470, 32, 20], [4, 526, 32, 20], [4, 584, 32, 20],
                [6, 640, 30, 18], [6, 696, 28, 18], [6, 752, 28, 18], [6, 806, 28, 18], [6, 862, 26, 20], [6, 296, 28, 26],
                [6, 72, 28, 26], [6, 128, 26, 28], [6, 192, 26, 18], [6, 248, 24, 20]];


CHEST_EQUIP_POS = {
  0: [1, 18, 28, 19],
  1: [2, 18, 28, 18],
  2: [1, 18, 31, 19],
  3: [0, 18, 32, 19],
  4: [0, 18, 32, 19],
  5: [0, 18, 32, 20],
  6: [2, 18, 30, 18],
  7: [2, 18, 28, 18],
  8: [2, 18, 28, 18],
  9: [2, 18, 28, 18],
  10: [2, 18, 26, 18],
  11: [2, 10, 28, 26],
  12: [2, 10, 27, 26],
  13: [2, 10, 27, 28],
  14: [2, 17, 25, 19],
  15: [2, 18, 24, 20],
}

CHEST_LEFT_EQUIP_POS = {
  0: CANVAS_WIDTH - 29,
  2: CANVAS_WIDTH - 29,
  3: CANVAS_WIDTH - 30,
  4: CANVAS_WIDTH - 30,
  5: CANVAS_WIDTH - 29,
}

function getLeftChestEquipPos(pose) {
  if (pose in CHEST_LEFT_EQUIP_POS) {
    return CHEST_LEFT_EQUIP_POS[pose];
  } else {
    return CANVAS_WIDTH - 26;
  }
}


BOOT_IMG = {
  'silver_boot': new Image,
  'gold_boot': new Image
};
BOOT_IMG['silver_boot'].src = 'images/silver_boot.png'
BOOT_IMG['gold_boot'].src = 'images/gold_boot.png'
BOOT_SPRITE = [[12, 42, 18, 12], [14, 378, 14, 12], [10, 434, 20, 12], [10, 490, 22, 12], [10, 546, 22, 12],
               [10, 602, 20, 12], [12, 658, 18, 12], [14, 714, 14, 12], [12, 770, 18, 12], [10, 826, 22, 12],
               [10, 882, 22, 12], [8, 322, 28, 12], [12, 42, 18, 12], [12, 42, 18, 12], [12, 42, 18, 12],
               [12, 42, 18, 12]];

BOOT_EQUIP_POS = {
  0: [8, 36, 17, 13],
  1: [10, 36, 14, 12],
  2: [7, 36, 18, 12],
  3: [7, 36, 20, 12],
  4: [7, 36, 19, 12],
  5: [6, 36, 19, 12],
  6: [8, 36, 18, 12],
  7: [9, 36, 15, 12],
  8: [9, 36, 16, 12],
  9: [8, 36, 19, 13],
  10: [8, 36, 19, 13],
  11: [4, 36, 28, 13],
  12: [8, 35, 17, 13],
  13: [8, 35, 17, 13],
  14: [8, 35, 17, 13],
  15: [8, 35, 17, 13],
}

BOOT_LEFT_EQUIP_POS = {
  0: CANVAS_WIDTH - 13,
  1: CANVAS_WIDTH - 10,
  2: CANVAS_WIDTH - 16,
  3: CANVAS_WIDTH - 16,
  4: CANVAS_WIDTH - 16,
  5: CANVAS_WIDTH - 17,
  6: CANVAS_WIDTH - 14,
  7: CANVAS_WIDTH - 10,
  8: CANVAS_WIDTH - 12,
  9: CANVAS_WIDTH - 14,
  10: CANVAS_WIDTH - 14,
  11: CANVAS_WIDTH - 20,
  12: CANVAS_WIDTH - 13,
  13: CANVAS_WIDTH - 13,
  14: CANVAS_WIDTH - 13,
  15: CANVAS_WIDTH - 13
};

ACCESSORY_JUMPS = {
  undefined: 1,
  'cloud': 2,
  'rocket': 3
}

HELM_ARMOR = {
  undefined: 0,
  'silver_helm': 3,
  'gold_helm': 5
}

CHEST_ARMOR = {
  undefined: 0,
  'silver_chest': 3,
  'gold_chest': 5
}

BOOT_ARMOR = {
  undefined: 0,
  'silver_boot': 3,
  'gold_boot': 5
}

WEAPON_DAMAGES = {
  undefined: [5, 1, 1],
  'sword': [7, 0, 0],
  'silver_sword': [9, 0, 0],
  'gold_sword': [15, 0, 0],
  'silver_pick': [5, 2, 0],
  'gold_pick': [6, 4, 0],
  'silver_axe': [5, 0, 2],
  'gold_axe': [6, 0, 4],
  'fire_sword': [2, 0, 0],
  'dirt': [0, 0, 0],
  'wood': [0, 0, 0],
  'gold': [0, 0, 0],
  'silver': [0, 0, 0]
}


PLACE_WEAPONS_POS = {
  12: [0, 0],
  13: [20, 0],
  14: [22, 27],
  15: [25, 30]
}

PLACE_WEAPONS_LEFT_POS = {
  12: 20,
  13: -20,
  14: -35,
  15: -33
}

ATTACK_WEAPON_ROTATE = {
  12: -Math.PI / 4,
  13: 0,
  14: Math.PI / 4,
  15: Math.PI / 2
}

ATTACK_WEAPON_POS = {
  12: [-17, -3],
  13: [25, -3],
  14: [55, -16],
  15: [55, -55]
}

ATTACK_WEAPON_SCALE = {
  12: [1, 1],
  13: [-1, 1],
  14: [-1, -1],
  15: [1, -1]
}

ATTACK_WEAPONS_LEFT_POS = {
  12: [10, 10],
  13: [-32, 0],
  14: [-92, -45],
  15: [0, 30]
}


WEAPON_IMGS = {
  'dirt': new Image,
  'wood': new Image,
  'gold': new Image,
  'silver': new Image,
  'sword': new Image,
  'gold_sword': new Image,
  'gold_pick': new Image,
  'gold_axe': new Image,
  'silver_sword': new Image,
  'silver_pick': new Image,
  'silver_axe': new Image,
  'fire_sword': new Image,
}

WEAPON_IMGS['dirt'].src = 'images/dirt_drop.png';
WEAPON_IMGS['wood'].src = 'images/wood_drop.png';
WEAPON_IMGS['gold'].src = 'images/gold_drop.png';
WEAPON_IMGS['silver'].src = 'images/silver_drop.png';
WEAPON_IMGS['sword'].src = 'images/sword.png';
WEAPON_IMGS['gold_sword'].src = 'images/craft6.png';
WEAPON_IMGS['gold_pick'].src = 'images/craft7.png';
WEAPON_IMGS['gold_axe'].src = 'images/craft8.png';
WEAPON_IMGS['silver_sword'].src = 'images/craft0.png';
WEAPON_IMGS['silver_pick'].src = 'images/craft1.png';
WEAPON_IMGS['silver_axe'].src = 'images/craft2.png';
WEAPON_IMGS['fire_sword'].src = 'images/fire_sword.png';