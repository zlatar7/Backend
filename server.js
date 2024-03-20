import env from "./src/utils/env.utils.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import morgan from "morgan";
import cookieParser from "cookie-parser"
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import cors from "cors"
import args from "./src/utils/args.utils.js";

import socketUtils from "./src/utils/socket.utils.js";

import router from "./src/routers/index.routers.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/db.utils.js";

//server
const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
  console.log("server ready on port " + PORT);
  dbConnection();
  console.log("mode " + args.env);
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

const FileStore = sessionFileStore(expressSession);
//middlewares
server.use(cors({ origin: true, credentials: true}));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(__dirname + "/public"));
server.use(cookieParser(process.env.SECRET_KEY));
/* server.use(
  expressSession({
    store: new FileStore({
      path: "./src/data/fs/sessions",
      ttl: 10,
      retries: 2,
    }), 
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
); */
/* server.use(expressSession({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    ttl: 60 * 60 * 24 * 7,
    mongoUrl: process.env.DB_LINK 
  })
})
) */
server.use(morgan("dev"));

//endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

//views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

export { socketServer };