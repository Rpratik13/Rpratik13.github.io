const TILE = {
  size: 16,
  dropSize: 12,
  walkable: [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
               22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
  notWalkable: [1, 2, 3, 4, 36],
  fullHealth: 4,
  diggable: [1, 2, 3, 4],
  woodTiles: [5, 6, 7, 8, 36],
  wood: 36,
  empty: 0,
  treeBaseRight: 5,
  treeBaseLeft: 6,
  treeBaseCenter: 7,
  treeTrunk: 8,
  treeTopBase: 33,
  shift: 5,
  tree: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
          19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
  dirt: 2,
  treeTopStart: 26,
  treeBase: [5, 6, 7],
  mapWidth: 154,
  mapHeight: 39
};


const TILE_MAP_VAL = {
  1: 'grass',
  2: 'dirt',
  3: 'gold',
  4: 'silver',
  36: 'wood'
};

const TILE_PLACE_VAL = {
  'dirt': 2,
  'gold': 3,
  'silver': 4,
  'wood': 36
};

const TILE_DROP = {
  1: 'dirt',
  2: 'dirt',
  3: 'gold',
  4: 'silver',
  5: 'wood',
  6: 'wood',
  7: 'wood',
  8: 'wood',
  36: 'wood'
};


const TILE_IMAGES = {
  'tree': [],
  'grass': [],
  'dirt': [],
  'gold': [],
  'silver': [],
  'wood': []
};


for (var i = 0; i < 30; i++) {
  TILE_IMAGES['tree'].push(new Image);
  TILE_IMAGES['tree'][i].src = 'images/tree/tree' + i + '.png';

  if (i < 8) {
    TILE_IMAGES['grass'].push(new Image);
    TILE_IMAGES['grass'][i].src = 'images/grass/grass' + i + '.png';
  }
  if (i < 16) {
    TILE_IMAGES['dirt'].push(new Image);
    TILE_IMAGES['dirt'][i].src = 'images/dirt/dirt' + i + '.png';
    TILE_IMAGES['gold'].push(new Image);
    TILE_IMAGES['gold'][i].src = 'images/gold/gold' + i + '.png';
    TILE_IMAGES['silver'].push(new Image);
    TILE_IMAGES['silver'][i].src = 'images/silver/silver' + i + '.png';
    TILE_IMAGES['wood'].push(new Image);
    TILE_IMAGES['wood'][i].src = 'images/wood/wood' + i + '.png';
  }
}