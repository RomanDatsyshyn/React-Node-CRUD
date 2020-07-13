const Goods = require("../../database/models/Goods");

module.exports = async (req, res) => {
  try {
    const data = req.body;

    const newProduct = new Goods(data);
    await newProduct.save();

    res.status(201).end();
  } catch (e) {
    res.json({
      message: e.message,
      controller: "add",
    });
  }
};
