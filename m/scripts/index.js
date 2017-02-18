
var GAME_WIDTH = 720;
var GAME_HEIGHT = 1280;
var sW = 0;
var sH = 0;
var ratio;
//=====Assets
var pushSound = "pushSound";
var gameLoadingReady = false;
var percentScale = 0;
var isIgnite = true;

var rendererOptions;


var renderer;


// create the root of the scene graph
var stage;
var loadingTxt;

//_assets/mati/main_game_bg.png
// Main Page
var gameMainBg;
//_assets/mati/game_logo.png
var gameLogo;
//_assets/mati/game_alert_word.png
var gameAlert;

var gameInfoHow;
var gameStart;
var gameMain;
var gameReward;
var gameRank;


var gamePhase = "";
var totalScore = 0;
var totalReward = 0;
var outletID;
var logKey;
var sn;
var rank = 0;

var http = location.protocol;
var slashes = http.concat("//");
var host = slashes.concat(window.location.hostname);
var lang = "TW";
var isMax = false;

var clientID = "";
var groupID = "";
var qrcode;
var qrCodeStr = "";
var Server;


//http://localhost:8888/JTI/JTI_Test/?lang=EN&outletid=10000003&logkey=1234&sn=20160701
$(document).ready(function(){

  logKey = QueryString("logkey");
  outletID = QueryString("outletid");
  sn = QueryString("sn");
  rank = QueryString("rank");
  lang = QueryString("lang");
  host = slashes.concat(window.location.hostname);
  //host = "http://jti.coder.com.tw";
  console.log("logkey: "+logKey + " " + "outletid: "+outletID+" sn: "+sn + " host: "+host);


  

  console.log("document is ready4");

  rendererOptions = {
    antialiasing: false,
    transparent: false,
    resolution: 1,
    autoResize: true,
    backgroundColor: 0x000000
  }

  

  renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);
  renderer.view.style.position = "absolute";
  renderer.view.style.left = "50%";
  //renderer.renderSession.roundPixels = true;

  stage = new PIXI.Container();
  loadingTxt = new PIXI.Text('Loading.. 0%', { font: 'bold 30px Arial', fill: '#000000', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  loadingTxt.anchor.set(0.5);
  stage.addChild(loadingTxt);

  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.LINEAR;

  resize();

  document.body.appendChild(renderer.view);
  window.addEventListener("resize", resize);

  animate();

  //=========

  //===============

  if (window.location.protocol != "https:") {
      

      //window.location = "https://letspunch-minteract.rhcloud.com/";
      //window.location.protocol = "https:";
      //window.location.reload();

      loadingTxt.text = "請在安全瀏覽環境下與此作品互動！";

  }else{

      var ua = navigator.userAgent;

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
        startLoadAssets();
      }else{
        loadingTxt.text = "請使用手機瀏覽器與這個作品互動！";
        
      }
  }


  

  //startLoadAssets();

});


function loadingComplete(){
  
  //loadingTxt.visible = false;
  //loadingTxt.alpha = 1;
  initServer();

  //initObject();
}

function loadingCompleteAll(){

  loadingTxt.visible = false;
  loadingTxt.alpha = 1;
  initObject();

}



function animate() {

    requestAnimationFrame(animate);


    if(gamePhase == "countDown"){
      
      gameMain.countDownNumber();
    
    }else if(gamePhase == "gameStart"){
      
      gameMain.gameMainUpdate();
    
    }else if(gamePhase == "gameFinish"){

      gamePhase = "";

    }else if(gamePhase == "showGameLevel1Finish"){

      gamePhase = "";
      
    }else if(gamePhase == "gameLevel2Finish"){

      gamePhase = "";
      
    }else if(gamePhase == "showGameLevel2Finish"){

      gamePhase = "";
      
    }


    renderer.render(stage);
}




function initObject(){
   console.log("Ready To Go!");
   PIXI.BaseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
   //Game Main Bg
   gameMainBg = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/main_game_bg.png"].texture);
   gameMainBg.alpha = 0;
   gameMainBg.width = 720;
   gameMainBg.height = 1280;
   stage.addChild(gameMainBg);
   TweenMax.to(gameMainBg, 0.5, {alpha:1, ease:"Linear.easeOut"});
   

   stage.swapChildren(gameMainBg, loadingTxt);


   gameStart = new GameStart();
   gameMainBg.addChild(gameStart);
   gameStart.transitionIn();


   //GameStart

   // if(rank == 1){

   //     gameRank = new GameRank(3);
   //     gameMainBg.addChild(gameRank);
   //     gameRank.transitionIn();

   // }else if(rank == 0){
   //     gameStart = new GameStart();
   //     gameMainBg.addChild(gameStart);
   //     gameStart.transitionIn();
   // }else{

   //     gameStart = new GameStart();
   //     gameMainBg.addChild(gameStart);
   //     gameStart.transitionIn();


   // }
  

   //Game Logo
   gameLogo = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/game_logo.png"].texture);
   stage.addChild(gameLogo);
   gameLogo.anchor.x = 1;
   gameLogo.anchor.y = 0; 
   gameLogo.scale.x = gameLogo.scale.y = percentScale;
   gameLogo.visible = false;

   //Game Alert
   gameAlert = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/game_alert_word.png"].texture);
   stage.addChild(gameAlert);
   gameAlert.anchor.x = 0.5;
   gameAlert.anchor.y = 1; 
   gameAlert.scale.x = gameAlert.scale.y = percentScale;
   gameAlert.visible = false;

   resize();

}


function transitionOutOnComplete(transitionPage){

  console.log("Transition Out Page Complete! Page Name: "+transitionPage.name);
  transitionPage.visible = false;
  var pageName = transitionPage.name;
  if(pageName == "gameStart"){

      gameMainBg.removeChild(transitionPage);
      gameStart = null;


      gameMain = new GameMain();
      gameMain.alpha = 0;
      gameMain.visible = false;
      gameMainBg.addChild(gameMain);

      gameMain.transitionIn();

      // gameInfoHow = new GameInfoHow(isIgnite);
      // gameInfoHow.alpha = 0;
      // gameInfoHow.visible = false;
      // gameMainBg.addChild(gameInfoHow);
      // gameInfoHow.transitionIn();

    
  
  }else if(pageName == "gameInfoHow"){

    
  
  }else if(pageName == "gameMain"){

    gameMainBg.removeChild(transitionPage);
    gameMain = null;

    

  }else if(pageName == "gameReward"){

    

  }else if(pageName == "gameRank"){


  }

}

function gameReady(){
  //gamePhase = "showHow";
  gamePhase = "countDown";
  //gameMain.startInstruction();
}

function gameMainStart(){
  //gamePhase = "showHow";
  gamePhase = "gameStart";
  //gameMain.startInstruction();
}


var clickEvent = function () {
 

};

function resize() {
 
  // Determine which screen dimension is most constrained
  ratio = Math.min(window.innerWidth/GAME_WIDTH,
                   window.innerHeight/GAME_HEIGHT);

  console.log("resolution ratio: "+ratio);

  //ratio = window.innerHeight/GAME_HEIGHT;
  ratio = GAME_WIDTH/GAME_HEIGHT;
  percentScale = window.innerHeight/GAME_HEIGHT;
  console.log("resolution ratio 2: "+percentScale + " " + ratio);
  

  sW = window.innerHeight*ratio;
  sH = window.innerHeight;


  if(gameLoadingReady){

    //遊戲開始階段
    gameMainBg.width = sW;
    gameMainBg.height = sH;
    
    gameLogo.position.x = sW - 20*percentScale;
    gameLogo.position.y = 0 + 20*percentScale;

    gameAlert.position.x = sW/2;
    gameAlert.position.y = sH - 10*percentScale;

  }else{
    //Loading 階段
    loadingTxt.position.x = sW/2;
    loadingTxt.position.y = sH/2;
    loadingTxt.scale.x = loadingTxt.scale.y = percentScale;


  }

  renderer.resize(sW, sH);
  renderer.view.style.marginLeft = "-"+sW/2+"px";
}

//要從網址抓參數下來的function
function QueryString(name) {
      var AllVars = window.location.search.substring(1);
      var Vars = AllVars.split("&");
      for (i = 0; i < Vars.length; i++)
      {
        var Var = Vars[i].split("=");
        if (Var[0] == name) return Var[1];
      }
      return "-1";
}

function initServer(){
  //http://vaselinelink-minteract.rhcloud.com
  //alert("Connected");
  //Server.send( 'message', clientID+'|-|send|-|message|-|'+groupID+'|-|click'+'|-|test');

  //Server = new FancyWebSocket("wss://"+"vaselinelink-minteract.rhcloud.com"+":8443");
  Server = new FancyWebSocket("wss://letspunch-minteract.rhcloud.com:8443");

  //連線開始
  Server.bind('open', function() {
      //Connected
      console.log("connected");
      loadingTxt.text = "Connect Success!";
      
      //alert("Connected");
  });

  //斷線
  Server.bind('close', function( data ) {
      //DisConnect
      console.log("close");
      alert("請重新開啟魚池，並重新掃描QRCode!");
  });

  //訊息傳送接收
  Server.bind('message', function( payload ) {

    //alert(payload);
    //alert(messageArr[3]);

    var str = payload;
    //console.log(str);
    var obj = JSON.parse(str);
    var actStr = obj.action;

    //console.log(obj);

    if(actStr == "CONNECTED_SUCCESS"){

      loadingTxt.text = "Login Success!";


      clientID = obj.clientsID;
      console.log("Client ID: "+clientID);
      //1484721900587
      //TweenMax.to(loadingTxt, 1.0, {alpha:0, delay:0.2, ease:"Linear.easeOut", onComplete:loadingCompleteAll});


      groupID = QueryString("groupID");
      if(groupID != null && groupID != "" && groupID != "-1"){
          console.log("Group ID: "+groupID);
      }

      var roomObj = new Object();
      roomObj.joinGroupID = groupID;
      roomObj.clientsID = clientID;
      roomObj.status = "CONNECTED";
      roomObj.action = "JOIN_ROOM";
      roomObj.playRole = "JOIN_PLAYER";
      roomObj.clientsRole = "JOIN_PLAYER";

      var converStr = JSON.stringify(roomObj);
      // //console.log("Create Obj: "+converStr);
      Server.send( 'message', converStr);
      
      
      
      

    }else if(actStr == "CREATE_ROOM_SUCCESS"){

      

      groupID = obj.groupID;
      qrCodeStr = "http://jerromy.idv.tw/NY2017/?groupID="+groupID;
      console.log("Create Room Success: "+groupID);

      


    }else if(actStr == "GET_GROUP_MSG"){

      
      var msg = obj.msg;
      console.log("Get Msg Success: "+msg);


    }else if(actStr == "JOIN_ROOM_SUCCESS"){

      
      groupID = obj.groupID;
      console.log("Join Group Success: "+groupID);
      TweenMax.to(loadingTxt, 1.0, {alpha:0, delay:0.2, ease:"Linear.easeOut", onComplete:loadingCompleteAll});

    }else if(actStr == "MASTER IS GONE"){

      // alert("請重新開啟魚池，並重新掃描QRCode!");
      // console.log("close");
      Server.disconnect();
    }


    
      
      
  });

  Server.connect();

}





