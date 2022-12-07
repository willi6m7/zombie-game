class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        game.input.mouse.requestPointerLock();
        //Adds the background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        //Creates player in center of canvas, then decreases the scale of the player
        player = this.physics.add.sprite(config.width / 2, config.height / 2, "player");
        player.setScale(0.20).setSize(160,160);


        //Creates the crosshair, positioning it to the right of the player
        this.crosshair = this.physics.add.sprite(config.width / 2 + 64, config.height / 2, "crosshair");

        //Instantiates arrow keys as buttons for game. Need WASD
        this.cursorKeys = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});
        this.physics.world.setBoundsCollision();
        player.setCollideWorldBounds(true);
        this.crosshair.setCollideWorldBounds(true);
 
        this.zombies = this.physics.add.group();
        
        this.spawnZombies();
        this.triggerTimer = this.time.addEvent({
            callback: this.spawnZombies,
            callbackScope: this,
            delay: gameSettings.spawnTime, // 1000 = 1 second
            loop: true
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
                player.play("shoot");
                bullet.fire(player, this.crosshair);
            }
        }, this);

        this.physics.add.overlap(playerBullets, this.zombies, function(bullet, zombie) {
            bullet.destroy();
            zombie.destroy();
          });
        this.physics.add.overlap(player, this.zombies, function(player, zombie) {
            killer = zombie;
            player.active = false;
          });
        // Move reticle upon locked pointer move
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked) {
                this.crosshair.x += pointer.movementX;
                this.crosshair.y += pointer.movementY;
            }
        }, this);
        player.play("soldierWalk");
    }
    update() {
        // Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, this.crosshair.x, this.crosshair.y);

        this.playerDead();
        this.movePlayerManager();

        this.constrainCrosshair(this.crosshair);
        
        this.zombiesMove(this);
        this.updatePlayerHitbox();
    }
    updatePlayerHitbox() {
        if(this.crosshair.x < player.x) {
            player.setOffset(80,20);
        } else {
            player.setOffset(20,20);
        }
    }
    playerDead() {
        if(!player.active) {
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
            gameSettings.zombieSpeed = 400;
            //this.physics.add.collider(this.zombies);
            killer.setVelocity(20);
            //Fade to black
            this.scene.start("deathScene");
        }
    }
    spawnZombies() {
        var numZombiesSpawn = Math.floor((Math.random() * 6) + 1);
        for(let i = 0; i < numZombiesSpawn; i++) {
            var xAxis = 0;
            var yAxis = 0;
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    xAxis = 0;
                    yAxis = Math.floor(Math.random() * 300);
                    break;
                case 1:
                    xAxis = 500;
                    yAxis = Math.floor(Math.random() * 300);
                    break;
                case 2:
                    yAxis = 0;
                    xAxis = Math.floor(Math.random() * 500);
                    break;
                case 3:
                    yAxis = 300;
                    xAxis = Math.floor(Math.random() * 500);
                    break;
            }
                
            var zombie = this.physics.add.sprite(xAxis, yAxis, "zombie").setSize(160,165).setOffset(75,50).setScale(0.2).play("zombieWalk").setVelocity(gameSettings.zombieSpeed);
            
            this.physics.world.enableBody(zombie);
            this.zombies.add(zombie, true);
        }
    }
    zombiesMove (scene) {
        this.zombies.children.iterate(function(child){
            scene.physics.moveToObject(child, player);
            child.rotation = Phaser.Math.Angle.Between(child.x, child.y, player.x, player.y);
        });
    }
    movePlayerManager() {
        player.setVelocity(0);
        if(player.active) {
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
