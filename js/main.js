var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
            // debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var sound = new SoundEngine(game)

var ground;
var player;

var camera;
var gameOver = false;
var background;

var scoreText, scoreTextBar;
var tempScoreText = 'O';
var speedCount = 1;
var gameOver = false;
var powerupsCount = 4;
var aiCount = 4;

var AIs = [];
var powerups = [];

function preload() {
    //set the world size:
    this.worldSize = {
        width: 3200,
        height: 3600
    }

    this.load.image("ai", "assets/ai.png");
    this.load.image("fish_tmp", "assets/fish_tmp.png");
    this.load.image("powerup_icon", "assets/powerup.png");
    background = new Background(this);

    sound.load(this)
}

function create() {
    console.log(this)
    // Background
    background.create(this);

    // Create the player:
    player = new Player(this, 200, 100);
    // Create the camera
    camera = new Camera(this);
    // Create AI fish
    AIs.push(new Ai(this, 500, 400))

    /* powerups maken met een loop
     ivm collission detection */
    for (let i = 1; i <= powerupsCount; i++) {
        powerups.push(new Powerup(this, 180 * i, 140 * i));
    }

    AIs.push(new Ai(this, 500, 200));

    scoreText = this.add.text(620, 16, 'SNELHEID', { fontSize: '32px', fill: '#000' });
    scoreTextBar = this.add.text(620, 50, tempScoreText, { fontSize: '30px', fill: 'green' });

    sound.create(this)
}

function update() {
    background.update(this);
    // Reset the sound distance
    sound.distance = Infinity

    if (gameOver) {
        return;
    }

    // player update
    player.update(this);

    /* loopen door de AIs om te updaten
     en dolission te detecten */
    for (var ai of AIs) {
        // Eerst checken of er nog AIs over zijn
        if (AIs.length >= 1) {
            ai.update();

            // colission
            if (coll(player, ai)) {
                // destroy spri;e
                ai.sprite.destroy(true);
                ai = null;

                sound.play("eat")

                // snelheid toevoegen aan player
                player.increaseSize();
            }
        }
    }

    /* loopen door de powerups om
     collission te detecten */
    for (var powerup of powerups) {
        if (coll(player, powerup)) {
            // destroy sprite
            powerup.sprite.destroy(true);
            powerup = null;

            // snelheid toevoegen aan player
            player.increaseSpeed();
        }
    }

    sound.update()
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
