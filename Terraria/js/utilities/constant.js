const CANVAS_HEIGHT = 624;
const CANVAS_WIDTH = 800;
const MIN_DISPLAY_POS = 25;
const MAX_DISPLAY_POS = 128;
const CAMERA_MOVE_VAL = 2;
const MAX_TRANSLATE = 103;

const FIREBALL = {
  moveSpeed: 0.1,
  manaCost: 20,
  life: 200,
  damage: 10,
  size: 1
}


const FALL_SPEED = 1 / 4;


const DROP_CHANCE = {
  'fireSword': 0.5,
  'gel': 0.5,
  'lens': 0.3,
  'zombieDrop': 0.6,
  'rocket': 0.1
}

const ACCESSORY = ['cloud', 'rocket']

const LOGO = {
  x: 200,
  y: 100,
  width: 486,
  height: 142
}

const START = {
  x: 400,
  y: 300,
  yAbove: 270,
  width: 485
}

const PAUSED = {
  x: 400,
  y: 300
}

const STATE = {
  startScreen: 0,
  running: 1,
  paused: 2
}

const ENEMY_GEN_DIST = {
  range: 20,
  minMargin: 0,
  maxMargin: 150,
}

const DAY = {
  quarter: 5000,
  full: 20000
}

const SECONDS_IN_DAY = 86400;
const TO_HOURS = 1 / 3600;
const TO_MINS = 1 / 60;
const TIME_HEIGHT = 40;

const BG_POS = {
  y: 0,
  height: 300,
  yUnder: 300,
  heightUnder: 620
}

const ENEMY_GEN_TIME = 500;