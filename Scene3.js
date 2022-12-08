class Scene3 extends Phaser.Scene {
    constructor() {
        super("deathScene");
    }
    create() {
           
    var sprite = this.add.image( 0, 0,'YouDied');
    //  Center the sprite to the picture
    Phaser.Display.Align.In.Center(sprite, this.add.zone(config.width/2,config.height/2,config.width,config.height));

    var button = this.add.text(50, 200, "Play Again")
    .setOrigin(0.5)
    .setPadding(10)
    .setStyle({ backgroundColor: '#111' })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startGame())
    .on('pointerover', () => button.setStyle({ fill: '#af111c' }))
    .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    sprite.setScale(0.3);

    this.cameras.main.once('camerafadeincomplete', function (camera) {
    });
   this.cameras.main.fadeIn(5000);

    }
    update(){

    }
    startGame() {
        this.scene.start("bootGame");
    }
}