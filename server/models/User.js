const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
  name: {
    type: String,
    required: true,
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
    min: 8,
    max: 32
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("users", UserSchema);