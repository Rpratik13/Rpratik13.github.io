function Tile(type, x, y) {
  this.type = type;
  this.tileX = x;
  this.tileY = y;
  this.img = new Image
  this.x = (x - 1) * TILE_SIZE + 2;
  this.y = (y - 1) * TILE_SIZE + 2;

  this.setImageSource = function () {
    if (PLACE_WEAPONS.includes(type)) {
      this.img.src = 'images/' + type + '_drop.png';
    } else {
      this.img.src = 'images/' + type + '.png';
    }
  }


  this.setImageSource();

  this.draw = function (ctx) {
    ctx.drawImage(this.img, this.x, this.y, TILE_DROP_SIZE, TILE_DROP_SIZE);
  }

  this.moveDown = function () {
    this.y += 1;
    this.tileY = Math.floor(this.y / TILE_SIZE) + 1;
  }

  this.moveUp = function () {
    this.y -= 1;
    this.tileY = Math.ceil(this.y / TILE_SIZE) - 1;
  }

  this.moveRight = function () {
    this.x += 1;
    this.tileX = Math.floor(this.x / TILE_SIZE) + 1;
  }

  this.moveLeft = function () {
    this.x -= 1;
    this.tileX = Math.ceil(this.x / TILE_SIZE) - 1;
  }
}