function Tunnel(idx) {
  let that = this;
  this.x = CANVAS_WIDTH + (TUNNEL_WIDTH + TUNNEL_GAP_X) * idx;
  this.height = Math.floor(Math.random() * (TUNNEL_MAX_HEIGHT - TUNNEL_MIN_HEIGHT) + TUNNEL_MIN_HEIGHT);
  this.temp_x = this.x

  this.move = function () {
    that.x -= 2;

    if (that.x == -TUNNEL_WIDTH) {
      that.x = CANVAS_WIDTH + 38 + TUNNEL_WIDTH + TUNNEL_GAP_X;
      that.height = Math.floor(Math.random() * (TUNNEL_MAX_HEIGHT - TUNNEL_MIN_HEIGHT) + TUNNEL_MIN_HEIGHT);
    }

  }

  this.reset = function () {
    this.x = this.temp_x;
    this.height = Math.floor(Math.random() * (TUNNEL_MAX_HEIGHT - TUNNEL_MIN_HEIGHT) + TUNNEL_MIN_HEIGHT);
  }
}