class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload(){
      this.load.image("background", "assets/images/background.png");
      //
      this.load.spritesheet("player", "assets/spritesheets/player.png",{
        frameWidth: 400,
        frameHeight: 200
      });
      this.load.spritesheet("crosshair", "assets/spritesheets/crosshair.png",{
        frameWidth: 400,
        frameHeight: 400
      });
      this.load.spritesheet("bullet", "assets/spritesheets/bullet.png",{
        frameWidth: 12,
        frameHeight: 12
      });
  
      this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }
  
    create() {
      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");
  
    }
  }
  