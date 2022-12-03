class Scene1 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    create(){
        this.add.text(0, 0, 'Started Game!');
        //most of the game functionality will be here
    }
}