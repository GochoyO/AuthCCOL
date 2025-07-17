// Clase_1/routes/auth.js
// Este archivo define las rutas relacionadas con la autenticación de usuarios
// Importamos el enrutador de Express y el controlador de autenticación
const express = require("express");
const router = express.Router(); //Crear un enrutador de Express

const { registerUser } = require("../controllers/controllerAuth");

router.post("/register", registerUser);

module.exports = router;
