const Goods = require("../../database/models/Goods");

module.exports = async (req, res) => {
  try {
    await Goods.deleteOne({ _id: req.params.product_id });

    res.status(204).end();
  } catch (e) {
    res.json({
      message: e.message,
      controller: e.controller || "delete",
    });
  }
};
