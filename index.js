const express = require('express')
const http = require('http')
const cors = require('cors');
const {Server} = require('socket.io');
const app = express()


app.use(cors())
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'UPDATE'],
    }
});

io.on('connection', (socket)=>{
    console.log('User Connected', socket.id);
    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log(`User with id: ${socket.id } joined room ${data}`)
    })
    socket.on('send_message', (data)=>{
        socket.to(data.room).emit('recieve_message', data)
        console.log(data)
    })
    socket.on('disconnect', ()=>{
        console.log('User Disconnected', socket.id)
    })
})



server.listen('3001', ()=>{
    console.log('Server started on port 3001');
})