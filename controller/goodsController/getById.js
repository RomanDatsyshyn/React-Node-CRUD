const Goods = require("../../database/models/Goods");

module.exports = async (req, res) => {
  try {
    const ProductData = await Goods.findById(req.params.product_id);
    res.json(ProductData);
    res.status(200).end();
  } catch (e) {
    res.json({
      message: e.message,
      controller: e.controller || "getById",
    });
  }
};
