var canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

canvas.width = 1350
canvas.height = 600;
ctx.beginPath();
ctx.rect(0, 0, 1330, 600);
ctx.stroke();


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
    var x = 25
    var y = 45

    if (ballsArray.length > 0) {
      x += ballsArray[ballsArray.length - 1].left + ballsArray[ballsArray.length - 1].size + 50;
      if (x > 1200) {
        x = 25;
        y += 100;
      }
    }


    return [x, y]
  }
}


var getStressPosition = function () {
  stressx += 20;
  if (stressx + 20 > 1330) {
    stressx = 25;
    stressy += 20;
  }
  return [stressx, stressy]
}

function Ball(size, stress) {
  var that = this;
  this.speed = getRandomNumber(100, 300);
  // this.speed = 0;
  this.angle = getRandomNumber(360, 0);
  if (size == undefined) { this.size = getRandomNumber(10, 30); } else { this.size = size; }
  this.color = getRandomColor();
  if (stress) {
    position = getStressPosition();
  } else {
    position = getRandomPosition(this);
  }
  this.top = position[1]
  this.left = position[0];

  init = function () {
    ctx.beginPath();
    ctx.arc(that.left, that.top, that.size, 0, 2 * Math.PI);
    ctx.fillStyle = that.color;
    ctx.fill()

    that.angle_deg = that.angle;
    that.angle = that.angle * (Math.PI / 180);
    that.dx = (that.speed * Math.cos(that.angle) * 0.017);
    that.dy = (that.speed * Math.sin(that.angle) * 0.017);
    ballsArray.push(that);
  }
  init();
}

var checkMarginCollision = function (idx) {
  if (ballsArray[idx].top - ballsArray[idx].size <= 0) {
    if (ballsArray[idx].angle_deg == 90) {
      ballsArray[idx].angle_deg = 270;
    } else {
      ballsArray[idx].angle_deg = 360 - ballsArray[idx].angle_deg;
    }
  } else if (ballsArray[idx].top + ballsArray[idx].size >= (600)) {
    if (ballsArray[idx].angle_deg == 270) {
      ballsArray[idx].angle_deg = 90;
    } else {
      ballsArray[idx].angle_deg = 360 - ballsArray[idx].angle_deg;
    }
  } else if (ballsArray[idx].left - ballsArray[idx].size <= 0) {
    if (ballsArray[idx].angle_deg == 180) {
      ballsArray[idx].angle_deg = 0;
    } else if (ballsArray[idx].angle_deg < 180) {
      ballsArray[idx].angle_deg = 180 - ballsArray[idx].angle_deg;
    } else {
      ballsArray[idx].angle_deg = 540 - ballsArray[idx].angle_deg;
    }
  } else if ((ballsArray[idx].left + ballsArray[idx].size >= 1330)) {
    if (ballsArray[idx].angle_deg == 0) {
      ballsArray[idx].angle_deg = 180;
    } else if (ballsArray[idx].angle_deg > 270) {
      ballsArray[idx].angle_deg = 540 - ballsArray[idx].angle_deg;
    } else {
      ballsArray[idx].angle_deg = 180 - ballsArray[idx].angle_deg;
    }
  }
  ballsArray[idx].angle = ballsArray[idx].angle_deg * (Math.PI / 180);
  ballsArray[idx].dx = (ballsArray[idx].speed * Math.cos(ballsArray[idx].angle) * 0.017);
  ballsArray[idx].dy = (ballsArray[idx].speed * Math.sin(ballsArray[idx].angle) * 0.017);
}

var calculateFinalSpeed = function (m1, m2, speed1, speed2) {
  return (((m1 - m2) * speed1) / (m2 + m1)) + (((2 * m2) * speed2) / (m2 + m1));
}

var checkBallCollision = function (i) {
  for (var j = 0; j < ballsArray.length; j++) {
    if (i != j) {
      center1x = ballsArray[i].left;
      center1y = ballsArray[i].top;
      radius1 = ballsArray[i].size;

      center2x = ballsArray[j].left;
      center2y = ballsArray[j].top;
      radius2 = ballsArray[j].size;
      dx = (ballsArray[i].speed * Math.cos(ballsArray[i].angle) * 0.017)
      dy = (ballsArray[i].speed * Math.sin(ballsArray[i].angle) * 0.017)
      distance = Math.sqrt((center1x + dx - center2x) * (center1x + dx - center2x) + (center1y - dy - center2y) * (center1y - dy - center2y));
      radius_distance = (radius1 + radius2)

      if (distance <= radius_distance) {

        temp = ballsArray[i].angle_deg
        ballsArray[i].angle_deg = (ballsArray[j].angle_deg + 180) % 360
        ballsArray[i].angle = ballsArray[i].angle_deg * (Math.PI / 180);
        ballsArray[j].angle_deg = temp
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


var move = function () {
  movement = setInterval(function () {
    ctx.clearRect(0, 0, 1330, 600);
    ctx.beginPath();
    ctx.rect(0, 0, 1330, 600);
    ctx.stroke();
    for (var i = 0; i < ballsArray.length; i++) {
      checkBallCollision(i);
      if (ballsArray[i].top - ballsArray[i].size - ballsArray[i].dy < 0) {
        ballsArray[i].top = 0 + ballsArray[i].size;
      } else if (ballsArray[i].top + ballsArray[i].size - ballsArray[i].dy > 600) {
        ballsArray[i].top = 600 - ballsArray[i].size;
      } else {
        ballsArray[i].top = ballsArray[i].top - ballsArray[i].dy;
      }

      if (ballsArray[i].left - ballsArray[i].size + ballsArray[i].dx < 0) {
        ballsArray[i].left = 0 + ballsArray[i].size;
      } else if (ballsArray[i].left + ballsArray[i].size + ballsArray[i].dx > 1330) {
        ballsArray[i].left = 1330 - ballsArray[i].size;
      } else {
        ballsArray[i].left = ballsArray[i].left + ballsArray[i].dx;
      }
      checkMarginCollision(i);

      ctx.beginPath();
      ctx.arc(ballsArray[i].left, ballsArray[i].top, ballsArray[i].size, 0, 2 * Math.PI);
      ctx.fillStyle = ballsArray[i].color;
      ctx.fill()

    }
  }, 17)
}




for (var i = 0; i < getRandomNumber(10, 25); i++) {
  var ball = new Ball();
}


button = document.createElement('button')
document.body.appendChild(button);
button.innerHTML = 'Stress Test'
button.onclick = function () {
  stressTest();
}



var stressTest = function () {
  ballsArray = []
  clearInterval(movement);
  ctx.clearRect(1, 1, 1329, 598)
  for (var i = 0; i < 1000; i++) {
    var ball = new Ball(2, true);
  }
  move();
}

move();

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'css/style.css');
document.head.appendChild(link);