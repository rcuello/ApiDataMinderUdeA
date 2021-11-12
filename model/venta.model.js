import { getDB } from "../services/dbServices.js";
import { ObjectId } from 'mongodb';

const COLLECTION_NAME ="sales";

const createVenta = async (venta,callback)=>{

    const baseDatos=getDB();
    await baseDatos.collection(COLLECTION_NAME).insertOne(venta,callback);

 } 

 const findAllVentas = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection(COLLECTION_NAME).find({}).limit(50).toArray(callback);
  };

const findVentaById = async (id,callback) => {
    const baseDatos = getDB();
    var isValid = ObjectId.isValid(id);

    //TODO: UnhandledPromiseRejectionWarning: Unhandled promise rejection
    if(!isValid)callback(new Error("invalid id"));

    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).findOne(idFilter,callback);
  };

  const deleteVenta = async (id,callback)=>{
    const baseDatos = getDB();
    
    var isValid = ObjectId.isValid(id);

    const idFilter   = {_id : new ObjectId(id) };
    await baseDatos.collection(COLLECTION_NAME).deleteOne(idFilter,callback);
 }

const updateVenta = async (id,edicion, callback) => {
   const filtro = { _id: new ObjectId(id) };
   const operacion = {
     $set: edicion,
   };
   const baseDeDatos = getDB();
   await baseDeDatos
     .collection(COLLECTION_NAME)
     .findOneAndUpdate(filtro, operacion, { upsert: true, returnOriginal: true }, callback);
 };



 export { findAllVentas,createVenta,deleteVenta,findVentaById,updateVenta };
