const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const { jwtAuthMiddleware } = require('../jwt');
const { adminOnly } = require('../middlewares/role');

/* ========= CREATE ORDER (USER) ========= */
router.post('/', jwtAuthMiddleware, async (req, res) => {

  // ❌ BLOCK ADMIN FROM ORDERING
  if (req.user.role === 'admin') {
    return res.status(403).json({
      message: 'Admins are not allowed to place orders'
    });
  }

  const cart = await Cart.findOne({ user: req.user.id })
    .populate('items.product');

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const items = cart.items.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price
  }));

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user.id,
    items,
    totalAmount
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

/* ========= USER ORDERS ========= */
router.get('/', jwtAuthMiddleware, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

/* ========= ADMIN ROUTES ========= */

// Get all orders
router.get('/admin/all', jwtAuthMiddleware, adminOnly, async (req, res) => {
  const orders = await Order.find().populate('user');
  res.json(orders);
});

// Update order status
router.put('/:id/status', jwtAuthMiddleware, adminOnly, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
});

module.exports = router;
