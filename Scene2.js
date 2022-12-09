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
        //Ammo counter HUD
        ammoScoreCounter = this.add.image(10, 10, 'status');
        ammoScoreCounterText = this.add.text(30, 0, '');

        //Creates player in center of canvas, then decreases the scale of the player
        player = this.physics.add.sprite(config.width / 2, config.height / 2, "player");
        player.setScale(0.20).setSize(60,60);

        playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        ammoAmount = 10;

        this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        pads = this.input.gamepad.gamepads;

        //Creates the crosshair, positioning it to the right of the player
        this.crosshair = this.physics.add.sprite(config.width / 2 + 64, config.height / 2, "crosshair");

        //Instantiates arrow keys as buttons for game. Need WASD
        this.cursorKeys = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            reload:Phaser.Input.Keyboard.KeyCodes.R
            });
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

        //HUD
        ammoScoreCounter.setDataEnabled();

        ammoScoreCounter.data.set('ammo', ammoAmount);
        ammoScoreCounter.data.set('score', 0);
        
        ammoScoreCounterText.setText([
            'Ammo: ' + ammoScoreCounter.data.get('ammo'),
            'Score: ' + ammoScoreCounter.data.get('score')
        ]);

        //controller support

        //fire bullet
        this.input.on('pointerdown', this.shootManager, this);

        this.physics.add.overlap(playerBullets, this.zombies, function(bullet, zombie) {
            zombie.destroy();
            ammoScoreCounter.data.set('score',ammoScoreCounter.data.get('score') + 1);
          });
        this.physics.add.collider(player, this.zombies, function(player, zombie) {
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
        ammoScoreCounterText.setText([
            'Ammo: ' + ammoScoreCounter.data.get('ammo'),
            'Score: ' + ammoScoreCounter.data.get('score')
        ]);


        this.movePlayerManager();

        this.constrainCrosshair(this.crosshair);
        
        this.zombiesMove(this);
        this.updatePlayerHitbox();

        this.reloadManager();
        this.moveCursorManager();
        this.gamepadShootManager();
    }
    updatePlayerHitbox() {
        if(this.crosshair.x < player.x) {
            if(this.crosshair.y < player.y){
                //cursor at top-left
                player.setOffset(165,75);
            } else {
                //bott-left
                player.setOffset(160,50);
            }
        } else {
            if(this.crosshair.y > player.y){
                //top-right
                player.setOffset(50,-0);
            } else {
                //bottom-right
                player.setOffset(100,160);
            }
        }
    }
    playerDead() {
        if(!player.active) {
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
                reloading = false;
            gameSettings.zombieSpeed = 400;
            //this.physics.add.collider(this.zombies);
            killer.setVelocity(20);
            //Fade to black
            reloading = false;
            var deathMusic = this.sound.add("deathMusic");
            deathMusic.play();
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
                    yAxis = Math.floor(Math.random() * config.height);
                    break;
                case 1:
                    xAxis = config.width;
                    yAxis = Math.floor(Math.random() * config.height);
                    break;
                case 2:
                    yAxis = 0;
                    xAxis = Math.floor(Math.random() * config.width);
                    break;
                case 3:
                    yAxis = config.height;
                    xAxis = Math.floor(Math.random() * config.width);
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

            //if-else statement: checks number of gamepads connected. if less than one, it reverts to keyboard controls. if more, it uses both keyboard AND controller controls
            if(pads.length > 0){
                for (var i = 0; i < pads.length; i++){
                    var gamepad = pads[i];
                    
                    if (this.cursorKeys.left.isDown || gamepad.leftStick.x < -0.25) {
                        player.setVelocityX(-gameSettings.playerSpeed);
                    }else if (this.cursorKeys.right.isDown || gamepad.leftStick.x > 0.25) {
                        player.setVelocityX(gameSettings.playerSpeed);
                    }
        
                    if (this.cursorKeys.up.isDown || gamepad.leftStick.y < -0.25) {
                        player.setVelocityY(-gameSettings.playerSpeed);
                    } else if (this.cursorKeys.down.isDown || gamepad.leftStick.y > 0.25) {
                        player.setVelocityY(gameSettings.playerSpeed);
                    }
                }
            }
            else{
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
    }

    moveCursorManager(){
        this.crosshair.setVelocity(0);
        if(player.active) {
            for (var i = 0; i < pads.length; i++){
                var gamepad = pads[i];
                
                if (gamepad.rightStick.x < -0.25) {
                    this.crosshair.setVelocityX(-gameSettings.playerLookSpeed);
                }else if (gamepad.rightStick.x > 0.25) {
                    this.crosshair.setVelocityX(gameSettings.playerLookSpeed);
                }
    
                if (gamepad.rightStick.y < -0.25) {
                    this.crosshair.setVelocityY(-gameSettings.playerLookSpeed);
                } else if (gamepad.rightStick.y > 0.25) {
                    this.crosshair.setVelocityY(gameSettings.playerLookSpeed);
                }
            }
        }
    }

    reloadManager(){
        if(player.active){
            if(pads.length > 0){
                for(var i = 0; i < pads.length; i++){
                    var gamepad = pads[i];
                    if(this.cursorKeys.reload.isDown || gamepad.X){
                        reloading = true;
                        player.play('soldierReload');
                        reloadTimer = this.time.delayedCall(1000, reloadEvent, [], this);
                    }
                }
                
            }else{
                if(this.cursorKeys.reload.isDown){
                    reloading = true;
                    player.play('soldierReload');
                    reloadTimer = this.time.delayedCall(1000, reloadEvent, [], this);
                }
            }
        }
    }

    shootManager(){
        if(player.active){
            if (player.active == false || ammoScoreCounter.data.get('ammo') == 0)
                return;

            if (reloading == true)
                return;
                
    
            // Get bullet from bullets group
            var bullet = playerBullets.get().setActive(true).setVisible(true);
    
            if (bullet)
            {
                player.play("shoot");
                bullet.fire(player, this.crosshair);
                ammoScoreCounter.data.set('ammo', ammoAmount -= 1);
                bullet.fire(player, this.crosshair);
                //this.physics.add.collider(enemy, bullet, enemyHitCallback);
            }
        }
    }

    gamepadShootManager(){
        if(player.active){
            if(pads.length > 0){
                for(var i = 0; i < pads.length; i++){
                    var gamepad = pads[i];

                    if(gamepad.R2 < 0.1){
                        hasShot = false;
                    }

                    if(hasShot == false){
                        if(gamepad.R2 > 0.1){
                            if (player.active == false || ammoScoreCounter.data.get('ammo') == 0)
                            return;
    
                            if (reloading == true)
                            return;
                    
        
                            // Get bullet from bullets group
                            var bullet = playerBullets.get().setActive(true).setVisible(true);
        
                            if (bullet)
                            {
                                player.play("shoot");
                                bullet.fire(player, this.crosshair);
                                ammoScoreCounter.data.set('ammo', ammoAmount -= 1);
                                bullet.fire(player, this.crosshair);
                                //this.physics.add.collider(enemy, bullet, enemyHitCallback);
                                hasShot = true;
                            }
                        }
                    }
                }
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

