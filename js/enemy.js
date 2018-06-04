class Enemy {
	/**
	 * Spawn a new enemy enemy fish
	 * @param {Object} context The game context
	 * @param {Int} top The y position to spawn a fish
	 * @param {Int} left The x position to spawn a fish
	 */
	constructor(context, top, left) {
		// Set default values
		//this.angle = 0;
		this.context = context

		// Spawn the fish and set the origin
		this.sprite = context.physics.add.sprite(top, left, "enemy");
		this.sprite.body.allowGravity = false;
		this.sprite.setOrigin(0.5, 0.5)
	}

	update() {
		if (this.sprite.active === true) {
			// Calculate the difference between the position of the player and the enemy
			var dx = this.sprite.x - player.sprite.x;
			var dy = this.sprite.y - player.sprite.y;

			// Calculate the total angle and distance
			var playerAngle = Math.atan2(dy, dx) * (360 / Math.PI)
			var playerDist = Math.sqrt(dx * dx + dy * dy)

			// Set the sound distance if this is the closest fish yet
			if (sound.distance > playerDist) {
				sound.distance = playerDist
			}

			// Angle the fish away from the player
			this.sprite.angle = playerAngle

			var speed = 250
			speed = speed * (speed / playerDist)

			// Move to a target that's away from the player
			var moveTarget = this.context.physics.velocityFromAngle(playerAngle, speed, this.sprite.velocity)
			// Set the velocity towards the target with 20% of randomness
			this.sprite.setVelocity(moveTarget.x * (Math.random() * (1.2 - 0.8) + 0.8), moveTarget.y * (Math.random() * (1.2 - 0.8) + 0.8))
		}
	}
}
