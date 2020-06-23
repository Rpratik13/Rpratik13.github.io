var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
  { x: 80, y: 10 },
  { x: 90, y: 70 },
  { x: 120, y: 100 },
  { x: 200, y: 150 },
  { x: 210, y: 200 }
];

var box = document.createElement('div');
box.setAttribute('class', 'box');
box.style.width = '400px';
box.style.height = '400px';
box.style.border = '2px solid #000'
box.style.margin = '200px auto 0px auto';
box.style.position = 'relative';
document.body.appendChild(box);

var pointSize = '10px';
for (var i = 0; i < points.length; i++) {
  var point = document.createElement('div');

  point.style.height = pointSize;
  point.style.width = pointSize;
  point.style.borderRadius = pointSize;
  point.style.backgroundColor = 'blue';
  point.style.position = 'absolute';
  point.style.left = (points[i]['x']) + 'px';
  point.style.top = (points[i]['y']) + 'px';
  document.getElementsByClassName('box')[0].appendChild(point);
}