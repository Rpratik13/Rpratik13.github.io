const INVENTORY = {
  containerSize: 30,
  itemSize: 20,
  padding: 5,
  textPaddingX: 2,
  textPaddingY: 10,
  detailsPad: 20,
  detailsBoxWidth: 11,
  detailsBoxHeight: 25,
  displayShift: 250,
  shift: 50,
  rowSize: 5,
  colSize: 5,
  x: 200,
  y: 150,
  endX: 350,
  endY: 300,
  text: {
    inv: { x: 50, y: 140 },
    craft: { x: 50, y: 340 },
    equipped: { x: 500, y: 240 }

  }
}



const ARMOR_CONTAINER = {
  num: 3,
  containerX: 550,
  containerY: 250,
  marginY: 40
}

const SHIELD = {
  img: new Image,
  x: 550,
  y: 400,
  width: 32,
  height: 26,
  txt1X: 562,
  txt2X: 559,
  txtY: 417
}

SHIELD.img.src = 'images/inventory/shield.png';

const EQUIPPED = {
  weapon: {
    x: 510,
    y: 290
  },

  accessory: {
    x: 510,
    y: 330
  }
}

const UNEQUIP = {
  sprite: [[12, 12, 18, 18], [8, 24, 24, 20], [12, 42, 18, 12]],
  weapon: { x: 660, endX: 690, y: 290, endY: 320 },
  accessory: { x: 660, endX: 690, y: 330, endY: 360 },
  helm: { x: 700, endX: 730, y: 250, endY: 280 },
  chest: { x: 700, endX: 730, y: 290, endY: 320 },
  boot: { x: 700, endX: 730, y: 330, endY: 360 },
}