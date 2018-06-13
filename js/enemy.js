class Enemy {
	/**
	 * Spawn a new enemy enemy fish
	 * @param {object} context The game context
	 */
	constructor(context) {
		// Set default values
		//this.angle = 0;
		this.context = context

		// Counts the amount of updates run
		this.loop = 0

		// Spawn the fish and set the origin
		// The Y position has a random offset of 300 in both directions
		this.sprite = context.physics.add.sprite(player.sprite.x - 800, player.sprite.y + (600 * (Math.random() - 0.5)), "enemy");
		this.sprite.body.allowGravity = false;
		this.sprite.setOrigin(0.5, 0.5)

		this._baseSpeed = 1 * makeLose
		this._catchUpSpeed = 0
		this._escapeAngle = false

		//setup animations:
		if (typeof context.anims.anims.entries.enemy_swim === 'undefined'){
			context.anims.create({
				key: 'enemy_swim',
				frames: context.anims.generateFrameNumbers('enemy', { start: 0, end: 7 }),
				frameRate: 12,
				repeat: -1
			});
		}
		this.sprite.anims.play("enemy_swim");

	}

	update() {
		if (gameOver) return

		if (this.sprite.active === true) {
			// Calculate the difference between the position of the player and the enemy
			var dx = this.sprite.x - player.sprite.x;
			var dy = this.sprite.y - player.sprite.y;

			// Calculate the total angle and distance
			var playerAngle = Math.atan2(dy, dx) * (180 / Math.PI)
			var playerDist = Math.sqrt(dx * dx + dy * dy)


			if (playerAngle < 180) {
				playerAngle += 180
			}
			else {
				playerAngle -= 180
			}

			// Don't catch up if we're escaping
			if (this._baseSpeed > 0) {
				// If the enemy is almost off the screen
				if (camera.main.scrollX > this.sprite.x + this.sprite.width / 3) {
					this._catchUpSpeed += 2.5
				}
				else if (this._catchUpSpeed > 0) {
					this._catchUpSpeed -= 4
				}
			}

			// Angle the enemy towards from the player
			this.sprite.angle = playerAngle

			var speed = player.speed * this._baseSpeed + this._catchUpSpeed

			// Move to a target that's towards the player
			var moveTarget = this.context.physics.velocityFromAngle(playerAngle, speed, this.sprite.velocity)
			// Set the velocity towards the target with 20% of randomness
			this.sprite.setVelocity(moveTarget.x, moveTarget.y)

			// Set the base speed depending on the anymation length
			if (this.loop == 160) {
				this._baseSpeed = 0.7 * makeLose
			}
			else if (this.loop == 240) {
				net._baseSpeed = 0.8 * makeLose
			}
			else if (this.loop == 960) {
				this._baseSpeed = -4
			}
			else if (this.loop == 1320) {
				this.sprite.destroy()
				this._baseSpeed = 0

				enemy = false
			}

			// Increment the updates count
			this.loop++
		}
	}
}
