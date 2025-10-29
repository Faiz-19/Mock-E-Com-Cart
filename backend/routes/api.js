import { Router } from 'express';
import Product from '../models/Product.js';
import CartItem from '../models/CartItem.js';

const router = Router();

// 1. GET /api/products: Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// 2. GET /api/cart: Get all cart items + total
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.find({}).populate('productId');
    
    // Calculate total price on the backend
    const total = cartItems.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    res.json({ items: cartItems, total: total.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

// 3. POST /api/cart: Add/update item in cart
router.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    // Check if item is already in the cart
    let existingItem = await CartItem.findOne({ productId });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json(existingItem);
    } else {
      // Add new item
      const newItem = new CartItem({ productId, quantity });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});


router.put('/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'increment' or 'decrement'

    const cartItem = await CartItem.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (action === 'increment') {
      cartItem.quantity += 1;
      await cartItem.save();
    } else if (action === 'decrement') {
      cartItem.quantity -= 1;
      
      if (cartItem.quantity < 1) {
        // Remove item if quantity drops to 0
        await CartItem.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Item removed' });
      } else {
        await cartItem.save();
      }
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quantity', error });
  }
});

// 4. DELETE /api/cart/:id: Remove item from cart
router.delete('/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CartItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    res.status(200).json({ message: 'Item removed successfully', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
});



// 5. POST /api/checkout: Mock checkout process
router.post('/checkout', async (req, res) => {
  const { cartItems } = req.body; // Frontend sends the cart items for confirmation

  if (!cartItems || cartItems.length === 0) {
     return res.status(400).json({ message: 'Cart is empty' });
  }

  try {
    // Calculate final total on the backend (as a source of truth)
    let total = 0;
    for (const item of cartItems) {
      const product = await Product.findById(item.productId._id);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    // Clear the cart
    await CartItem.deleteMany({});

    // Return mock receipt
    const receipt = {
      receiptId: `VIBE-${Date.now()}`,
      totalAmount: total.toFixed(2),
      itemsPurchased: cartItems.length,
      timestamp: new Date().toISOString()
    };
    
    res.status(200).json(receipt);

  } catch (error) {
    res.status(500).json({ message: 'Checkout process failed', error });
  }
});

export default router;