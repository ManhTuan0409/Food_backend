const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoutes = require("./app/routes/users");
const productRoutes = require("./app/routes/products");
const orderRoutes = require("./app/routes/orders");
// Initialize express app
const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myShop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
