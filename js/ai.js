class Ai {
	/**
	 * Spawn a new AI fish
	 * @param {Object} context The game context
	 * @param {Int} top The y position to spawn a fish
	 * @param {Int} left The x position to spawn a fish
	 */
	constructor(context, top, left) {
		// Set default values
		this.angle = 0;
		this.anistep = 0;
		this.speed = 1
		this.context = context

		// Spawn the fish and set the origin
		this.sprite = context.physics.add.sprite(top, left, "ai_fish");
		this.sprite.body.allowGravity = false;
		this.sprite.setOrigin(0.5, 0.5)
		//change color:
		let minColorVal = 7 * 1000000;
		this.sprite.setTint(Math.random() * (16777215-minColorVal) + minColorVal );

		//setup animations:
		if(typeof context.anims.anims.entries["ai_swim"] === 'undefined'){
			context.anims.create({
				key: 'ai_swim',
				frames: context.anims.generateFrameNumbers('ai_fish', { start: 0, end: 7 }),
				frameRate: 8,
				repeat: -1
			});
		}
		this.sprite.anims.play("ai_swim");
	}

	update() {
		if (this.sprite.active === true) {
			// Calculate the difference between the position of the player and the ai
			var dx = this.sprite.x - player.sprite.x;
			var dy = this.sprite.y - player.sprite.y;

			// Calculate the total angle and distance
			var playerAngle = Math.atan2(dy, dx) * (180 / Math.PI)
			var playerDist = Math.sqrt(dx * dx + dy * dy)

			// Set the sound distance if this is the closest fish yet
			if (sound.distance > playerDist) {
				sound.distance = playerDist
			}

			// Angle the fish away from the plaer
			this.sprite.angle = playerAngle

			var speed = 100
			speed = speed * (speed / playerDist)

			// Move to a target that's away from the player
			var moveTarget = this.context.physics.velocityFromAngle(playerAngle, speed, this.sprite.velocity)
			// Set the velocity towards the target with 20% of randomness
			this.sprite.setVelocity(moveTarget.x * (Math.random() * (1.2 - 0.8) + 0.8), moveTarget.y * (Math.random() * (1.2 - 0.8) + 0.8))

			// The gradual swiming angle changes
			const stepChanges = [5, 3, 1, 0.5, 0]

			// Wiggle more when the player is close
			var wiggleAmount = playerDist < 280 ? Math.abs(playerDist - 300) / 300 : 0.06
			// Amplify the wiggleing
			wiggleAmount *= 10

			// Reset the animation step when max is reached
			if (this.anistep == 10) {
				this.anistep = 0
			}

			// Angle to the left at first
			if (this.anistep < 5) {
				this.sprite.angle += stepChanges[this.anistep] * wiggleAmount
			}
			// Do the same but to the right
			else {
				this.sprite.angle -= stepChanges[this.anistep - 5] * wiggleAmount
			}

			// Increment the step
			this.anistep++
		}
	}
}
