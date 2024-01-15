import express from 'express';
import router from './src/routers/index.routers.js';
import errorHandler from './src/middlewares/errorHandler.js'
import pathHandler from './src/middlewares/pathHandler.js';
import __dirname from './utils.js'
import morgan from 'morgan';

const server = express();

server.use(express.urlencoded({extended:true}));
server.use(express.json())
server.use(express.static(__dirname+"/public"))
server.use(morgan('dev'))
server.use("/",router)
server.use(errorHandler)
server.use(pathHandler)

const PORT = 8000
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})