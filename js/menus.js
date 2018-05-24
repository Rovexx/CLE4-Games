// on start of game
stopGame();

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
    document.getElementById("startMenu").classList.remove("hide");
}
function closeStartMenu() {
    document.getElementById("startMenu").classList.add("hide");
}

// UI
function showUI() {
    document.getElementById("UI").classList.remove("hide");
}
function closeUI() {
    document.getElementById("UI").classList.add("hide");
}

// game menu
function openGameMenu() {
    document.getElementById("gameMenu").classList.remove("hide");
}
function closeGameMenu() {
    document.getElementById("gameMenu").classList.add("hide");
}