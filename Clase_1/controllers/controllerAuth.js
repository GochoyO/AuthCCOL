// Clase_1/controllers/controllerAuth.js
// Controlador para manejar la autenticación de usuarios
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcryptjs"); //Seguridad en las contraseñas

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
        .json({ message: "El nombre deusuario ya existe intenta ingresar" });
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
    return res.status(500).json({ message: "Error en el servidor ...paso" + err.message });
  }
};

module.exports = { registerUser };
