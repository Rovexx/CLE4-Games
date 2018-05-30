class SoundEngine {
	constructor(context) {
		// Set audio markers
		this.markers = {
			ambientLong: {
				name: "ambientLong",
				start: 0,
				duration: 30,
				config: {
					loop: true
				}
			},
			ambientShort: {
				name: "ambientShort",
				start: 0,
				duration: 5,
				config: {
					loop: true
				}
			},
			music: {
				name: "music",
				start: 0,
				duration: 81,
				config: {
					loop: true
				}
			}
		}

		// Set initial distance
		this.distance = Infinity
	}

	load(context) {
		// Load all sounds
		context.load.audio("ambient0", ["assets/sound/ambient0.mp3"])
		context.load.audio("ambient1", ["assets/sound/ambient1.mp3"])
		context.load.audio("music", ["assets/sound/music.mp3"])
		context.load.audio("pitch", ["assets/sound/pitch.mp3"])
		context.load.audio("eat", ["assets/sound/eat.mp3"])
		context.load.audio("net", ["assets/sound/net.mp3"])
		context.load.audio("upgrade", ["assets/sound/upgrade.mp3"])
	}

	create(context) {
		// Start ambiant sounds in a loop
		this.ambient0 = context.sound.add("ambient0")
		this.ambient0.addMarker(this.markers.ambientLong)
		this.ambient0.play("ambientLong")
		this.ambient0.volume = 5

		this.ambient1 = context.sound.add("ambient1")
		this.ambient1.addMarker(this.markers.ambientShort)
		this.ambient1.play("ambientShort")
		this.ambient1.volume = 3.2

		// Start music in a loop
		this.music = context.sound.add("music")
		this.music.addMarker(this.markers.music)
		this.music.play("music")
		this.music.volume = 0.5

		// Ready putch and eat effects
		this.pitch = context.sound.add("pitch")
		this.eat = context.sound.add("eat")
		this.net = context.sound.add("net")
		this.upgrade = context.sound.add("upgrade")
	}

	update(context) {
		// If we can play the pitch effect and an ai is close enough to do se
		if (!this.pitch.isPlaying && this.distance < 750) {
			// Set the rate and pitch depending on the distance
			this.pitch.rate = Math.pow(750 - this.distance, 2) / 200000 + 0.6
			// Do the same for the volume but on a linear scale
			this.pitch.volume = (750 - this.distance) / 750 * 2.6
			this.pitch.play()
		}
	}

	/**
	 * Plasy a sound effect
	 * @param  {string} fx The ID of the sound to play
	 */
	play(fx) {
		this[fx].play()
	}
}
