document.addEventListener("DOMContentLoaded", function() {
	let clicked = false
	let sc = 0
	let scFunc = [
		() => {
			document.getElementById("obdScPlayer").style.left = "60%"
			document.getElementById("obdText").style.opacity = "0"

			setTimeout(() => {
				sound.play("eat")
			}, 1050)

			setTimeout(() => {
				document.getElementById("obdScAi").style.display = "none"
			}, 1300)
		},
		() => {
			document.getElementById("obdScEnemy").style.left = "12%"
			document.getElementById("obdScAi").style.right = "-15%"

			setTimeout(() => {
				document.getElementById("obdScAi").style.display = "block"
			}, 700)
		},
		() => {
			document.getElementById("obdScEnemy").style.left = "7%"
			document.getElementById("obdScPlayer").style.left = "48%"
			document.getElementById("obdScAi").style.right = "13%"
		},
		() => {
			document.getElementById("obdScAi").style.right = "-50%"

			setTimeout(() => {
				document.getElementById("obdScPlayer").style.left = "150%"
			}, 100)

			setTimeout(() => {
				document.getElementById("obdScEnemy").style.left = "150%"
			}, 200)

			setTimeout(() => {
				document.getElementById("obdBtn").style.transform = "translateX(-50%) scale(1.2)"
			}, 2200)

			document.getElementById("obdBtn").innerHTML = "Start"
			document.getElementById("obdSkip").style.opacity = "0"
		},
		() => {
			document.getElementById("obd").style.display = "none"
			startGame()
		}
	]

	let scText = [
		"Zoek en eet vissen in de zee om evolutie punten te verdienen",
		"Als je genoeg vissen gegeten hebt kun je evolueren. Je kan bijvoorbeeld kiezen om sneller te zwemmen of om groter te worden",
		"Pas op voor de roofvissen die jou proberen te eten en de netten die jou proberen te vangen. Alleen door te evolueren kan je deze ontwijken",
		"De roofvissen en kleine vissen evolueren zelf ook, dus blijf je evolutiepunten goed besteden om niet achter gelaten te worden",
		"Probeer het zo lang mogelijk vol te houden en al je evolutiepunten te besteden!"
	]

	document.getElementById("obdBtn").addEventListener("click", () => {
		if (clicked) return
		clicked = true

		sound.play("click")

		document.getElementById("obdText").style.opacity = "0"

		setTimeout(function () {
			document.getElementById("obdText").innerHTML = scText[sc]
		}, 600)

		setTimeout(function () {
			document.getElementById("obdText").style.opacity = "1"
			clicked = false
		}, 1400)

		scFunc[sc]()
		sc++
	})

	document.getElementById("obdSkip").addEventListener("click", () => {
		document.getElementById("obd").style.display = "none"
		startGame()
	})

	document.getElementById("obdText").innerHTML = scText[0]
})

var obd = {
	show: () => {
		closeStartMenu();
		document.getElementById("obd").style.display = "block"
	}
}
