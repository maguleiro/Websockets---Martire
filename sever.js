//---------------MODULOS

const express = require ('express');
const path = require('path');
const  { Server: HttpServer } = require('http');
const  { Server: IOServer } = require('socket.io');

//-------------INSTANCIA SERVIDOR

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//-------------RUTAS

app.get('/' , (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

//-------------MIDDLEWARES

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//-------------BASE DE DATOS

const DB_MENSAJES = [
    { author: "Server", text: "Hola como andas"}
]

//-------------SERVIDOR

const PORT = 3000;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
});

io.on('connection', (socket) =>{
    console.log(`Nuevo cliente conectado! ${socket.id}`)

    //socket.emit('from-server-saludo', 'Saludo desde el server!');

    socket.on('from-client-mensaje', (data) => {
        console.log(data)
        io.sockets.emit('from-server-mensaje',data); // A varios clientes
        //socket.emit('from-server-mensaje',data); A un cliente 
    });
});

//------------WEBSOCKET
io.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('from-server-mensajes',  {DB_MENSAJES} );

    socket.on('from-client-mensaje', mensaje => {
        DB_MENSAJES.push(mensaje);
        io.sockets.emit('from-server-mensajes', {DB_MENSAJES});
    });
});