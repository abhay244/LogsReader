const socket=io('http://localhost:8001');
var fileData=document.getElementById('text');

socket.on("init",(data)=>{
    fileData.innerText=fileData.innerText+data;
});
socket.on("file-change",(data)=>{
    fileData.innerText=fileData.innerText+data;
});