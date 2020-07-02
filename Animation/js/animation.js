function Animation() {
  let canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'canvas');
  let animation = document.getElementsByClassName('animation')[0];
  animation.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  circle_size = 0;
  circle_growth = 5 / 45;
  angle = 0;
  let columns = [];

  for (var i = 0; i < 32; i++) {
    columns.push(new Column(i));
  }

  function checkNegative(num) {
    if (num < 0) { return 0 }
    return num;
  }

  function drawAnimation() {
    animationInterval = setInterval(function () {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      for (var i = 0; i < columns.length; i++) {
        columns[i].drawColumn(ctx);
      }
    }, 20);
  }

  drawAnimation();
}