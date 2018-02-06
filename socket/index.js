const server = require("http").Server();
const port = 10001;

var io = require('socket.io')(server);
var names = [];
var msg = [];

io.on("connection", function(socket){
   console.log("user has connected");
   
    //data from the front end is saved in the database
   socket.on("uname", function(data){
       console.log("username sent = " + data);
       names.push(data);
       io.emit("names", names);
   });    
    
   socket.on("sendMsg", function(data){
       console.log("the msg = " + data); 
       msg.push(data);
       io.emit("msg", msg);
   });
       
   socket.on("disconnect", function(){
       console.log("user has disconnected");
   })    
});

server.listen(port, (err)=>{
    if(err){
        console.log('error: '+err);
        return false;
    }
    console.log("Socket port is running");
})