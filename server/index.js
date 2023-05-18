const fs=require('fs');
const io=require('socket.io')(8001,{
    cors:{
        origin:"*"
    }
});
io.on('connection',(socket)=>{
    var readStream=fs.createReadStream('./files/file',{
        encoding:'utf-8',
    })
    readStream.on("data",(chunk)=>{
        socket.emit('init',chunk);
    });
    fs.watchFile('./files/file',{
        bigint:false,
        persistent:true,
        interval:1000
    },(curr,prev)=>{
        var read=fs.createReadStream('./files/file',{
            encoding:'utf-8',
            start:prev['size'],
            end:curr['size']
        })
        read.on("data",(chunk)=>{
            socket.emit('file-change',chunk);
        })
    });
    
})