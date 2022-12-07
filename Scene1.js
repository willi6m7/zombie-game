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
      this.load.image("bullet", "assets/spritesheets/bullet.png",{
        frameWidth: 12,
        frameHeight: 12
      });
  
      this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }
  
    create() {
      this.add.text(0, 0, 'Press Space to Start');
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    startGame(){
      this.scene.start('playGame');
    }

    update(){
      if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
        this.startGame();
      }
    }
  }
  