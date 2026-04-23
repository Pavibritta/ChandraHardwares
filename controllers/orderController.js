import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // get cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // calculate total
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    // create order
    const order = await Order.create({
      user: userId,
      items: cart.items,
      address: req.body.address,
      totalAmount,
      paymentMethod: "COD",
    });

    // re-fetch with populate
    const fullOrder = await Order.findById(order._id)
      .populate("items.product") // 👈 important
      .populate("user", "name email");

    res.json({ message: "Order placed successfully", order: fullOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order failed" });
  }
};
//get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.log("Get all orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get order by id

export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "UserId missing" });
    }

    const orders = await Order.find({ user: userId }).populate("items.product");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//cancell order

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // ✅ FIX HERE

    const order = await Order.findOne({ _id: id, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({ message: "Cannot cancel delivered order" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled", order });
  } catch (error) {
    console.log("Cancel order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//update status

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }, // returns updated doc
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order updated",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
