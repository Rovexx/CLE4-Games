var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game",
    disableContextMenu: true,
    transparent: true,
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
var sound = new SoundEngine(game)

var ground;
var player;

var camera;
var gameOver = false;
var background;

var enemy;

// maximum amount of ai fish at one time
var aiCount = 4;

var AIs = [];

function preload() {
    //set the world size:
    this.worldSize = {
        width: 3200,
        height: 3600
    }

    this.load.image("ai", "assets/img/ai.png");
    this.load.image("enemy", "assets/img/enemy.png");
    this.load.image("fish_tmp", "assets/img/fish_tmp.png");
    this.load.image("fish_dead", "assets/img/fish_dead.png");
    this.load.image("net", "assets/img/net.png");
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

    if (numOfFish < aiCount){
        //generate random spawn coordinates:
        let spawnX = Math.random() * (maxPosX - minPosX) + minPosX;
        let spawnY = Math.random() * (maxPosY - minPosY) + minPosY;

        AIs.push(new Ai(initializer, spawnX, spawnY))
    }
}

function spawnRandomEnemy(initializer){
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

    //generate random spawn coordinates
    //let spawnX = Math.random() * (maxPosX - minPosX) + minPosX;
    //let spawnY = Math.random() * (maxPosY - minPosY) + minPosY;

    let spawnX = 500;
    let spawnY = 500;
    enemy = new Enemy(initializer, spawnX, spawnY);
}

function create() {
    this.input.setPollAlways();

    // Background
    background.create(this);

    // Create the player:
    player = new Player(this, 200, 100);

    spawnRandomEnemy(this);

    // Create the camera
    camera = new Camera(this);
    //spawnRandomEnemy(this);
    AIs.push(new Ai(this, 500, 200));

    sound.create(this)

    // Sleep on start
    game.loop.sleep()
}

let tmpNet = false
function update() {
    background.update(this);

    if (!tmpNet) {
        tmpNet = true
        setTimeout(() => {
            // net.spawn(this)
        }, 7000)
    }

  // Reset the sound distance
    sound.distance = Infinity

    spawnRandomFish(this);

    //stops update function when the game is over
    if (gameOver) {
        return;
    }

    // player update
    player.update(this);

    /* Update ai fishes */
    for (var ai of AIs) {
        ai.update();

        // colission
        if (coll(player, ai)) {
            // destroy sprite
            ai.sprite.destroy(true);
            ai = null;

            sound.play("eat");

            // increase food bar
            player.eatFish();
        }
    }

    // update the enemy fish
    enemy.update(this);
    // colission
    if (coll(player, enemy)) {
        gameOver = true;
        player.die();
        if (!sound.dead.isPlaying){
            sound.play("dead");
            modifyHealth("decrease", 100);
        }

    }

    sound.update()
    net.update(this)
}

/**
 * Detect collision between 2 objects
 */
function coll(n1, n2) {
    // Get the raw sprites from the objects
    s1 = n1.sprite
    s2 = n2.sprite

    // checken of de sprite nog levend is
    if (s1.active == true && s2.active == true) {
        if (s1.x + (s1.width / 3) >= s2.x - (s2.width / 3) &&
            s1.x - (s1.width / 3) <= s2.x + (s2.width / 3) &&
            s1.y + (s1.height / 3) >= s2.y - (s2.height / 3) &&
            s1.y - (s1.height / 3) <= s2.y + (s2.height / 3)) {
                return true;
        }
    }

    // Return false if collision has not been detected
    return false
}
