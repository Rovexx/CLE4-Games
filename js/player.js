class Player{

    constructor(initializer, posX, posY){
        //setup player sprite:'
        this.sprite = initializer.physics.add.sprite(posX, posY, 'fish_tmp');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.allowGravity = false;
        this.sprite.scaleX = 0.5;
        this.sprite.scaleY = 0.5;
        console.log(this.sprite);

        //destination coords:
        this.dest = {
            x : posX,
            y : posY
        }

        //setup input:
        initializer.input.on('pointerdown', this.swim, this);
        initializer.input.on('pointermove', this.swim, this);

        console.log(this);
    }

    swim(pointer){

        if(pointer.isDown){
            //console.log(pointer);

            this.dest.x = pointer.x;
            this.dest.y = pointer.y;
        }

        
    }

    stepAxis(axis, delta, speed){
        if(this.sprite[axis] != this.dest[axis]){
            
            let dif = this.dest[axis] - this.sprite[axis];

            let dir;

            //console.log(dif);

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

        let speed = 400;

        //calculate speed:
        let difX = this.dif(this.dest.x, this.sprite.x);
        let difY = this.dif(this.dest.y, this.sprite.y);
        let absDifX = Math.abs(difX);
        let absDifY = Math.abs(difY);
        let difTotal = absDifX + absDifY;



        let speedX = this.calcSpeed(absDifX, difTotal, speed);
        let speedY = this.calcSpeed(absDifY, difTotal, speed);

        this.stepAxis("x", delta, speedX);
        this.stepAxis("y", delta, speedY);

        //set rotation:
        let angle = this.calcAngle(difY, -difX);
        console.log(angle);
        this.sprite.rotation = -1 * angle;
        if(difX >= 0){
            this.sprite.scaleX = Math.abs(this.sprite.scaleX);
        }
        else{
            this.sprite.scaleX = -1 * Math.abs(this.sprite.scaleX);
        }
        


    }

}