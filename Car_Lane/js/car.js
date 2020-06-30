function Car() {
  var car = this;
  this.image = 'images/player.png';
  this.position = 1;


  this.checkCollision = function (enemies, score) {
    if ((enemies[car.position].y >= 470 || enemies[car.position + 3].y >= 470) &&
      (enemies[car.position].y <= 590 || enemies[car.position + 3].y <= 590)) {
      clearInterval(interval);

      if (window.localStorage.getItem('score') == null) {
        window.localStorage.setItem('score', score)
      } else if (parseInt(window.localStorage.getItem('score')) < score) {
        window.localStorage.setItem('score', score);
      }
      console.log(window.localStorage.getItem('score'))
      return true;
    }
  }
}