var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var ground;
var player;
var camera;
var gameOver = false;
var background;

var AIs = []

function preload() {
    //set the world size:
    this.worldSize = {
        width: 3200,
        height: 3600
    }

    this.load.image("ai", "assets/ai.png");
    this.load.image("fish_tmp", "assets/fish_tmp.png");
    background = new Background(this);
}

function create() {
    console.log(this)
    // Background
    background.create(this);

    // Create the player:
    player = new Player(this, 200, 100);

    camera = new Camera(this);
  
    AIs.push(new Ai(this, 500, 400))

    
}

function update() {

    background.update(this);


    if (gameOver) {
        return;
    }

    for (var ai of AIs) {
        ai.update()
    }

    player.update(this);

}
