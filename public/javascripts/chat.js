const socket = io("/chat");  

socket.on("log",(msg)=>{
    console.log(msg)
})