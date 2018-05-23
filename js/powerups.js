class Powerup {
	constructor(init, posX, posY) {
		this.game = init;
        this.sprite = this.game.physics.add.sprite(posX, posY, 'powerup_icon');
        this.sprite.setScale(0.2);
        this.sprite.body.allowGravity = false;
	}
}