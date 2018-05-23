var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
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
var powerup;
var player;
var gameOver = false;

var AIs = []

function preload() {
    this.load.image("background_1", "assets/Background_1.png");
    this.load.image("ai", "assets/ai.png");
    this.load.image("fish_tmp", "assets/fish_tmp.png");
    this.load.image("powerup_icon", "assets/powerup.png");
}

function create() {
    // Background
    this.repeatingBackground = this.add.tileSprite(1600, 300, 3200, 600, "background_1");
    this.repeatingBackground.setOrigin(0.5);

    // Create the player:
    player = new Player(this, 200, 100);
    powerup = new Powerup(this, 80, 30, 4);

    // this.physics.add.collider(powerup, player)

    // collision tut:
    // https://phaser.io/tutorials/making-your-first-phaser-3-game/part8


    AIs.push(new Ai(this, 500, 200))


    // console.log(this.physics)
}

function update() {
    if (gameOver) {
        return;
    }

    for (var ai of AIs) {
        // ai.update()
    }

    player.update(this);

    console.warn(coll(player, AIs[0]))
}

function collectPowerup(player, powerup) {
    console.log('Powerup collected');
}

/**
 * Detect collision between 2 objects
 * @param  {object} n1 The first sprite object
 * @param  {object} n2 The second sprite object
 * @return {bool}      If the objects are colliding
 */
function coll(n1, n2) {
    // Get the raw sprites from the objects
    s1 = n1.sprite
    s2 = n2.sprite

    // Do the maths
    if (s1.y - s1.width  / 2 * s1.scaleX < s2.x + s2.width  / 2 * s2.scaleX && s1.x + s1.width  / 2 * s1.scaleX > s2.x - s2.width  / 2 * s2.scaleX &&
		s1.y - s1.height / 2 * s1.scaleY < s2.y + s2.height / 2 * s2.scaleY && s1.y + s1.height / 2 * s1.scaleY > s2.y - s2.height / 2 * s2.scaleY ) {
        return true
    }

    // Return false if collision has been detected
    return false
}
