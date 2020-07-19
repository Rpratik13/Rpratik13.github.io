/**
 * It creates item drop tiles.
 *
 * @param {game_object} game It is the main game object.
 * @param {string} type It holds what item has been dropped.
 * @param {number} x It holds horizontal position of dropped tile.
 * @param {number} y It holds vertical position of dropped tile.
 */
function Tile(game, type, x, y) {
  this.ctx = game.ctx;
  this.type = type;
  this.tileX = x;
  this.tileY = y;
  this.img = new Image
  this.x = (x - 1) * TILE.size;
  this.y = (y - 1) * TILE.size;

  /**
   * It sets the image of the dropped tile. 
   */
  this.setImageSource = function () {
    if (WEAPON.placeWeapons.includes(type)) {
      this.img.src = 'images/' + type + '/' + type + '_drop.png';
    } else if (ACCESSORY.includes(type)) {
      this.img.src = 'images/accessory/' + type + '.png';
    } else if (WEAPON.attackWeapons.includes(type)) {
      this.img.src = 'images/weapon/' + type + '.png';
    } else {
      this.img.src = 'images/enemy_drops/' + type + '.png';
    }
  }


  this.setImageSource();

  /**
   * It draws the dropped tile.
   */
  this.draw = function () {
    this.ctx.drawImage(this.img, this.x, this.y, TILE.dropSize, TILE.dropSize);
  }

  /**
   * It moves the tile downward.
   */
  this.moveDown = function () {
    this.y += 1;
    this.tileY = Math.floor(this.y / TILE.size) + 1;
  }

  /**
   * It moves the tile upward.
   */
  this.moveUp = function () {
    this.y -= 1;
    this.tileY = Math.ceil(this.y / TILE.size) - 1;
  }

  /**
   * It moves the tile in the right direction.
   */
  this.moveRight = function () {
    this.x += 1;
    this.tileX = Math.floor(this.x / TILE.size) + 1;
  }

  /**
   * It moves the tile in the left direction.
   */
  this.moveLeft = function () {
    this.x -= 1;
    this.tileX = Math.ceil(this.x / TILE.size) - 1;
  }
}