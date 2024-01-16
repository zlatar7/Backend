import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import router from "./src/routers/index.routers.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";

import __dirname from "./utils.js";
import product from "./src/data/fs/products.fs.js";

const server = express();
const PORT = 8000;

const ready = console.log("server ready on port " + PORT);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);

socketServer.on("connection", (socket) => {
  console.log("client " + socket.id + " connected");

  product.read().then((resp) => {
    socket.emit("products", resp);
  });
  socket.on("newProduct", async (data) => {
    try {
        //Verificacion de campos vacios del form
      if (Object.values(data).length === 4) {
        await product.create(data);
        //Emision de la lista de todos los productos (actualizados) hacia el front
        socketServer.emit("products", await product.read());
      } else {
        console.log("Completar todos los campos");
      }
    } catch (error) {
      console.log(error);
    }
  });
});

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

//views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");