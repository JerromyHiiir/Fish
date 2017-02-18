// JavaScript Document

function AssetManager(){
	
	this.successCount = 0;
	this.errorCount = 0;
	this.cache = {};
	
	this.downloadQueue = [];

}

AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}

AssetManager.prototype.queueDownload = function(path){
	
	this.downloadQueue.push(path);

}

AssetManager.prototype.downloadAll = function(downloadCallback){
	
	var qLength = this.downloadQueue.length;
	
	if(this.downloadQueue.length == 0){
		
		downloadCallback();
	}
	
	for(var i = 0 ; i < this.downloadQueue.length; i++){
		
		var path = this.downloadQueue[i];
		var img = new Image();
		var that = this;
		
		img.addEventListener("load", function(){
			//console.log(this.src + ' is loaded');
			that.successCount += 1;
			var percent = Math.floor(that.successCount/qLength)*100;
			//console.log(percent+"%");
			//$("#loadingText").html(percent+"%");
			if(that.isDone()){
					
					//$("#loading").html("loading... "+	"Complete！");
					//$("#loading").fadeOut('slow');
					
				downloadCallback();
				
			}
			
		}, false);
		
		img.addEventListener("error", function(){
			
			that.errorCount += 1;
			if(that.isDone()){
				
				downloadCallback();
				
			}
		
		}, false);
		
		img.src = path;
		this.cache[path] = img;
	
	}

}// JavaScript Document

AssetManager.prototype.isDone = function(){
	
	return (this.downloadQueue.length == this.successCount + this.errorCount);


}