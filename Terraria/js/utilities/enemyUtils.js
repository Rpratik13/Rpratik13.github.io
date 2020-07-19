const SLIME = {
  sprite: [0, 2, 44, 30],
  height: 1,
  width: 2,
  damage: 10,
  fullHealth: 20
};

const ZOMBIE = {
  sprite: [[0, 0, 34, 46], [0, 48, 34, 46], [0, 96, 34, 46]],
  height: 3,
  width: 2,
  damage: 20,
  fullHealth: 70,
  poseChange: 4,
  leftTile: 2
};

const EYE = {
  sprite: [0, 0, 36, 22],
  height: 1,
  width: 2,
  damage: 10,
  fullHealth: 10,
  leftTile: 2,
};



const BOSS = {
  damage: 0.3,
  enemyGenerateTime: 200,
  fullHealth: 500,
  height: 7,
  leftTile: 10,
  speed: 1 / 5,
  sprite: [[830, 0, 152, 110], [0, 0, 146, 110]],
  width: 10,
  startY: 8
}

const KNOCKBACK = {
  speed: 1 / 4,
  time: 10,
  damage: 2
}
const ENEMY_SPEED = 1 / 50;
const KNOCKBACK_SPEED = 1 / 4;
const KNOCKBACK_TIME = 10;
const KNOCKBACK_DAMAGE = 2