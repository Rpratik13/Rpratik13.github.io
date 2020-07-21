const PLAYER_SPRITE = [[34, 65], [34, 156], [56, 155], [79, 155], [105, 155], [131, 156],
[157, 156], [182, 156], [208, 156], [235, 155], [263, 155], [34, 123],
[34, 93], [56, 93], [80, 93], [104, 93]
];

const PLAYER = {
  placeRange: 3,
  img: new Image,
  width: 2,
  height: 3,
  armorDiv: 20,
  healthRegenTime: 70,
  manaRegenTime: 50,
  startX: 75,
  startY: 14,
  maxHealth: 100,
  maxMana: 100,
  collisionDamage: 2,
  leftTile: 2,
  sprite: {
    width: 16,
    height: 24,
    val: [[34, 65], [34, 156], [56, 155], [79, 155], [105, 155], [131, 156],
    [157, 156], [182, 156], [208, 156], [235, 155], [263, 155], [34, 123],
    [34, 93], [56, 93], [80, 93], [104, 93]]
  },
  speed: 1 / 8,
  jumpHeight: 16,
  totalFlyTime: 50,
  jumpPose: 11,
  movePoses: 11,
  swingPoses: 16,
  swingFirstPose: 12
};

PLAYER.img.src = 'images/player/player.png';




const CHEST_IMG = {
  'silver_chest': new Image,
  'gold_chest': new Image
};
CHEST_IMG['silver_chest'].src = 'images/armor/silver_chest.png';
CHEST_IMG['gold_chest'].src = 'images/armor/gold_chest.png';

const CHEST_SPRITE = [[6, 24, 26, 20], [6, 360, 28, 18], [4, 414, 32, 20], [4, 470, 32, 20], [4, 526, 32, 20], [4, 584, 32, 20],
                [6, 640, 30, 18], [6, 696, 28, 18], [6, 752, 28, 18], [6, 806, 28, 18], [6, 862, 26, 20], [6, 296, 28, 26],
                [6, 72, 28, 26], [6, 128, 26, 28], [6, 192, 26, 18], [6, 248, 24, 20]];


const CHEST_EQUIP_POS = {
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
};

const CHEST_LEFT_EQUIP_POS = {
  0: CANVAS_WIDTH - 32,
  2: CANVAS_WIDTH - 32,
  3: CANVAS_WIDTH - 33,
  4: CANVAS_WIDTH - 33,
  5: CANVAS_WIDTH - 32,
};

function getLeftChestEquipPos(pose) {
  if (pose in CHEST_LEFT_EQUIP_POS) {
    return CHEST_LEFT_EQUIP_POS[pose];
  } else {
    return CANVAS_WIDTH - 29;
  }
}


const BOOT_IMG = {
  'silver_boot': new Image,
  'gold_boot': new Image
};
BOOT_IMG['silver_boot'].src = 'images/armor/silver_boot.png';
BOOT_IMG['gold_boot'].src = 'images/armor/gold_boot.png';
const BOOT_SPRITE = [[12, 42, 18, 12], [14, 378, 14, 12], [10, 434, 20, 12], [10, 490, 22, 12], [10, 546, 22, 12],
               [10, 602, 20, 12], [12, 658, 18, 12], [14, 714, 14, 12], [12, 770, 18, 12], [10, 826, 22, 12],
               [10, 882, 22, 12], [8, 322, 28, 12], [12, 42, 18, 12], [12, 42, 18, 12], [12, 42, 18, 12],
               [12, 42, 18, 12]];

const BOOT_EQUIP_POS = {
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
};

const BOOT_LEFT_EQUIP_POS = {
  0: CANVAS_WIDTH - 16,
  1: CANVAS_WIDTH - 13,
  2: CANVAS_WIDTH - 19,
  3: CANVAS_WIDTH - 19,
  4: CANVAS_WIDTH - 19,
  5: CANVAS_WIDTH - 20,
  6: CANVAS_WIDTH - 17,
  7: CANVAS_WIDTH - 13,
  8: CANVAS_WIDTH - 15,
  9: CANVAS_WIDTH - 17,
  10: CANVAS_WIDTH - 17,
  11: CANVAS_WIDTH - 23,
  12: CANVAS_WIDTH - 16,
  13: CANVAS_WIDTH - 16,
  14: CANVAS_WIDTH - 16,
  15: CANVAS_WIDTH - 16
};

const ACCESSORY_JUMPS = {
  undefined: 1,
  'cloud': 2,
  'rocket': 3
};

const ARMOR = {
  helm: {
    undefined: 0,
    'silver_helm': 3,
    'gold_helm': 5
  },

  chest: {
    undefined: 0,
    'silver_chest': 3,
    'gold_chest': 5
  },

  boot: {
    undefined: 0,
    'silver_boot': 3,
    'gold_boot': 5
  }
};