class Player{

    constructor(initializer, posX, posY){
        //setup player sprite:'
        this.sprite = initializer.physics.add.sprite(posX, posY, 'fish_tmp');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.allowGravity = false;
        this.sprite.scaleX = 0.5;
        this.sprite.scaleY = 0.5;

        // default snelheid
        this.speed = 400;

        // evolutie punten
        this.evolutionPointDivider = 5;
        this.evolutionPoints = 0;
        this.fishEat = 0;

        // max variabelen:
        this.maxSpeed = 1000;
        this.maxSize = 1;

        //destination coords:
        this.dest = {
            x : posX,
            y : posY
        }

        //setup input:
        initializer.input.on('pointerdown', this.swim, this);
        initializer.input.on('pointermove', this.swim, this);

    }

    swim(pointer){

        if(pointer.isDown){

            this.dest.x = pointer.x;
            this.dest.y = pointer.y;
        }


    }

    stepAxis(axis, delta, speed){
        if(this.sprite[axis] != this.dest[axis]){

            let dif = this.dest[axis] - this.sprite[axis];

            let dir;


            if(dif > 0){
                //right
                dir = 1;
            }
            else{
                //left
                dir = -1;
            }

            let step = delta * dir * speed

            if(Math.abs(dif) < Math.abs(step)){
                this.sprite[axis] = this.dest[axis];
            }
            else{
                this.sprite[axis] += step;
            }



        }
    }

    dif(numA, numB, abs = false){
        if(abs){
            return Math.abs(numA - numB);
        }
        else{
            return numA - numB;
        }
    }

    calcSpeed(part, total, speed){
        return (part/total) * speed;
    }

   calcAngle(opposite, adjacent) {
        let angle = Math.atan(opposite / adjacent);
        if(isNaN(angle)){
            return 0;
        }
        else{
            return angle;
        }
    }

    update(initializer){
        //delta in seconds:
        let delta = initializer.sys.game.loop.delta/1000;

        //calculate speed:
        let difX = this.dif(this.dest.x, this.sprite.x);
        let difY = this.dif(this.dest.y, this.sprite.y);
        let absDifX = Math.abs(difX);
        let absDifY = Math.abs(difY);
        let difTotal = absDifX + absDifY;

        //calculate horizontal and vertical speed:
        let speedX = this.calcSpeed(absDifX, difTotal, this.speed);
        let speedY = this.calcSpeed(absDifY, difTotal, this.speed);

        this.stepAxis("x", delta, speedX);
        this.stepAxis("y", delta, speedY);

        //set direction of the sprite
        if(difX > 0){
        // this.sprite.scaleX = Math.abs(this.sprite.scaleX);
        }
        else if(difX < 0){
            // this.sprite.scaleX = -1 * Math.abs(this.sprite.scaleX);
        }

        //set rotation of fish
        this.sprite.rotation = this.calcAngle(difY, difX);
    }

    increaseSpeed() {
        player.speed = (player.speed * 1.2);

        // niet de max speed overschreiden
        if (player.speed >= player.maxSpeed) {
            player.speed = player.maxSpeed;
        }
    }

    eatFish() {
        // evolution point verhogen
        this.fishEat++;

        if ((this.fishEat % this.evolutionPointDivider) == 0) {
            this.evolutionPoints = this.fishEat / this.evolutionPointDivider;
            console.log("evPoint: " + this.evolutionPoints);
        }
        // // groote van de player aanpassen
        // player.sprite.scaleX = (player.sprite.scaleX * 1.1);
        // player.sprite.scaleY = (player.sprite.scaleY * 1.1);

        // if (player.sprite.scaleY > this.maxSize) {
        //      player.sprite.scaleX = this.maxSize;
        //      player.sprite.scaleY = this.maxSize;
        // }
    }
}