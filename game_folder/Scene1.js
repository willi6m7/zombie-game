class Scene1 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    create(){
        this.add.text(0, 259, 'Started Game!');

        const ammoScoreCounter = this.add.image(10, 10, 'status');
        const ammoScoreCounterText = this.add.text(0, 0, '');

        ammoScoreCounter.setDataEnabled();

        ammoScoreCounter.data.set('ammo', 200);
        ammoScoreCounter.data.set('score', 0);
        
        ammoScoreCounterText.setText([
            'Ammo: ' + ammoScoreCounter.data.get('ammo'),
            'Score: ' + ammoScoreCounter.data.get('score')
        ]);
    }
}