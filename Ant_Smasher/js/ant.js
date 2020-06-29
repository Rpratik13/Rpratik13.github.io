var boundary = document.createElement('div');
boundary.setAttribute('class', 'box');
boundary.style.height = '600px';
boundary.style.width = '800px'
boundary.style.border = '1px solid black'
document.body.appendChild(boundary);

var antsArray = [];
var antAlive = []
var movement;

function getRandomNumber(max, min) {
  return parseInt(Math.random() * (max - min) + min)
}

function getRandomPosition(ant) {
  var check = true;

  while (check) {
    var x = getRandomNumber(1310, 20)
    var y = getRandomNumber(583, 20)
    var i = 0;
    for (var i = 0; i < antsArray.length; i++) {
      if (antsArray[i].left - antsArray[i].size - 5 < x &&
        (antsArray[i].left + antsArray[i].size + 5 > x) ||
        (antsArray[i].left - antsArray[i].size - 5 < x + ant.size) &&
        (antsArray[i].left + antsArray[i].size + 5 > x + ant.size)) {
        break
      }

      if (antsArray[i].top - antsArray[i].size - 5 < y &&
        (antsArray[i].top + antsArray[i].size + 5 > y) ||
        (antsArray[i].top - antsArray[i].size - 5 < y + ant.size) &&
        (antsArray[i].top + antsArray[i].size + 5 > y + ant.size)) {
        break
      }

    }

    if (i == antsArray.length) {
      return [x, y]
    }
  }
}

var checkMarginCollision = function (idx) {
  if ((parseFloat(antsArray[idx].ant.style.top)) <= 10) {
    if (antsArray[idx].angle_deg == 90) {
      antsArray[idx].angle_deg = 270;
    } else {
      antsArray[idx].angle_deg = 360 - antsArray[idx].angle_deg;
    }
  } else if (parseFloat(antsArray[idx].ant.style.top) >= (parseFloat(boundary.style.height) - parseFloat(antsArray[idx].ant.style.height))) {
    if (antsArray[idx].angle_deg == 270) {
      antsArray[idx].angle_deg = 90;
    } else {
      antsArray[idx].angle_deg = 360 - antsArray[idx].angle_deg;
    }
  } else if ((parseFloat(antsArray[idx].ant.style.left) <= 10)) {
    if (antsArray[idx].angle_deg == 180) {
      antsArray[idx].angle_deg = 0;
    } else if (antsArray[idx].angle_deg < 180) {
      antsArray[idx].angle_deg = 180 - antsArray[idx].angle_deg;
    } else {
      antsArray[idx].angle_deg = 540 - antsArray[idx].angle_deg;
    }
  } else if ((parseFloat(antsArray[idx].ant.style.left) >= parseFloat(boundary.style.width) - parseFloat(antsArray[idx].ant.style.width))) {
    if (antsArray[idx].angle_deg == 0) {
      antsArray[idx].angle_deg = 180;
    } else if (antsArray[idx].angle_deg > 270) {
      antsArray[idx].angle_deg = 540 - antsArray[idx].angle_deg;
    } else {
      antsArray[idx].angle_deg = 180 - antsArray[idx].angle_deg;
    }
  }
  antsArray[idx].angle = antsArray[idx].angle_deg * (Math.PI / 180);
  antsArray[idx].dx = (antsArray[idx].speed * Math.cos(antsArray[idx].angle) * 0.017);
  antsArray[idx].dy = (antsArray[idx].speed * Math.sin(antsArray[idx].angle) * 0.017);
  antsArray[idx].ant.style.transform = 'rotate(' + (-antsArray[idx].angle_deg + 90) + 'deg)';
}

var checkAntCollision = function (idx) {

  center1x = parseFloat(antsArray[idx].ant.style.left) + parseFloat(antsArray[idx].ant.style.width) / 2;
  center1y = parseFloat(antsArray[idx].ant.style.top) + parseFloat(antsArray[idx].ant.style.height) / 2;
  for (var j = 0; j < antsArray.length; j++) {
    if (j != idx && antAlive[j]) {
      dx = (antsArray[idx].speed * Math.cos(antsArray[idx].angle) * 0.017)
      dy = (antsArray[idx].speed * Math.sin(antsArray[idx].angle) * 0.017)

      center2x = parseFloat(antsArray[j].ant.style.left) + parseFloat(antsArray[j].ant.style.width) / 2;
      center2y = parseFloat(antsArray[j].ant.style.top) + parseFloat(antsArray[j].ant.style.height) / 2;

      distance = Math.sqrt((center1x - center2x) * (center1x - center2x) + (center1y - center2y) * (center1y - center2y));


      if (distance < 30) {

        antsArray[idx].angle_deg = (antsArray[idx].angle_deg + 180) % 360;
        antsArray[idx].angle = antsArray[idx].angle_deg * (Math.PI / 180);
        antsArray[idx].dx = (antsArray[idx].speed * Math.cos(antsArray[idx].angle) * 0.017)
        antsArray[idx].dy = (antsArray[idx].speed * Math.sin(antsArray[idx].angle) * 0.017)
        antsArray[j].angle_deg = (antsArray[j].angle_deg + 180) % 360;
        antsArray[j].angle = antsArray[j].angle_deg * (Math.PI / 180);
        antsArray[j].dx = (antsArray[j].speed * Math.cos(antsArray[j].angle) * 0.017)
        antsArray[j].dy = (antsArray[j].speed * Math.sin(antsArray[j].angle) * 0.017)

      }
    }
  }
}


function Ant(size) {
  var that = this;
  this.speed = 50;
  this.angle = getRandomNumber(360, 0);
  position = getRandomPosition(this);
  this.tops = position[1];
  this.left = position[0];
  this.index = antsArray.length;
  init = function () {
    that.ant = document.createElement('div');
    that.ant.setAttribute('class', 'ant');
    that.ant.style.position = 'absolute';
    that.ant.style.zIndex = 10;
    that.ant.style.height = '18px';
    that.ant.style.width = '17px';
    that.ant.style.top = that.tops + 'px';
    that.ant.style.left = that.left + 'px';
    that.ant.style.backgroundImage = 'url(images/ant.png)'
    that.ant.style.transform = 'rotate(' + (-that.angle + 90) + 'deg)';
    that.ant.onclick = (function (index) {
      boundary.removeChild(that.ant)
      clearInterval(movement);
      antAlive[that.index] = false;
      var blood = document.createElement('div');
      blood.style.position = 'absolute';
      blood.style.height = '20px';
      blood.style.width = '17px';
      blood.style.top = that.ant.style.top;
      blood.style.left = that.ant.style.left;
      blood.style.backgroundImage = 'url(images/blood.png)';
      blood.style.backgroundPosition = 'contain';
      boundary.appendChild(blood);
      move();
    })
    boundary.appendChild(that.ant);

    that.angle_deg = that.angle;
    that.angle = that.angle * (Math.PI / 180);
    that.dx = (that.speed * Math.cos(that.angle) * 0.017);
    that.dy = (that.speed * Math.sin(that.angle) * 0.017);
    antsArray.push(that);
    antAlive.push(true);
  }
  init();
}
var move = function () {

  movement = setInterval(function () {
    for (var i = 0; i < antsArray.length; i++) {
      if (antAlive[i]) {
        antsArray[i].ant.style.backgroundImage = 'url(images/ant.png)'
        checkAntCollision(i);
        if (parseFloat(antsArray[i].ant.style.top) - antsArray[i].dy < 0) {
          antsArray[i].ant.style.top = '0px';
        } else if (parseFloat(antsArray[i].ant.style.top) + parseFloat(antsArray[i].ant.style.height) - antsArray[i].dy >
          parseFloat(boundary.style.height)) {
          antsArray[i].ant.style.top = parseFloat(boundary.style.height) - parseFloat(antsArray[i].ant.style.height) + 'px';
        } else {
          antsArray[i].ant.style.top = parseFloat(antsArray[i].ant.style.top) - antsArray[i].dy + 'px';
        }
        //   console.log(antsArray[i].dy)

        if (parseFloat(antsArray[i].ant.style.left) + antsArray[i].dx < 0) {
          antsArray[i].ant.style.left = '0px';
        } else if (parseFloat(antsArray[i].ant.style.left) + parseFloat(antsArray[i].ant.style.width) + antsArray[i].dx >
          parseFloat(boundary.style.width)) {
          antsArray[i].ant.style.left = parseFloat(boundary.style.width) - parseFloat(antsArray[i].ant.style.width) + 'px';
        } else {
          antsArray[i].ant.style.left = parseFloat(antsArray[i].ant.style.left) + antsArray[i].dx + 'px';
        }
        checkMarginCollision(i);
        // speed -= 0.0002 / size;
        // if (speed < 0) { speed = 0; }
      }
    }
  }, 17)
}


var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
var ant = new Ant();
move();