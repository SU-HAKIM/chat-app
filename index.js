import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const expressServer = http.createServer(app);

app.use(express.json());
app.use(express.static('public'));

const io = new Server(expressServer);

app.get('/', (req, res, next) => {
    res.render('index.html');
})

io.on('connection', (socket) => {
    socket.on('chat', function (msg) {
        io.emit('chat_transfer', msg);
    })
})

expressServer.listen(process.env.PORT, () => {
    console.log(`http://localhost:4000`)
})

