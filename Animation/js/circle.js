/* Creates circles in columns */

function Circle(idx, color, x) {
  this.size = 3
  this.color = color;
  this.sizeCounter = idx;
  this.y = -idx * 10 + 60;
  this.x = x;

  /* 
  * Increase or decrease size of the circle based on the given angle.

  * @param {number} angle. Holds the current phase angle of the column.
  */
  this.changeSize = function (angle) {
    this.size = 3 + 3 * Math.cos(angle * TO_RADIAN);
    this.y = -idx * 10 + 60 + (30 * Math.sin(angle * TO_RADIAN));
  }

  /*
   * Draws the circles.
   *
   * @param {canvas context} ctx. Used to draw on the canvas.
   * @param {number} angle. Holds the current phase angle of the column.
   *
   */
  this.draw = function (ctx, angle) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.changeSize(angle);
  }
}