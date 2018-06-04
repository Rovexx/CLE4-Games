let hasStarted = false;
let clicked = false;
// if scripts are loaded start UI code
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("buttonStartGame").addEventListener("click", startGame);
    document.getElementById("buttonTerugNaarSpel").addEventListener("click", backToGame);
    document.getElementById("buttonStoppen").addEventListener("click", stopGame);
    document.getElementById("buttonGameMenu").addEventListener("click", gameMenu);
    document.getElementById("speed").addEventListener("click", evolveSpeed);
    document.getElementById("sight").addEventListener("click", evolveSight);
    document.getElementById("bodySize").addEventListener("click", evolveBodySize);
    document.getElementById("temperature").addEventListener("click", evolveTemperature);
    document.getElementById("depth").addEventListener("click", evolveDepth);
})
// Menu actions (opening and closing menus)
function startGame(){
    closeStartMenu();
    showUI();
}
function backToGame(){
    closeGameMenu();
}
function stopGame(){
    closeUI();
    closeGameMenu();
    closeEvolveMenu();
    openStartMenu();
}
function gameMenu(){
    openGameMenu();
}
function evolveMenu(){
    openEvolveMenu();
}

// health bar
function modifyHealth(increase){
    let element = document.getElementById("health");
    let style = window.getComputedStyle(element);
    let currentValue = (parseInt(style.width)/250)*100;
    if (increase){
        if (currentValue < 100) {
            element.style.width = currentValue + 10 + "%";
        }
    }
    else{
        if (currentValue > 10) {
            element.style.width = currentValue - 10 + "%";
        }
        else{
            element.style.width = "100%"
            stopGame();
        }
    }
}

// food bar
function increaseFood(){
    let element = document.getElementById("food");
    let style = window.getComputedStyle(element);
    let currentValue = (parseInt(style.width)/250)*100
    if (currentValue < 90) {
        element.style.width = currentValue + 10 + "%"
    }
    else {
        evolveMenu();
        element.style.width = "0%";
    }
}


// Evolving actions
function evolveSpeed(el){
    if (!clicked) {
        clicked = true;
        // current value not more then the max
        if (player.speed <= player.maxSpeed){
            el.srcElement.value ++;
            player.speed += 100;
        }
    }
    setTimeout(closeEvolveMenu, 1000);
}
function evolveSight(el){
    if (!clicked) {
        console.log("sight")
        // current value not more then the max
        if (player.sight <= player.maxSight){
            el.srcElement.value ++;
            player.sight += 100;
        }
    }
    setTimeout(closeEvolveMenu, 1000);
    clicked = true;
}
function evolveBodySize(el){
    if (!clicked) {
        // current value not more then the max
        if (player.bodySize <= player.maxBodySize){
            el.srcElement.value ++;
            player.bodySize += 100;
        }
    }
    setTimeout(closeEvolveMenu, 1000);
    clicked = true;
}
function evolveTemperature(el){
    if (!clicked) {
        // current value not more then the max
        if (player.temperature <= player.maxTemperature){
            el.srcElement.value ++;
            player.temperature += 100;
        }
    }
    setTimeout(closeEvolveMenu, 1000);
    clicked = true;
}
function evolveDepth(el){
    if (!clicked) {
        clicked = true;
        // current value not more then the max
        if (player.depth <= player.maxDepth){
            el.srcElement.value ++;
            player.depth += 100;
        }
    }
    setTimeout(closeEvolveMenu, 1000);
}


// Opening and closing menu's
function openStartMenu() {
    document.getElementById("startMenu").classList.remove("hide");
    hasStarted = false;
}
function closeStartMenu() {
    document.getElementById("startMenu").classList.add("hide");
    hasStarted = true;
}

function showUI() {
    document.getElementById("UI").classList.remove("hide");
}
function closeUI() {
    document.getElementById("UI").classList.add("hide");
}

function openGameMenu() {
    document.getElementById("gameMenu").classList.remove("hide");
    hasStarted = false;
}
function closeGameMenu() {
    document.getElementById("gameMenu").classList.add("hide");
    hasStarted = true;
}

function openEvolveMenu() {
    document.getElementById("evolveMenu").classList.remove("hide");
    hasStarted = false;
}
function closeEvolveMenu() {
    document.getElementById("evolveMenu").classList.add("hide");
    hasStarted = true;
    clicked = false;
}
