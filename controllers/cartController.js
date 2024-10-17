const Cart = require('../models/Cart');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      // Add product to existing cart
      cart.items.push(productId);
      await cart.save();
    } else {
      // Create new cart
      const newCart = new Cart({ user: req.user.id, items: [productId] });
      await newCart.save();
    }
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = cart.items.filter(item => item.toString() !== productId);
      await cart.save();
    }
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items');
    if (!cart) {
      return res.json([]);
    }
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
