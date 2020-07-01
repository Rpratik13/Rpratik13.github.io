var count = 0;

function Enemy(lane) {
  var enemy = this;
  this.image = 'images/enemy.png';
  this.lane = lane;
  this.x = 20 + 80 * this.lane;
  this.y = -60;
  this.inGame = false;


  this.generateEnemy = function (speed) {

    if (Math.random() > 0.2) {
      count = (count + 1) % 3;
      enemy.inGame = true;
      if (count == 2) {
        count = 0;
        return 80;
      }
      return Math.floor(parseInt(Math.random() * (60 - 50) + 50));
    }
    return 70;
  }

  this.checkBulletCollision = function (bullets) {
    for (var i = 0; i < bullets.length; i++) {
      if (bullets[i][1] < enemy.y + 60 && bullets[i][2] == enemy.lane) {
        enemy.inGame = false;
        enemy.y = -60;

        return (i + 1);
      }
    }
    return 0;
  }
}