class Powerup {
	constructor(init, xPos, yPos, aantal) {
		aantal = aantal - 1;
		this.game = init;

        this.sprite = init.physics.add.group({
            key: 'powerup_icon',
            repeat: aantal,
            setXY: { x: xPos, y: yPos, stepX: 200 , stepY: 160 }
        });

        this.sprite.children.iterate(function (child) {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setScale(0.2);
            child.body.allowGravity = false;
        });
	}
}