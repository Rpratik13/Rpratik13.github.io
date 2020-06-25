function generateRandom() {
  return parseInt(Math.random() * 570)
}

function makeContainer() {
  this.box = document.createElement('div');
  this.box.setAttribute('id', 'box');
  this.box.style.margin = '0px auto';
  this.box.style.height = '600px';
  this.box.style.width = '600px';
  this.box.style.position = 'relative';
  this.box.style.border = '2px solid #000';
  document.body.appendChild(this.box);
}


function plotPoint(x, y) {
  this.box = document.getElementById('box');
  this.point = document.createElement('div');
  var that = this.point;
  this.point.style.height = '20px';
  this.point.style.width = '20px';
  this.point.style.borderRadius = '20px';
  this.point.style.top = y + 'px';
  this.point.style.left = x + 'px';
  this.point.style.position = 'absolute';
  this.point.style.backgroundColor = 'blue';
  this.box.appendChild(this.point);

  this.point.onclick = function (e) {
    that.style.backgroundColor = 'green';
  }
}



makeContainer();

for (var i = 0; i < 20; i++) {
  var point = new plotPoint(generateRandom(), generateRandom());
}