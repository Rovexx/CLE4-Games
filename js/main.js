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
    this.load.image("net", "assets/net.png");
    background = new Background(this);

    sound.load(this)
}

function spawnRandomFish(initializer){
    //get the position of the player:
    let playerX = player.sprite.x;
    let playerY = player.sprite.y;

    //minimum and maximum x distance a fish can spawn from the player:
    let minDistanceX = 400;
    let maxDistanceX = 2000;

    let minPosX = playerX + minDistanceX;
    let maxPosX = playerX + maxDistanceX;

    //minimum and maximum y spawn coordinates:
    let minPosY = 0;
    let maxPosY = 1800;

    //check the number of ai fishes in this area:
    let numOfFish = 0;

    for (let ai of AIs){
        if (ai.sprite.x > minPosX && ai.sprite.x < maxPosX){
            numOfFish++;
        }
    }

    if (numOfFish < 2){
        //generate random spawn coordinates:
        let spawnX = Math.random() * (maxPosX - minPosX) + minPosX;
        let spawnY = Math.random() * (maxPosY - minPosY) + minPosY;

        AIs.push(new Ai(initializer, spawnX, spawnY))
    }
}

function create() {
    this.input.setPollAlways();

    // Background
    background.create(this);

    // Create the player:
    player = new Player(this, 200, 100);

    // Create the camera
    camera = new Camera(this);

    /* powerups maken met een loop
     ivm collission detection */
    for (let i = 1; i <= powerupsCount; i++) {
        powerups.push(new Powerup(this, 180 * i, 140 * i));
    }

    AIs.push(new Ai(this, 500, 200));

    sound.create(this)

    net.spawn(this)
}

function update() {
    background.update(this);

  // Reset the sound distance
    sound.distance = Infinity

    spawnRandomFish(this);

    if (gameOver) {
        return;
    }

    // player update
    player.update(this);

    /* loopen door de AIs om te updaten
     en dolission te detecten */
    for (var ai of AIs) {
        ai.update();

        // colission
        if (coll(player, ai, 40)) {
            // destroy spri;e
            ai.sprite.destroy(true);
            ai = null;

            sound.play("eat")

            // snelheid toevoegen aan player
            player.eatFish();
        }
    }

    /* loopen door de powerups om
     collission te detecten */
    for (var powerup of powerups) {
        if (coll(player, powerup, 30)) {
            // destroy sprite
            powerup.sprite.destroy(true);
            powerup = null;

            // snelheid toevoegen aan player
            player.increaseSpeed();
        }
    }

    sound.update()
    net.update(this)
}

/**
 * Detect collision between 2 objects
 */
function coll(n1, n2, collisionWidth) {
    // Get the raw sprites from the objects
    s1 = n1.sprite
    s2 = n2.sprite

    // checken of de sprite nog levend is
    if (s1.active == true && s2.active == true) {
        // Do the maths
        // if (s1.y - s1.width  / 2 * s1.scaleX < s2.x + s2.width  / 2 * s2.scaleX && s1.x + s1.width  / 2 * s1.scaleX > s2.x - s2.width  / 2 * s2.scaleX &&
        //     s1.y - s1.height / 2 * s1.scaleY < s2.y + s2.height / 2 * s2.scaleY && s1.y + s1.height / 2 * s1.scaleY > s2.y - s2.height / 2 * s2.scaleY ) {
        //     return true
        // }
        if (s1.x <= s2.x + collisionWidth && s1.x >= s2.x - collisionWidth 
         && s1.y <= s2.y + collisionWidth && s1.y >= s2.y - collisionWidth) {
            return true
        }
    }

    // Return false if collision has not been detected
    return false
}