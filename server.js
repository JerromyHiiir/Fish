var WebSocketServer = require('websocket').server;
var http = require('http');
//var http = require('https');
//Test
var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var fs = require("fs");
var url = require("url");
var path = require("path");


var clientID = 0;
var msgCount = 0;
var clients = [];
var groups = new Object();
Object.size = function(arr) 
                {
                    var size = 0;
                    for (var key in arr) 
                    {
                        if (arr.hasOwnProperty(key)) size++;
                    }
                    return size;
                };
var groupNowSn = 0;
//options

// create the server
var server = http.createServer(function(request, response) {
    
    //console.log((new Date()) + ' Received request for ' + request.url);
    //response.writeHead(404);
    //response.end();

    var urlMain = request.url;
    if(urlMain == '/'){
        var uri = url.parse(request.url).pathname;
        var filename = path.join(process.cwd(), uri);

        fs.exists(filename, function(exists) {
        if(!exists) {
          response.writeHead(404, {"Content-Type": "text/plain"});
          response.write("404 Not Found\n");
          response.end();
          return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
          if(err) {        
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            return;
          }
     
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(file, "binary");
          response.end();
        });

        });

    }else{
        var uri = url.parse(request.url).pathname;
        var filename = path.join(process.cwd(), uri);

        fs.exists(filename, function(exists) {
        if(!exists) {
          response.writeHead(404, {"Content-Type": "text/plain"});
          response.write("404 Not Found\n");
          response.end();
          return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
          if(err) {        
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            return;
          }
     
          response.writeHead(200);
          response.write(file, "binary");
          response.end();
        });

        });
    }

    
});

function getStaticFileContent(response, filepath, contentType) {
    fs.readFile(filepath, function(error, data){
        if(error) {
            response.writeHead(500,{'Content-Type':'text/plain'});
            response.end('500 - Internal Server Error');
    }
    if(data) {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
            else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
    });
}

server.listen(server_port, server_ip_address, function() { 

    console.log('listening on *:8080');

});

// create the websocket server
wsServer = new WebSocketServer({
    httpServer: server
    
});



// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.' + connection.remoteAddress);

    connection.clientID = new Date().getTime();
    connection.goupID = "";
    connection.playRole = "";

    var index = clients.push(connection) - 1;
    console.log("clients num " + clients.length);

    var connectedObj = {

        groupID:"",
        clientsID:connection.clientID,
        status:"connected",
        playRole:"me",
        clientsRole:"me",
        action:"CONNECTED_SUCCESS"
    }

    //connection.sendUTF('{"clientsID":'+connection.clientID+','+'"status":"connected","playRole":'+'"master",'+'"clientRole":"me"'+'}');


    var connectedJSONStr = JSON.stringify(connectedObj);
    connection.sendUTF(connectedJSONStr);

    //connection.sendUTF(connection.clientID+"|-|status|-|me|-|connected|-|"+clients.length);
    //ID|-|create|-|main|-|ID|-|waiting
    //ID|-|join|-|group|-|ID|-|waiting
    
    /*for (var i=0; i < clients.length; i++) {
            if(connection != clients[i]){
                clients[i].sendUTF(clients[i].clientID+"|-|status|-|other|-|clientsNum|-|"+clients.length);
            }
                    
    }*/

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {

            // process WebSocket message
            console.log('Received Message: ' + message.utf8Data);
            var str = message.utf8Data;
            var strObj = JSON.parse(str);
            var actStr = strObj.action;
            if(actStr == "CREATE_ROOM"){

                //房間成員
                var roomMembers = new Object();
                connection.clientsID = strObj.clientsID;
                connection.groupID = strObj.clientsID;
                connection.playRole = strObj.playRole;
                roomMembers[connection.clientsID] = connection;

                //房間物件
                var roomObj = {

                    groupID:strObj.clientsID,
                    groupSN:groupNowSn,
                    groupTitle:"TEST "+strObj.clientsID,
                    roomMembers:roomMembers


                };


                //groups.push(roomObj);
                groups[strObj.clientsID] = roomObj;




                console.log("Create Room! Created Room: "+groups[strObj.clientsID]+" Room Num: "+Object.size(groups));
                //this.sendUTF('{"groupID":'+roomObj.groupID+','+'"clientsID":'+this.clientID+','+'"status":'+'"'+strObj.status+'"'+',"playRole":'+'"'+strObj.playRole+'"'+','+'"clientsRole":'+'"'+strObj.clientsRole+'"'+','+'"action":'+'"CREATE_ROOM_SUCCESS"'+'}');

                //回傳物件
                var resObj = {

                    groupID:roomObj.groupID,
                    clientsID:this.clientID,
                    status:strObj.status,
                    playRole:strObj.playRole,
                    clientsRole:strObj.clientsRole,
                    groupTitle:roomObj.groupTitle,
                    action:"CREATE_ROOM_SUCCESS"
                }

                var resJSONStr = JSON.stringify(resObj);


                console.log("JSON String: " + resJSONStr);
                this.sendUTF(resJSONStr);


            }else if(actStr == "LEAVE_ROOM"){
                

                var playRole = strObj.playRole;
                var joinGID;

                if(playRole == "MASTER"){
                    console.log(strObj.clientsID+" "+strObj.playRole+" Leave Room!");
                    var groupsNum = Object.size(groups);
                    joinGID = strObj.clientsID;




                    //告訴其他人及自己 這房間撤銷

                    console.log("All Leave Room!");
                    var joinRoomObj = groups[joinGID];
                    var membersNum = Object.size(joinRoomObj.roomMembers);

                        if(membersNum > 0){

                            for(var i in joinRoomObj.roomMembers){

                                var groupMember = joinRoomObj.roomMembers[i];
                                console.log("SEND TO: " + groupMember.clientsID);


                                var sendLeaveMsgObj = {
                                        status:strObj.status,
                                        action:"LEAVE_ROOM"
                                }

                                var sendLeaveMsgJSONStr = JSON.stringify(sendLeaveMsgObj);


                                console.log("SEND JSON String: " + sendLeaveMsgJSONStr);
                                groupMember.sendUTF(sendLeaveMsgJSONStr);

                        
                            }


                        }





                    if(groupsNum > 0){

                        delete groups[joinGID];

                        groupsNum = Object.size(groups);
                        console.log("Leave Room! Now Room Num: "+groupsNum);

                        var sendLeaveMsgObj = {
                                status:strObj.status,
                                action:"LEAVE_ROOM"
                        }
                        //通知該Room的人有人離開
                        //var joinGroupID = 
                        var sendLeaveMsgJSONStr = JSON.stringify(sendLeaveMsgObj);
                        connection.sendUTF(sendLeaveMsgJSONStr);

                        

                    }


                }else if(playRole == "JOIN_PLAYER"){

                    console.log("JOIN_PLAYER Leave!");
                    joinGID = strObj.joinGroupID;

                    var joinRoomObj = groups[joinGID];
                    delete joinRoomObj.roomMembers[strObj.clientsID];
                    console.log("Leave Room! Leave Room: "+groups[joinGID]+"Left Room Members Num: "+Object.size(joinRoomObj.roomMembers));
                    
                    var sendLeaveMsgObj = {
                                status:strObj.status,
                                action:"LEAVE_ROOM"
                    }
                    //通知該Room的人有人離開
                    //var joinGroupID = 
                    var sendLeaveMsgJSONStr = JSON.stringify(sendLeaveMsgObj);
                    connection.sendUTF(sendLeaveMsgJSONStr);


                }





                console.log("GET ROOM MEMBERS NUM!");
                var joinRoomObj = groups[joinGID];
                if(joinRoomObj != null){
                    var membersNum = Object.size(joinRoomObj.roomMembers);

                    if(membersNum > 0){

                        for(var i in joinRoomObj.roomMembers){

                            var groupMember = joinRoomObj.roomMembers[i];
                            console.log("SEND TO: " + groupMember.clientsID);


                            var sendMsgObj = {

                                groupID:groupMember.groupID,
                                clientsID:groupMember.clientID,
                                status:strObj.status,
                                playRole:groupMember.playRole,
                                clientsRole:groupMember.playRole,
                                membersNum:membersNum,
                                action:"GET_ROOM_MEMBER_NUMBER"
                            }

                            var sendJSONStr = JSON.stringify(sendMsgObj);


                            console.log("SEND JSON String: " + sendJSONStr);
                            groupMember.sendUTF(sendJSONStr);

                    
                        }


                    }
                }
                

                


                //console.log("Create Room! Now Room Num: "+groups.length);

            }else if(actStr == "JOIN_ROOM"){

                console.log("JOIN Room!");
                var joinGroupID = strObj.joinGroupID;
                var joinRoomObj = groups[joinGroupID];

                if(joinRoomObj != undefined && joinRoomObj != null){

                    connection.clientsID = strObj.clientsID;
                    connection.groupID = joinGroupID;
                    connection.playRole = strObj.playRole;
                    joinRoomObj.roomMembers[strObj.clientsID] = connection;

                    console.log("Join Room! Join Room: "+groups[joinGroupID]+" Room Members Num: "+Object.size(joinRoomObj.roomMembers));

                    var resObj = {

                        groupID:joinGroupID,
                        clientsID:strObj.clientsID,
                        status:strObj.status,
                        playRole:strObj.playRole,
                        clientsRole:strObj.clientsRole,
                        groupTitle:joinRoomObj.groupTitle,
                        action:"JOIN_ROOM_SUCCESS"
                    }

                    var resJSONStr = JSON.stringify(resObj);


                    console.log("JSON String: " + resJSONStr);
                    this.sendUTF(resJSONStr);

                }else{
                    var resObj = {

                        groupID:joinGroupID,
                        clientsID:strObj.clientsID,
                        status:strObj.status,
                        playRole:strObj.playRole,
                        clientsRole:strObj.clientsRole,
                        groupTitle:"",
                        action:"NO ROOM"
                    }

                    var resJSONStr = JSON.stringify(resObj);


                    console.log("JSON String: " + resJSONStr);
                    this.sendUTF(resJSONStr);
                }

                

            }else if(actStr == "GET_ROOM_LIST"){

                //console.log("Get Room List! Now Room Num: "+groups.length);
                //var resJSONStr = JSON.stringify(groups);
                console.log("Get Room List! Now Room Num: " + Object.size(groups));
                var listGroupArr = [];

                for(var i in groups){
                    var groupObj = groups[i];
                    //console.log("ROOM LIST: " + groupObj);


                    var group = {

                        groupID:groupObj.groupID,
                        groupSN:groupObj.groupSN,
                        groupTitle:groupObj.groupTitle,
                        groupMemberNum:Object.size(groupObj.roomMembers)
                    }

                    var groupListJSONStr = JSON.stringify(group);
                    listGroupArr.push(groupListJSONStr);


                    console.log("SEND GROUP LIST JSON String: " + groupListJSONStr);
                    

                }

                var listGroupArrStr = '{"roomListData":['+listGroupArr.toString()+'],"action":"GET_ROOM_LIST","roomNum":'+Object.size(groups)+'}';
                console.log("Get Room List! Now Room List: " + listGroupArrStr);
                connection.sendUTF(listGroupArrStr);

            }else if(actStr == "SEND_MSG_TO_GROUP"){

                msgCount += 1;
                if(msgCount >= 10){
                    msgCount = 0;
                }

                console.log("SEND MSG TO GROUP!");
                var joinRoomObj = groups[strObj.joinGroupID];

                console.log("Left: " + joinRoomObj);

                if(joinRoomObj != undefined && joinRoomObj != null){
                    for(var i in joinRoomObj.roomMembers){

                        var groupMember = joinRoomObj.roomMembers[i];
                        console.log("SEND TO: " + groupMember.clientsID);


                        var sendMsgObj = {

                            groupID:groupMember.groupID,
                            clientsID:groupMember.clientID,
                            status:strObj.status,
                            playRole:groupMember.playRole,
                            clientsRole:groupMember.playRole,
                            msg:strObj.msg + msgCount,
                            action:"GET_GROUP_MSG"
                        }

                        var sendJSONStr = JSON.stringify(sendMsgObj);


                        console.log("SEND JSON String: " + sendJSONStr);
                        groupMember.sendUTF(sendJSONStr);

                    
                    }
                }else{


                        console.log("Connection Clients ID "+connection.clientsID + " " + strObj.clientsID);
                        // var sendMsgObj = {

                        //     groupID:"",
                        //     clientsID:groupMember.clientID,
                        //     status:strObj.status,
                        //     playRole:groupMember.playRole,
                        //     clientsRole:groupMember.playRole,
                        //     msg:strObj.msg + msgCount,
                        //     action:"GET_GROUP_MSG"
                        // }

                        // var sendJSONStr = JSON.stringify(sendMsgObj);


                        // console.log("SEND JSON String: " + sendJSONStr);
                        // groupMember.sendUTF(sendJSONStr);


                }

                


            }else if(actStr == "GET_ROOM_MEMBER_NUM"){


                console.log("GET ROOM MEMBERS NUM!");
                var joinRoomObj = groups[strObj.joinGroupID];
                var membersNum = Object.size(joinRoomObj.roomMembers);

                    if(membersNum > 0){

                        for(var i in joinRoomObj.roomMembers){

                            var groupMember = joinRoomObj.roomMembers[i];
                            console.log("SEND TO: " + groupMember.clientsID);


                            var sendMsgObj = {

                                groupID:groupMember.groupID,
                                clientsID:groupMember.clientID,
                                status:strObj.status,
                                playRole:groupMember.playRole,
                                clientsRole:groupMember.playRole,
                                membersNum:membersNum,
                                action:"GET_ROOM_MEMBER_NUMBER"
                            }

                            var sendJSONStr = JSON.stringify(sendMsgObj);


                            console.log("SEND JSON String: " + sendJSONStr);
                            groupMember.sendUTF(sendJSONStr);

                    
                        }


                    }

                

//======================================================================================
            }

            

            
            
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + " " + connection.playRole + ' disconnected.' + "DESC -- " +description);

        if(clients.length > 0){
            for (var i = 0; i < clients.length; i++) {
    //                 //clients[i].sendUTF(message.utf8Data);
    //                 console.log("connected "+clients[i].connected);

                    if (!clients[i].connected){
                        console.log((new Date()) + ' Peer ' + clients[i].remoteAddress + ' disconnected.');
                        leaveIP = clients[i].clientID;
                        clients.splice(i, 1);
                        break;
                    };



            }
        }

        console.log("Clients left num " + clients.length);
        

        var playRole = connection.playRole;
        if(playRole == "MASTER"){

                    //如果是主持人離開，通知所有此Room的人，不能進行遊戲
                    
                    console.log(connection.clientsID+" "+connection.playRole+" Leave Room!");
                   
                    var groupsNum = Object.size(groups);
                    if(groupsNum > 0){

                        var joinRoomObj = groups[connection.groupID];
                        

                        if(joinRoomObj != undefined && joinRoomObj != null){

                            delete joinRoomObj.roomMembers[connection.clientsID];

                            var membersNum = Object.size(joinRoomObj.roomMembers);

                            if(membersNum > 0){

                                for(var i in joinRoomObj.roomMembers){

                                        var groupMember = joinRoomObj.roomMembers[i];
                                        console.log("SEND TO: " + groupMember.clientsID);


                                        var sendMsgObj = {

                                            groupID:groupMember.groupID,
                                            clientsID:groupMember.clientID,
                                            status:"disconnected",
                                            playRole:groupMember.playRole,
                                            clientsRole:groupMember.playRole,
                                            msg:"NONE",
                                            action:"MASTER IS GONE"
                                        }

                                        var sendJSONStr = JSON.stringify(sendMsgObj);


                                        console.log("SEND JSON String: " + sendJSONStr);
                                        groupMember.sendUTF(sendJSONStr);

                                
                                }

                            }

                            


                            delete groups[connection.clientsID];

                            groupsNum = Object.size(groups);
                            console.log("Disconnected Room! Now Disconnected! Left Room Num: "+groupsNum);

                        }
                        

                        

                    }


        }else if(playRole == "JOIN_PLAYER"){


                var groupsNum = Object.size(groups);
                if(groupsNum > 0){

                     var joinRoomObj = groups[connection.groupID];
                     if(joinRoomObj != undefined && joinRoomObj != null){
                         delete joinRoomObj.roomMembers[connection.clientsID];
                         console.log("Close Room! Close Room: "+groups[connection.groupID]+"Close Room Members Num: "+Object.size(joinRoomObj.roomMembers));
                         //如果是參與者離開，通知所有在這個Room的人，誰離開
                     }
                     
                }
            

        }

    });

    
});