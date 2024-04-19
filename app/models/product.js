const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  foodDetails: { type: String, required: true },
  foodPrice: { type: Number, required: true },
  status : {type: Number, required: true},
  foodImg: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);