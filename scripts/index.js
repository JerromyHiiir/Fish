
var GAME_WIDTH = 1280;
var GAME_HEIGHT = 720;
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
var footer;
//_assets/mati/game_logo.png

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
var stoneNum = 20;

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
      

      window.location = "https://fish-fish.44fs.preview.openshiftapps.com/";
      //window.location.protocol = "https:";
      //window.location.reload();
  }else{

      var ua = navigator.userAgent;

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
        loadingTxt.text = "請使用相容的桌上型電腦以Google Chrome最佳！觀看此作品！";
      }else{
        startLoadAssets();
      }


  }

  

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
  showRoomQRCode();
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
   gameMainBg.width = GAME_WIDTH;
   gameMainBg.height = GAME_HEIGHT;
   stage.addChild(gameMainBg);
   TweenMax.to(gameMainBg, 0.5, {alpha:1, ease:"Linear.easeOut"});
   

   stage.swapChildren(gameMainBg, loadingTxt);


   

   gameMain = new GameMain();
   gameMain.init();
   gameMain.alpha = 0;
   gameMain.visible = false;
   stage.addChild(gameMain);

   footer = new PIXI.Sprite(loader.resources["_assets/"+folderName+"/footer.png"].texture);
   footer.alpha = 0;
   footer.anchor.x = 0.5;
   footer.anchor.y = 0.5;
   footer.scale.x = 0.75;
   footer.scale.y = 0.75;
   stage.addChild(footer);
   TweenMax.to(footer, 0.5, {alpha:1, ease:"Linear.easeOut"});

   gameMain.transitionIn();
   

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

var firstTF = false;

function resize() {
 
  // Determine which screen dimension is most constrained
  ratio = Math.min(window.innerWidth/GAME_WIDTH,
                   window.innerHeight/GAME_HEIGHT);

  console.log("resolution ratio: "+ratio);

  //ratio = window.innerHeight/GAME_HEIGHT;
  ratio = GAME_WIDTH/GAME_HEIGHT;
  percentScale = window.innerHeight/GAME_HEIGHT;
  console.log("resolution ratio 2: "+percentScale + " " + ratio);
  

  sW = window.innerWidth;
  sH = window.innerHeight;

  GAME_WIDTH = sW;
  GAME_HEIGHT = sH;


  if(gameLoadingReady){

    //遊戲開始階段
    gameMainBg.width = sW;
    gameMainBg.height = sH;
    gameMain.gameMainBg.width = GAME_WIDTH;
    gameMain.gameMainBg.height = GAME_HEIGHT;

    footer.x = GAME_WIDTH/2;
    footer.y = GAME_HEIGHT/2;

  }else{
    //Loading 階段
    loadingTxt.position.x = sW/2;
    loadingTxt.position.y = sH/2;
    loadingTxt.scale.x = loadingTxt.scale.y = 0.5;


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
  //https://fish-fish.44fs.preview.openshiftapps.com/
  //8443
  Server = new FancyWebSocket("wss://fish-fish.44fs.preview.openshiftapps.com");

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
      alert("請重新開啟魚池，並重新掃描QRCode!");
      console.log("close");
  });

  //訊息傳送接收
  Server.bind('message', function( payload ) {

    //alert(payload);
    //alert(messageArr[3]);

    var str = payload;
    console.log(str);
    var obj = JSON.parse(str);
    var actStr = obj.action;

    console.log(obj);

    if(actStr == "CONNECTED_SUCCESS"){

      loadingTxt.text = "Login Success!";


      clientID = obj.clientsID;
      console.log("Client ID: "+clientID);

      var roomObj = new Object();
      roomObj.clientsID = clientID;
      roomObj.status = "CONNECTED";
      roomObj.action = "CREATE_ROOM";
      roomObj.playRole = "MASTER";
      roomObj.clientsRole = "HOST";

      var converStr = JSON.stringify(roomObj);
      console.log("Create Obj: "+converStr);
      Server.send( 'message', converStr);
      
      
      
      

    }else if(actStr == "CREATE_ROOM_SUCCESS"){

      

      groupID = obj.groupID;
      qrCodeStr = "https://fish-fish.44fs.preview.openshiftapps.com/m/index.html?groupID="+groupID;
      console.log("Create Room Success: "+groupID);

      TweenMax.to(loadingTxt, 1.0, {alpha:0, delay:0.2, ease:"Linear.easeOut", onComplete:loadingCompleteAll});


    }else if(actStr == "GET_GROUP_MSG"){

      
      var msg = obj.msg;
      var msgArr = msg.split(",");
      var eatType = parseInt(msgArr[0]);

      console.log("Get Msg Success: "+msgArr+" eatType:"+eatType);

      if(!firstTF){
        
        firstTF = true;
        TweenMax.to(footer, 0.5, {alpha:0, ease:"Linear.easeOut"});
        // $( "#qrcode" ).fadeOut( "fast", function() {
        // // Animation complete
        // });
      }


      gameMain.createEat(eatType);

    }else if(actStr == "MASTER IS GONE"){

      // alert("請重新開啟魚池，並重新掃描QRCode!");
      // console.log("close");
      Server.disconnect();

    }else if(actStr == "NO ROOM"){

      alert("找不到魚池，請重新開啟魚池，並重新掃描QRCode!");
      // console.log("close");
      Server.disconnect();
    }


    
      
      
  });

  Server.connect();

}

function showRoomQRCode(){

  qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 150,
    height : 150
  });

  makeCode(); 

}

function makeCode () { 

  qrcode.makeCode(qrCodeStr);

}







