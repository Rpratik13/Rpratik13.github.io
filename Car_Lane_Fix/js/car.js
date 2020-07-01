/**
 * It creates the player cars.
 * 
 * @param {number} position Holds the lane number where the player should be in the beginning.
 */

function Car(position) {
  var car = this;
  this.image = 'images/player.png';
  this.position = position;
  this.bullet = 10;
  this.goLeft = false;
  this.goRight = false;

  /**
   * It checks collision of player with enemy.
   * 
   * @param {array} enemies Holds the position of enemies.
   * @param {number} score Holds the score obtained.
   * @param {number} idx Holds the player number.
   */
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

  /**
   * It checks collision of player with powerup.
   * 
   * @param {array} power Holds the position of powerup generated. 
   */

  this.powerUp = function (power) {
    if (power[0]) {
      if ((power[2] > 500 && power[2] < 590) &&
        (((20 + 80 * power[1] <= 20 + 80 * car.position) && (20 + 80 * power[1] + 30 >= 20 + 80 * car.position)) ||
          ((20 + 80 * power[1] <= 20 + 80 * car.position + 30) && (20 + 80 * power[1] + 30 >= 20 + 80 * car.position + 30)))) {
        car.bullet += 5;
        return true;
      }
    }
    return false;

  }
}