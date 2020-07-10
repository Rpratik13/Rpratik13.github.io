function Sound() {
  that = this;

  var initBackground = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/bg.mp3';
    that.bg = sound;
    that.bg.load();
  }

  var initSwing = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/swing.wav';
    that.swing = sound;
    that.swing.load();
  }

  var initPlayerHurt = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/player_hurt.mp3';
    that.playerHurt = sound;
    that.playerHurt.load();
  }

  var initSlimeHit = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/slime_hit.wav';
    that.slimeHit = sound;
    that.slimeHit.load();
  }

  var initSlimeKilled = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/slime_killed.wav';
    that.slimeKilled = sound;
    that.slimeKilled.load();
  }

  var initZombieHit = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/zombie_hit.wav';
    that.zombieHit = sound;
    that.zombieHit.load();
  }

  var initZombieKilled = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/zombie_killed.wav';
    that.zombieKilled = sound;
    that.zombieKilled.load();
  }

  var initDig = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/dig.wav';
    that.dig = sound;
    that.dig.load();
  }


  var initTreeHit = function () {
    let sound = document.createElement("audio");
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.src = 'audio/tree_hit.wav';
    that.treeHit = sound;
    that.treeHit.load();
  }

  initDig();
  initTreeHit();
  initBackground();
  initSwing();
  initPlayerHurt();
  initSlimeHit();
  initSlimeKilled();
  initZombieHit();
  initZombieKilled();

  this.playBackground = function () {
    this.bg.play();
  }

  this.playSwing = function () {
    this.swing.play();
  }

  this.playPlayerHurt = function () {
    this.playerHurt.play();
  }
  this.playSlimeHit = function () {
    this.slimeHit.play();
  }

  this.playSlimeKilled = function () {
    this.slimeKilled.play();
  }

  this.playZombieHit = function () {
    this.zombieHit.play();
  }

  this.playZombieKilled = function () {
    this.zombieKilled.play();
  }

  this.playDig = function () {
    this.dig.play();
  }

  this.playTreeHit = function () {
    this.treeHit.play();
  }
}