// on start of game
openStartMenu();
closeUI();
closeGameMenu();

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("buttonStartGame").addEventListener("click", startGame);
    document.getElementById("buttonTerugNaarSpel").addEventListener("click", backToGame);
    document.getElementById("buttonStoppen").addEventListener("click", stopGame);
    document.getElementById("buttonGameMenu").addEventListener("click", gameMenu);
})

function startGame(){
    console.log("game start!");
    closeStartMenu();
    showUI();
}
function backToGame(){
    console.log("Back to game");
    closeGameMenu();
}
function stopGame(){
    console.log("Stopping game");
    closeUI();
    closeGameMenu();
    openStartMenu();
}
function gameMenu(){
    console.log("Opening in-game menu");
    openGameMenu();
}


// start menu
function openStartMenu() {
    document.getElementById("startMenu").style.display = "block";
}
function closeStartMenu() {
    document.getElementById("startMenu").style.display = "none";
}

// UI
function showUI() {
    document.getElementById("UI").style.display = "block";
}
function closeUI() {
    document.getElementById("UI").style.display = "none";
}

// game menu
function openGameMenu() {
    document.getElementById("gameMenu").style.display = "block";
}
function closeGameMenu() {
    document.getElementById("gameMenu").style.display = "none";
}