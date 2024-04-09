const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model("Data", DataSchema);
