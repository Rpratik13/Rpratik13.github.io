function Player() {
  this.img = new Image;
  this.img.src = 'images/player.png';
  this.x = 20;
  this.y = 14;
  this.playerPositions = [[34, 65], [34, 156], [56, 155], [79, 155], [105, 155], [131, 156], [157, 156], [182, 156], [208, 156], [235, 155], [263, 155], [34, 123], [34, 93], [56, 93], [80, 93], [104, 93]];
  this.pose = 0;
  this.falling = false;
  this.jumping = false;
  this.left = false;
  this.jumpCounter = 0;
  this.swinging = false;
  this.swingCounter = 0;
  this.draw = function (ctx, tiles) {
    ctx.save()
    if (this.left) {
      ctx.translate(CANVAS_WIDTH, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, this.playerPositions[this.pose][0], this.playerPositions[this.pose][1], 16, 24, CANVAS_WIDTH - 30 - this.x * 16, this.y * 16, 32, 48);
      ctx.restore();
    } else {
      ctx.drawImage(this.img, this.playerPositions[this.pose][0], this.playerPositions[this.pose][1], 16, 24, this.x * 16, this.y * 16, 32, 48)
    }
    if (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] == 0 && tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] == 0 && !this.jumping) {
      this.falling = true;
    }
  }

  this.moveLeft = function (tiles) {
    if (!this.falling) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x > 0 &&
      (tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 3][Math.ceil(this.x)] < 1) &&
      (tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 2][Math.ceil(this.x)] < 1) &&
      (tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] > 4 || tiles[Math.floor(this.y) + 1][Math.ceil(this.x)] < 1)) {
      this.x -= 1 / 4;
    }
  }

  this.moveRight = function (tiles) {
    if (!this.falling) {
      this.pose = (this.pose + 1) % 11;
    }
    if (this.x < 48 &&
      (tiles[Math.floor(this.y) + 3][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 3][Math.floor(this.x) + 3] < 1) &&
      (tiles[Math.floor(this.y) + 2][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 2][Math.floor(this.x) + 3] < 1) &&
      (tiles[Math.floor(this.y) + 1][Math.floor(this.x) + 3] > 4 || tiles[Math.floor(this.y) + 1][Math.floor(this.x) + 3] < 1)) {
      this.x += 1 / 4;
    }
  }

  this.fall = function (tiles) {
    this.pose = 11;
    if (this.y < 36 &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] == 0 || tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 1] > 4) &&
      (tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] == 0 || tiles[Math.floor(this.y) + 4][Math.floor(this.x) + 2] > 4)) {
      this.y += 1 / 4;
    } else {
      this.pose = 0;
      this.falling = false;
    }
  }

  this.jump = function (tiles) {
    if (!this.falling) {
      this.pose = 11;
      this.jumping = true;
      this.y -= 1 / 4;
      this.jumpCounter += 1;
      if (this.jumpCounter == 16 || (tiles[Math.ceil(this.y)][Math.round(this.x) + 2] != 0 || tiles[Math.ceil(this.y)][Math.round(this.x) + 1] != 0)) {
        this.jumpCounter = 0;
        this.jumping = false;
        this.falling = true;
      }
    }
  }

  this.swing = function () {
    if (this.pose < 12) {
      this.pose = 12;
    } else {
      if (this.swingCounter % 2 == 0) {
        this.swingCounter = 0;
        this.pose = (this.pose + 1) % 16;
        if (this.pose == 0) {
          this.swinging = false;
        }
      }
    }
    this.swingCounter += 1;

  }

}