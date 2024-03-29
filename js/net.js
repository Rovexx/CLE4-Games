let net = {
	// Contains sprite of active net
	_sprite: false,
	// The speed without player movement
	_baseSpeed: 0,

	// The update frame we're on
	loop: 0,

	/**
	 * Spwan a new net
	 * @param  {object} context The game context
	 */
	spawn: context => {
		// Don't spwan if a net is already in place
		if (net._sprite !== false) return

		// Spawn a net off screen and pin it to the camera
		net._sprite = context.physics.add.sprite(-1800, 0, "net").setScrollFactor(0)
		net._sprite.body.allowGravity = false;
		net._sprite.setScrollFactor(0)
		net._sprite.setOrigin(0, 0)

		// Counts the amount of updates run
		net.loop = 0

		// Net animation:
		if(typeof context.anims.anims.entries.net_waves === 'undefined') {
			context.anims.create({
				key: 'net_waves',
				frames: context.anims.generateFrameNumbers('net', {start: 0, end: 15}),
				frameRate: 16,
				repeat: -1
			});
		}
		net._sprite.anims.play("net_waves");

		// Start jaws
		sound.play("net")
		sound.music.volume = 0

		// Don't move in the first few seconds
		net._baseSpeed = 0
	},

	/**
	 * Update the net opsition
	 * @param  {object} context The game context
	 */
	update: (context) => {
		// Don't update if game is paused
		if (gameOver) return

		// Increment the updates count
		net.loop++

		// Start fast
		if (net.loop == 270) {
			net._baseSpeed = 11
		}

		// Slow down a little
		else if (net.loop == 360) {
			net._baseSpeed = 3
		}

		// Go back to the starting position
		else if (net.loop == 1080) {
			net._baseSpeed = -400
		}

		// Destroy net sprite and reset
		else if (net.loop == 1440 && typeof net._sprite !== "boolean") {
			net._sprite.destroy()
			net._sprite = false
			net._baseSpeed = 0
			sound.music.volume = 0.5
		}

		// Don't update if no net is spawned
		if (net._sprite === false || net._baseSpeed == 0) return

		// Get the raw player speed
		let playerSpeed = player.speedX

		// Set it to 0 if we're not moving
		if (isNaN(playerSpeed)) playerSpeed = 0
		// Make it negative if we're moving towards the net
		if (player.difX < 0) playerSpeed *= -1

		// Set the speed of the net
		net._sprite.body.velocity.x = net._baseSpeed + (150 - playerSpeed / 3)

		// Game over if the player is 600px in the net
		if (context.cameras.cameras[0].scrollX + net._sprite.x > player.sprite.x - 1600) {
			player.die();
		}
	}
}
