import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;
const dbName = process.env.DATABASE_NAME;

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const conectarBD = (callback) => {
  console.log("[db] connecting ... =>",dbName);  
  client.connect((err, db) => {
    if (err) {
      console.error('[db] connection error');
      return 'error';
    }
    baseDeDatos = db.db(dbName);
    console.log("[db] connection success!");
    return callback();
  });
};

const getDB = () => {
  return baseDeDatos;
};

export { conectarBD, getDB };

