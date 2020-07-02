function Preloader() {
  this.load = function () {
    var img = new Image();
    img.src = 'images/game.png';
    img.onload = () => { return }
  }
}