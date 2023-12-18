class userManager {
    static #users = [];
  
    create(data) {
      const name = data.hasOwnProperty('name')
      const photo = data.hasOwnProperty('photo')
      const email = data.hasOwnProperty('email')

      if (name && photo && email) {


        if ( userManager.#users.length > 0) {
            //Asignación del ID al objeto (Array con productos existentes)
            const ultimoElemento = userManager.#users[userManager.#users.length -1];
            const id = ultimoElemento.id + 1;
            const objetoConId = {...data, id};
            
            userManager.#users.push(objetoConId)

            return console.log(`El usuario ${objetoConId.name} se ha agregado correctamente`)

        } else {
            //Asiganción del ID al objeto (si el Array de productos está vacío)
            const objetoConId = { id:1 , ...data }
            userManager.#users.push(objetoConId)

            return console.log(`El usuario ${objetoConId.name} se ha agregado correctamente`)
        }
      
    } else {
        console.log('Complete todos los campos')
    }
}
  
    read() {
      return userManager.#users;
    }
  
    readOne(id) {
        const elemento = userManager.#users.find((item) => item.id === id)

        if (elemento) {
            return elemento
        } else {
            return "El ID ingresado es inexistente"
        }
    }
  }
  
  const UserManager = new userManager();
  
  UserManager.create({
    name: "Guido",
    photo: "https://images.com",
    email: "guido@gmail.com",
  });
  
    UserManager.create({
        name: "Sofia",
        photo: "https://images.com",
        email: "Sofia1@hotmail.com",
  });


console.log(UserManager.read());
console.log(UserManager.readOne(2));