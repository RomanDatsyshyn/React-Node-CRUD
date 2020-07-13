const Goods = require("../../database/models/Goods");

module.exports = async (req, res) => {
  try {
    // ------------------- Pagination ------------------- //

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Goods.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await Goods.find({}).limit(limit).skip(startIndex).exec();

    // ------------------- End Pagination ------------------- //

    res.json(results);
    res.status(200).end();
  } catch (e) {
    res.json({
      message: e.message,
      controller: e.controller || "getAll",
    });
  }
};
