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

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
    .add("/images/star_1.png")
    .load(setup);

//Define any variables that are used in more than one function
let star;

function setup() {

    //Create the `star` sprite
    star = new Sprite(resources["/images/star_1.png"].texture);
    star.y = 100;
    app.stage.addChild(star);

    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

    //Move the star 1 pixel
    star.x += 1;
}

