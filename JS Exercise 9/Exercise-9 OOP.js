function makeBall(size, color, id, speed) {
  this.ball = document.createElement('div');
  this.ball.setAttribute('id', id);
  this.ball.style.height = size + 'px';
  this.ball.style.width = size + 'px';
  this.ball.style.borderRadius = size + 'px';
  this.ball.style.backgroundColor = color;
  this.ball.style.position = 'absolute';
  this.ball.speed = speed;
  this.ball.style.top = 9 + 'px';
}

function makeBox(height, width, bgColor, id, ball) {
  this.box = document.createElement('div');
  this.box.setAttribute('id', id);
  this.box.style.marginRight = '10px';
  this.box.style.float = 'left';
  this.box.style.height = height + 'px';
  this.box.style.width = width + 'px';
  this.box.style.backgroundColor = bgColor;
  this.box.style.position = 'relative';
  this.ball = ball
  this.ball.ball.style.left = 'calc(50% - ' + (parseFloat(this.ball.ball.style.height) / 2) + 'px)';
  document.body.appendChild(this.box);
  document.getElementById(id).appendChild(this.ball.ball);
}



var boxes = []
boxes.push(new makeBox(100, 100, 'blue', 'box1', new makeBall(20, 'red', 'ball1', 2)));
boxes.push(new makeBox(200, 100, 'black', 'box2', new makeBall(20, 'green', 'ball2', 10)));
boxes.push(new makeBox(200, 100, 'black', 'box3', new makeBall(20, 'green', 'ball3', 7)));
boxes.push(new makeBox(200, 100, 'black', 'box4', new makeBall(20, 'green', 'ball4', 4)));
boxes.push(new makeBox(200, 100, 'black', 'box5', new makeBall(20, 'green', 'ball5', 20)));

setInterval(function () {
  for (var i = 0; i < boxes.length; i++) {
    console.log(parseInt(boxes[i].box.style.height) - parseInt(boxes[i].ball.ball.style.top) + parseInt(boxes[i].ball.ball.style.height));
    if (parseInt(boxes[i].box.style.height) - (parseInt(boxes[i].ball.ball.style.top) + parseInt(boxes[i].ball.ball.style.height)) >= boxes[i].ball.ball.speed) {
      boxes[i].ball.ball.style.top = parseInt(boxes[i].ball.ball.style.top) + boxes[i].ball.ball.speed + 'px';
    } else {
      boxes[i].ball.ball.style.top = parseInt(boxes[i].box.style.height) - parseInt(boxes[i].ball.ball.style.height) + 'px';
    }
    if ((parseInt(boxes[i].ball.ball.style.top) >= (parseInt(boxes[i].box.style.height) - parseInt(boxes[i].ball.ball.style.height))) ||
      (parseInt(boxes[i].ball.ball.style.top) <= 0)) {
      boxes[i].ball.ball.speed = -boxes[i].ball.ball.speed;
    }
  }
}, 1000 / 60);