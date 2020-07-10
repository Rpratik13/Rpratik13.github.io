function Preloader() {
  this.images = [
        'images/bg0',
        'images/bg1',
        'images/bg2',

        'images/craft_btn',
        'images/craft0',
        'images/craft1',
        'images/craft2',
        'images/craft3',
        'images/craft4',
        'images/craft5',
        'images/craft6',
        'images/craft7',
        'images/craft8',
        'images/craft9',
        'images/craft10',
        'images/craft11',
        'images/craft12',
        'images/craft13',

        'images/dirt_drop',
        'images/dirt0',
        'images/dirt1',
        'images/dirt2',
        'images/dirt3',
        'images/dirt4',
        'images/dirt5',
        'images/dirt6',
        'images/dirt7',
        'images/dirt8',
        'images/dirt9',
        'images/dirt10',
        'images/dirt11',
        'images/dirt12',
        'images/dirt13',
        'images/dirt14',
        'images/dirt15',

        'images/eye',

        'images/gold_boot',
        'images/gold_chest',
        'images/gold_drop',
        'images/gold0',
        'images/gold1',
        'images/gold2',
        'images/gold3',
        'images/gold4',
        'images/gold5',
        'images/gold6',
        'images/gold7',
        'images/gold8',
        'images/gold9',
        'images/gold10',
        'images/gold11',
        'images/gold12',
        'images/gold13',
        'images/gold14',
        'images/gold15',

        'images/grass0',
        'images/grass1',
        'images/grass2',
        'images/grass3',
        'images/grass4',
        'images/grass5',
        'images/grass6',
        'images/grass7',

        'images/inv',
        'images/player',
        'images/player_head',
        'images/player_pant',
        'images/player_shirt',
        'images/shield',

        'images/silver_boot',
        'images/silver_chest',
        'images/silver_drop',
        'images/silver0',
        'images/silver1',
        'images/silver2',
        'images/silver3',
        'images/silver4',
        'images/silver5',
        'images/silver6',
        'images/silver7',
        'images/silver8',
        'images/silver9',
        'images/silver10',
        'images/silver11',
        'images/silver12',
        'images/silver13',
        'images/silver14',
        'images/silver15',

        'images/slime',
        'images/sword',
        'images/tree0',
        'images/tree1',
        'images/tree2',
        'images/tree3',
        'images/tree4',
        'images/tree5',
        'images/tree6',
        'images/tree7',
        'images/tree8',
        'images/tree9',
        'images/tree10',
        'images/tree11',
        'images/tree12',
        'images/tree13',
        'images/tree14',
        'images/tree15',
        'images/tree16',
        'images/tree17',
        'images/tree18',
        'images/tree19',
        'images/tree20',
        'images/tree21',
        'images/tree22',
        'images/tree23',
        'images/tree24',
        'images/tree25',
        'images/tree26',
        'images/tree27',
        'images/tree28',
        'images/tree29',


        'images/wood_drop',
        'images/wood0',
        'images/wood1',
        'images/wood2',
        'images/wood3',
        'images/wood4',
        'images/wood5',
        'images/wood6',
        'images/wood7',
        'images/wood8',
        'images/wood9',
        'images/wood10',
        'images/wood11',
        'images/wood12',
        'images/wood13',
        'images/wood14',
        'images/wood15',

        'images/zombie',
        'images/zombie_drop',
        'images/lens',
        'images/gel',

    ];

  this.loadedImages = 0;

  this.load = function (ctx, start) {
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
          start();
        }
      }
    }
  }
}