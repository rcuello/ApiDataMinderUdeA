import Express from "express";
import { findAllProductos,createProducto,deleteProducto,findProductoById, updateProducto } from "../../model/producto.model.js";

const rutasProducto = Express.Router();



const genercCallback = (res) => (err, result) => {
  if (err) {
    console.log('error', err);
    res.status(500).json({ error: err });
  } else {
    res.json(result);
  }
};

rutasProducto.route('/productos').get((req, res) => {
    /*const productos =[
        {id:"001",name:"Portatil",price:230000},
        {id:"002",name:"Lapiz",price:40000}
    ];
    res.send(productos);*/

    findAllProductos(genercCallback(res));
  });
  
  rutasProducto.route('/productos').post((req, res) => {
    const producto = req.body;
    
    //https://simonplend.com/how-to-handle-request-validation-in-your-express-api/
    if(Object.keys(producto).includes('id') &&
        Object.keys(producto).includes('name') &&
        Object.keys(producto).includes('price')){

        createProducto(producto,genercCallback(res));
    }else{
        res.sendStatus(500);
    }

    
  });

rutasProducto.route('/productos/:id').delete((req, res) => {
    
    deleteProducto(req.params.id, genercCallback(res));
    //res.send("OK");
  });
  
rutasProducto.route('/productos/:id').get((req, res) => {
    
    findProductoById(req.params.id, genercCallback(res));
    //res.send("OK");
  });

rutasProducto.route('/productos/:id').patch((req, res) => {
  const producto = req.body;  
  updateProducto(req.params.id,producto, genercCallback(res));
    //res.send("OK");
  });

  export default rutasProducto;