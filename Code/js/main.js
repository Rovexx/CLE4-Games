// ----- setup for game -----
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi Application
let app = new Application({
        width: 1000,
        height: 800,
        antialias: true,
        transparent: false,
        resolution: 1
    }
);

//Add the canvas to the HTML document
document.body.appendChild(app.view);
// ----- end of setup -----

//Listen for keyboard input
function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

// ----- load images -----
loader
    .add("/images/star_1.png")
    .load(setup);

//Define any variables that are used in more than one function
let star, state;

function setup() {

    //Create the `star` sprite
    star = new Sprite(resources["/images/star_1.png"].texture);
    star.y = 100;
    star.vx = 0;
    star.vy = 0;
    app.stage.addChild(star);

    //Capture the keyboard arrow keys
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
        //Change the star's velocity when the key is pressed
        star.vx = -5;
        star.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && star.vy === 0) {
            star.vx = 0;
        }
    };

    //Up
    up.press = () => {
        star.vy = -5;
        star.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && star.vx === 0) {
            star.vy = 0;
        }
    };

    //Right
    right.press = () => {
        star.vx = 5;
        star.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && star.vy === 0) {
            star.vx = 0;
        }
    };

    //Down
    down.press = () => {
        star.vy = 5;
        star.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && star.vx === 0) {
            star.vy = 0;
        }
    };




    //Set the game state
    state = play;

    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

    //Update the current game state:
    state(delta);
}

function play(delta){

    //Use the star's velocity to make it move
    star.x += star.vx;
    star.y += star.vy
}

