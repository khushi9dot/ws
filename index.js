import express from "express"
import http from "http"
import path from "path"
import {Server} from "socket.io" 

const app=express()
const server=http.createServer(app)

app.use(express.static(path.resolve("./public")))

const io=new Server(server)

// io.on("connection",(socket)=>{
//     console.log("new user has connected",socket.id)
// })

io.on("connection",(socket)=>{
    socket.on("user-message",(message)=>{
        io.emit("message",message)
    });
});

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("./public/index.html"))
})

server.listen(8000,()=>{
    console.log(`server running at http://localhost:8000`)
})



