function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return parseInt(`0x${toHex(r)}${toHex(g)}${toHex(b)}`);
}

class Player{
    constructor(initializer, posX, posY){
        this.init = initializer;

        // setup player sprite:
        this.sprite = initializer.physics.add.sprite(posX, posY, 'player');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.allowGravity = false;
        this.sprite.scaleX = 0.5;
        this.sprite.scaleY = 0.5;
        //minimum difference before the direction of the fish flips:
        this.totalDif = 0;
        this.minDifference = 10;

        //mouse variables used to determine if the swim function has to be fired every update loop:
        this.pointerDown = false;
        this.pointerX = 0;
        this.pointerY = 0;

        // player default status is niet dood
        this.dead = false

        this.rainbowIndex = 0

        // default health
        this.health = 100;
        // default food
        this.food = 10;
        // default player speed
        this.speed = 400;
        this.speedPercent = 20
        //default size
        this.bodySize = 0;
        this.bodySizePercent = 25
        //default temperature Resistance
        this.temperature = 800;
        this.temperaturePercent = 33
        //default max Depth
        this.depth = 1200;
        this.depthPercent = 25

         // max variabelen:
        this.maxHealth = 100;
        this.maxFood = 100;
        this.maxSpeed = 800;
        this.maxBodySize = 3;
        this.maxTemperature = 1800;
        this.maxDepth = 1800;

        //destination coords:
        this.dest = {
            x : posX,
            y : posY
        }

        //setup input:
        initializer.input.on('pointerdown', this.pointerDownHandler, this);
        initializer.input.on('pointermove', this.pointerMovehandler, this);
        initializer.input.on('pointerup', this.pointerUpHandler, this);
        document.getElementsByTagName("canvas")[0].addEventListener('mouseleave', () => this.pointerUpHandler() );
        window.addEventListener('mouseup', () => this.pointerUpHandler() );

        //camera offset:
        this.cameraX = 0;
        this.cameraY = 0;

        //setup animations:

        initializer.anims.create({
            key: 'stop',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 8,
        });

        initializer.anims.create({
            key: 'swim',
            frames: initializer.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        initializer.anims.create({
            key: 'eat',
            frames: initializer.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
            frameRate: 8,
            repeat: 0
        });

        initializer.anims.create({
            key: 'dead',
            frames: [ { key: 'player', frame: 16 } ],
            frameRate: 8,
        });

    }

    pointerDownHandler(pointer){
        this.pointerDown = true;
        this.pointerMovehandler(pointer);
    }

    pointerMovehandler(pointer){
        if (this.dead === false) {
            this.pointerX = pointer.x;
            this.pointerY = pointer.y;
        }
    }

    pointerUpHandler(){
        this.pointerDown = false;
    }

    swim(){
        if (this.pointerDown){
            let minDifference = 50;
            let newDestX = this.pointerX + this.cameraX;
            let newDestY = this.pointerY + this.cameraY;
            this.dest.x = newDestX;
            this.dest.y = newDestY;

        }
    }

    stepAxis(axis, delta, speed){
        if(this.sprite[axis] != this.dest[axis]){

            let dif = this.dest[axis] - this.sprite[axis];

            let dir;

            if (dif >= 0) {
                //right
                dir = 1;
            } else {
                //left
                dir = -1;
            }

            let step = delta * dir * speed

            if (Math.abs(dif) < Math.abs(step)) {
                this.sprite[axis] = this.dest[axis];
            } else {
                this.sprite[axis] += step;
            }
        }
    }

    dif(numA, numB, abs = false) {
        if (abs) {
            return Math.abs(numA - numB);
        } else {
            return numA - numB;
        }
    }

    calcSpeed(part, total, speed) {
        return (part/total) * speed;
    }

   calcAngle(opposite, adjacent) {
        let angle = Math.atan(opposite / adjacent);

        if (isNaN(angle) || this.totalDif < this.minDifference  ) {
            return 0;
        } else {
            return angle;
        }
    }

    update(initializer) {
        //delta in seconds:
        let delta = initializer.sys.game.loop.delta/1000;

        //calculate speed:
        this.difX = this.dif(this.dest.x, this.sprite.x);
        this.difY = this.dif(this.dest.y, this.sprite.y);
        this.totalDif = Math.sqrt( Math.pow(this.difX, 2) + Math.pow(this.difY, 2) )
        let absDifX = Math.abs(this.difX);
        let absDifY = Math.abs(this.difY);
        let difTotal = absDifX + absDifY;

        //if the fish is swimming and the swim animation is not playing yet, play the swimming animation:
        if(difTotal != 0 && !this.sprite.anims.isPlaying){
            this.sprite.anims.play("swim");
        }
        else if(difTotal == 0){
            this.sprite.anims.play("stop");
        }

        //calculate horizontal and vertical speed:
        this.speedX = this.calcSpeed(absDifX, difTotal, this.speed);
        this.speedY = this.calcSpeed(absDifY, difTotal, this.speed);


        this.stepAxis("x", delta, this.speedX);
        this.stepAxis("y", delta, this.speedY);

        //set direction of the sprite
        if (this.difX >  0 && this.totalDif > this.minDifference) {
            this.sprite.scaleX = Math.abs(this.sprite.scaleX);
        } else if (this.difX < 0 && this.totalDif > this.minDifference) {
            this.sprite.scaleX = -1 * Math.abs(this.sprite.scaleX);
        }

        if (localStorage.itemRainbow == "1") {
            this.rainbowIndex = (this.rainbowIndex == 360) ? 0 : this.rainbowIndex + 1
            this.sprite.setTint(hslToHex(this.rainbowIndex, 100, 50))
        }

        //set rotation of fish
        this.sprite.rotation = this.calcAngle(this.difY, this.difX);

        //move the fish:
        this.swim();

        this.sprite.scaleX = ( this.sprite.scaleX / Math.abs(this.sprite.scaleX) ) * ( 0.5 + this.bodySize / 16 );
        this.sprite.scaleY = 0.5 + this.bodySize / 16;

        //offset for pointer input:
        this.cameraX = initializer.cameras.main.scrollX;
        this.cameraY = initializer.cameras.main.scrollY;

        // If too deep do beep beep
        if (player.sprite.y > player.depth) {
            document.getElementById("alertDepth").style.transform = "translateY(0%)"
            document.getElementById("alertThemp").style.transform = "translateY(-150%)"

            if (!sound.alert.isPlaying) {
                sound.play("alert")
                decreaseHealth(20)
            }
        }
        // If too cold do bolt bolt
        else if (player.sprite.y > player.temperature) {
            document.getElementById("alertThemp").style.transform = "translateY(0%)"
            document.getElementById("alertDepth").style.transform = "translateY(-150%)"

            if (!sound.alert.isPlaying) {
                sound.play("alert")
                decreaseHealth(20)
            }
        }
        else {
            document.getElementById("alertDepth").style.transform = "translateY(-150%)"
            document.getElementById("alertThemp").style.transform = "translateY(-150%)"
        }
    }

    eatFish() {
        // food verhogen
        increaseFood();
        increaseHealth(5);
        /* +1 op het scherm als indicatie
         dat je iets goeds hebt gedaan */
        let tmpScoreText = this.init.add.text(this.sprite.x, this.sprite.y, "+1", {
            fontSize: "32px",
            fontWeight: "bold",
            fill: "#0f0"
        })

        //play eat animation:
        this.sprite.anims.play("eat");

        /* delete text na 3 seconden */
        setTimeout(function(){
            tmpScoreText.setText("");
        }, 3000);
    }

    die() {
        if (this.dead === false) {
            // play the dead sound
            sound.play("dead");
            // sprite veranderen naar dead sprite
            this.sprite.anims.play("dead");

            /* Ervoor zorgen dat de player sprite
             niet de heletijd verandert */
            this.dead = true;

            // stop de vis
            this.dest.x = this.sprite.x;
            this.dest.y = this.sprite.y;
            this.sprite.rotation = this.calcAngle(this.difY, this.difX);

            sound.net.stop()

            // reload game na x seconden
            setTimeout(function(){
                // reload button showen
                document.getElementById('overlayrestart').classList.remove("hide");
                document.getElementById('overlaybuttons').classList.add("hide");
                document.getElementById('startMenu').classList.remove("hide");

                // reload button functioneel maken
                document.getElementById('buttonRestartGame').addEventListener('click', function(){location.reload()});
            }, 3000);

            if (net._sprite) {
                net._sprite.body.velocity.x = 0
            }

            gameOver = true

            document.getElementById("restartTimer").innerHTML = timer.formatted
            document.getElementById("restartPerc").innerHTML = (Math.round(timer.time / 240 * 100) <= 98 ? Math.round(timer.time / 240 * 100) : 98) + "%"
        }
    }
}
