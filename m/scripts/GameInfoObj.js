
//=====================

function RankCell(){

  PIXI.Container.call(this);

  this.name = "rankCell";
  this.rankImgLoader = new PIXI.loaders.Loader();
  //518 48
  this.width = 518;
  this.height = 60;

  this.rankTxt = new PIXI.extras.BitmapText('1.', { font: '35 RankFont', align: 'left' });
  this.addChild(this.rankTxt);
  this.rankTxt.y = 60/2 - this.rankTxt.height/2;
  this.rankTxt.x = 15;

  this.mask_bg = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/mask_bg.png"].texture);
  this.addChild(this.mask_bg);
  this.mask_bg.anchor.x = 0.5;
  this.mask_bg.anchor.y = 0.5;
  this.mask_bg.y = 60/2;
  this.mask_bg.x = 67 + 30;



  this.nameTxt = new PIXI.Text('李智閔', { font: 'bold 27px Arial', fill: '#FFFFFF', align: 'left'});
  this.addChild(this.nameTxt);
  this.nameTxt.y = 60/2 - this.nameTxt.height/2;
  this.nameTxt.x = 80 + 65;

  this.scoreTxt = new PIXI.extras.BitmapText('2500', { font: '35 RankFont', align: 'left' });
  this.addChild(this.scoreTxt);
  this.scoreTxt.y = 60/2 - this.scoreTxt.height/2;
  this.scoreTxt.x = (80 + 65 + 210) - this.scoreTxt.width/2;

  this.dateTxt = new PIXI.extras.BitmapText('8/9 13:01', { font: '35 RankFont', align: 'left' });
  this.addChild(this.dateTxt);
  this.dateTxt.y = 60/2 - this.dateTxt.height/2;
  this.dateTxt.x = (80 + 65 + 210 + 175) - this.dateTxt.width/2;
  this.imagePath;

  this.startLoadImg = function(imgPath){

    var callObj = this;
    this.imagePath = imgPath;
    this.rankImgLoader.callObj = this;
    this.rankImgLoader.add(imgPath,{crossOrigin:true})
      .on("progress", callObj.loadProgressHandler)
      .load(callObj.loadImgFinish);

  }

  this.loadProgressHandler = function(loader, resource) {
    
      console.log("progress head: " + loader.progress + "% " + resource.url);
      //console.log(this.callObj.imagePath);
      
  }


  this.loadImgFinish = function(){
      // 這裡代表資源都已載入完畢，可以使用 'images/logo.png' 的 Texture Cache 了

      console.log(this);
      
      var headImg = new PIXI.Sprite(this.resources[this.callObj.imagePath].texture);
      this.callObj.mask_bg.addChild(headImg);
      headImg.width = this.callObj.mask_bg.width;
      headImg.height = this.callObj.mask_bg.height;
      headImg.anchor.x = 0.5;
      headImg.anchor.y = 0.5;
      headImg.x = 0;
      headImg.y = 0;
      var mask = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/mask.png"].texture);
      mask.width = this.callObj.mask_bg.width;
      mask.height = this.callObj.mask_bg.height;
      mask.anchor.x = 0.5;
      mask.anchor.y = 0.5;
      mask.position.x = 0;
      mask.position.y = 0;
      this.callObj.mask_bg.addChild(mask);
      headImg.mask = mask;

      //headImg.x = 0;
      //headImg.y = 0;

  }

  this.init = function(){

    console.log("init");


  }

  this.transitionIn = function(){
    TweenMax.to(this, 0.5, {delay:1, alpha:1, ease:"Linear.easeOut", onComplete:this.onComplete, onCompleteParams:[this]});
  }

  this.transitionOut = function(){
    TweenMax.to(this, 0.5, {delay:0.3, alpha:0, ease:"Linear.easeOut", onComplete:transitionOutComplete, onCompleteParams:[this]});
  }

  this.onComplete = function(completeObj){
    
    //console.log("Show Start Complete! "+completeObj.startGameBtn);

  }

 

}

RankCell.prototype = new PIXI.Container();
RankCell.prototype.constructor = RankCell;
RankCell.prototype.sayHello = function(){
  console.log("Rank Cell");
}

//===================================================================

function GameRank(rankFrom){

  PIXI.Container.call(this);

  this.gameRewardBg = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/rank_main_bg.png"].texture);
  
  this.addChild(this.gameRewardBg);

  this.name = "gameRank";
  //RewardScoreFont
  
  this.visible = false;
  this.alpha = 0;

  this.rankFrom = rankFrom;
  this.backType = "";

  if(this.rankFrom == 1){
    this.startGameBtn = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/rank_again_btn.png"].texture);
    this.addChild(this.startGameBtn);
    this.startGameBtn.anchor.x = 0.5;
    this.startGameBtn.anchor.y = 0.5;
    this.startGameBtn.x = GAME_WIDTH/2 + this.startGameBtn.width/2 + 10;
    this.startGameBtn.y = GAME_HEIGHT*0.85;
    this.startGameBtn.interactive = true;

    this.backIndexBtn = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/rank_back_index.png"].texture);
    this.addChild(this.backIndexBtn);
    this.backIndexBtn.anchor.x = 0.5;
    this.backIndexBtn.anchor.y = 0.5;
    this.backIndexBtn.x = GAME_WIDTH/2 - this.backIndexBtn.width/2 - 10;
    this.backIndexBtn.y = GAME_HEIGHT*0.85;
    this.backIndexBtn.interactive = true;
  }else if(this.rankFrom == 2){
    this.backIndexBtn = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/rank_back_index.png"].texture);
    this.addChild(this.backIndexBtn);
    this.backIndexBtn.anchor.x = 0.5;
    this.backIndexBtn.anchor.y = 0.5;
    this.backIndexBtn.x = GAME_WIDTH/2;
    this.backIndexBtn.y = GAME_HEIGHT*0.85;
    this.backIndexBtn.interactive = true;
    
  }else{

  }

  
  
  
  this.btnAni;

  this.init = function(){

    console.log("init");


  }

  this.transitionIn = function(){

    //console.log("init");
    //console.log("Show Info!");

    // var gameRankCell = new RankCell();
    // //console.log(gameRankCell.name);
    // gameRankCell.startLoadImg();
    // this.addChild(gameRankCell);
    

    this.visible = true;

    if(this.rankFrom == 1){
      this.startGameBtn.on('touchstart', this.tapStartAgain);
      this.backIndexBtn.on('touchstart', this.tapStartBackIndex);
    }else if(this.rankFrom == 2){
      this.backIndexBtn.on('touchstart', this.tapStartBackIndex);
    }


    TweenMax.to(this, 0.5, {delay:1, alpha:1, ease:"Linear.easeOut", onComplete:this.onComplete, onCompleteParams:[this]});

  }

  this.transitionOut = function(delayNum){
    TweenMax.to(this, 0.1, {delay:0, alpha:0, ease:"Linear.easeOut", onComplete:transitionOutComplete, onCompleteParams:[this]});
  }

  this.onComplete = function(completeObj){

    completeObj.getGameRankData();
    
    //console.log("Show Start Complete! "+completeObj.startGameBtn);
    //completeObj.btnAni = TweenMax.to(completeObj.startGameBtn.scale, 0.4, {x:0.9, y:0.9, ease:"Linear.easeOut", yoyo:true, repeat:-1});

  }

  this.tapStartBackIndex = function(){

    this.interactive = false;
    console.log("click back index");
    this.parent.backType = "index";
    this.parent.transitionOut();


  }

  this.tapStartAgain = function(){

    this.interactive = false;
    console.log("click start again");
    this.parent.backType = "game";
    audio.play();
    this.parent.transitionOut();


  }


  this.getGameRankData = function(){

  //=========
    var callObj = this;
    var postObj = $.post(host+"/api/Active_Music/Rank",
                  {
                    logkey:logKey,
                    outletid:outletID,
                    sn:sn,
                    lang:"TW"
                  },
                  function(data, status){
                    console.log("Rank Data: " + data + "\nStatus: " + status);
                    var obj = JSON.parse(data);
                    var status = obj.status;

                    if(status == 666){
                      //console.log(obj.data);
                      callObj.createRankList(obj.data.list);




                    }






                  });
                  //===============



  }


  this.createRankList = function(dataList){
    var dataNum = dataList.length;
    //dataNum = 10;
    var spaceYNum = 12;
    var startY = GAME_HEIGHT * 0.243;
    for(var i = 0 ; i < dataNum ; i++){
      var gameRankCell = new RankCell();
      this.addChild(gameRankCell);
      gameRankCell.x = 48;
      gameRankCell.y = startY + (48+spaceYNum)*i;
      gameRankCell.scoreTxt.text = dataList[i].score;
      gameRankCell.scoreTxt.x = (80 + 65 + 210) - gameRankCell.scoreTxt.width/2;

      gameRankCell.dateTxt.text = dataList[i].time;
      gameRankCell.dateTxt.x = (80 + 65 + 210 + 175) - gameRankCell.dateTxt.width/2;

      gameRankCell.nameTxt.text = dataList[i].name;
      gameRankCell.rankTxt.text = dataList[i].rank+".";

      gameRankCell.startLoadImg(host + dataList[i].pic);

    }

  }

}

GameRank.prototype = new PIXI.Container();
GameRank.prototype.constructor = GameRank;
GameRank.prototype.sayHello = function(){
  console.log("GameRank");
}

//===================================================================


function GameReward(isIgnite, pointNum){

  PIXI.Container.call(this);

  if(isIgnite){
    this.gameRewardBg = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/reward_ignite.png"].texture);
  }else{
    this.gameRewardBg = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/reward_none_ignite.png"].texture);
  }
  
  this.addChild(this.gameRewardBg);

  this.name = "gameReward";
  //RewardScoreFont
  
  this.visible = false;
  this.alpha = 0;
  this.pointNum = pointNum;

  this.gameRewardTxt = new PIXI.extras.BitmapText(this.pointNum + 's', { font: '160 RewardScoreFont', align: 'left' });
  this.gameRewardTxt.position.x = GAME_WIDTH/2;
  this.gameRewardTxt.position.y = GAME_HEIGHT/2;
  this.gameRewardTxt.pivot.x = 0;
  this.gameRewardTxt.pivot.y = 160/2;
  this.addChild(this.gameRewardTxt);

  this.gameRewardTxt.position.x = GAME_WIDTH/2 - this.gameRewardTxt.width/2;
  this.gameRewardTxt.position.y = GAME_HEIGHT/2 + 30;
  
  this.btnAni;

  this.init = function(){

    console.log("init");


  }

  this.transitionIn = function(){

    //console.log("init");
    //console.log("Show Info!");

    this.visible = true;
    TweenMax.to(this, 0.5, {delay:1, alpha:1, ease:"Linear.easeOut", onComplete:this.onComplete, onCompleteParams:[this]});
    this.transitionOut(4);

  }

  this.transitionOut = function(delayNum){
    TweenMax.to(this, 0.5, {delay:delayNum, alpha:0, ease:"Linear.easeOut", onComplete:transitionOutComplete, onCompleteParams:[this]});
  }

  this.onComplete = function(completeObj){
    
    //console.log("Show Start Complete! "+completeObj.startGameBtn);
    //completeObj.btnAni = TweenMax.to(completeObj.startGameBtn.scale, 0.4, {x:0.9, y:0.9, ease:"Linear.easeOut", yoyo:true, repeat:-1});

  }

  this.tapStart = function(){


    //console.log("click tap");



  }
}

GameReward.prototype = new PIXI.Container();
GameReward.prototype.constructor = GameReward;
GameReward.prototype.sayHello = function(){
  console.log("GameReward");
}

//===================================================================

function GameStart(){

  PIXI.Container.call(this);

  this.rankBtn = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/rank.png"].texture);
  this.addChild(this.rankBtn);
  this.rankBtn.anchor.x = 0.5;
  this.rankBtn.anchor.y = 0.5;
  this.rankBtn.x = GAME_WIDTH/2;
  this.rankBtn.y = GAME_HEIGHT * 0.83;
  this.rankBtn.interactive = true;
  this.rankBtn.visible = true;

  this.name = "gameStart";

  


  this.startGameBtn = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/start_game_btn.png"].texture);
  this.addChild(this.startGameBtn);
  this.startGameBtn.anchor.x = 0.5;
  this.startGameBtn.anchor.y = 0.5;
  this.startGameBtn.visible = true;
  this.startGameBtn.x = GAME_WIDTH/2;
  this.startGameBtn.y = GAME_HEIGHT * 0.93;
  this.startGameBtn.interactive = true;
  this.btnAni;
  this.clickType = "";


  this.init = function(){

    console.log("init");


  }

  this.transitionIn = function(){

    //console.log("init");
    //console.log("Show Info!");

    this.startWord = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/footer.png"].texture);
    this.addChild(this.startWord);
    this.startWord.anchor.x = 0.5;
    this.startWord.anchor.y = 0.5;
    this.startWord.x = GAME_WIDTH/2;
    this.startWord.y = GAME_HEIGHT*0.40;
    this.startWord.visible = false;


    this.alpha = 0;
    this.visible = true;
    this.startGameBtn.on('touchstart', this.tapStart);
    this.startGameBtn.on('pointerdown', this.tapStart);
    this.startGameBtn.on('mousedown', this.tapStart);
    this.rankBtn.on('touchstart', this.tapRankStart);
    TweenMax.to(this, 0.5, {delay:1, alpha:1, ease:"Linear.easeOut", onComplete:this.transitionInOnComplete, onCompleteParams:[this]});


  }

  this.transitionOut = function(){
    TweenMax.to(this, 0.5, {delay:0.3, alpha:0, ease:"Linear.easeOut", onComplete:transitionOutOnComplete, onCompleteParams:[this]});
  }

  this.transitionInOnComplete = function(completeObj){
    
    //console.log("Show Start Complete! "+completeObj.startGameBtn);
    completeObj.btnAni = TweenMax.to(completeObj.startGameBtn.scale, 0.4, {x:0.9, y:0.9, ease:"Linear.easeOut", yoyo:true, repeat:-1});

  }

  this.tapStart = function(){

    // this.interactive = false;
    // console.log("click tap");


    var roomObj = new Object();
    roomObj.joinGroupID = groupID;
    roomObj.clientsID = clientID;
    roomObj.status = "CONNECTED";
    roomObj.action = "SEND_MSG_TO_GROUP";
    roomObj.playRole = "JOIN_PLAYER";
    roomObj.clientsRole = "JOIN_PLAYER";

    var eatType = Math.floor(Math.random()*6);

    roomObj.msg = eatType + ",m";

    var converStr = JSON.stringify(roomObj);

    Server.send( 'message', converStr);

    // audio = document.getElementById('audio');


    // this.parent.clickType = "game";
  
    // this.parent.btnAni.pause();
    // this.parent.transitionOut();


  }

  this.tapRankStart = function(){

    //this.interactive = false;
    //console.log("click tap");

    //audio = document.getElementById('audio');
    //audio2 = document.getElementById('audio2');

    //this.parent.clickType = "rank";
  
    //this.parent.btnAni.pause();
    //this.parent.transitionOut();


  }

}

GameStart.prototype = new PIXI.Container();
GameStart.prototype.constructor = GameStart;
GameStart.prototype.sayHello = function(){
  console.log("GameStart");
}


//=========================================================================================================================


function GameInfoHow(isIgnite){

  //console.log("Init Game GameInfoHow");
  PIXI.Container.call(this);
  //this.objName = "Bunny2";
  
  if(isIgnite){
  	this.gameInfoBg = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/ignite_page.png"].texture);
  }else{
  	this.gameInfoBg = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/none_ignite_page.png"].texture);
  }
  
  this.addChild(this.gameInfoBg);
  this.name = "gameInfoHow";

  this.gameStartBtn = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/none_ignite_game_btn.png"].texture);
  this.addChild(this.gameStartBtn);

  this.gameStartBtn.anchor.x = 0.5;
  this.gameStartBtn.anchor.y = 0.5;
  this.gameStartBtn.x = this.gameInfoBg.width/2;
  this.gameStartBtn.y = this.gameInfoBg.height * 0.86;
  this.gameStartBtn.interactive = true;
  
  this.btnAni;
  
  this.init = function(){

    console.log("init");


  }

  this.transitionIn = function(){

    //console.log("init");
    //console.log("Show Info!");
    this.alpha = 0;
    this.visible = true;
    this.gameStartBtn.on('touchstart', this.tapStart);
    TweenMax.to(this, 0.5, {delay:1, alpha:1, ease:"Linear.easeOut", onComplete:this.onComplete, onCompleteParams:[this]});


  }

  this.transitionOut = function(){
  	TweenMax.to(this, 0.1, {delay:0, alpha:0, ease:"Linear.easeOut", onComplete:transitionOutComplete, onCompleteParams:[this]});
  }

  this.onComplete = function(completeObj){
  	
  	//console.log("Show Info Complete! "+completeObj.gameStartBtn);
  	completeObj.btnAni = TweenMax.to(completeObj.gameStartBtn.scale, 0.4, {x:0.9, y:0.9, ease:"Linear.easeOut", yoyo:true, repeat:-1});

  }

  this.tapStart = function(){

    this.interactive = false;
  	//console.log("click tap");
    audio2 = document.getElementById('audio2');
    audio.play();
  	this.parent.btnAni.pause();
  	this.parent.transitionOut();


  }

}

GameInfoHow.prototype = new PIXI.Container();
GameInfoHow.prototype.constructor = GameInfoHow;
GameInfoHow.prototype.sayHello = function(){
  console.log("GameInfoHow");
}




