class Player{

    constructor(initializer, posX, posY){
        //setup player sprite:'
        this.sprite = initializer.physics.add.sprite(posX, posY, 'fish_tmp');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.allowGravity = false;
        this.sprite.scaleX = 0.5;
        this.sprite.scaleY = 0.5;
        console.log(this.sprite);

        //default speed:
        this.speed = 400;

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

    toRotation(facing, angle){
        //convert angle to rotation:
        if(angle == 0){
            return 0;
        }
        else if(facing >= 0){
            //facing right
            if(angle < 0){
                //rotate to top right
                return  (Math.PI * 2) + angle;
            }
            else if(angle > 0){
                //rotate to bottom right
                return angle;
            }
        }
        else if(facing < 0){
            //facing left
            return Math.PI + angle;
        }
    }

    toAngle(dir, rotation){
        let result = {
            angle: 0,
            dir: dir
        }
        //convert rotation to angle
        if(rotation >= Math.PI * 1.5 && rotation < Math.PI * 2){
            //facing top right:
            result.angle = -1 * ( (Math.PI * 0.5) - (rotation - Math.PI * 1.5) );
        }
        else if(rotation >= Math.PI && rotation < Math.PI * 1.5 ){
            //facing top left:
            result.angle = rotation - Math.PI;
            result.dir = -1 * Math.abs(dir);
        }
        else if(rotation >= Math.PI * 0.5 && rotation < Math.PI){
            //facing bottom left:
            result.angle = -1 * ( (Math.PI * 0.5) - (rotation - Math.PI * 0.5) );
            result.dir = -1 * Math.abs(dir);
        }
        else if(rotation >= 0 && rotation < Math.PI * 0.5 ){
            //facing bottom right:
            result.angle = rotation;
        }
        return result;
    }

    setRotation(rotation){
        //sets the rotation of the fish
        let angle = this.toAngle(this.sprite.scaleX, rotation);

        this.sprite.rotation = angle.angle;
        this.sprite.scaleX = angle.dir;
    }

    rotateStep(from, to){
        let dif = to - from;
        let step = 0.1;
        if(Math.abs(dif) < step){
            return dif;
        }
        else if(dif > Math.PI || dif < 0 && dif > -Math.PI){
            //turn counter clockwise
            return -step;
        }
        else if(dif < Math.PI && dif > 0){
            //turn clockwise
            return step;
        }
        return 0;

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

        

        let speedX = this.calcSpeed(absDifX, difTotal, this.speed);
        let speedY = this.calcSpeed(absDifY, difTotal, this.speed);

        this.stepAxis("x", delta, speedX);
        this.stepAxis("y", delta, speedY);

        if(difX > 0){
        this.sprite.scaleX = Math.abs(this.sprite.scaleX);
        }
        else if(difX < 0){
            this.sprite.scaleX = -1 * Math.abs(this.sprite.scaleX);
        }

        
        let rotation = this.toRotation(this.sprite.scaleX, this.calcAngle(difY, difX) );
    

        this.setRotation(rotation);
    }

}