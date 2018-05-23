class Camera{
    constructor(initializer){
        this.main = initializer.cameras.main;
        this.main.startFollow(player.sprite);
    }

    update(initializer){
    }

    setBounds(minX, minY, maxX, maxY){
        this.main.setBounds(minX, minY, maxX, maxY);
    }
}