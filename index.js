const app=require("express")();
const http=require("http").createServer(app);
const port=process.env.PORT||3000;

app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/index.html");
})

http.listen(port,()=>
{
    console.log("listening on port");
})

// socket 
const io=require("socket.io")(http);
let users={};
io.on("connection",(socket)=>
{
    console.log("connected...");
    socket.on("new-user-joined",(name)=>
    {
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    })
    socket.on("message",(msg)=>
    {
        socket.broadcast.emit("receive",msg);
    })
})

