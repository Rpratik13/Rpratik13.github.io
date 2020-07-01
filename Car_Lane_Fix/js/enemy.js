var count = 0;

/**
 * It creates the enemy car.
 * 
 * @param {number} lane Holds the value of the lane the enemy is to be placed in 
 */
function Enemy(lane) {
  var enemy = this;
  this.image = 'images/enemy.png';
  this.lane = lane;
  this.x = 20 + 80 * this.lane;
  this.y = -60;
  this.inGame = false;


  /**
   * It generates the enemy position.
   */
  this.generateEnemy = function () {

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

  /**
   * It checks the collision of enemy with bullets.
   * 
   * @param {array} bullets Holds the position of fired bullets. 
   */

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