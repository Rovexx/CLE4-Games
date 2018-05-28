class Background{
    constructor(initializer){
        //areas by immage:
        let assetsDir = "assets";
        let imageFiles = [
            "Background_1.png",
            "Background_1-2.png",
            "Background_2.png"
        ]

        //load images:
        let loadedImages = [];
        let imageNum = 0;
        for(let imageFile of imageFiles){
            let name = "background." + imageNum;
            initializer.load.image(name , assetsDir + "/" + imageFile);
            loadedImages.push(name);
            imageNum++;
        }

        //create areas with random length from loaded images:
        this.areas = [];
        imageNum = 0;
        for(let image of loadedImages){
            let minLength = 3;
            let maxLength = 7;
            let count = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
            let area = [];
            for(let i = 0; i < count; i++){
                area.push(image);
            }
            this.areas.push(area);
            imageNum++;
        }


        //shuffle areas array:
        let shuffledAreas = [];
        while(this.areas.length > 0){
            let min = 0;
            let max = this.areas.length-1;
            let randIndex = Math.floor(Math.random() * (max - min + 1)) + min;
            shuffledAreas.push( this.areas[randIndex] );
            this.areas.splice(randIndex, 1);
        }
        this.areas = shuffledAreas;



        //create array for sprites:
        this.sprites = [];

        this.size = {
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 1800
        }
    }

    create(initializer){
        console.log(this.areas);
        for(let area of this.areas){
            for(let part of area){
                let bgSprite = initializer.add.sprite(this.size.maxX, 0, part);
                console.log(bgSprite);
                bgSprite.setOrigin(0);
                this.sprites.push( bgSprite );
    
                //add width of this background to total width:
                this.size.maxX += bgSprite.width;
            }
        
            

        }

        console.log(this.size.maxX);
    }

    update(initializer){

        

        if(player.sprite.x > this.size.maxX - 3200){
            //add a new background:
            console.log("Expanding world right");
            //take the left most background and move it to the right most position:
            this.sprites.push(this.sprites[0]);
            
            let lastNum = this.sprites.length - 1;
            this.sprites[ lastNum ].x = this.size.maxX;
            this.sprites.splice(0,1);

            this.size.minX += this.sprites[0].width;
            this.size.maxX += this.sprites[0].width;

        }
        else if(player.sprite.x < this.size.minX + 3200){
            //add a new background:
            console.log("Expanding world left");
            //take the right most background and move it to the left most position:
            
            let lastNum = this.sprites.length - 1;
            let lastItem = this.sprites[ lastNum ];
            this.sprites.splice(0 , 0, lastItem);
            this.sprites[ 0 ].x = this.size.minX;
            lastNum = this.sprites.length - 1;
            this.sprites.splice(lastNum, 1);


            this.size.minX -= this.sprites[0].width;
            this.size.maxX -= this.sprites[0].width;

        }

        //console.log(this.size);

        //set world bounds to match the background:
        initializer.physics.world.bounds.left = this.size.minX;
        initializer.physics.world.bounds.right = this.size.maxX;
        initializer.physics.world.bounds.height = this.size.maxY;

        camera.setBounds(this.size.minX, this.size.minY, this.getWidth(), this.size.maxY);

    }

    getWidth(){
        return this.size.maxX - this.size.minX;
    }

}