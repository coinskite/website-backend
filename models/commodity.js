const mongoose = require("mongoose");

const CommoditySchema = new mongoose.Schema({
  commodity: {
    type: String,
  },

  variety: {
    type: String,
  },

  arrivalDate: {
    type: Date,
  },

  state: {
    type: String,
  },

  district: {
    type: String,
  },

  market: {
    type: String,
  },

  maxPrice: {
    type: Number,
  },

  avgPrice: {
    type: Number,
  },

  minPrice: {
    type: Number,
  },

}, { timestamps: true })

module.exports = mongoose.model("Commodity", CommoditySchema)
