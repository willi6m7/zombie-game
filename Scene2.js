class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //Adds the background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        //Creates player in center of canvas, then decreases the scale of the player
        this.player = this.physics.add.sprite(config.width / 2, config.height / 2, "player");
        this.player.setScale(0.15);

        //Creates the crosshair, positioning it to the right of the player
        this.crosshair = this.physics.add.sprite(config.width / 2 + 64, config.height / 2, "crosshair");

        //Instantiates arrow keys as buttons for game. Need WASD
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.physics.world.setBoundsCollision();
        this.player.setCollideWorldBounds(true);
        this.crosshair.setCollideWorldBounds(true);

        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        this.input.keyboard.on('keydown_Q', function (event) {
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
        }, 0, this);

        // Move reticle upon locked pointer move
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked) {
                this.crosshair.x += pointer.movementX;
                this.crosshair.y += pointer.movementY;
            }
        }, this);
    }
    update() {
        // Rotates player to face towards reticle
        this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.crosshair.x, this.crosshair.y);
        
        this.movePlayerManager();

        this.constrainCrosshair(this.crosshair);
    }
    movePlayerManager() {
        this.player.setVelocity(0);

        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }

        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
    }
    constrainCrosshair(crosshair) {
        var distX = crosshair.x - this.player.x; // X distance between player & crosshair
        var distY = crosshair.y - this.player.y; // Y distance between player & crosshair

        // Ensures crosshair cannot be moved offscreen (player follow)
        if (distX > config.height)
            crosshair.x = this.player.x + config.height;
        else if (distX < -config.height)
            crosshair.x = this.player.x - config.height;

        if (distY > config.width)
            crosshair.y = this.player.y + config.width;
        else if (distY < -config.width)
            crosshair.y = this.player.y - config.width;
    }
}
