let clicked = false
let savedVelo = {x: -1, y: -1}

let hasExplained = {
    speed: false,
    size: false,
    temperature: false,
    depth: false
}

const explainerTexts = {
	speed: "Dankzij evolutie hebben vissen meer en sterkere spieren om sneller te zwemmen, zo kunnen zij van hun vijhanden ontsnappen",
	size: "Vissen die door evolutie groter zijn geworden kunnen meer voedsel eten. Ook hebben zij minder vijhanden dankzij hun formaat",
	temperature: "Door evolutie zijn vissen koudbloedig, dit zorgt ervoor dat zij beter tegen temperatuur veschillen kunnen",
	depth: "In tegenstelling tot mensen hebben vissen geen lucht in hun lichaam, hierdoor kunnen zij beter tegen de druk van diepe wateren"
}

// if scripts are loaded start UI code
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("buttonStartGame").addEventListener("click", obd.show)
    document.getElementById("buttonTerugNaarSpel").addEventListener("click", closeGameMenu)
    document.getElementById("buttonGameMenu").addEventListener("click", openGameMenu)
    document.getElementById("speedBar").addEventListener("click", evolveSpeed)
    document.getElementById("bodySizeBar").addEventListener("click", evolveBodySize)
    document.getElementById("temperatureBar").addEventListener("click", evolveTemperature)
    document.getElementById("depthBar").addEventListener("click", evolveDepth)
    document.getElementById("explainerCont").addEventListener("click", closeEvolveMenu)
    document.getElementById("buttonStoppen").addEventListener("click", function(){location.reload()})
})

// Menu actions (opening and closing menus)
function startGame() {
    showUI()
    game.loop.wake()

    /* delay zodat de eerste game loop 
     niet gelijk de klik registreerd */
    setTimeout(function(){
        isPlaying = true
    } ,1)
}

// health bar
function increaseHealth(value){
    let element = document.getElementById("health")
    if (player.health >= player.maxHealth){
        element.style.width = "100%"
    }
    else{
        element.style.width = (player.health + value) + "%"
        player.health += value
    }

    let painValue = 20 - (player.health / 100 * 80)
    document.getElementById("UI").style.boxShadow = "inset 0px 0px 50vh " + painValue + "vh rgba(255, 0, 0, .8)"
}
function decreaseHealth(value){
    let element = document.getElementById("health")
    if (player.health <= 0){
        element.style.width = "0%"
        player.die()
    }
    else{
        element.style.width = (player.health - value) + "%"
        player.health -= value
    }

    if (player.health < 50) {
        camera.main.shake(100, 0.005)
    }

    let painValue = 20 - (player.health > 0 ? player.health : 0 / 100 * 80)
    document.getElementById("UI").style.boxShadow = "inset 0px 0px 50vh " + painValue + "vh rgba(255, 0, 0, .8)"
}

// food bar
function increaseFood(){
    let element = document.getElementById("food")
    if (player.food < player.maxFood){
        element.style.width = player.food + 10 + "%"
        player.food += 10
    }
    // If you are fully evolved
    else if(player.speed === player.maxSpeed && player.bodySize === player.maxBodySize && player.temperature === player.maxTemperature && player.depth === player.maxDepth){
        element.style.width = "0"
        player.food = 0
    }
    // If you are not fully evolved, this happens
    else{
        element.style.width = "0%"
        player.food = 0
        openEvolveMenu()
    }
}
// Evolving actions
function evolveSpeed(){
    if (!clicked) {

        // current value not more then the max
        if (player.speed < player.maxSpeed){
            // increase evolve bar
	        let element = document.getElementById("speed")
	        element.style.width = player.speedPercent + 20 + "%"
	        player.speedPercent += 20
            player.speed += 100
            sound.play("upgrade")
            // the evolve is done, you can no longer click a bar
            clicked = true

            setTimeout(function() {
                showExplainer("speed")
            }, 1000)
        }
        // if the maximum is already reached
        else{
            sound.play("max")
        }
    }
}
function evolveBodySize(){
    if (!clicked) {

        // current value not more then the max
        if (player.bodySize < player.maxBodySize){
	        let element = document.getElementById("bodySize")
	        element.style.width = player.bodySizePercent + 25 + "%"
	        player.bodySizePercent += 25
            player.bodySize += 1
            sound.play("upgrade")
            // the evolve is done, you can no longer click a bar
            clicked = true

            setTimeout(function() {
                showExplainer("size")
            }, 1000)
        }
        // if the maximum is already reached
        else{
            sound.play("max")
        }
    }
}
function evolveTemperature(){
    if (!clicked) {
        // current value not more then the max
        if (player.temperature < player.maxTemperature){
	        let element = document.getElementById("temperature")
	        element.style.width = player.temperaturePercent + 33.5 + "%"
	        player.temperaturePercent += 33.5
            player.temperature += 500
            sound.play("upgrade")
            // the evolve is done, you can no longer click a bar
            clicked = true

            setTimeout(function() {
                showExplainer("temperature")
            }, 1000)
        }
        // if the maximum is already reached
        else{
            sound.play("max")
        }
    }
}
function evolveDepth(){
    if (!clicked) {

        // current value not more then the max
        if (player.depth < player.maxDepth){
	        let element = document.getElementById("depth")
	        element.style.width = player.depthPercent + 25 + "%"
	        player.depthPercent += 25
            player.depth += 200
            sound.play("upgrade")
            // the evolve is done, you can no longer click a bar
            clicked = true

            setTimeout(function() {
                showExplainer("depth")
            }, 1000)
        }
        // if the maximum is already reached
        else{
            sound.play("max")
        }
    }
}

function showExplainer(type) {
    document.getElementById("evolveMenu").classList.add("hide")

    if (hasExplained[type]) {
        return closeEvolveMenu()
    }

    hasExplained[type] = true

    document.getElementById("explainer").classList.remove("hide")
    document.getElementById("explainerText").innerHTML = explainerTexts[type]

    setTimeout(function () {
        document.getElementById("explainerImg").className = type
    }, 800)
}

function closeEvolveMenu() {
    document.getElementById("explainer").classList.add("hide")
    document.getElementById("explainerImg").className = ""

    clicked = false
    sound.music.volume = 0.5
    gameResume()
    
}

// Opening and closing menu's
function closeStartMenu() {
    document.getElementById("startMenu").classList.add("hide")
    sound.play("click")
}

function showUI() {
    document.getElementById("UI").classList.remove("hide")
}

function openGameMenu() {
    document.getElementById("gameMenu").classList.remove("hide")
    sound.play("click")
    gamePause()
}
function closeGameMenu() {
    document.getElementById("gameMenu").classList.add("hide")
    sound.play("click")
    gameResume()
}

function openEvolveMenu() {
    document.getElementById("evolveMenu").classList.remove("hide")
    sound.music.volume = 0.3
    gamePause()
}

function gamePause(){
    isPlaying = false
    game.loop.sleep()
    // Force a stop in updates
    gameOver = true

    if (enemy !== false && enemy !== true) {
        sound.net.pause()

        savedVelo.x = enemy.sprite.body.velocity.x
        savedVelo.y = enemy.sprite.body.velocity.y
        enemy.sprite.setVelocity(0, 0)
    }
    else if (net._sprite !== false) {
        sound.net.pause()

        savedVelo.x = net._sprite.body.velocity.x
        net._sprite.body.setVelocity(0, 0)
    }
    else {
        sound.net.stop()
    }
}

function gameResume(){
    isPlaying = true
    game.loop.wake()
    gameOver = false
    if (enemy !== false && enemy !== true) {
        sound.net.resume()
        enemy.sprite.setVelocity(savedVelo.x, savedVelo.y)
    }
    else if (net._sprite !== false) {
        sound.net.resume()
        net._sprite.setVelocity(savedVelo.x, 0)
    }
}
