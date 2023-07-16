"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./config/connection"));
dotenv_1.default.config();
(0, connection_1.default)().then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log('Database Connection Error', err);
});
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/auth', authRouter_1.default);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, './public/index.html'));
});
let users = [];
io.on('connection', (socket) => {
    console.log('A user connected');
    users.push(socket.id);
    console.log(users);
    socket.on('disconnect', () => {
        console.log('User disconnected');
        users = users.filter(e => socket.id != e);
    });
    socket.on('CHAT_MESSAGE', (message) => {
        socket.to(users[0]).emit('CHAT_MESSAGE_INCOMMING', message);
        console.log(message);
    });
});
httpServer.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
