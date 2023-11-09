const express = require("express");
const app = express();
const http = require('http');
const { Server } = require("socket.io")
const cors = require('cors');
const PORT = 3009
app.use(cors());


const server = http.createServer(app)


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected:${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with id:${socket.id} joined room:${data}`)
    })
    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message",data)
       
    })
    socket.on("disconnect", (data) => {
        socket.to(data.room).emit("receieve_message", data)
    })
})

server.listen(PORT, () => {
    console.log("server is running")
})