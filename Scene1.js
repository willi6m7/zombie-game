class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload(){
      this.load.image("background", "assets/images/background.png");
      //
      this.load.spritesheet("player", "assets/spritesheets/soldier/walk/survivor-move_rifle_0.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player1", "assets/spritesheets/soldier/walk/survivor-move_rifle_1.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player2", "assets/spritesheets/soldier/walk/survivor-move_rifle_2.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player3", "assets/spritesheets/soldier/walk/survivor-move_rifle_3.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player4", "assets/spritesheets/soldier/walk/survivor-move_rifle_4.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player5", "assets/spritesheets/soldier/walk/survivor-move_rifle_5.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player6", "assets/spritesheets/soldier/walk/survivor-move_rifle_6.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player7", "assets/spritesheets/soldier/walk/survivor-move_rifle_7.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player8", "assets/spritesheets/soldier/walk/survivor-move_rifle_8.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player9", "assets/spritesheets/soldier/walk/survivor-move_rifle_9.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player10", "assets/spritesheets/soldier/walk/survivor-move_rifle_10.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player11", "assets/spritesheets/soldier/walk/survivor-move_rifle_11.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player12", "assets/spritesheets/soldier/walk/survivor-move_rifle_12.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player13", "assets/spritesheets/soldier/walk/survivor-move_rifle_13.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player14", "assets/spritesheets/soldier/walk/survivor-move_rifle_14.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player15", "assets/spritesheets/soldier/walk/survivor-move_rifle_15.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player16", "assets/spritesheets/soldier/walk/survivor-move_rifle_16.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player17", "assets/spritesheets/soldier/walk/survivor-move_rifle_17.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player18", "assets/spritesheets/soldier/walk/survivor-move_rifle_18.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("player19", "assets/spritesheets/soldier/walk/survivor-move_rifle_19.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("shoot0", "assets/spritesheets/soldier/shoot/survivor-shoot_rifle_0.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("shoot1", "assets/spritesheets/soldier/shoot/survivor-shoot_rifle_1.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("shoot2", "assets/spritesheets/soldier/shoot/survivor-shoot_rifle_2.png",{
        frameWidth: 313,
        frameHeight: 206
      });
      this.load.spritesheet("crosshair", "assets/spritesheets/crosshair.png",{
        frameWidth: 400,
        frameHeight: 400
      });
      this.load.spritesheet("zombie0", "assets/spritesheets/zombie/moving/skeleton-move_0.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie1", "assets/spritesheets/zombie/moving/skeleton-move_1.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie2", "assets/spritesheets/zombie/moving/skeleton-move_2.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie3", "assets/spritesheets/zombie/moving/skeleton-move_3.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie4", "assets/spritesheets/zombie/moving/skeleton-move_4.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie5", "assets/spritesheets/zombie/moving/skeleton-move_5.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie6", "assets/spritesheets/zombie/moving/skeleton-move_6.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie7", "assets/spritesheets/zombie/moving/skeleton-move_7.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie8", "assets/spritesheets/zombie/moving/skeleton-move_8.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie9", "assets/spritesheets/zombie/moving/skeleton-move_9.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie10", "assets/spritesheets/zombie/moving/skeleton-move_10.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie11", "assets/spritesheets/zombie/moving/skeleton-move_11.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie12", "assets/spritesheets/zombie/moving/skeleton-move_12.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie13", "assets/spritesheets/zombie/moving/skeleton-move_13.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie14", "assets/spritesheets/zombie/moving/skeleton-move_14.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie15", "assets/spritesheets/zombie/moving/skeleton-move_15.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.spritesheet("zombie16", "assets/spritesheets/zombie/moving/skeleton-move_16.png",{
        frameWidth: 288,
        frameHeight: 311
      });
      this.load.image("bullet", "assets/spritesheets/bullet.png",{
        frameWidth: 12,
        frameHeight: 12
      });
  
      this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }
  
    create() {
      this.add.text(config.width/2,config.height/2, 'Press Space to Start');
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.anims.create({
        key: "zombieWalk",
        frames: [
          { key: 'zombie0' },
          { key: 'zombie1' },
          { key: 'zombie2' },
          { key: 'zombie3' },
          { key: 'zombie4' },
          { key: 'zombie5' },
          { key: 'zombie6' },
          { key: 'zombie7' },
          { key: 'zombie8' },
          { key: 'zombie9' },
          { key: 'zombie10' },
          { key: 'zombie11' },
          { key: 'zombie12' },
          { key: 'zombie13' },
          { key: 'zombie14' },
          { key: 'zombie15' },
          { key: 'zombie16' }
        ],
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "soldierWalk",
        frames: [
          { key: 'player' },
          { key: 'player1' },
          { key: 'player2' },
          { key: 'player3' },
          { key: 'player4' },
          { key: 'player5' },
          { key: 'player6' },
          { key: 'player7' },
          { key: 'player8' },
          { key: 'player9' },
          { key: 'player10' },
          { key: 'player11' },
          { key: 'player12' },
          { key: 'player13' },
          { key: 'player14' },
          { key: 'player15' },
          { key: 'player16' },
          { key: 'player17' },
          { key: 'player18' },
          { key: 'player19' },
        ],
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "shoot",
        frames: [
          { key: 'shoot0' },
          { key: 'shoot1' },
          { key: 'shoot2' },
        ],
        frameRate: 10,
        repeat: 2
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
  