var num = 5;

for (var i = num; i > 0; i--) {
  var str = '';
  for (var j = i; j > 0; j--) {
    str += '*';
  }
  console.log(str);
}