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
var player;
var gameOver = false;
var powerupsCount = 4;

var AIs = [];
var powerups = [];

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
    player = new Player(this, 150, 60);

    /* powerups maken met een loop 
     ivm collission detection */
    for (let i = 1; i <= powerupsCount; i++) {
        powerups.push(new Powerup(this, 180 * i, 140 * i));
    }

    AIs.push(new Ai(this, 500, 200));
}

function update() {
    if (gameOver) {
        return;
    }

    for (var ai of AIs) {
        ai.update()
    }

    player.update(this);

    /* loopen door de powerups om collission te detecten */
    for (var powerup of powerups) {
        if (coll(player, powerup)) {
            // destroy sprite
            powerup.sprite.destroy(true);
            powerup = null;

            // snelheid toevoegen aan player
            player.increaseSpeed();
        }
    }
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

    // als de sprite er nog is
    if (s2.active !== false) {
        // Do the maths
        if (s1.y - s1.width  / 2 * s1.scaleX < s2.x + s2.width  / 2 * s2.scaleX && s1.x + s1.width  / 2 * s1.scaleX > s2.x - s2.width  / 2 * s2.scaleX &&
    		s1.y - s1.height / 2 * s1.scaleY < s2.y + s2.height / 2 * s2.scaleY && s1.y + s1.height / 2 * s1.scaleY > s2.y - s2.height / 2 * s2.scaleY ) {
            return true
        }        
    }

    // Return false if collision has been detected
    return false
}