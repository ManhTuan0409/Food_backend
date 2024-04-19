const express = require('express');
const router = express.Router();
const Product = require('../models/product');


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found.');
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post('/', async (req, res) => {
  try {
    let product = new Product({
      foodName: req.body.foodName,
      foodDetails: req.body.foodDetails,
      foodPrice: req.body.foodPrice,
      status : req.body.status,
      foodImg: req.body.foodImg,
    });

    product = await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        foodName: req.body.foodName,
        foodDetails: req.body.foodDetails,
        foodPrice: req.body.foodPrice,
        status : req.body.status,
        foodImg: req.body.foodImg,
      },
      { new: true }
    );

    if (!product) return res.status(404).send('Product not found.');
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);
    if (!product) return res.status(404).send('Product not found.');
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;