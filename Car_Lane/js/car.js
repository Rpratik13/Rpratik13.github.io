function Car(position) {
  var car = this;
  this.image = 'images/player.png';
  this.position = position;
  this.bullet = 10;
  this.goLeft = false;
  this.goRight = false;


  this.checkCollision = function (enemies, score, idx) {
    for (var i = 0; i < enemies.length; i++) {
      if ((enemies[i].y >= 470 && enemies[i].y <= 590) &&
        (((enemies[i].x <= 20 + 80 * car.position) && (enemies[i].x + 30 >= 20 + 80 * car.position)) ||
          ((enemies[i].x <= 20 + 80 * car.position + 30) && (enemies[i].x + 30 >= 20 + 80 * car.position + 30)))) {

        if (parseInt(window.localStorage.getItem('score' + idx)) < score) {
          window.localStorage.setItem('score' + idx, score);

        }
        return true;
      }
    }
  }

  this.powerUp = function (power) {
    if (power[0]) {
      if ((power[2] > 500 && power[2] < 590) &&
        (((power[1] <= 20 + 80 * car.position) && (power[1] + 30 >= 20 + 80 * car.position)) ||
          ((power[1] <= 20 + 80 * car.position + 30) && (power[1] + 30 >= 20 + 80 * car.position + 30)))) {
        car.bullet += 5;
        return true;
      }
    }
    return false;

  }
}