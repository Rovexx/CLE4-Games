var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
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

var enemy = false;

// maximum amount of ai fish at one time
const aiCount = 4;
// chance of an net/enemy event
const enemyRate = 0.002

var AIs = [];

function preload() {
    //set the world size:
    this.worldSize = {
        width: 3200,
        height: 3600
    }

    this.load.spritesheet('net',
        'assets/img/net.png',
        { frameWidth: 1920, frameHeight: 1080 }
    );
    this.load.spritesheet('enemy',
        'assets/img/enemy.png',
        { frameWidth: 480, frameHeight: 250 }
    );
    this.load.spritesheet('player',
        'assets/img/player.png',
        { frameWidth: 480, frameHeight: 200 }
    );
    this.load.spritesheet('ai_fish',
        'assets/img/ai_fish.png',
        { frameWidth: 96, frameHeight: 44 }
    );
    background = new Background(this);

    sound.load(this)
}

function spawnRandomFish(initializer){
    //get the position of the player:
    let playerX = player.sprite.x;
    let playerY = player.sprite.y;

    //minimum and maximum x distance a fish can spawn from the player:
    let minDistanceX = 650;
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

let makeLose = 1
function create() {
    this.input.setPollAlways();

    // Background
    background.create(this);

    // Create the player:
    player = new Player(this, 450, 350);

    // Create the camera
    camera = new Camera(this);
    //spawnRandomEnemy(this);
    AIs.push(new Ai(this, 650, 380));

    sound.create(this)

    // Sleep on start
    game.loop.sleep()

    document.getElementById("buttonStartGame").classList.remove("loading")
    document.getElementById("buttonStartGame").innerHTML = "Start Game"

    // Make it impossible after around 3 minutes
    setTimeout(function () {
        console.log("losin")
        makeLose = 1.5
    }, 100000 + (100000 * Math.random()))
}

let slowStart = 600
let hintShown = false

function update() {
    //stops update function when the game is over
    if (gameOver) {
        this.anims.pauseAll()
        return;
    }
    else {
        this.anims.resumeAll()
    }

    background.update(this);

    if (slowStart > 0) {
        slowStart--
    }
    else if (Math.random() < enemyRate && enemy == false && net._sprite === false) {
        if (Math.random() > 0.6) {
            net.spawn(this)
        }
        else {
            sound.play("net")

            setTimeout(() => {
                enemy = new Enemy(this)
            }, 2000)
        }

        slowStart = 5000

        if (!hintShown) {
            document.getElementById("hint").style.display = "block"

            setTimeout(function () {
                document.getElementById("hint").style.opacity = 0.7
            }, 500)

            setTimeout(function () {
                document.getElementById("hint").style.opacity = 0
            }, 4500)

            setTimeout(function () {
                document.getElementById("hint").style.display = "none"
            }, 5000)

            hintShown = true
        }
    }

    timer.update()

    // Reset the sound distance
    sound.distance = Infinity

    spawnRandomFish(this);

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
    if (enemy) {
        enemy.update(this);
        // colission
        if (coll(player, enemy)) {
            decreaseHealth(100);
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
