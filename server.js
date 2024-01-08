import express from 'express';
import product from './data/fs/products.fs.js';
import user from './data/fs/users.fs.js'

const server = express();

server.use(express.urlencoded({extended:true}));
server.use(express.json())

/* Endpoints de productos */

server.get('/api/products', async (req,res) =>{

    try {
        const arrayProducts = await product.read()
        
        if (arrayProducts.length > 0) {
    
            res.status(200).json({success: true, response: arrayProducts})
        } else {
            res.status(404).json({success: false, message: 'Not found'})
        }
    } catch (error) {
       return  res.status(500).json({success: false, message: error.message})
    }    

})

server.get('/api/products/:pid', async (req, res)=>{

    try {
        const id = parseInt(req.params.pid);
        const obj = await product.readOne(id)
    
        if (obj !== null) {
            res.status(200).json({success: true, response: obj})  
        } else {
            res.status(404).json({success: false, message: 'Not found'})
        }        
    } catch (error) {
        return res.status(500).json({succes: false, message: error.message})
    }
    
})

server.post('/api/products', async (req, res)=>{
    try {
        const prod = req.body
        const obj = await product.create(prod)
        console.log(obj)
        if (obj !== `Complete todos los campos`) {
            res.status(200).json({success: true, response: obj})  
        } else {
            res.status(404).json({success: false, message: obj})
        }
    } catch (error) {
        return res.status(500).json({succes: false, message: error.message})
    }

})
server.delete('/api/products/:pid', async (req, res)=>{
    try {
        const prod = req.params.pid
        const obj = await product.destroy(prod)

        if (obj !== 'No hay elementos con el ID ingresado') {
            res.status(200).json({success: true, response: obj})  
        } else {
            res.status(404).json({success: false, message: obj})
        }
    } catch (error) {
        return res.status(500).json({succes: false, message: error.message})
    }
})

/* Endpoints de usuarios */

server.get('/api/users', async (req, res)=>{

    try {
        const usersArray = await user.read()
        
        if (usersArray.length > 0) {
            res.status(200).json({success: true, response: usersArray})
        } else {
            res.status(404).json({success: false, message: 'Not found'})
        }
    } catch (error) {
        return res.status(500).json({succes: false, message: error.message})
}

})
server.get('/api/users/:uid', async (req, res)=>{

    try {
        const id = parseInt(req.params.uid);
        const obj = await user.readOne(id)
    
        if (obj !== null) {
            res.status(200).json({success: true, response: obj})  
        } else {
            res.status(404).json({success: false, message: 'Not found'})
        }
    } catch (error) {
        return res.status(500).json({succes: false, message: error.message})
    }

})
server.post('/api/users', async (req, res)=>{
  
    try {
        const usuario = req.body
        const obj = await user.create(usuario)
        if(obj !== 'Complete todos los campos'){
            res.status(200).json({success: true, response: obj})  
        } else {
            res.status(404).json({success: false, message: obj})
        }      
    } catch (error) {
        return res.status(500).json({succes: false, message: error.message})
    }
})
server.delete('/api/users/:uid', async (req, res)=>{
    try {
        const id = req.params.uid
        const obj = await user.destroy(id)

        if(obj !== 'No hay elementos con el ID ingresado'){
            res.status(200).json({success: true, response: obj})  
        } else {
            res.status(404).json({success: false, message: obj})
        }
    } catch (error) {
        return res.status(500).json({succes: false, message: error.message})
    }
})



const PORT = 8000
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})