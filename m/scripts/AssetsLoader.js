var loader = PIXI.loader;
var resources = PIXI.loaders.Resource;
var loadIndex = 0;
var maxAssets = 9;
var folderName = 'mati';



function startLoadAssets(){
  loader.add(['_assets/'+folderName+'/main_game_bg.png',
            '_assets/'+folderName+'/game_main_bg.png',
            '_assets/'+folderName+'/game_alert_word.png',
            '_assets/'+folderName+'/footer.png',
            '_assets/'+folderName+'/rank.png',
            '_assets/'+folderName+'/start_game_rank_btn.png',
            '_assets/'+folderName+'/start_game_btn.png',
            '_assets/'+folderName+'/start_game_word.png',
            '_assets/'+folderName+'/game_logo.png'])
      .on("progress", loadProgressHandler)
      .load(init);
}



function loadProgressHandler(loader, resource) {
    
    //console.log("progress: " + loader.progress + "% " + resource.url);
    loadedAssets();
}


function init() {
    // 這裡代表資源都已載入完畢，可以使用 'images/logo.png' 的 Texture Cache 了
    //console.log("Assets Loaded!");
    initSound();
}

function audioCanPlay(){
    //console.log("Audio Ready!");
    //alert("Audio Ready!");
    //loaded();
}

function initSound(){
  
    //createjs.Sound.registerSound("_assets/'+folderName+'/soundEffect.mp3", pushSound);
    //createjs.Sound.addEventListener("fileload", createjs.proxy(handleLoad, this));
    //sound1.volume = 0.5;
    loadedAssets();


}


function loadedAssets(){

    //console.log("Assets Loaded: "+loadIndex+" "+loadingPercent);

    if(!gameLoadingReady){
        loadIndex += 1;
        if(loadIndex >= maxAssets){
            loadIndex = maxAssets;
        }
        
        var loadingPercent = Math.ceil(loadIndex/maxAssets*100);
        //console.log("Assets Loaded: "+loadIndex+" "+loadingPercent);
        loadingTxt.text = "Loading.. "+loadingPercent+"%";
        if(loadIndex == maxAssets){
            console.log("Assets Loaded Complete!");
            gameLoadingReady = true;
            loadingComplete();
            //TweenMax.to(loadingTxt, 1.0, {alpha:0, delay:0.2, ease:"Linear.easeOut", onComplete:loadingComplete});
        }
    }
    

}    