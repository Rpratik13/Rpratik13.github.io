/**
 * Its creates a loader object that loads audio files. 
 */
function AudioLoader() {
  this.numberOfLoadedAudios = 0;
  this.audios = [
      'audio/bg/bg.wav',
      'audio/bg/boss_battle',
      'audio/action/dig.wav',
      'audio/action/fireball.wav',
      'audio/bg/night_bg.wav',
      'audio/player/player_hurt.wav',
      'audio/boss/roar.wav',
      'audio/slime/slime_hit.wav',
      'audio/slime/slime_killed.wav',
      'audio/action/swing.wav',
      'audio/action/tree_hit.wav',
      'audio/zombie/zombie_create.wav',
      'audio/zombie/zombie_hit.wav',
      'audio/zombie/zombie_killed.wav'
    ];


  /**
   * It loads the required audio files.
   */
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