import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product && item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log("Cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get cart

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

//update

// UPDATE quantity
export const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user.id;

    if (quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({ message: "Quantity updated", cart });
  } catch (error) {
    console.log("Update cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete

// REMOVE item
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // remove item
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();

    res.json({ message: "Item removed", cart });
  } catch (error) {
    console.log("Remove item error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//clear

// CLEAR cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.log("Clear cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
