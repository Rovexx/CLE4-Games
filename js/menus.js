let clicked = false;
// if scripts are loaded start UI code
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("buttonStartGame").addEventListener("click", obd.show)
    document.getElementById("buttonTerugNaarSpel").addEventListener("click", closeGameMenu)
    document.getElementById("buttonGameMenu").addEventListener("click", openGameMenu)
    document.getElementById("speed").addEventListener("click", evolveSpeed)
    document.getElementById("bodySize").addEventListener("click", evolveBodySize)
    document.getElementById("temperature").addEventListener("click", evolveTemperature)
    document.getElementById("depth").addEventListener("click", evolveDepth)
    document.getElementById("buttonStoppen").addEventListener("click", location.reload)
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
}

// food bar
function increaseFood(){
    let element = document.getElementById("food");
    if (player.food < player.maxFood){
        element.style.width = player.food + 10 + "%"
        player.food += 10
    }
    else{
        element.style.width = "0%"
        player.food = 0
        openEvolveMenu()
    }
}

// Evolving actions
function evolveSpeed(el){
    if (!clicked) {

        // current value not more then the max
        if (player.speed < player.maxSpeed){
            // increase evolve bar
            el.target.value++;
            // increase value op attribute
            player.speed += 100;
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
function evolveBodySize(el){
    if (!clicked) {

        // current value not more then the max
        if (player.bodySize < player.maxBodySize){
            el.target.value ++;
            player.bodySize += 1;
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
function evolveTemperature(el){
    if (!clicked) {
        // current value not more then the max
        if (player.temperature < player.maxTemperature){
            el.target.value ++;
            player.temperature += 500;
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
function evolveDepth(el){
    if (!clicked) {

        // current value not more then the max
        if (player.depth < player.maxDepth){
            el.target.value++;
            player.depth += 200;
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


// Opening and closing menu's
function openStartMenu() {
    document.getElementById("startMenu").classList.remove("hide");
    game.loop.sleep()
    sound.play("click")
}
function closeStartMenu() {
    document.getElementById("startMenu").classList.add("hide");
    sound.play("click")
}

function showUI() {
    document.getElementById("UI").classList.remove("hide");
}
function closeUI() {
    document.getElementById("UI").classList.add("hide");
}

function openGameMenu() {
    document.getElementById("gameMenu").classList.remove("hide");
    game.loop.sleep()
    sound.play("click")
}
function closeGameMenu() {
    document.getElementById("gameMenu").classList.add("hide");
    game.loop.wake()
    sound.play("click")
}

function openEvolveMenu() {
    document.getElementById("evolveMenu").classList.remove("hide");
    game.loop.sleep()
    // Force a stop in updates
    gameOver = true

    if (enemy !== false && enemy !== true) {
        sound.net.pause()

        enemy.sprite.body.velocity.xOld = enemy.sprite.body.velocity.x
        enemy.sprite.body.velocity.yOld = enemy.sprite.body.velocity.y

        enemy.sprite.body.velocity.x = 0
        enemy.sprite.body.velocity.y = 0
    }
    else if (net._sprite !== false) {
        sound.net.pause()

        net._sprite.body.velocity.xOld = net._sprite.body.velocity.x

        net._sprite.body.velocity.x = 0
    }
    else {
        sound.net.stop()
    }

    sound.music.volume = 0.3
}
function closeEvolveMenu() {
    document.getElementById("evolveMenu").classList.add("hide");
    clicked = false;
    gameOver = false
    game.loop.wake()
    sound.music.volume = 0.5

    if (enemy !== false && enemy !== true) {
        sound.net.pause()

        enemy.sprite.body.velocity.x = enemy.sprite.body.velocity.xOld
        enemy.sprite.body.velocity.y = enemy.sprite.body.velocity.yOld
    }
    else if (net._sprite !== false) {
        sound.net.resume()
        net._sprite.body.velocity.x = net._sprite.body.velocity.xOld
    }
}
