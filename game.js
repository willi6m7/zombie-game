var gameSettings = {
    playerSpeed: 130,
    maxPowerups: 2,
    powerUpVel: 50,
  }
  
  var config = {
    width: 500,
    height: 300,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade:{
          debug: false,
          debugShowVelocity: false
      }
    }
  }
  
  var player = null;
  var healthpoints = null;
  var crosshair = null;
  var moveKeys = null;
  var playerBullets = null;
  var enemyBullets = null;
  var time = 0;
  
  var game = new Phaser.Game(config);