const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  subscriber:{
    type: Boolean,
    require: true
  },
  loggedIn:{
    type: Boolean
  },
})

module.exports = mongoose.model("user", UserSchema)