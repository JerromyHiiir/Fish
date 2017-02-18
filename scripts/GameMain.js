function GameMain(){

  PIXI.Container.call(this);
  this.name = "gameMain";

  this.gameMainBg = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/main_game_bg.png"].texture);
  this.gameMainBg.interactive = true;
  this.gameMainBg.width = GAME_WIDTH;
  this.gameMainBg.height = GAME_HEIGHT;
  this.addChild(this.gameMainBg);
  this.gameMainBg.visible = true;

  
  
  this.countNum = 0;
  this.lastTime = Date.now();
  this.anotherLastTime = this.lastTime;
  this.timeSinceLastFrame = 0;
  
  //Game Property
  this.gameScore = 0;
  this.gameMaxTime = 50*1000;  //共50秒 
  this.countTimerMax = 0;   //倒數5秒開始


  this.rowNum = 5;
  this.colNum = 5;

  this.fishNum = 20;
  this.fishArr = [];
  this.eatArr = [];
  this.eatID = 0;
  this.stoneNum = 25;

  this.bgItemNum = 4;

  this.blurFilter = new PIXI.filters.BlurFilter();
  this.blurFilter.blur = 1;

  this.blurFilter2 = new PIXI.filters.BlurFilter();
  this.blurFilter2.blur = 0.5;

  this.blurFilter3 = new PIXI.filters.BlurFilter();
  this.blurFilter3.blur = 1.2;

  this.blurFilter4 = new PIXI.filters.BlurFilter();
  this.blurFilter4.blur = 1.5;

  for(var i = 0 ; i < this.bgItemNum ; i++){

    var bgItem4Sp = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/bgItem4.png"].texture);
    
    
    if(i == 0){

      bgItem4Sp.anchor.x = 0.3;
      bgItem4Sp.anchor.y = 0.3;
      bgItem4Sp.x = 0;
      bgItem4Sp.y = 0;

    }else if(i == 1){

      bgItem4Sp.anchor.x = 0.7;
      bgItem4Sp.anchor.y = 0.5;
      bgItem4Sp.x = GAME_WIDTH;
      bgItem4Sp.y = GAME_HEIGHT/2;

    }else{

      bgItem4Sp.anchor.x = 0.7;
      bgItem4Sp.anchor.y = 0.5;
      bgItem4Sp.x = Math.random()*GAME_WIDTH*0.3;
      bgItem4Sp.y = Math.random()*GAME_HEIGHT;

    }


    


    bgItem4Sp.rotation = Math.random()*(Math.PI);
    bgItem4Sp.scale.x = bgItem4Sp.scale.y = Math.random()*0.3+0.4;
    //bgItem4Sp.filters = [this.blurFilter4];
    this.addChild(bgItem4Sp);

   }


  for(var i = 0 ; i < this.stoneNum ; i++){

    var stoneID = Math.floor(Math.random()*5+1);
    var stoneSP = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/stone"+stoneID+".png"].texture);
    stoneSP.anchor.x = 0.5;
    stoneSP.anchor.y = 0.5;
    stoneSP.x = Math.random()*GAME_WIDTH;
    stoneSP.y = Math.random()*GAME_HEIGHT;
    stoneSP.rotation = Math.random()*(Math.PI*2);
    stoneSP.scale.x = stoneSP.scale.y = Math.random()*0.2+0.2;
    //stoneSP.filters = [this.blurFilter3];
    this.addChild(stoneSP);

   }

   this.item1 = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/bgItem3.png"].texture);
   //this.item1.filters = [this.blurFilter];
   this.item1.anchor.x = 0.1;
   this.item1.anchor.y = 0.5;
   this.item1.y = GAME_HEIGHT/2 - 150;
   this.item1.x = 100;
   this.item1.rotation = Math.PI/2;
   this.item1.scale.x = this.item1.scale.y = 0.6;
   this.addChild(this.item1);

   this.item2 = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/bgItem2.png"].texture);
   //this.item2.filters = [this.blurFilter];
   this.item2.anchor.x = 0.9;
   this.item2.anchor.y = 0.2;
   this.item2.x = GAME_WIDTH;

   this.item2.scale.x = this.item2.scale.y = 0.4;
   this.addChild(this.item2);

   this.item3 = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/bgItem1.png"].texture);
   //this.item3.filters = [this.blurFilter];
   this.item3.anchor.x = 0.9;
   this.item3.anchor.y = 0.8;
   this.item3.y = GAME_HEIGHT;
   this.item3.x = GAME_WIDTH;

   this.item3.scale.x = this.item3.scale.y = 0.4;
   this.addChild(this.item3);


  for(var i = 0 ; i < this.fishNum ; i++){

    var fishSp = new Fish(GAME_WIDTH/2, GAME_HEIGHT/2);
    fishSp.scale.x = fishSp.scale.y = Math.random()*0.1 + 0.15;
    fishSp.vx = Math.random()*5-2.5;
    fishSp.vy = Math.random()*5-2.5;
    fishSp.x = Math.random()*GAME_WIDTH;
    fishSp.y = Math.random()*GAME_HEIGHT;
    //fishSp.filters = [this.blurFilter2];
    fishSp.fishID = i;


    // if(i > this.fishNum - 6){

    //     fishSp.tint = Math.random() * 0xFFFFFF;
    // }

    //fishSp.rotation = Math.random();
    this.fishArr.push(fishSp);
    this.addChild(fishSp);

  }
  

  this.init = function(){

    console.log("init");


  }

  this.onTapClick = function(touchData){    

    var gameMainObj = this.parent;

    var eatType = Math.floor(Math.random()*6);

    gameMainObj.createEat(eatType);
    //console.log(gameMainObj);

    //var localPt = touchData.data.getLocalPosition(gameMainObj);

    //console.log("Tap");

    //gameMainObj.fishSp.targetX = localPt.x;
    //gameMainObj.fishSp.targetY = localPt.y;
    
    

  }

  this.createEat = function(eatType){

    var eatObj = new GameBall(Math.random()*GAME_WIDTH, Math.random()*GAME_HEIGHT, Math.random()*0.2+0.3, Math.random()*0.4-0.2, Math.random()*0.4-0.2, eatType, this.eatID);
    this.eatArr.push(eatObj);
    //this.eatObj.filters = [this.blurFilter2];
    this.eatID += 1;
    eatObj.alpha = 0;
    this.addChild(eatObj);
    TweenMax.to(eatObj, 0.5, {delay:0, alpha:1, ease:"Linear.easeOut"});

  }

  this.removeEat = function(removeEat){

    var findIndex = -1;

    for(var i = 0 ; i < this.eatArr.length ; i++){

      var eatSp = this.eatArr[i];
      if(eatSp.gameBallID == removeEat.gameBallID){
        findIndex = i;
        break;
      }



    }

    var ballNum = this.eatArr.length;
    if(ballNum > 0 && findIndex != -1){
      this.eatArr.splice(findIndex, 1);
    }


  }



  this.onTapMove = function(touchData){

    var localPt = touchData.data.getLocalPosition(this);
    //console.log("move");
    //this.parent.ballTarget.x = localPt.x;
    //this.parent.ballTarget.y = localPt.y;
    //this.position.x = localPt.x;
    //this.position.y = localPt.y;
  

  }

  this.startInstruction = function(){

    console.log("start show startInstruction!");
    
    
  }

  this.finishInstruction = function(){


    this.lastTime = Date.now();
    this.anotherLastTime = this.lastTime;
    gameMainStart();
  
    
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
    this.interactive = true;
    this.gameMainBg.on('mousedown', this.onTapClick);
    this.gameMainBg.on('pointerdown', this.onTapClick);
    this.gameMainBg.on('touchstart', this.onTapClick);
    //this.gameMainBg.on('mousemove', this.onTapMove);
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


    //this.fishSp.updateAnimation();

    for(var i = 0 ; i < this.fishArr.length ; i++){

      var fishSp = this.fishArr[i];
      fishSp.updateAnimation();

    }


    for(var i = 0 ; i < this.eatArr.length ; i++){

      var eatSp = this.eatArr[i];
      eatSp.updateAnimation();

    }


    for(var i = 0 ; i < this.eatArr.length ; i++){

      for(var j = 0 ; j < this.fishArr.length ; j++){

        var fishSp = this.fishArr[j];
        if(fishSp.eatType == null){

            var eatSp = this.eatArr[i];
            var disX = eatSp.x - fishSp.x;
            var disY = eatSp.y - fishSp.y;
            var dis = this.calLength(disX, disY);
            if(dis <= 200){
              fishSp.eatTarget = eatSp;
              fishSp.fishStatus = "hasTarget";
            }


        }
        


      }

    }



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

  this.calLength = function(xNum, yNum){

      var lengthNum = Math.sqrt(xNum*xNum + yNum*yNum);
      return lengthNum;
  }

}


GameMain.prototype = new PIXI.Container();
GameMain.prototype.constructor = GameMain;
GameMain.prototype.sayHello = function(){
  console.log("GameMain");
}

//Game Ball Object

function GameBall(posiX, posiY, mass, vx, vy, ballType, idNum){

  PIXI.Sprite.call(this, loader.resources["_assets/"+folderName+"/eat"+(ballType+1)+".png"].texture);
  
  //this.objName = "Bunny2";
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.position.x = posiX;
  this.position.y = posiY;
  this.vx = vx;
  this.vy = vy;
  this.scale.x = mass;
  this.scale.y = mass;
  this.interactive = true;
  this.gameBallID = idNum;
  //this.parent = parentObj;


  this.init = function(){

    console.log("init");


  }

  this.updateAnimation = function(){

    this.x += this.vx*2;
    this.y += this.vy*2;

    this.rotation += this.vx/4;

    if(this.position.x > GAME_WIDTH + 100){

      this.position.x = -100;
      this.vx = Math.random()*0.4-0.2;
      this.vy = Math.random()*0.4-0.2;

    }

    if(this.position.x < -100){

      this.position.x = GAME_WIDTH + 100;
      this.vx = Math.random()*0.4-0.2;
      this.vy = Math.random()*0.4-0.2;
      
    }

    if(this.position.y > GAME_HEIGHT + 100){

      this.position.y = -100;
      this.vx = Math.random()*0.4-0.2;
      this.vy = Math.random()*0.4-0.2;

    }

    if(this.position.y < -100){

      this.position.y = GAME_HEIGHT + 100;
      this.vx = Math.random()*0.4-0.2;
      this.vy = Math.random()*0.4-0.2;
      
    }
    
  }

  


//===========================

}

GameBall.prototype = new PIXI.Sprite();
GameBall.prototype.constructor = GameBall;
GameBall.prototype.sayHello = function(){
  console.log("I'm GameBall");
}

//Segment

function Segment(posiX, posiY, cPt1, cPt2, type){



  if(type == 0){
     PIXI.Sprite.call(this, loader.resources["_assets/"+folderName+"/fish_body.png"].texture);
  }else if(type == 1){
     PIXI.Sprite.call(this, loader.resources["_assets/"+folderName+"/fish_tails.png"].texture);
  }else if(type == 2){
     PIXI.Sprite.call(this, loader.resources["_assets/"+folderName+"/fish_fin_left.png"].texture);
  }else if(type == 3){
     PIXI.Sprite.call(this, loader.resources["_assets/"+folderName+"/fish_fin_right.png"].texture);
  }
  
  
  //this.objName = "Bunny2";
  this.anchor.x = cPt1;
  this.anchor.y = cPt2;
  this.position.x = posiX;
  this.position.y = posiY;
  this.pinX = 0;
  this.pinY = 0;
  this.type = type;
  this.rForce = 0;
  this.rFriction = 0.9;


  this.segmentW = this.width;
  this.segmentH = this.height;
  
  
  //this.parent = parentObj;


  this.init = function(){

    console.log("init");


  }

  this.updateAnimation = function(){

     var oRotate = this.rotation;
     var rotationdifference = Math.atan2(Math.sin(this.rForce-oRotate),Math.cos(this.rForce-oRotate));
     if(this.type == 1){
        this.rotation += rotationdifference * 0.05;
     }else{
        this.rotation += rotationdifference * 0.05;
     }
     
    
  }

  this.getPinPosi = function(){

    console.log("get pin");

    this.pinX = this.x + Math.cos(this.rotation)*this.segmentW;
    this.pinY = this.y + Math.sin(this.rotation)*this.segmentW;
    //console.log(this.pinX + " " + this.pinY);



  }

  


//===========================

}

Segment.prototype = new PIXI.Sprite();
Segment.prototype.constructor = Segment;
Segment.prototype.sayHello = function(){
  console.log("I'm Segment");
}

//Fish

function Fish(posiX, posiY){

  PIXI.Sprite.call(this, loader.resources["_assets/"+folderName+"/fish_body_empty.png"].texture);
  
  //this.objName = "Bunny2";
  this.anchor.x = 0;
  this.anchor.y = 0.5;
  this.position.x = posiX;
  this.position.y = posiY;
  this.pinX = 0;
  this.pinY = 0;


  this.segmentW = this.width;
  this.segmentH = this.height;

  this.segmentArr = [];

  this.segmentFinLeft = new Segment(0,0,0.6,1,2);
  this.addChild(this.segmentFinLeft);
  this.segmentFinLeft.x = 350;
  this.segmentFinLeft.y = -65;

  this.segmentFinRight = new Segment(0,0,0.6,0,3);
  this.addChild(this.segmentFinRight);
  this.segmentFinRight.x = 350;
  this.segmentFinRight.y = 65;


  this.segmentBody = new Segment(0,0,0,0.5,0);
  this.addChild(this.segmentBody);
  this.segmentBody.x -= this.segmentBody.width;

  this.segment = new Segment(0,0,0.95,0.5,1);
  this.addChild(this.segment);
  this.segment.y = -6;
  this.segment.x -= this.segmentBody.width;

  this.segmentFinLeft.x -= this.segmentBody.width;
  this.segmentFinRight.x -= this.segmentBody.width;
  
  //Rotation Force
  this.headRotateNum = 0;
  this.headRotateFriction = 0.9;


  //Force
  this.accX = 0;
  this.accY = 0;
  this.accLength = 0;

  //Now Speed
  this.vx = 2;
  this.vy = 1;
  this.vLength = 0;

  this.maxSpeed = 4;
  this.maxForce = 0.1;
  this.targetX = GAME_WIDTH/2 + 100;
  this.targetY = GAME_HEIGHT/2 + 100;
  
  //this.parent = parentObj;

  this.fishStatus = "wander";
  this.eatTarget = null;
  this.fishID = -1;


  this.init = function(){

    console.log("init");


  }

  this.headingToTarget = function(rotateNum){

    this.headRotateNum = rotateNum;
    //this.segment.rotation = -this.rForce*0.7;


  }

  this.updateAnimation = function(){

     //Update Heading Rotation
     //var disFromTarget = this.calLength(this.targetX - this.x, this.targetY - this.y);
     //console.log(disFromTarget);

     //if(disFromTarget > 1){
        //this.seek(this.targetX, this.targetY);
        
        
     //}

     if(this.fishStatus == "wander"){
        this.wander();
        this.updateMoving(); 
        this.updateHeading();
     }else if(this.fishStatus == "hasTarget"){

        if(this.eatTarget != null){

          var disFromTarget = this.calLength(this.eatTarget.x - this.x, this.eatTarget.y - this.y);
          var parentObj = this.parent;

          if(disFromTarget < 10){
          
            //parentObj
            //this.eatTarget = null;

            if(this.eatTarget != null){

              parentObj.removeEat(this.eatTarget);

            }

            parentObj.removeChild(this.eatTarget);

            for(var i = 0 ; i < parentObj.fishArr ; i++){

                var fishSP = parentObj.fishArr[i];
                if(this.eatTarget.gameBallID == fishSP.eatTarget.gameBallID){
                  fishSP.eatTarget = null;
                  fishSP.fishStatus = "wander";
                  fishSP.vx = Math.random()*4-2;
                  fishSP.vy = Math.random()*4-2;
                }

            }

            this.eatTarget = null;
            this.fishStatus = "wander";
            this.vx = Math.random()*4-2;
            this.vy = Math.random()*4-2;
          
          
          }else{


            this.seek(this.eatTarget.x, this.eatTarget.y);
            this.updateMoving(); 
            this.updateHeading();



          }

        }

        

     }

     

     //this.fishStatus
    
  }

  this.applyForce = function(forceNumX, forceNumY){


    this.accX += forceNumX;
    this.accY += forceNumY;


  }

  this.wander = function(){
 
    var wanderR = 25;
    var wanderD = 200;
    var change = 0.4;

    var wandertheta = Math.random()*(change*2) - change;

    //console.log(wandertheta);

    var nowWx = this.vx;
    var nowWy = this.vy;
    var nowWL = this.calLength(nowWx, nowWy);
    nowWx /= nowWL;
    nowWy /= nowWL;
    nowWx *= wanderD;
    nowWy *= wanderD;
    nowWx += this.x;
    nowWy += this.y;


    var h = Math.atan2(this.vy, this.vx);

    var wx = wanderR * Math.cos(wandertheta + h);
    var wy = wanderR * Math.sin(wandertheta + h);

    var twx = nowWx + wx;
    var twy = nowWy + wy;

    this.seek(twx, twy);

  }

  this.seek = function(targetX, targetY){

    var dsX = targetX - this.x;
    var dsY = targetY - this.y;
    this.headRotateNum = Math.atan2(dsY, dsX);

    var dsLength = this.calLength(dsX, dsY);
    //console.log(dsLength);
    var dsNX = dsX/dsLength;
    var dsNY = dsY/dsLength;

    //=======================

    var seekX = dsNX - this.vx;
    var seekY = dsNY - this.vy;
    var seekLength = this.calLength(seekX, seekY);
    // if(seekLength < maxForce){

    // }

    this.applyForce(seekX, seekY);


  }

  this.updateMoving = function(){


    var limitV = this.calLength(this.vx, this.vy);


    if(limitV < this.maxSpeed){
        this.vx += this.accX;
        this.vy += this.accY;   
    }

    this.position.x += this.vx;
    this.position.y += this.vy;

    this.accX = 0;
    this.accY = 0;



    if(this.position.x > GAME_WIDTH + 200){

      this.position.x = -200;
      this.vx = Math.random()*5-2.5;
      this.vy = Math.random()*5-2.5;

    }

    if(this.position.x < -200){

      this.position.x = GAME_WIDTH + 200;
      this.vx = Math.random()*5-2.5;
      this.vy = Math.random()*5-2.5;
      
    }

    if(this.position.y > GAME_HEIGHT + 200){

      this.position.y = -200;
      this.vx = Math.random()*5-2.5;
      this.vy = Math.random()*5-2.5;

    }

    if(this.position.y < -200){

      this.position.y = GAME_HEIGHT + 200;
      this.vx = Math.random()*5-2.5;
      this.vy = Math.random()*5-2.5;
      
    }
    

  }

  this.updateHeading = function(){

     var oRotate = this.rotation;
     var rotationdifference = Math.atan2(Math.sin(this.headRotateNum-oRotate),Math.cos(this.headRotateNum-oRotate));
     this.rotation += rotationdifference * 0.1;
     this.segment.rotation -= rotationdifference * 0.1;
     this.segmentFinLeft.rotation -= rotationdifference * 0.1;
     this.segmentFinRight.rotation -= rotationdifference * 0.1;
     this.segment.updateAnimation();
     this.segmentFinLeft.updateAnimation();
     this.segmentFinRight.updateAnimation();
  }

  this.calLength = function(xNum, yNum){

      var lengthNum = Math.sqrt(xNum*xNum + yNum*yNum);
      return lengthNum;
  }

  this.getPinPosi = function(){

    //console.log("get pin");

    this.pinX = this.x + Math.cos(this.rotation)*this.segmentW;
    this.pinY = this.y + Math.sin(this.rotation)*this.segmentW;
    //console.log(this.pinX + " " + this.pinY);



  }

  

  


//===========================

}

Fish.prototype = new PIXI.Sprite();
Fish.prototype.constructor = Fish;
Fish.prototype.sayHello = function(){
  console.log("I'm Fish");
}

