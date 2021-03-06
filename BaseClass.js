class BaseClass{
    constructor(x,y,width,height,angle){
        var options = {
            restitution:0.8,
            friction:1.5,
            density:0.5
            
        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width;
        this.height = height;
        this.image = loadImage('sprites/base.png')
        World.add(world,this.body);
     
    }
    display(){
        
        var angle = this.body.angle;
        //making changes in settings
        push();
        //calling the x and y
        translate(this.body.position.x,this.body.position.y);
        //setting the angle
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.width,this.height);
        //setting the default settings back
        pop();
    }
}