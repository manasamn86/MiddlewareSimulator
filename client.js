const WebSocket = require('ws');
const czm_convivo=require('./convivo_pb');
const fs=require('fs');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

//const ws = new WebSocket('ws://localhost:9111/ws');
const ws = new WebSocket('wss://test.convivo.zeiss.services/convivo/api/auth/ws');

ws.on('open', function open() {
    const loginMsg=new proto.czm.convivo.PlatformLogin();
    loginMsg.setUserid("dakar.pathology.solution+william.macewen.surgeon@gmail.com");
    loginMsg.setPassword("Conv1vo!");

    const message=new proto.czm.convivo.Message();
    message.setType(proto.czm.convivo.Message.MessageType.LOGIN);
    const details=new google_protobuf_any_pb.Any;
    details.pack(loginMsg.serializeBinary(), 'czm.convivo.PlatformLogin');
    
    message.setDetails(details)
  ws.send(message.serializeBinary());
});

ws.on('message', function incoming(data) {
  console.log("Received from server: "+data);
   const message=proto.czm.convivo.Message.deserializeBinary(data);
   var any=message.getDetails();
   var msg=any.unpack(
    proto.czm.convivo.Session.deserializeBinary,
    'czm.convivo.Session');
    console.log("Received: "+msg.getSessionid());
//   console.log(imageForCase.getCaseid())
//   var image=imageForCase.getImage();
//   var imageData=image.getData();

//   const check1=proto.czm.convivo.imageForCase.deserializeBinary(fs.readFile("binary.txt"))
//   console.log("check1 : " +check1.getCaseid());
  
  //console.log("imageData: " + imageData)
  //console.log(image.toString());
});