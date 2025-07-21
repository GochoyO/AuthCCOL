// Clase_1/controllers/controllerAuth.js
// Controlador para manejar la autenticación de usuarios
// importamos las dependencias necesarias

const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcryptjs"); //Seguridad en las contraseñas
const mongoose = require("mongoose");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, email, password, cellPhone, Age } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  if (!cellPhone || !Age) {
    return res.status(400).json({ message: "Debe ingresar un numero de celular y la edad" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }
  
  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya existe intenta ingresar otro" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   const newUser = new User({
      username,
      email,
      password: hashedPassword,
      cellPhone,
      Age
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "El usuario se registro correctamente" });
  } catch (err) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
// Función para iniciar sesión de usuario
// Verifica si el usuario existe y si la contraseña es correcta
// Si las credenciales son válidas, genera un token JWT y lo devuelve junto con los datos del usuario
const userLogin = async (req, res) => {
  //verificar si el usuario existe
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nombre de usuario y Contraseña son requeridos" });
  }
// Si existe: Buscar el usuario en la base de datos
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Las credenciales son invalidas" });
    }

    //Comprobar la contraseña
    const isMatch = await bcrypt.compare(password, user.password); //dato tipo bool (verdadero o falso)
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Las credenciales son invalidas" });
    }

    //Generar un jsonwebtoken JWT
    const payload = {
      userId: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser, userLogin };
