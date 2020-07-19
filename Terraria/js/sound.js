var sounds = ['bg',
              'boss_battle',
              'dig',
              'fireball',
              'night_bg',
              'player_hurt',
              'roar',
              'slime_hit',
              'slime_killed',
              'swing',
              'tree_hit',
              'zombie_create',
              'zombie_hit',
              'zombie_killed'
              ];

var soundFolder = {
  'bg': 'bg/',
  'boss_battle': 'bg/',
  'dig': 'action/',
  'fireball': 'action/',
  'night_bg': 'bg/',
  'player_hurt': 'player/',
  'roar': 'boss/',
  'slime_hit': 'slime/',
  'slime_killed': 'slime/',
  'swing': 'action/',
  'tree_hit': 'action/',
  'zombie_create': 'zombie/',
  'zombie_hit': 'zombie/',
  'zombie_killed': 'zombie/'
}

var sound = {};

var initSounds = function () {
  for (var i = 0; i < sounds.length; i++) {
    let audio = document.createElement("audio");
    audio.setAttribute("preload", "auto");
    audio.setAttribute("controls", "none");
    audio.style.display = "none";
    document.body.appendChild(audio);
    sound[sounds[i]] = audio;
    sound[sounds[i]].src = 'audio/' + soundFolder[sounds[i]] + sounds[i] + '.wav';
  }
}


initSounds();
playSound = function (name) {
  sound[name].play();
}

stopSound = function (name) {
  sound[name].pause();
  sound[name].currentTime = 0;
}