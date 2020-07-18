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

for (var i = 0; i < keys.length; i++) {
  if (PLACE_WEAPONS.includes(keys[i])) {
    INV_IMAGES[keys[i]].src = 'images/' + keys[i] + '_drop.png';
  } else if (keys[i] in craftItems) {
    INV_IMAGES[keys[i]].src = 'images/' + craftItems[keys[i]] + '.png';
  } else {
    INV_IMAGES[keys[i]].src = 'images/' + keys[i] + '.png';
  }
}


const UNEQUIPPED_IMG = {
  'head': new Image,
  'chest': new Image,
  'boot': new Image
};
UNEQUIPPED_IMG['head'].src = 'images/player_head.png';
UNEQUIPPED_IMG['chest'].src = 'images/player_shirt.png';
UNEQUIPPED_IMG['boot'].src = 'images/player_pant.png';

INV_CONTAINER = new Image;
INV_CONTAINER.src = 'images/inv.png'
INV_SELECTED = new Image;
INV_SELECTED.src = 'images/inv_selected.png'
INV_NOT_ENOUGH = new Image;
INV_NOT_ENOUGH.src = 'images/inv_not.png';


CRAFT_BTN = new Image;
CRAFT_BTN.src = 'images/craft_btn.png';

SHIELD = new Image;
SHIELD.src = 'images/shield.png';