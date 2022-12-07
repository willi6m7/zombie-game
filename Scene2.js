class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        
        //Adds the background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        //Creates player in center of canvas, then decreases the scale of the player
        player = this.physics.add.sprite(config.width / 2, config.height / 2, "player");
        player.setScale(0.15);

        playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        //Creates the crosshair, positioning it to the right of the player
        this.crosshair = this.physics.add.sprite(config.width / 2 + 64, config.height / 2, "crosshair");

        //Instantiates arrow keys as buttons for game. Need WASD
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.physics.world.setBoundsCollision();
        player.setCollideWorldBounds(true);
        this.crosshair.setCollideWorldBounds(true);
 

        this.zombies = this.physics.add.group();
        this.timerEvent();
        this.triggerTimer = this.time.addEvent({
            callback: this.timerEvent,
            callbackScope: this,
            delay: 15000, // 1000 = 1 second
            loop: true
        });
        

        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        this.input.keyboard.on('keydown_Q', function (event) {
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
        }, 0, this);

        //fire bullet
        this.input.on('pointerdown', function (pointer, time, lastFired) {
            if (player.active == false)
                return;
    
            // Get bullet from bullets group
            var bullet = playerBullets.get().setActive(true).setVisible(true);
    
            if (bullet)
            {
                bullet.fire(player, this.crosshair);
                this.physics.add.collider(enemy, bullet, enemyHitCallback);
            }
        }, this);

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
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, this.crosshair.x, this.crosshair.y);

        
        this.movePlayerManager();

        this.constrainCrosshair(this.crosshair);
        
        this.zombiesMove(this);
    }
    timerEvent() {
        var xAxis = Math.random(Math.floor(500));
        var yAxis = Math.random(Math.floor(500));
        var zombie = this.physics.add.sprite(16, 16, "zombie");
        zombie.setScale(0.2);
        zombie.play("zombieWalk");
        this.physics.world.enableBody(zombie);
        this.zombies.add(zombie);
        
    }
    zombiesMove (scene) {
        this.zombies.children.iterate(function(child){
            scene.physics.moveToObject(child, player);
            child.rotation = Phaser.Math.Angle.Between(child.x, child.y, player.x, player.y);
            child.flipX = child.x < player.x;
        });
    }
    movePlayerManager() {
        player.setVelocity(0);

        if (this.cursorKeys.left.isDown) {
            player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            player.setVelocityX(gameSettings.playerSpeed);
        }

        if (this.cursorKeys.up.isDown) {
            player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            player.setVelocityY(gameSettings.playerSpeed);
        }
    }
    constrainCrosshair(crosshair) {
        var distX = crosshair.x - player.x; // X distance between player & crosshair
        var distY = crosshair.y - player.y; // Y distance between player & crosshair

        // Ensures crosshair cannot be moved offscreen (player follow)
        if (distX > config.height)
            crosshair.x = player.x + config.height;
        else if (distX < -config.height)
            crosshair.x = player.x - config.height;

        if (distY > config.width)
            crosshair.y = player.y + config.width;
        else if (distY < -config.width)
            crosshair.y = player.y - config.width;
    }
}
