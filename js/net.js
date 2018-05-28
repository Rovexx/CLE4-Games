class Net {
	constructor(context) {
		this.sprite = context.physics.add.sprite(-600, 0, "net").setScrollFactor(0);
		this.sprite.body.allowGravity = false;
		this.sprite.setScrollFactor(0)
		this.sprite.setOrigin(0, 0)

		sound.play("net")

		setTimeout(() => {
			this.sprite.body.velocity.x = 20
		}, 4500)

		setTimeout(() => {
			this.sprite.body.velocity.x = -300
		}, 18000)
	}
}
