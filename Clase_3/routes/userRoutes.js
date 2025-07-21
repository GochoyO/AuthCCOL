// Creamos las rutas para el manejo de usuarios

const express = require("express");     // Importamos express
const router = express.Router();        // Creamos el router
const { getMe, changePassword } = require("../controllers/controllerUser"); 
const { protect } = require("../middleware/authMiddleware");

//Ruta para obtener los datos del usuario
router.get("/me", protect, getMe);
//Ruta para cambiar la contraseña del usuario
router.post("/me/password", protect, changePassword);

module.exports = router;
