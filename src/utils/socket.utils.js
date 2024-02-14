import { socketServer } from "../../server.js";
import product from "../data/fs/products.fs.js";

export default (socket) => {
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
};
