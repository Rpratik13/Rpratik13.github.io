/**
 * It creates a loader object that loads image files.
 */
function Preloader() {
  this.images = [
        'images/bg/bg0',
        'images/bg/bg1',
        'images/enemy/boss',
        'images/accessory/cloud',
        'images/craft/craft_btn',
        'images/craft/craft0',
        'images/craft/craft1',
        'images/craft/craft2',
        'images/craft/craft3',
        'images/craft/craft4',
        'images/craft/craft5',
        'images/craft/craft6',
        'images/craft/craft7',
        'images/craft/craft8',
        'images/craft/craft9',
        'images/craft/craft10',
        'images/craft/craft11',
        'images/craft/craft12',
        'images/craft/craft13',

        'images/dirt/dirt_drop',
        'images/dirt/dirt0',
        'images/dirt/dirt1',
        'images/dirt/dirt2',
        'images/dirt/dirt3',
        'images/dirt/dirt4',
        'images/dirt/dirt5',
        'images/dirt/dirt6',
        'images/dirt/dirt7',
        'images/dirt/dirt8',
        'images/dirt/dirt9',
        'images/dirt/dirt10',
        'images/dirt/dirt11',
        'images/dirt/dirt12',
        'images/dirt/dirt13',
        'images/dirt/dirt14',
        'images/dirt/dirt15',

        'images/enemy/eye',
        'images/weapon/fire_sword',
        'images/weapon/fireball',
        'images/enemy_drops/gel',

        'images/armor/gold_boot',
        'images/armor/gold_chest',
        'images/gold/gold_drop',
        'images/gold/gold0',
        'images/gold/gold1',
        'images/gold/gold2',
        'images/gold/gold3',
        'images/gold/gold4',
        'images/gold/gold5',
        'images/gold/gold6',
        'images/gold/gold7',
        'images/gold/gold8',
        'images/gold/gold9',
        'images/gold/gold10',
        'images/gold/gold11',
        'images/gold/gold12',
        'images/gold/gold13',
        'images/gold/gold14',
        'images/gold/gold15',

        'images/grass/grass0',
        'images/grass/grass1',
        'images/grass/grass2',
        'images/grass/grass3',
        'images/grass/grass4',
        'images/grass/grass5',
        'images/grass/grass6',
        'images/grass/grass7',

        'images/stats/heart',
        'images/inventory/inv',
        'images/inventory/inv_not',
        'images/inventory/inv_selected',
        'images/enemy_drops/lens',
        'images/logo',
        'images/stats/mana',

        'images/player/player',
        'images/player/player_head',
        'images/player/player_pant',
        'images/player/player_shirt',
        'images/accessory/rocket',
        'images/inventory/shield',

        'images/armor/silver_boot',
        'images/armor/silver_chest',
        'images/silver/silver_drop',
        'images/silver/silver0',
        'images/silver/silver1',
        'images/silver/silver2',
        'images/silver/silver3',
        'images/silver/silver4',
        'images/silver/silver5',
        'images/silver/silver6',
        'images/silver/silver7',
        'images/silver/silver8',
        'images/silver/silver9',
        'images/silver/silver10',
        'images/silver/silver11',
        'images/silver/silver12',
        'images/silver/silver13',
        'images/silver/silver14',
        'images/silver/silver15',

        'images/enemy/slime',
        'images/weapon/sword',
        'images/tree/tree0',
        'images/tree/tree1',
        'images/tree/tree2',
        'images/tree/tree3',
        'images/tree/tree4',
        'images/tree/tree5',
        'images/tree/tree6',
        'images/tree/tree7',
        'images/tree/tree8',
        'images/tree/tree9',
        'images/tree/tree10',
        'images/tree/tree11',
        'images/tree/tree12',
        'images/tree/tree13',
        'images/tree/tree14',
        'images/tree/tree15',
        'images/tree/tree16',
        'images/tree/tree17',
        'images/tree/tree18',
        'images/tree/tree19',
        'images/tree/tree20',
        'images/tree/tree21',
        'images/tree/tree22',
        'images/tree/tree23',
        'images/tree/tree24',
        'images/tree/tree25',
        'images/tree/tree26',
        'images/tree/tree27',
        'images/tree/tree28',
        'images/tree/tree29',


        'images/wood/wood_drop',
        'images/wood/wood0',
        'images/wood/wood1',
        'images/wood/wood2',
        'images/wood/wood3',
        'images/wood/wood4',
        'images/wood/wood5',
        'images/wood/wood6',
        'images/wood/wood7',
        'images/wood/wood8',
        'images/wood/wood9',
        'images/wood/wood10',
        'images/wood/wood11',
        'images/wood/wood12',
        'images/wood/wood13',
        'images/wood/wood14',
        'images/wood/wood15',

        'images/enemy/zombie',
        'images/enemy_drops/zombie_drop',
    ];

  this.loadedImages = 0;
  this.audioLoader = new AudioLoader();

  /**
   * It loads the required image files.
   */
  this.load = function (game, start) {
    var ctx = game.ctx;
    for (var i = 0; i < this.images.length; i++) {

      ctx.beginPath();
      ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.fillText("Loading", 300, 300);


      var img = new Image;
      img.src = this.images[i] + '.png';
      img.onload = () => {
        this.loadedImages += 1;
        if (this.loadedImages == this.images.length - 1) {
          this.audioLoader.loadAudios(start);
        }
      }
    }
  }
}