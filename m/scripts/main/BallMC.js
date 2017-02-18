(function() {
 
 //Constructor
function BallMC(id) {


    this.Container_constructor();
    this.init(id);
    
    
}

var p = createjs.extend(BallMC, createjs.Container);
p.vx = 0;
p.vy = 0;
p.ax = 0;
p.ay = 0;
p.idNum = 0;
p.ball;
 

//self defined.
p.init = function(id){

	//console.log(id);
	
	this.ball = new createjs.Shape();
	this.idNum = id;
   	this.ball.graphics.beginFill("red").drawCircle(0, 0, 40);
    this.addChild(this.ball);
    this.width = 40*2;
    this.height = 40*2;
    

    console.log("init "+this.idNum);
    //circle.x = circle.y = 50;

} 

/*
p.draw = function() {
    this.Container_draw();
    // add custom logic here.
}*/
 
window.BallMC = createjs.promote(BallMC, "Container");


}());