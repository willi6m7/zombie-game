var config = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    scene: [MainMenu, Scene1],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }
}
var game = new Phaser.Game(config);