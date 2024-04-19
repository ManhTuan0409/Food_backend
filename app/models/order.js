// user.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
      quantity: {type: Number, required: true}
    }],
    totalPrice: { type: Number, required: true },
    createAt: {type: Date, default: Date.now}
  });

module.exports = mongoose.model('Order', orderSchema);
