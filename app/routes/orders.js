// routes/checkout.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');

// POST /checkout
router.post('/checkout', async (req, res) => {
  try {
    const { cart, username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const newCart = new Order({ userId: user._id, items: cart.items, totalPrice: cart.totalPrice });
    const savedCart = await newCart.save();

    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
