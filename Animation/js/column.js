function Column(idx) {
  this.circles = [];
  this.x = 250 - (idx % 16) * 15
  this.colors = ['#ffae73', '#feab77', '#fea57c', '#fe9d84', '#fd9b87', '#f9958c', '#f49091', '#ef8b97', '#ea869b', '#e6829e', '#e17da4'];
  this.y = 30;
  this.angle = 0;

  if (idx < 16) {
    this.draw = -Math.sin((idx / 16) * 90 * TO_RADIAN) * 20;
  } else {
    // this.draw = -(idx % 16) * 5 - 90;
    this.draw = -Math.sin(((idx % 16) / 16) * 90 * TO_RADIAN) * 20 - Math.sin(90 * TO_RADIAN / 16) * 160;
  }

  for (var i = 0; i < 11; i++) {
    this.circles.push(new Circle(-i, COLORS[i], this.x))
  }


  this.moveDown = function () {
    this.y = 30 + (60 * Math.sin(this.angle * TO_RADIAN));
    this.angle = (this.angle + 1) % 180;
  }

  this.drawColumn = function (ctx) {
    if (this.draw >= 0) {
      for (var i = 0; i < 11; i++) {
        this.circles[i].draw(ctx, this.y);
      }
      this.moveDown();
    } else {
      this.draw += Math.sin(90 * TO_RADIAN / 16);
    }
  }
}