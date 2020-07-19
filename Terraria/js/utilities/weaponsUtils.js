const WEAPON = {
  size: 2,

  attackWeapons: ['sword', 'gold_sword', 'gold_pick', 'gold_axe',
                    'silver_sword', 'silver_pick', 'silver_axe',
                    'fire_sword'],

  placeWeapons: ['dirt', 'gold', 'silver', 'wood'],

  placeWeaponsPos: {
    12: [0, 0],
    13: [20, 0],
    14: [22, 27],
    15: [25, 30]
  },

  placeWeaponsLeftPos: {
    12: 20,
    13: -20,
    14: -35,
    15: -33
  },

  attackWeaponRotate: {
    12: -Math.PI / 4,
    13: 0,
    14: Math.PI / 4,
    15: Math.PI / 2
  },

  attackWeaponPos: {
    12: [-17, -3],
    13: [25, -3],
    14: [55, -16],
    15: [55, -55]
  },

  attackWeaponScale: {
    12: [1, 1],
    13: [-1, 1],
    14: [-1, -1],
    15: [1, -1]
  },

  attackWeaponsLeftPos: {
    12: [10, 10],
    13: [-32, 0],
    14: [-92, -45],
    15: [0, 30]
  },

  imgs: {
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
  },

  damage: {
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
}


WEAPON.imgs['dirt'].src = 'images/dirt/dirt_drop.png';
WEAPON.imgs['wood'].src = 'images/wood/wood_drop.png';
WEAPON.imgs['gold'].src = 'images/gold/gold_drop.png';
WEAPON.imgs['silver'].src = 'images/silver/silver_drop.png';
WEAPON.imgs['sword'].src = 'images/weapon/sword.png';
WEAPON.imgs['gold_sword'].src = 'images/craft/craft6.png';
WEAPON.imgs['gold_pick'].src = 'images/craft/craft7.png';
WEAPON.imgs['gold_axe'].src = 'images/craft/craft8.png';
WEAPON.imgs['silver_sword'].src = 'images/craft/craft0.png';
WEAPON.imgs['silver_pick'].src = 'images/craft/craft1.png';
WEAPON.imgs['silver_axe'].src = 'images/craft/craft2.png';
WEAPON.imgs['fire_sword'].src = 'images/weapon/fire_sword.png';