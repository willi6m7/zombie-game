class Scene3 extends Phaser.Scene {
    constructor() {
        super("deathScene");
    }
    create() {
        this.add.text(0,0,'You Died!', { fill: '#af111c', font: '64px Arial' });
        var button = this.add.text(50, 200, "Play Again")
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.startGame())
            .on('pointerover', () => button.setStyle({ fill: '#af111c' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
    update(){

    }
    startGame() {
        this.scene.start("playGame");
    }
}