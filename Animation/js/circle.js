function Circle(idx, color, x) {
  this.size = 3
  this.color = color;
  this.sizeCounter = idx;
  this.y = -idx * 10 + 60;
  this.x = x;
  this.angle = 0;

  this.changeSize = function () {
    this.angle = (this.angle + 1) % 360;
    this.size = 3 + 3 * Math.cos(this.angle * TO_RADIAN);
    this.y = -idx * 10 + 60 + (30 * Math.sin(this.angle * TO_RADIAN));
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
    ctx.arc(this.x, this.y, this.checkNegative(this.size), 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.changeSize();
  }
}