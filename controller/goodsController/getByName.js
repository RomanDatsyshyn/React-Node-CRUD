const Goods = require("../../database/models/Goods");

module.exports = async (req, res) => {
  try {
    const { name } = req.query;

    const ProductData = await Goods.find({});

    let SearchResults = [];

    ProductData.map((g) => {
      if (g.name.toLowerCase().includes(name.toLowerCase()))
        SearchResults.push(g);
    });

    res.json(SearchResults);
    res.status(200).end();
  } catch (e) {
    res.json({
      message: e.message,
      controller: e.controller || "getByName",
    });
  }
};
