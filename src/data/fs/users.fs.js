import { promises } from "fs";
import fs from "fs";
import crypto from "crypto";

class UserManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);

      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    (this.path = path || "data/fs/files/users.txt"),
      (this.users = "[]"),
      this.init();
  }

  async create(data) {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      const id = crypto.randomBytes(12).toString("hex");
      const objetoConId = { ...data, id };

      const arrayCompleto = JSON.stringify([...info, objetoConId]);

      await promises.writeFile(this.path, arrayCompleto);

      return `Se ha agregado el producto, y su nuevo ID es: ${id}`;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      const elementoEncontrado = info.find((elemento) => elemento.id == id);

      if (elementoEncontrado) {
        return elementoEncontrado;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      return info;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      const elemento = info.find((elemento) => elemento.id == id);

      if (elemento != undefined) {
        // Obtengo un array con todos los elementos excepto el elemento con el ID ingresado
        const nuevoArray = info.filter((elemento) => elemento.id != id);

        await promises.writeFile(this.path, JSON.stringify(nuevoArray));

        return "Elemento eliminado";
      } else {
        return `No hay elementos con el ID ingresado`;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const contenido = await promises.readFile(this.path, "utf-8");
      const info = JSON.parse(contenido);

      const userSelected = info.findIndex((user) => user.id === id);

      if (userSelected !== -1) {
        data.id = id;
        info[userSelected] = data;

        const arrayCompleto = JSON.stringify(info);

        await promises.writeFile(this.path, arrayCompleto);

        return `El usuario con el ID: ${id} ha sido actualizado`;
      } else {
        return "El producto no existe";
      }
    } catch (error) {
      throw error;
    }
  }
}

const user = new UserManager("src/data/fs/files/users.txt");

export default user;
