import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import path from 'path'
import {Server} from 'socket.io'
import authRouter from './routes/authRouter'
import cors from 'cors'
import connect from './config/connection'

dotenv.config()
connect().then(()=>{
    console.log('Database connected')
}).catch(err => {
    console.log('Database Connection Error',err)
})


const port = process.env.PORT || 4000

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(cors())
app.use(express.json())
app.use('/api/v1/auth',authRouter)

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'))
})

let users : string[] = []

io.on('connection',(socket) => {
    console.log('A user connected')
    users.push(socket.id)
    console.log(users)
    socket.on('disconnect',() => {
        console.log('User disconnected')
        users = users.filter(e => socket.id != e)
    })
    socket.on('CHAT_MESSAGE',(message) => {
        socket.to(users[0]).emit('CHAT_MESSAGE_INCOMMING',message)
        console.log(message)
    })
    
})

httpServer.listen(port,() => {
    console.log(`Server started at http://localhost:${port}`)
})