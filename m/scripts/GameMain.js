function GameMain(){

  PIXI.Container.call(this);
  this.name = "gameMain";
  
  this.countNum = 0;
  this.lastTime = Date.now();
  this.anotherLastTime = this.lastTime;
  this.timeSinceLastFrame = 0;
  
  //Game Property
  this.gameScore = 0;
  this.gameMaxTime = 50*1000;  //共50秒 
  this.countTimerMax = 5000;   //倒數5秒開始


  this.rowNum = 5;
  this.colNum = 5;

  

  this.init = function(){

    console.log("init");


  }

  this.startInstruction = function(){

    console.log("start show startInstruction!");
    
    
  }

  this.finishInstruction = function(){


    this.lastTime = Date.now();
    this.anotherLastTime = this.lastTime;
    gameMainStart();

   
    // TweenMax.to(this.instruct_ball, 0.1, {delay:0, alpha:0, ease:"Linear.easeOut", onComplete:this.onCompleteInstruction, onCompleteParams:[this.instruct_ball]});
    // TweenMax.to(this.countDown, 0.1, {delay:0, alpha:0, ease:"Linear.easeOut", onComplete:this.onCompleteInstruction, onCompleteParams:[this.countDown]});
    // TweenMax.to(this.instruct_hand, 0.1, {delay:0, alpha:0, ease:"Linear.easeOut", onComplete:this.onCompleteInstruction, onCompleteParams:[this.instruct_hand]});
    // TweenMax.to(this.instruct_desc, 0.1, {delay:0, alpha:0, ease:"Linear.easeOut", onComplete:this.onCompleteInstruction, onCompleteParams:[this.instruct_desc]});
    
    
  }

  this.onCompleteInstruction = function(completeObj){
    
    //console.log("Show Start Complete! "+completeObj.startGameBtn);
    //completeObj.visible = false;

  }

  this.transitionIn = function(){

    // console.log("init");
    // console.log("Show Info!");
    this.alpha = 0;
    this.visible = true;
    // this.instruct_hand_ani = TweenMax.to(this.instruct_hand.position, 0.4, {y:this.instruct_ball.y, ease:"Linear.easeOut", yoyo:true, repeat:-1});
    TweenMax.to(this, 0.5, {delay:0, alpha:1, ease:"Linear.easeOut", onComplete:this.transitionInOnComplete, onCompleteParams:[this]});


  }

  this.transitionInOnComplete = function(completeObj){
    
    //console.log("Show Start Complete! "+completeObj.startGameBtn);
    completeObj.lastTime = Date.now();
    gameReady();

  }

  this.transitionOut = function(){
    TweenMax.to(this, 0.5, {delay:0.3, alpha:0, ease:"Linear.easeOut", onComplete:transitionOutOnComplete, onCompleteParams:[this]});
  }


  this.onCompleteEndGame = function(endTapObj){

    var parentObj = endTapObj.parent;
    parentObj.removeChild(endTapObj);
    parentObj.gameEnd = null;
    parentObj.lastTime = Date.now();
    this.anotherLastTime = this.lastTime;
    this.timeSinceLastFrame = 0;
    gamePhase = "gameEnd";
    
    

  }



  this.gameMainUpdate = function(){


    var now = Date.now();    
    this.timeSinceLastFrame = now - this.lastTime;

    var restTime = this.gameMaxTime - this.timeSinceLastFrame;
    var secTime = Math.floor(restTime/1000);

    var passTime = now - this.anotherLastTime;

    

    if(restTime <= 0){
        restTime = 0;
        passTime = this.gameMaxTime;
        gamePhase = "gameFinish";
        this.lastTime = Date.now();
        this.anotherLastTime = this.lastTime;
        this.timeSinceLastFrame = 0;
    }

    console.log(passTime + " " + restTime);

    


    
    
    


  }

  this.countDownNumber = function(){


    var now = Date.now();    
    this.timeSinceLastFrame = now - this.lastTime;
    var restTime = this.countTimerMax - this.timeSinceLastFrame;

    if(restTime <= 0){
      restTime = 0;
      gamePhase = "gameStart";
      this.lastTime = Date.now();
      //倒數計時結束 結束教學
      this.finishInstruction();
    }

    var secTime = Math.floor(restTime/1000);
    console.log("Sec Pass Time: " + secTime);


    

  }

}


GameMain.prototype = new PIXI.Container();
GameMain.prototype.constructor = GameMain;
GameMain.prototype.sayHello = function(){
  console.log("GameMain");
}

//Game Ball Object

function GameBall(posiX, posiY, targetX, targetY, gameBallID, positionID, ballType, ballPosi){
  if(ballType == 0){
    PIXI.Sprite.call(this, loader.resources["_assets/"+folderName+"/game_main_ball.png"].texture);
  }else{
    PIXI.Sprite.call(this, loader.resources["_assets/"+folderName+"/game_main_ball_plus.png"].texture);
  }
  
  //this.objName = "Bunny2";
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.position.x = posiX + 4;
  this.position.y = posiY;
  this.targetX = targetX;
  this.targetY = targetY;
  this.speed = 5;
  this.gameBallID = gameBallID;
  this.isRemoved = false;
  this.canPush = false;
  this.positionID = positionID;
  this.scoreLevel = 0;
  this.addScoreNum = 0;
  this.ballType = ballType;
  this.ballPosi = ballPosi;
  
  //this.parent = parentObj;


  this.init = function(){

    console.log("init");


  }

  this.updateAnimation = function(){


    
  }

  


//===========================

}

GameBall.prototype = new PIXI.Sprite();
GameBall.prototype.constructor = GameBall;
GameBall.prototype.sayHello = function(){
  console.log("I'm GameBall");
}

