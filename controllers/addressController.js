import Address from '../models/address.model.js'

export const saveAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const address = await Address.create({
      user: userId,
      ...req.body,
    });
console.log("address",address)
    res.json(address);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving address" });
  }
};


export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const address = await Address.find({ user: userId });

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: "Error fetching address" });
  }
};