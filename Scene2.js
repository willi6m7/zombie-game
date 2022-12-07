class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //Adds the background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        //Ammo counter HUD
        ammoScoreCounter = this.add.image(10, 10, 'status');
        ammoScoreCounterText = this.add.text(30, 0, '');

        //Creates player in center of canvas, then decreases the scale of the player
        player = this.physics.add.sprite(config.width / 2, config.height / 2, "player");
        player.setScale(0.15);

        playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        ammoAmount = 10;

        this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //Creates the crosshair, positioning it to the right of the player
        this.crosshair = this.physics.add.sprite(config.width / 2 + 64, config.height / 2, "crosshair");

        //Instantiates arrow keys as buttons for game. Need WASD
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.physics.world.setBoundsCollision();
        player.setCollideWorldBounds(true);
        this.crosshair.setCollideWorldBounds(true);

        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        this.input.keyboard.on('keydown_Q', function (event) {
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
        }, 0, this);

        //HUD
        ammoScoreCounter.setDataEnabled();

        ammoScoreCounter.data.set('ammo', ammoAmount);
        ammoScoreCounter.data.set('score', 0);
        
        ammoScoreCounterText.setText([
            'Ammo: ' + ammoScoreCounter.data.get('ammo'),
            'Score: ' + ammoScoreCounter.data.get('score')
        ]);

        //fire bullet
        this.input.on('pointerdown', function (pointer, time, lastFired) {
            if (player.active == false || ammoScoreCounter.data.get('ammo') == 0)
                return;

            if (reloading == true)
                return;
                
    
            // Get bullet from bullets group
            var bullet = playerBullets.get().setActive(true).setVisible(true);
    
            if (bullet)
            {
                ammoScoreCounter.data.set('ammo', ammoAmount -= 1);
                bullet.fire(player, this.crosshair);
                //this.physics.add.collider(enemy, bullet, enemyHitCallback);
            }
        }, this);

        // Move reticle upon locked pointer move
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked) {
                this.crosshair.x += pointer.movementX;
                this.crosshair.y += pointer.movementY;
            }
        }, this);

        // Reload functionality
        this.input.keyboard.on('keydown_R', function (event) {
            reloading = true;
            reloadTimer = this.time.delayedCall(1000, reloadEvent, [], this);
        }, this);

        


    }

    

    update() {
        // Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, this.crosshair.x, this.crosshair.y);
        ammoScoreCounterText.setText([
            'Ammo: ' + ammoScoreCounter.data.get('ammo'),
            'Score: ' + ammoScoreCounter.data.get('score')
        ]);
        this.movePlayerManager();

        this.constrainCrosshair(this.crosshair);
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

