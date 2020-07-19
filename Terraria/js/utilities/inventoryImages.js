const INV_IMAGES = {
  'sword': new Image,
  'dirt': new Image,
  'wood': new Image,
  'gold': new Image,
  'silver': new Image,
  'silver_bar': new Image,
  'gold_bar': new Image,
  'silver_sword': new Image,
  'silver_pick': new Image,
  'silver_axe': new Image,
  'silver_helm': new Image,
  'silver_chest': new Image,
  'silver_boot': new Image,
  'gold_sword': new Image,
  'gold_pick': new Image,
  'gold_axe': new Image,
  'gold_helm': new Image,
  'gold_chest': new Image,
  'gold_boot': new Image,
  'gel': new Image,
  'zombie_drop': new Image,
  'lens': new Image,
  'fire_sword': new Image,
  'cloud': new Image,
  'rocket': new Image
}

var craftItems = {
  'silver_sword': 'craft0',
  'silver_pick': 'craft1',
  'silver_axe': 'craft2',
  'silver_helm': 'craft3',
  'silver_chest': 'craft4',
  'silver_boot': 'craft5',
  'gold_sword': 'craft6',
  'gold_pick': 'craft7',
  'gold_axe': 'craft8',
  'gold_helm': 'craft9',
  'gold_chest': 'craft10',
  'gold_boot': 'craft11',
  'gold_bar': 'craft12',
  'silver_bar': 'craft13'

}

var keys = Object.keys(INV_IMAGES);
const IMG_SOURCES = [
  'images/weapon/sword',
  'images/dirt/dirt_drop',
  'images/wood/wood_drop',
  'images/gold/gold_drop',
  'images/silver/silver_drop',
  'images/craft/craft13',
  'images/craft/craft12',
  'images/craft/craft0',
  'images/craft/craft1',
  'images/craft/craft2',
  'images/craft/craft3',
  'images/craft/craft4',
  'images/craft/craft5',
  'images/craft/craft6',
  'images/craft/craft7',
  'images/craft/craft8',
  'images/craft/craft9',
  'images/craft/craft10',
  'images/craft/craft11',
  'images/enemy_drops/gel',
  'images/enemy_drops/zombie_drop',
  'images/enemy_drops/lens',
  'images/weapon/fire_sword',
  'images/accessory/cloud',
  'images/accessory/rocket',
];

for (var i = 0; i < keys.length; i++) {
  INV_IMAGES[keys[i]].src = IMG_SOURCES[i] + '.png';
}


const UNEQUIPPED_IMG = {
  'head': new Image,
  'chest': new Image,
  'boot': new Image
};
UNEQUIPPED_IMG['head'].src = 'images/player/player_head.png';
UNEQUIPPED_IMG['chest'].src = 'images/player/player_shirt.png';
UNEQUIPPED_IMG['boot'].src = 'images/player/player_pant.png';

INV_CONTAINER = new Image;
INV_CONTAINER.src = 'images/inventory/inv.png'
INV_SELECTED = new Image;
INV_SELECTED.src = 'images/inventory/inv_selected.png'
INV_NOT_ENOUGH = new Image;
INV_NOT_ENOUGH.src = 'images/inventory/inv_not.png';


CRAFT_BTN = new Image;
CRAFT_BTN.src = 'images/craft/craft_btn.png';