var box = document.createElement('div');
box.setAttribute('class', 'box');
box.style.width = '400px';
box.style.height = '400px';
box.style.border = '2px solid #000'
box.style.margin = '100px auto 0px auto';
document.body.appendChild(box);

var ball = document.createElement('div');
var ballSize = '50px';
ball.style.height = ballSize;
ball.style.width = ballSize;
ball.style.backgroundColor = 'blue';
ball.style.borderRadius = ballSize;
ball.style.marginLeft = 'auto';
ball.style.marginRight = 'auto';
ball.style.marginTop = '0px';
document.getElementsByClassName('box')[0].appendChild(ball);

var ballMargin = parseFloat(window.getComputedStyle(ball).getPropertyValue('margin-top'));
var ballHeight = parseFloat(window.getComputedStyle(ball).getPropertyValue('height'));
var boxHeight = parseFloat(window.getComputedStyle(box).getPropertyValue('height'));
console.log(ballMargin);


var down = true;
setInterval(function () {
  if (ballMargin === 0) {
    down = true;
  } else if (ballMargin === (boxHeight - ballHeight)) {
    down = false;
  }

  if (down) {
    ballMargin += 1
  } else {
    ballMargin -= 1;
  }
  ball.style.marginTop = ballMargin + 'px';
}, 10);