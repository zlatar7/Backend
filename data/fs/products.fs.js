import { promises } from 'fs';
import fs from 'fs'
import crypto from "crypto"

class ProductManager{
    
    
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

    constructor (path) {
        this.path = path || 'data/fs/files/products.txt',
        this.products = "[]",
        this.init();
      }

  async create(objeto){
      try {
          const title = objeto.hasOwnProperty('title')
          const photo = objeto.hasOwnProperty('photo')
          const price = objeto.hasOwnProperty('price')
          const stock = objeto.hasOwnProperty('stock')
          
          if (title && photo && price && stock) {

              const contenido = await promises.readFile(this.path, "utf-8")
              const info = JSON.parse(contenido)

              const id = crypto.randomBytes(12).toString("hex");
              const objetoConId = {...objeto, id};

              const arrayCompleto = JSON.stringify([...info, objetoConId]);
  
              await promises.writeFile(this.path, arrayCompleto)

              return `Se ha agregado el producto, y su nuevo ID es: ${id}`

          } else {
              return 'Complete todos los campos'
          }
          }            
      catch (error) {
          console.log(error)
          }
  }

  async readOne(numId){
      try {
          const contenido = await promises.readFile(this.path, "utf-8");
          const info = JSON.parse(contenido);

          const elementoEncontrado = info.find(elemento => elemento.id == numId)
        
          if(elementoEncontrado) {
              return elementoEncontrado
          } else {
              return null
          }


      } catch (error) {
          console.log(error)
      }
  }

  async read(){
      try {
          const contenido = await promises.readFile(this.path, "utf-8");
          const info = JSON.parse(contenido);

          return info

      } catch (error) { 
          console.log(error)
      }
  }
  
  async destroy(numId){
    try {

        const contenido = await promises.readFile(this.path, "utf-8");
        const info = JSON.parse(contenido);

        const elemento = info.find(elemento => elemento.id == numId);

            if(elemento){
            
            // Obtengo un array con todos los elementos excepto el elemento con el ID ingresado
                const nuevoArray = info.filter(elemento => elemento.id != numId)
                
                await promises.writeFile(this.path, JSON.stringify(nuevoArray))
                
                return 'Elemento eliminado'

            }else{

                return `No hay elementos con el ID ingresado`
        }

    } catch (error) {
        console.log(error)
    }
}
}

const product = new ProductManager('data/fs/files/products.txt')

export default product