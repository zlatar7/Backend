import { promises } from 'fs';

class ProductManager{
  constructor (path) {
      this.path = path,
      this.product = "[]"
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
  
              //Asiganción del ID al objeto (Array con productos existentes)

              if (info.length > 0) {
                  const ultimoElemento = info[info.length -1];
                  const id = ultimoElemento.id + 1;
                  const objetoConId = {...objeto, id};

                  //Se agrega el objeto al array 
                  const arrayCompleto = JSON.stringify([...info, objetoConId]);
  
              await promises.writeFile(this.path, arrayCompleto)

              return `Se ha agregado el producto, y su nuevo ID es: ${id}`
                  
              } else {

                  //Asiganción del ID al objeto (si el Array de productos está vacío)
                  const id = 1
                  const objetoConId = {...objeto, id} 
              
                  const arrayCompleto = JSON.stringify([...info, objetoConId])
                  
                  await promises.writeFile(this.path, arrayCompleto)
              
                  return `Se ha agregado el producto, y su nuevo ID es: ${id}`
              }

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
              return 'No se ha encontrado ningún elemento con ese ID'
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
}

const productos1 = new ProductManager('data/products.txt')

productos1.create({
  title: "Jean",
  photo: "https://image.com",
  price: 29900,
  stock: 4,
});

productos1.read().then((response)=>console.log(response));
productos1.readOne(2).then((response)=>console.log(response));