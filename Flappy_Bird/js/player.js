function Flappy() {
  let that = this;
  this.y = 274;
  this.wingPosition = 0;
  this.wingDirection = 1;
  this.goUp = false;
  this.fallSpeed = 0.5;
  this.workedOnce = false;
  this.score = 0;
  this.decrement = 0;
  this.angle = 0;
  this.angleUp = 0;
  this.moveUp = 5;
  this.upAngle = false;

  this.checkWallCollision = function () {
    var distTop = that.y;
    var distBottom = 600 - that.y;
    if (distTop <= 0 || distBottom <= BIRD_HEIGHT) {
      that.storeScore();
      return true;
    }
    return false;
  }


  this.fallDown = function () {
    if (that.angle <= 30) {
      that.angle += 1;
    }
    that.y += that.fallSpeed;
    console.log(that.y);
    that.fallSpeed += 0.5;
    if (that.fallSpeed > 8)
      that.fallSpeed = 8;
  }

  this.jumpUp = function () {
    that.y -= that.moveUp;
    that.decrement += that.moveUp;
    that.angle -= that.angleUp
    that.moveUp += 2;
    if (that.decrement == JUMP_HEIGHT) {
      that.decrement = 0;
      that.fallSpeed = 1;
      that.goUp = false;
      that.moveUp = 5;
      that.upAngle = false;
    }
    that.workedOnce = true;
  }

  this.move = function () {
    if (that.goUp) {
      if (!that.upAngle) {
        that.angleUp = (that.angle + 25) / 5;
        that.upAngle = true;
      }
      that.jumpUp();
    } else {
      that.fallDown();
    }
  }

  this.reset = function () {
    that.y = 274;
    that.wingPosition = 0;
    that.wingDirection = 1;
    that.goUp = false;
    that.fallSpeed = 0.5;
    that.score = 0;
    that.decrement = 0;
    that.workedOnce = false;

    that.angle = 0;
    that.angleUp = 0;
    that.moveUp = 5;
    that.upAngle = false;
  }

  this.addScore = function (tunnels) {
    for (var i = 0; i < tunnels.length; i++) {
      if (tunnels[i].x == PLAYER_X - TUNNEL_WIDTH) {
        that.score += 1;
      }
    }
  }

  this.storeScore = function (idx) {
    if (window.localStorage.getItem('score' + idx) == null || (parseInt(window.localStorage.getItem('score' + idx)) < that.score)) {
      window.localStorage.setItem('score' + idx, that.score);
    }
  }


  this.checkTunnelCollision = function (tunnels, idx) {
    for (var i = 0; i < tunnels.length; i++) {
      if ((that.y <= tunnels[i].height || that.y + BIRD_HEIGHT - Math.abs(that.angle) / 3 >= tunnels[i].height + TUNNEL_GAP)) {
        if ((((PLAYER_X + BIRD_WIDTH >= tunnels[i].x && PLAYER_X + BIRD_WIDTH <= tunnels[i].x + TUNNEL_WIDTH) ||
            (PLAYER_X >= tunnels[i].x && PLAYER_X <= tunnels[i].x + TUNNEL_WIDTH)) && that.angle <= 0) ||
          (((PLAYER_X + BIRD_WIDTH - Math.abs(that.angle) >= tunnels[i].x && PLAYER_X + BIRD_WIDTH - Math.abs(that.angle) <= tunnels[i].x + TUNNEL_WIDTH) ||
            (PLAYER_X - Math.abs(that.angle) >= tunnels[i].x && PLAYER_X - Math.abs(that.angle) <= tunnels[i].x + TUNNEL_WIDTH)) && that.angle > 0)) {
          that.storeScore(idx, );
          return true;
        }
      }
    }
    return false;
  }


}