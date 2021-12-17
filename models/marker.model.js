const { Schema, model } = require("mongoose");

const markerSchema = new Schema({
    marker:{
      type:Number,
    },
    link:{
        type:String,
    },
  });
  module.exports = model("Marker", markerSchema);