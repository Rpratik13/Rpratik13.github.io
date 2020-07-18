function AudioLoader() {
  this.numberOfLoadedAudios = 0;
  this.audios = [
      'audio/bg.wav',
      'audio/boss_battle',
      'audio/dig.wav',
      'audio/fireball.wav',
      'audio/night_bg.wav',
      'audio/player_hurt.wav',
      'audio/roar.wav',
      'audio/slime_hit.wav',
      'audio/slime_killed.wav',
      'audio/swing.wav',
      'audio/tree_hit.wav',
      'audio/zombie_create.wav',
      'audio/zombie_hit.wav',
      'audio/zombie_killed.wav'
    ];


  this.loadAudios = function (start) {
    let audio = new Audio();
    for (var i = 0; i < this.audios.length; i++) {
      audio.src = this.audios[i];
      audio.addEventListener("canplay", () => {
        this.numberOfLoadedAudios++;
        if (this.numberOfLoadedAudios == this.audios.length) {
          start();
        }
      });
    }
  }
}