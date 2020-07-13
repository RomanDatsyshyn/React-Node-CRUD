const Goods = require("../../database/models/Goods");

module.exports = async (req, res) => {
  try {
    await Goods.updateOne(
      { _id: req.params.product_id },
      { $set: { name: req.body.name, crm_id: req.body.crm_id } }
    );

    res.status(200).end();
  } catch (e) {
    res.json({
      message: e.message,
      controller: e.controller || "Edit",
    });
  }
};
