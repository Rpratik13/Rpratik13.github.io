const CANVAS_HEIGHT = 624;
const CANVAS_WIDTH = 800;
const TILE_SIZE = 16;
const TILE_DROP_SIZE = 12;
const WALKABLE_TILES = [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
const NOT_WALKABLE_TILES = [1, 2, 3, 4, 36];
const ATTACK_WEAPONS = ['sword', 'gold_sword', 'gold_pick', 'gold_axe', 'silver_sword', 'silver_pick', 'silver_axe', 'fire_sword'];
const PLACE_WEAPONS = ['dirt', 'gold', 'silver', 'wood'];
const WEAPON_NUM = {
  'dirt': 0,
  'wood': 1,
  'gold': 2,
  'silver': 3,
  'sword': 4,
  'gold_sword': 5,
  'gold_pick': 6,
  'gold_axe': 7,
  'silver_sword': 8,
  'silver_pick': 9,
  'silver_axe': 10,
  'fire_sword': 11
};

const INV_CONTAINER_SIZE = 30;
const SLIME_SPRITE = [0, 2, 44, 30];
const ZOMBIE_SPRITE = [0, 48, 96];
const EYE_SPRITE = [0, 0, 36, 22];
const UNEQP_SPRITE = [[12, 12, 18, 18], [8, 24, 24, 20], [12, 42, 18, 12]];