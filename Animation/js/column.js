function Column(idx) {
  this.circles = [];
  this.x = 250 - (idx % 16) * 15
  this.colors = ['#ffae73', '#feab77', '#fea57c', '#fe9d84', '#fd9b87', '#f9958c', '#f49091', '#ef8b97', '#ea869b', '#e6829e', '#e17da4'];
  this.y = 30;
  this.angle = -idx * 10;

  if (idx > 16) {
    this.angle += 360;
  }


  for (var i = 0; i < 11; i++) {
    this.circles.push(new Circle(-i, COLORS[i], this.x))
  }

  this.drawColumn = function (ctx) {

    for (var i = 0; i < 11; i++) {
      this.circles[i].draw(ctx, this.angle);
    }
    this.angle = (this.angle + 1) % 360;
  }
}