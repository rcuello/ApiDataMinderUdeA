import { getDB } from "../services/dbServices.js";
import { ObjectId } from 'mongodb';

const COLLECTION_NAME ="products";

const findAllProductos = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection(COLLECTION_NAME).find({}).limit(50).toArray(callback);
  };

const findProductoById = async (id,callback) => {
    const baseDatos = getDB();
    var isValid = ObjectId.isValid(id);

    //TODO: UnhandledPromiseRejectionWarning: Unhandled promise rejection
    if(!isValid)callback(new Error("invalid id"));

    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).findOne(idFilter,callback);
  };

 const createProducto = async (producto,callback)=>{

    const baseDatos=getDB();
    await baseDatos.collection(COLLECTION_NAME).insertOne(producto,callback);

 } 

 const deleteProducto = async (id,callback)=>{
    const baseDatos = getDB();
    
    var isValid = ObjectId.isValid(id);

    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).deleteOne(idFilter,callback);
 }

 const updateProducto = async (id,edicion, callback) => {
   const filtroProducto = { _id: new ObjectId(id) };
   const operacion = {
     $set: edicion,
   };
   const baseDeDatos = getDB();
   await baseDeDatos
     .collection(COLLECTION_NAME)
     .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
 };


export { findAllProductos,createProducto,deleteProducto,findProductoById,updateProducto };