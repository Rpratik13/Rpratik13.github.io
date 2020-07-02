function Circle(idx, color, x) {
  this.size = 6 + GROWTH_SIZE * (idx - 3);
  this.color = color;
  this.sizeCounter = idx;
  this.y = -idx * 10;
  this.x = x;

  this.changeSize = function () {
    if (this.sizeCounter < 3 || this.sizeCounter > 152) {
      this.size += GROWTH_SIZE;
    } else if (this.sizeCounter >= 85 && this.sizeCounter < 115) {
      this.size -= GROWTH_SIZE;
    }
    this.sizeCounter = (this.sizeCounter + 1) % 180;
  }

  this.checkNegative = function (val) {
    if (val < 0) {
      return 0;
    }
    return val;
  }


  this.draw = function (ctx, y) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y + y, this.checkNegative(this.size), 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.changeSize();
  }
}