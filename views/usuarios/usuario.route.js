import Express from "express";
import { findAllUsuarios,createUsuario,deleteUsuario,findUsuarioById, updateUsuario,consultarOCrearUsuario } from "../../model/usuario.model.js";
const rutasUsuario = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error consultando los usuarios');
    } else {
      res.json(result);
    }
  };
  rutasUsuario.route('/usuarios/self').get((req, res) => {
    
    console.log('alguien hizo get en la ruta /self');
    consultarOCrearUsuario(req, genercCallback(res));
    //res.send("usuarios");

  });

  rutasUsuario.route('/usuarios').get((req, res) => {
    
    /*const usuarios =[
        {id:"001",firstName:"Ronald",lastName:"Cuello",email:"admin@yopmail.com",role:"admin"},
        {id:"002",firstName:"Alejandro",lastName:"Nagno",email:"magnus@yopmail.com",role:"vendedor"},
        {id:"003",firstName:"Marco",lastName:"Polo",email:"marco@yopmail.com",role:"vendedor"},
        {id:"004",firstName:"Cleopatra",lastName:"Egito",email:"cleo@yopmail.com",role:"admin"}
    ];

    res.send(usuarios);*/

    findAllUsuarios(genercCallback(res));

  });


  rutasUsuario.route('/usuarios').post((req, res) => {
    const json = req.body;
    createUsuario(json,genercCallback(res));
  });

  rutasUsuario.route('/usuarios/:id').get((req, res) => {
    findUsuarioById(req.params.id, genercCallback(res));
  });

  rutasUsuario.route('/usuarios/:id').patch((req, res) => {
    const json = req.body;  
    updateUsuario(req.params.id,json, genercCallback(res));
  });

  rutasUsuario.route('/usuarios/:id').delete((req, res) => {
    
    deleteUsuario(req.params.id, genercCallback(res));
  });

  

  export default rutasUsuario;