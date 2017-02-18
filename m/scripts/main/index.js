// JavaScript Document

var stage;
var ball_mc;
var dirLine;
var canvas;
var ballMCArr;
var gf = 0.1;
var F = 0;
var mouseX = 0;
var mouseY = 0;



$(document).ready(function(){
    
                  canvas = $('#mainCanvas')[0];
                  canvas.width = window.innerWidth;
                  canvas.height = window.innerHeight;
                  
                  //=============================================
                  
                  stage = new createjs.Stage("mainCanvas");

                  ball_mc = new BallMC(0);

                  //ball_mc.x = ball_mc.ball.width/2;
                  
                  ball_mc.x = ball_mc.width/2;
                  ball_mc.y = canvas.height/2;
                  ball_mc.vx = 0;
                  ball_mc.vy = 0;

                  console.log("ball vx: "+ball_mc.vx);

                  stage.addChild(ball_mc);

                  ball_mc.addEventListener("click", function(event) {

                    var target = event.currentTarget;
                    console.log(target.idNum);


                  })


                  //Click Event
                  this.addEventListener("click", function(event) {

                    //console.log(event.x + " " + event.y);

                    window.webkit.messageHandlers.observe.postMessage("test test");

                    mouseX = event.x;
                    mouseY = event.y;

                    var vx = mouseX - ball_mc.x;
                    var vy = mouseY - ball_mc.y;

                    var dist = Math.sqrt(vx*vx + vy*vy);

                    var vxN = 0;
                    var vyN = 0;

                    if (dist != 0) {

                      vxN = vx/dist;
                      vyN = vy/dist;


                    }else{

                      vxN = 0;
                      vyN = 0;

                    }
                    

                    F += 5;

                    ball_mc.vx = vxN;
                    ball_mc.vy = vyN;


                  })




                  mouseX = ball_mc.x;
                  mouseY = ball_mc.y;

                  
                  createjs.Ticker.on("tick", tick);
                  createjs.Ticker.setFPS(60);
                  

                  var text = new createjs.Text("Friction Force Test", "20px Arial", "#ff7700");
                  text.x = 30;
                  text.y = 30;
                  text.textBaseline = "alphabetic";
                  stage.addChild(text);

                  
                  var text2 = new createjs.Text("Click Screen Anywhere to see the result.   By JERROMY. 20150310", "5px Arial", "#ffffff");
                  text2.x = 30;
                  text2.y = 50;
                  text2.textBaseline = "alphabetic";
                  stage.addChild(text2);

                  initEvent();
                  
                  console.log("Ready");
    
});

$(window).resize(function(){
                 
                 
                 
});

function tick(event){


                 //console.log(event);
    
                 ball_mc.x += ball_mc.vx*F;    //得知方向後 再給予力
                 ball_mc.y += ball_mc.vy*F;    //得知方向後 再給予力


                 //1. friction
                 //ball_mc.vx *= gf;
                 //ball_mc.vy *= gf;


                 //2. friction

                 if(F > gf){
                    F -= gf;
                 }else{
                    F = 0;
                 }

                 
                 //靜摩擦力  物理靜止不動  靜摩擦力等於外力  相等的結論就是 不動
                 //動摩擦力

                 
                 stage.update(event);

                 if (ball_mc.x >= canvas.width) {
                   ball_mc.x = 0;
                 }

                 if (ball_mc.x <= 0 - ball_mc.width/2) {
                   ball_mc.x = canvas.width;
                 }

                 if (ball_mc.y >= canvas.height) {
                   ball_mc.y = 0;
                 }

                 if (ball_mc.y <= 0 - ball_mc.height/2) {
                   ball_mc.y = canvas.height;
                 }
    
    
}

function initObject(){
	
	
}


function initEvent(){
	
	
	

}

