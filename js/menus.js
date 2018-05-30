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
    document.getElementById("camouflage").addEventListener("click", evolveCamouflage);
    document.getElementById("size").addEventListener("click", evolveSize);
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
    console.log(hasStarted);
}
function evolveMenu(){
    openEvolveMenu();
    console.log(hasStarted);
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
    clicked = true
    if (clicked) {
        el.srcElement.value++;
        player.speed += 100;
        // Dont go faster then the max speed
        if (player.speed >= player.maxSpeed) {
            player.speed = player.maxSpeed;
        }
    }
    setTimeout(closeEvolveMenu, 1000);
    clicked = false;
}
function evolveSight(el){
    el.srcElement.value ++;
    player.sight += 1;
    setTimeout(closeEvolveMenu, 1000);
}
function evolveCamouflage(el){
    el.srcElement.value ++;
    player.camouflage += 1;
    setTimeout(closeEvolveMenu, 1000);
}
function evolveSize(el){
    el.srcElement.value ++;
    player.bodySize += 1
    setTimeout(closeEvolveMenu, 1000);
}
function evolveTemperature(el){
    el.srcElement.value ++;
    player.temperatureResistance += 1;
    setTimeout(closeEvolveMenu, 1000);
}
function evolveDepth(el){
    el.srcElement.value ++;
    player.maxDepth += 1;
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
}
