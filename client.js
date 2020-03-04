const WebSocket = require('ws');
const czm_convivo=require('./convivo_pb');
const fs=require('fs');

const ws = new WebSocket('ws://localhost:9111/ws');

ws.on('open', function open() {
  ws.send('Hello, this is from client');
});

ws.on('message', function incoming(data) {
  //console.log(data);
  const imageForCase=proto.czm.convivo.ImageForCase.deserializeBinary(data);
  console.log(imageForCase.getCaseid())
  var image=imageForCase.getImage();
  var imageData=image.getData()
  console.log("imageData: " + imageData)
  //console.log(image.toString());
});