let clicked = false
let savedVelo = {x: -1, y: -1}

// if scripts are loaded start UI code
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("buttonStartGame").addEventListener("click", obd.show)
    document.getElementById("buttonTerugNaarSpel").addEventListener("click", closeGameMenu)
    document.getElementById("buttonGameMenu").addEventListener("click", openGameMenu)
    document.getElementById("speedBar").addEventListener("click", evolveSpeed)
    document.getElementById("bodySizeBar").addEventListener("click", evolveBodySize)
    document.getElementById("temperatureBar").addEventListener("click", evolveTemperature)
    document.getElementById("depthBar").addEventListener("click", evolveDepth)
    document.getElementById("buttonStoppen").addEventListener("click", function(){location.reload()})
})

// Menu actions (opening and closing menus)
function startGame() {
    showUI()
    game.loop.wake()
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

    let painValue = 20 - (player.health / 100 * 80)
    document.getElementById("UI").style.boxShadow = "inset 0px 0px 50vh " + painValue + "vh rgba(255, 0, 0, .8)"
}

// food bar
function increaseFood(){
    let element = document.getElementById("food");
    if (player.food < player.maxFood){
        element.style.width = player.food + 10 + "%"
        player.food += 10
    }
    // If you are fully evolved
    else if(player.speed == player.maxSpeed && player.bodySize == player.maxBodySize && player.temperature == player.maxTemperature && player.depth == player.maxDepth){
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

            // increase value op attribute
            player.speed += 100
            sound.play("upgrade")
            // the evolve is done, you can no longer click a bar
            clicked = true
            setTimeout(closeEvolveMenu, 1000)
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
	        player.speedPercent += 25

            player.bodySize += 1
            sound.play("upgrade")
            // the evolve is done, you can no longer click a bar
            clicked = true
            setTimeout(closeEvolveMenu, 1000)
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
	        element.style.width = player.temperaturePercent + 33.3 + "%"
	        player.temperaturePercent += 33.3

            player.temperature += 400
            sound.play("upgrade")
            // the evolve is done, you can no longer click a bar
            clicked = true;
            setTimeout(closeEvolveMenu, 1000);
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
            setTimeout(closeEvolveMenu, 1000)
        }
        // if the maximum is already reached
        else{
            sound.play("max")
        }
    }
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
    game.loop.sleep()
    sound.play("click")
}
function closeGameMenu() {
    document.getElementById("gameMenu").classList.add("hide")
    game.loop.wake()
    sound.play("click")
}

function openEvolveMenu() {
    document.getElementById("evolveMenu").classList.remove("hide")
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
        net._sprite.body.sprite.setVelocity(0, 0)
    }
    else {
        sound.net.stop()
    }

    sound.music.volume = 0.3
}

function closeEvolveMenu() {
    document.getElementById("evolveMenu").classList.add("hide")
    clicked = false
    gameOver = false
    game.loop.wake()
    sound.music.volume = 0.5

    if (enemy !== false && enemy !== true) {
        sound.net.resume()
        enemy.sprite.setVelocity(savedVelo.x, savedVelo.y)
    }
    else if (net._sprite !== false) {
        sound.net.resume()
        net._sprite.setVelocity(savedVelo.x, 0)
    }
}
