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

var AIs = []

function preload() {
    this.load.image("background_1", "assets/Background_1.png");
    this.load.image("ai", "assets/ai.png");
    this.load.image("fish_tmp", "assets/fish_tmp.png");
}

function create() {
    // Background
    this.repeatingBackground = this.add.tileSprite(1600, 300, 3200, 600, "background_1");
    this.repeatingBackground.setOrigin(0.5);

    // Create the player:
    player = new Player(this, 200, 100);
  
    AIs.push(new Ai(this, 500, 400))

    
}

function update() {
    if (gameOver) {
        return;
    }


    for (var ai of AIs) {
        ai.update()
    }

    player.update(this);

}
