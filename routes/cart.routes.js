const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const { jwtAuthMiddleware } = require('../jwt');

/* ========= GET CART ========= */
router.get('/', jwtAuthMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate('items.product');

  res.json(cart || { items: [] });
});

/* ========= ADD TO CART ========= */
router.post('/', jwtAuthMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [{ product: productId, quantity }]
    });
  } else {
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  res.json(cart);
});

/* ========= UPDATE CART ========= */
router.put('/', jwtAuthMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });

  const item = cart.items.find(
    item => item.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  item.quantity = quantity;
  await cart.save();

  res.json(cart);
});

/* ========= REMOVE FROM CART ========= */
router.delete('/:productId', jwtAuthMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    item => item.product.toString() !== req.params.productId
  );

  await cart.save();
  res.json(cart);
});

module.exports = router;
