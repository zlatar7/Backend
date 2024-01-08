class ProductManager {
    
    static #products = [];

    create(data) {
        const title = data.hasOwnProperty('title')
        const photo = data.hasOwnProperty('photo')
        const price = data.hasOwnProperty('price')
        const stock = data.hasOwnProperty('stock')
  
        if (title && photo && price && stock) {
  
  
          if ( ProductManager.#products.length > 0) {
              //Asignación del ID al objeto (Array con productos existentes)
              const ultimoElemento = ProductManager.#products[ProductManager.#products.length -1];
              const id = ultimoElemento.id + 1;
              const objetoConId = {...data, id};
              
              ProductManager.#products.push(objetoConId)
  
              return console.log(`El producto ${objetoConId.title} se ha agregado correctamente`)
  
          } else {
              //Asiganción del ID al objeto (si el Array de productos está vacío)
              const objetoConId = { id:1 , ...data }
              ProductManager.#products.push(objetoConId)
  
              return console.log(`El producto ${objetoConId.title} se ha agregado correctamente`)
          }
        
      } else {
          console.log('Complete todos los campos')
      }
  }
  
    read() {
      return ProductManager.#products;
    }
  
    readOne(id) {
        const elemento = ProductManager.#products.find((item) => item.id === id)

        if (elemento) {
            return elemento
        } else {
            return "El ID ingresado es inexistente"
        }
    }
  }
  
  const ProdManager = new ProductManager();
  
  ProdManager.create({
    title: "Camisa",
    photo: "https://image.com",
    price: 18500,
    stock: 5,
  });
  
  ProdManager.create({
    title: "Jean",
    photo: "https://image.com",
    price: 25000,
    stock: 8,
  });
  
  console.log(ProdManager.read());
  console.log(ProdManager.readOne(2));