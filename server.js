require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

/* ===================== MIDDLEWARES ===================== */
app.use(cors());
app.use(express.json());

/* ===================== DATABASE ===================== */
connectDB();

/* ===================== ROUTES ===================== */
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/order.routes'));

/* ===================== HEALTH CHECK ===================== */
app.get('/', (req, res) => {
  res.send('E-commerce Backend API is running');
});

/* ===================== SERVER ===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
