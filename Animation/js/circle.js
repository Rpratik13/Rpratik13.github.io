function Circle(idx, color, x) {
  this.size = 3
  this.color = color;
  this.sizeCounter = idx;
  this.y = -idx * 10 + 60;
  this.x = x;

  this.changeSize = function (angle) {
    this.size = 3 + 3 * Math.cos(angle * TO_RADIAN);
    this.y = -idx * 10 + 60 + (30 * Math.sin(angle * TO_RADIAN));
  }

  this.checkNegative = function (val) {
    if (val < 0) {
      return 0;
    }
    return val;
  }


  this.draw = function (ctx, angle) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.checkNegative(this.size), 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.changeSize(angle);
  }
}