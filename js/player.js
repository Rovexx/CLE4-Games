class Player{

    constructor(initializer, posX, posY){
        this.init = initializer;

        // setup player sprite:
        this.sprite = initializer.physics.add.sprite(posX, posY, 'fish_tmp');
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

        // default player speed
        this.speed = 400;
        //default sight:
        this.sight = 1;
        //default camouflage
        this.camouflage = 1;
        //default size
        this.bodySize = 1;
        //default temperature Resistance
        this.temperatureResistance = 1;
        //default max Depth
        this.maxDepth = 1;


        // evolutie punten
        this.evolutionPointDivider = 5;
        this.evolutionPoints = 0;
        this.fishEat = 0;

        // max variabelen:
        this.maxSpeed = 700;
        this.maxSize = 1;

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

    }

    pointerDownHandler(pointer){
        this.pointerDown = true;
        this.pointerMovehandler(pointer);
    }

    pointerMovehandler(pointer){
        this.pointerX = pointer.x;
        this.pointerY = pointer.y;
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

        //calculate horizontal and vertical speed:
        this.speedX = this.calcSpeed(absDifX, difTotal, this.speed);
        this.speedY = this.calcSpeed(absDifY, difTotal, this.speed);


        this.stepAxis("x", delta, this.speedX);
        this.stepAxis("y", delta, this.speedY);

        //set direction of the sprite
        if (this.difX >  0 && this.totalDif > this.minDifference) {
            this.sprite.scaleX = Math.abs(this.sprite.scaleX);
        }
        else if (this.difX < 0 && this.totalDif > this.minDifference) {
            this.sprite.scaleX = -1 * Math.abs(this.sprite.scaleX);
        }

        //set rotation of fish
        this.sprite.rotation = this.calcAngle(this.difY, this.difX);

        //move the fish:
        this.swim();

        //offset for pointer input:
        this.cameraX = initializer.cameras.main.scrollX;
        this.cameraY = initializer.cameras.main.scrollY;
    }

    increaseSize() {
        // Als je minimaal 1 evolution punt hebt
        if (this.evolutionPoints > 0) {
            // groote van de player aanpassen
            player.sprite.scaleX = (player.sprite.scaleX * 1.1);
            player.sprite.scaleY = (player.sprite.scaleY * 1.1);

            // evolutie punten -1
            this.evolutionPoints--;

            if (player.sprite.scaleY > this.maxSize) {
                if (player.sprite.scaleX < 0){
                    // naar links zwemmen
                    player.sprite.scaleX = -this.maxSize;
                } else {
                    // naar rechts zwemmen
                    player.sprite.scaleX = this.maxSize;
                }

                player.sprite.scaleY = this.maxSize;
            }
        }
    }

    eatFish() {
        // fish eat verhogen
        this.fishEat++;

        /* +1 op het scherm als indicatie
         dat je iets goeds hebt gedaan */
        let tmpScoreText = this.init.add.text(this.sprite.x, this.sprite.y, '+1', { fontSize: '32px', fill: 'green' });

        /* delete text na 3 seconden */
        setTimeout(function(){
            tmpScoreText.setText("");
        }, 3000);

        // als de fisheat gelijk is aan 5,10,15,20 etc
        if ((this.fishEat % this.evolutionPointDivider) == 0) {
            // aantal punten bijhouden
            this.evolutionPoints++;
        }

        // Als je minimaal 1 evolution punt hebt
        if (this.evolutionPoints > 0) {
            // groote van de player aanpassen
            player.sprite.scaleX = (player.sprite.scaleX * 1.1);
            player.sprite.scaleY = (player.sprite.scaleY * 1.1);

            // evolutie punten -1
            this.evolutionPoints--;

            if (player.sprite.scaleY > this.maxSize) {
                if (player.sprite.scaleX < 0){
                    // naar links zwemmen
                    player.sprite.scaleX = -this.maxSize;
                } else {
                    // naar rechts zwemmen
                    player.sprite.scaleX = this.maxSize;
                }

                player.sprite.scaleY = this.maxSize;
            }
        }
    }
}
