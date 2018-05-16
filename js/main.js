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
var gameOver = false;

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("fish_tmp", "assets/fish_tmp.png");
}

function create() {
    // Background
    this.repeatingBackground = this.add.tileSprite(1600, 300, 3200, 600, "sky");
    this.repeatingBackground.setOrigin(0.5);

    // Create the ground
    ground = this.physics.add.staticGroup();
    ground.create(400, 568, "ground").setScale(2, 2).refreshBody();

    // Create the player:
    player = new Player(this, 200, 100);
}

function update() {
    if (gameOver) {
        return;
    }

    player.update(this);
}
