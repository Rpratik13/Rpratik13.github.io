var boundary = document.createElement('div');
boundary.setAttribute('class', 'box');
boundary.style.height = '600px';
boundary.style.width = '1350px'
document.body.appendChild(boundary);




var ballsArray = [];
var movement;
var stressx = 5;
var stressy = 5;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomNumber(max, min) {
  return parseInt(Math.random() * (max - min) + min)
}

function getRandomPosition(ball) {
  var check = true;

  while (check) {
    var x = getRandomNumber(parseFloat(boundary.style.width) - parseFloat(ball.size), 0)
    var y = getRandomNumber(parseFloat(boundary.style.height) - parseFloat(ball.size), 0)

    for (var i = 0; i < ballsArray.length; i++) {
      if ((parseFloat(ballsArray[i].left) - 5 < x) &&
        (parseFloat(ballsArray[i].left) + parseFloat(ballsArray[i].size) + 5 > x) ||
        (parseFloat(ballsArray[i].left) - 5 < x + ball.size) &&
        (parseFloat(ballsArray[i].left) + parseFloat(ballsArray[i].size) + 5 > x + ball.size)) {
        break
      }

      if ((parseFloat(ballsArray[i].top) - 5 < y) &&
        (parseFloat(ballsArray[i].top) + parseFloat(ballsArray[i].size) + 5 > y) ||
        (parseFloat(ballsArray[i].top) - 5 < y + ball.size) &&
        (parseFloat(ballsArray[i].top) + parseFloat(ballsArray[i].size) + 5 > y + ball.size)) {
        break
      }

    }

    if (i == ballsArray.length) {
      return [x, y]
    }
  }
}

var getStressPosition = function () {
  stressx += 20;
  if (stressx + 20 > parseFloat(boundary.style.width)) {
    stressx = 25;
    stressy += 20;
  }
  return [stressx, stressy]
}

function Ball(size, stress) {
  var that = this;
  this.speed = getRandomNumber(100, 200);
  // this.speed = 0;
  this.angle = getRandomNumber(360, 0);
  if (size == undefined) { this.size = getRandomNumber(10, 30); } else { this.size = size; }
  this.color = getRandomColor();
  if (stress) {
    position = getStressPosition();
  } else {
    position = getRandomPosition(this);
  }
  this.top = position[1];
  this.left = position[0];

  init = function () {
    that.ball = document.createElement('div');
    that.ball.setAttribute('class', 'ball');
    that.ball.style.height = that.size + 'px';
    that.ball.style.width = that.size + 'px';
    that.ball.style.backgroundColor = that.color;
    that.ball.style.top = that.top + 'px';
    that.ball.style.left = that.left + 'px';
    boundary.appendChild(that.ball);

    that.angle_deg = that.angle;
    that.angle = that.angle * (Math.PI / 180);
    dx = (that.speed * Math.cos(that.angle) * 0.017);
    dy = (that.speed * Math.sin(that.angle) * 0.017);
    ballsArray.push(that);
  }
  init();
}

var checkMarginCollision = function (idx) {
  if ((parseFloat(ballsArray[idx].ball.style.top)) <= 0) {
    if (ballsArray[idx].angle_deg == 90) {
      ballsArray[idx].angle_deg = 270;
    } else {
      ballsArray[idx].angle_deg = 360 - ballsArray[idx].angle_deg;
    }
  } else if (parseFloat(ballsArray[idx].ball.style.top) >= (parseFloat(boundary.style.height) - parseFloat(ballsArray[idx].ball.style.height))) {
    if (ballsArray[idx].angle_deg == 270) {
      ballsArray[idx].angle_deg = 90;
    } else {
      ballsArray[idx].angle_deg = 360 - ballsArray[idx].angle_deg;
    }
  } else if ((parseFloat(ballsArray[idx].ball.style.left) <= 0)) {
    if (ballsArray[idx].angle_deg == 180) {
      ballsArray[idx].angle_deg = 0;
    } else if (ballsArray[idx].angle_deg < 180) {
      ballsArray[idx].angle_deg = 180 - ballsArray[idx].angle_deg;
    } else {
      ballsArray[idx].angle_deg = 540 - ballsArray[idx].angle_deg;
    }
  } else if ((parseFloat(ballsArray[idx].ball.style.left) >= parseFloat(boundary.style.width) - parseFloat(ballsArray[idx].ball.style.width))) {
    if (ballsArray[idx].angle_deg == 0) {
      ballsArray[idx].angle_deg = 180;
    } else if (ballsArray[idx].angle_deg > 270) {
      ballsArray[idx].angle_deg = 540 - ballsArray[idx].angle_deg;
    } else {
      ballsArray[idx].angle_deg = 180 - ballsArray[idx].angle_deg;
    }
  }
  ballsArray[idx].angle = ballsArray[idx].angle_deg * (Math.PI / 180);
}

var calculateFinalSpeed = function (m1, m2, speed1, speed2) {
  return (((m1 - m2) * speed1) / (m2 + m1)) + (((2 * m2) * speed2) / (m2 + m1));
}

var checkBallCollision = function (idx) {
  for (var i = 0; i < ballsArray.length; i++) {
    for (var j = 0; j < ballsArray.length; j++) {
      if (i != j) {
        center1x = parseFloat(ballsArray[i].ball.style.left) + (parseFloat(ballsArray[i].size) / 2);
        center1y = parseFloat(ballsArray[i].ball.style.top) + (parseFloat(ballsArray[i].size) / 2);
        radius1 = parseFloat(ballsArray[i].size) / 2;

        center2x = parseFloat(ballsArray[j].ball.style.left) + (parseFloat(ballsArray[j].size) / 2);
        center2y = parseFloat(ballsArray[j].ball.style.top) + (parseFloat(ballsArray[j].size) / 2);
        radius2 = parseFloat(ballsArray[j].size) / 2;
        dx = (ballsArray[i].speed * Math.cos(ballsArray[i].angle) * 0.017)
        dy = (ballsArray[i].speed * Math.sin(ballsArray[i].angle) * 0.017)
        distance = Math.sqrt((center1x + dx - center2x) * (center1x + dx - center2x) + (center1y - dy - center2y) * (center1y - dy - center2y));
        radius_distance = (radius1 + radius2)

        if (distance <= radius_distance) {

          // if
          ballsArray[i].angle_deg = (ballsArray[i].angle_deg + 180) % 360;
          ballsArray[i].angle = ballsArray[i].angle_deg * (Math.PI / 180);
          ballsArray[j].angle_deg = (ballsArray[j].angle_deg + 180) % 360;
          ballsArray[j].angle = ballsArray[j].angle_deg * (Math.PI / 180);
          //m1, m2, speed1, speed2
          speed1 = ballsArray[i].speed;
          speed2 = ballsArray[j].speed
          ballsArray[i].speed = calculateFinalSpeed(ballsArray[i].size, ballsArray[j].size, speed1, speed2);
          ballsArray[j].speed = calculateFinalSpeed(ballsArray[j].size, ballsArray[i].size, speed2, speed1);
        }
      }
    }
  }

}

var move = function () {
  movement = setInterval(function () {
    for (var i = 0; i < ballsArray.length; i++) {
      // checkBallCollision();
      if (parseFloat(ballsArray[i].ball.style.top) - ballsArray[i].dy < 0) {
        ballsArray[i].ball.style.top = '0px';
      } else if (parseFloat(ballsArray[i].ball.style.top) + parseFloat(ballsArray[i].ball.style.height) - ballsArray[i].dy >
        parseFloat(boundary.style.height)) {
        ballsArray[i].ball.style.top = parseFloat(boundary.style.height) - parseFloat(ballsArray[i].ball.style.height) + 'px';
      } else {
        ballsArray[i].ball.style.top = parseFloat(ballsArray[i].ball.style.top) - ballsArray[i].dy + 'px';
      }

      if (parseFloat(ballsArray[i].ball.style.left) + ballsArray[i].dx < 0) {
        ballsArray[i].ball.style.left = '0px';
      } else if (parseFloat(ballsArray[i].ball.style.left) + parseFloat(ballsArray[i].ball.style.width) + ballsArray[i].dx >
        parseFloat(boundary.style.width)) {
        ballsArray[i].ball.style.left = parseFloat(boundary.style.width) - parseFloat(ballsArray[i].ball.style.width) + 'px';
      } else {
        ballsArray[i].ball.style.left = parseFloat(ballsArray[i].ball.style.left) + ballsArray[i].dx + 'px';
      }
      checkMarginCollision(i);
      // speed -= 0.0002 / size;
      // if (speed < 0) { speed = 0; }
    }
  }, 17)
}


//size, angle, color, speed, top, left
var ball = new Ball();
var ball2 = new Ball();
var ball3 = new Ball();
var ball4 = new Ball();
var ball5 = new Ball();
var ball6 = new Ball();
var ball7 = new Ball();
var ball8 = new Ball();
var ball9 = new Ball();
var ball10 = new Ball();

var stressTest = function () {
  ballsArray = []
  balls = document.getElementsByClassName('ball');
  while (balls.length > 0) {
    boundary.removeChild(balls[0])
  }
  console.log(balls)
  for (var i = 0; i < 1000; i++) {
    var ball = new Ball(5, true);
  }
}

stressTest();

move();

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'css/style.css');
document.head.appendChild(link);