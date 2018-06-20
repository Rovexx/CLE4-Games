// test localstorage
function storageTest(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

// set after testing localstorage write and read
var storageWorks = storageTest();

// object to sync with local storage
var savedData = {};

// save value to localstorage
function storageSave(key, value){
    // also save value to saved object
    savedData[key] = value;
    // check if localstorage is available
    if (storageWorks) {
        // localstorage is available
        // save value to localstorage
        localStorage.setItem(key, value);
    }
}
// load value from localstorage
function storageLoad(key){
    // check if localstorage is available
    if (storageWorks) {
        // localstorage available
        var value = localStorage.getItem(key);
        if(value !== null){
            return value;
        }
    }
    // try loading value from saved object
    if(typeof savedData[key] !== 'undefined'){
        return savedData[key];
    }
    // if no result was found return empty string
    return "";
}

// remove item from local storage
function storageRemove(key){
    delete savedData[key];
    localStorage.removeItem(key);
}

// checking and setting if the game has been completed
function getCompleted(){
    try{
        return JSON.parse(storageLoad("game_completed"))
    }
    catch(e){
        return false;
    }
}

function setCompleted(state){
    storageSave("game_completed", JSON.stringify(state));
}

// reset game completed state and reload the page
function hardReload(){
    setCompleted(false);
    location.reload();
}

// detect hard reload key combination
window.addEventListener("keydown", function(e){
    if(e.keyCode == 82 && e.shiftKey){
        hardReload();
    }
});