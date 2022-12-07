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
      this.load.spritesheet("zombie", "assets/spritesheets/zombie1.png",{
        frameWidth: 234.5,
        frameHeight: 249
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

      this.anims.create({
        key: "zombieWalk",
        frames: this.anims.generateFrameNumbers("zombie", {
          start: 0,
          end: 5
        }),
        frameRate: 5,
        repeat: -1
      });
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
  