import { getDB } from "../services/dbServices.js";
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';

const COLLECTION_NAME ="users";

const createUsuario = async (usuario,callback)=>{

    const baseDatos=getDB();
    await baseDatos.collection(COLLECTION_NAME).insertOne(usuario,callback);

 } 

 const findAllUsuarios = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection(COLLECTION_NAME).find({}).limit(50).toArray(callback);
  };

const findUsuarioById = async (id,callback) => {
    const baseDatos = getDB();
    var isValid = ObjectId.isValid(id);

    //TODO: UnhandledPromiseRejectionWarning: Unhandled promise rejection
    if(!isValid)callback(new Error("invalid id"));

    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).findOne(idFilter,callback);
  };

  const deleteUsuario = async (id,callback)=>{
    const baseDatos = getDB();
    
    var isValid = ObjectId.isValid(id);

    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).deleteOne(idFilter,callback);
 }

const updateUsuario = async (id,edicion, callback) => {
   const filtro = { _id: new ObjectId(id) };
   const operacion = {
     $set: edicion,
   };
   const baseDeDatos = getDB();
   await baseDeDatos
     .collection(COLLECTION_NAME)
     .findOneAndUpdate(filtro, operacion, { upsert: true, returnOriginal: true }, callback);
 };

 const consultarOCrearUsuario = async (req, callback) => {
  console.log('Estoy llegando a crear usuario');
  // 6.1. obtener los datos del usuario desde el token
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  
  //console.log(token);
  //console.log(user.email);

  // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
  const baseDeDatos = getDB();
  await baseDeDatos.collection(COLLECTION_NAME).findOne({ email: user.email }, async (err, response) => {
    
    //console.log('response consulta bd', response);
    
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      user.auth0ID = user._id;
      delete user._id;
      user.rol = 'Vendedor';
      user.estado = 'pendiente';
      await createUsuario(user, (err, respuesta) => callback(err, user));
    }
  });
};


 export { findAllUsuarios,createUsuario,deleteUsuario,findUsuarioById,updateUsuario,consultarOCrearUsuario };
