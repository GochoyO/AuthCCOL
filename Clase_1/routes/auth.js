const express = require("express");
const router = express.Router(); //Crear un enrutador de Express

const { registerUser } = require("../controllers/controllerAuth");

router.post("/register", registerUser);

module.exports = router;
