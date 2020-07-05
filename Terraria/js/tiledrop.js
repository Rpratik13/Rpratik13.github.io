function Tile(type, x, y) {
  this.type = type;
  this.tileX = x;
  this.tileY = y;
  this.img = new Image
  if (type == 'dirt') {
    this.img.src = 'images/dirt_drop.png';
  } else if (type == 'gold') {
    this.img.src = 'images/gold_drop.png';
  } else if (type == 'silver') {
    this.img.src = 'images/silver_drop.png';
  } else if (type == 'wood') {
    this.img.src = 'images/wood_drop.png';
  }


  this.x = (x - 1) * TILE_SIZE + 2;
  this.y = (y - 1) * TILE_SIZE + 2;

  this.draw = function (ctx) {
    ctx.drawImage(this.img, this.x, this.y, TILE_DROP_SIZE, TILE_DROP_SIZE);
  }

  this.moveDown = function () {
    this.y += 1;
    this.tileY = Math.floor(this.y / 16) + 1;
  }

  this.moveUp = function () {
    this.y -= 1;
    this.tileY = Math.ceil(this.y / 16) - 1;
  }

  this.moveRight = function () {
    this.x += 1;
    this.tileX = Math.floor(this.x / 16) + 1;
  }

  this.moveLeft = function () {
    this.x -= 1;
    this.tileX = Math.floor(this.x / 16) + 1;
  }
}