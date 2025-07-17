// Clase_1/models/users.js
// This file defines the User model for a MongoDB database using Mongoose.
// It includes fields for username, email, password, cell phone number, and age.
// Each field has specific validation rules such as required, unique, and minimum/maximum values.
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String, //Son palabras
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cellPhone: {
    type: Number,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
    min: 20,
    max: 60,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
