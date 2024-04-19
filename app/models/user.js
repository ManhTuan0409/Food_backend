const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] // Array of role references
});

module.exports = mongoose.model('User', userSchema);