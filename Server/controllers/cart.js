import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body;
    const userId = req.user;

    // Input validation
    if (!userId || !productId || qty < 1) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty;
    } else {
      cart.items.push({ productId, title, price: price * qty, qty, imgSrc });
    }

    await cart.save();

    res.status(200).json({ message: "Items Added To Cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const decreaseQuantity = async (req, res) => {
    try {
    const { userId, productId } = req.body;
  
    let cart = await Cart.findOne({ userId });
  
    if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
    }
  
    const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));
  
    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found in cart" });
    }
  
      // Decrease quantity
      cart.products[productIndex].quantity -= 1;
  
      // If quantity reaches 0, remove the product from the cart
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1);
    }
  
      // Recalculate total price
      let totalPrice = 0;
      for (const item of cart.products) {
        const product = await Product.findById(item.productId);
        if (product) {
          totalPrice += product.price * item.quantity;
        }
    }
      cart.totalPrice = totalPrice;
  
      await cart.save();
  
      res.status(200).json({ success: true, message: "Product quantity decreased", data: cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}; 
 
export const getCart = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const cart = await Cart.findOne({ userId }).populate("products.productId");
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      cart.products = cart.products.filter((item) => !item.productId.equals(productId));
  
      cart.totalPrice = cart.products.reduce(async (total, item) => {
        const prod = await Product.findById(item.productId);
        return total + prod.price * item.quantity;
    }, 0);
  
      await cart.save();
  
      res.status(200).json({ success: true, message: "Product removed from cart", data: cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
      const { userId } = req.params;
  
      await Cart.findOneAndDelete({ userId });
  
      res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};