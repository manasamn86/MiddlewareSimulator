const czm_convivo=require('./convivo_pb');
const fs=require('fs');
const app=require('express')();
const appWs=require('express-ws')(app);

const imageArray=[
    './img-full/00000001564413885978.jpg',
  './img-full/00000001564413887762.jpg',
  './img-full/00000001564413889315.jpg',
  './img-full/00000001564413892443.jpg',
  './img-full/00000001564413894001.jpg',
  './img-full/00000001564413895812.jpg',
  './img-full/00000001564413897748.jpg',
  './img-full/00000001564413970572.jpg',
  './img-full/00000001564413974593.jpg'
]
app.ws('/ws', ws=>{
    ws.on('message', msg=>{
        console.log('Connected to client');
        imageArray.forEach(function(value){
            var imageForCase=new proto.czm.convivo.ImageForCase();
            var image=new proto.czm.convivo.Image();
            image.setFormat(proto.czm.convivo.Image.ImageFormat.JPG);
            image.setData(fs.readFileSync(value));
            image.setResolutionheight(500);
            image.setResolutionwidth(1000);
            image.setTargetresolutionheight(1080);
            image.setTargetresolutionwidth(1920);

            var imageMeta=new proto.czm.convivo.ImageMeta();
            imageMeta.setBrightness(10);
            imageMeta.setAutobrigthness(false);
            imageMeta.setFocus(1);
            imageMeta.setGain(2);

            imageForCase.setCaseid("default");
            imageForCase.setImage(image);
            imageForCase.setMeta(imageMeta);

            //console.log(imageForCase.serializeBinary());

            ws.send(imageForCase.serializeBinary())    
        });            
            
        
    });
});

app.listen(9111, () =>console.log('server has been started'))