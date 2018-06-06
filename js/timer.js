var timer = {
	_lastTick: new Date() - 1,

	formatted: "00:00",
	time: 0,

	update: function() {
		if (timer._lastTick + 1000 > new Date()) return

		timer._lastTick = new Date() - 1

		timer.time++
		timer.formatted =  Math.floor(timer.time / 60).toString().padStart(2, "0") +  ":" + (timer.time % 60).toString().padStart(2, "0")

		document.getElementById("timer").innerHTML = timer.formatted

		if (timer.time % 15 == 0) {
			document.getElementById("timer").className = "blink"

			sound.play("timer")

			setTimeout(function () {
				document.getElementById("timer").className = ""
			}, 300)
		}
	}
}
