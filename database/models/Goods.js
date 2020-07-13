const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

autoIncrement.initialize(connection);

const goodsScheme = new Schema({
  old_id: {
    type: Number,
  },
  name: {
    type: String,
    require: true,
  },
  crm_id: {
    type: String,
    require: true,
  },
});

goodsScheme.plugin(autoIncrement.plugin, {
  model: "goods",
  field: "old_id",
  startAt: 4600,
});

goodsScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("goods", goodsScheme);
