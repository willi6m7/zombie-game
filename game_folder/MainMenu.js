class MainMenu extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        //load images, spritesheets, etc
        this.load.bitmapFont("pixelFont", "game_folder/assets/font/font.png", "game_folder/assets/font/font.xml");
    }

    create(){
        //create anims, scene items, etc.
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