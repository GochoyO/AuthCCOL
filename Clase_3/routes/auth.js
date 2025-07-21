// Clase_1/routes/auth.js
// Este archivo define las rutas relacionadas con la autenticación de usuarios
// Importamos el enrutador de Express y el controlador de autenticación
const express = require("express");
const router = express.Router(); //Crear un enrutador de Express

//
const { registerUser, userLogin } = require("../controllers/controllerAuth");

// Ruta para registrar un nuevo usuario
router.post("/register", registerUser);

// Ruta para iniciar sesión de usuario
router.post("/login", userLogin);

module.exports = router;
