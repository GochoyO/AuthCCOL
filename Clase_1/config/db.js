// Clase_1/config/db.js

const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

//Conectar nuestra database de mongoDB
const connectDB = async () => {
  try {
    //Intentar hacer una conexión con la db
    await mongoose.connect(MONGO_URI, {
      dbName: "Authentication", //Nombre de la base de datos
    });
    console.log("La conexión con mongoDB a sido exitosa");
  } catch (err) {
    //Error si la conexión falla
    console.error("La conexión con la db ha sido fallida", err.message);
    process.exit(1); // Salir del proceso si la conexión falla
  }
};

module.exports = connectDB; //Exportar la función de conexión a la db
