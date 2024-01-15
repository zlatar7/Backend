import { promises } from "fs";
import fs from "fs";
import crypto from "crypto";

class OrderManagers {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    (this.path = path || "src/data/fs/files/orders.txt"),
      (this.products = "[]"),
      this.init();
  }
  async create(data) {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      const id = crypto.randomBytes(12).toString("hex");
      const order = { ...data, id };

      const arrayCompleto = JSON.stringify([...info, order]);

      await promises.writeFile(this.path, arrayCompleto);

      return `Se ha agregadola orden, y su ID es: ${id}`;
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);
      return info;
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(uid) {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      const elementosEncontrados = info.filter(order => order.uid === uid);

      if (elementosEncontrados.length > 0) {
        return elementosEncontrados;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async update(oid, state, quantity) {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      const orderSelected = info.find((order) => order.id === oid);

      if (orderSelected != undefined) {
        orderSelected.state = state;
        orderSelected.quantity = quantity;

        const arrayCompleto = JSON.stringify(info);

        await promises.writeFile(this.path, arrayCompleto);

        return `La orden con el ID: ${oid} ha sido actualizada`;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(oid) {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      const orderSelected = info.find((order) => order.id == oid);

      if (orderSelected != undefined) {
        // Obtengo un array con todas las orders excepto la order con el ID ingresado
        const nuevoArray = info.filter((elemento) => elemento.id != oid);

        await promises.writeFile(this.path, JSON.stringify(nuevoArray));

        return "Elemento eliminado";
      } else {
        return `No hay elementos con el ID ingresado`;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
