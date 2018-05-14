class Ai {
	/**
	 * Spawn a new AI fish
	 * @param {Obj} context The game context
	 */
	constructor(context) {
		// Set default values
		this.angle = 0;
		this.anistep = 0;
		this.speed = 1
		this.context = context

		// Spawn the fish and set the origin
		this.sprite = context.physics.add.sprite(400, 300, "ai");
		this.sprite.body.allowGravity = false;
		this.sprite.setOrigin(0.5, 0.5)
	}

	update() {
		// Calculate the difference between the position of the player and the ai
		var dx = this.sprite.x - ground.x;
		var dy = this.sprite.y - ground.y;

		// Calculate the total angle and distance
		var playerAngle = Math.atan2(dy, dx) * (180 / Math.PI)
		var playerDist = Math.sqrt(dx * dx + dy * dy)

		// Angle the fish away from the plaer
		this.sprite.angle = playerAngle

		var speed = 100
		speed = -speed * (speed / playerDist)

		var vector = {x: 0, y: 0}

		if (playerAngle < -90) {
			vector.x = (playerAngle - 90) / 90 * -1;
			vector.y = (playerAngle - 90) / 90 * -1;
		}

		else if (playerAngle > -90 && playerAngle < 0) {
			vector.x = playerAngle / 90;
			vector.y = playerAngle / 90 * -1;
		}

		else if (playerAngle > 0 && playerAngle < 90) {
			vector.x = playerAngle / 90 * -1;
			vector.y = playerAngle / 90 + 1 * -1;
		}

		else if (playerAngle > 90) {
			vector.x = (playerAngle - 90) / 90;
			vector.y = (playerAngle - 90) / 90 * -1;
		}

		this.sprite.setVelocity(speed * vector.x, speed * vector.y)


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
