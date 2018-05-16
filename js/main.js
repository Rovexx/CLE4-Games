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
var gameOver = false;

var AIs = []

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ai", "assets/ai.png");
}

function create() {
    // Background
    this.repeatingBackground = this.add.tileSprite(1600, 300, 3200, 600, "sky");
    this.repeatingBackground.setOrigin(0.5);

    // Create the ground
    ground = this.add.sprite(200, 100, "ground").setInteractive();

    this.input.setDraggable(ground);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        ground.x = dragX;
        ground.y = dragY;

    });

    AIs.push(new Ai(this))
}

function update() {
    if (gameOver) {
        return;
    }

    // ground.y -= 1
    // ground.x -= 0.3


    for (var ai of AIs) {
        ai.update()
    }
}
