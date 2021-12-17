const { Schema, marker } = require("mongoose");

const markerSchema = new Schema({
    marker:{
      type:Number,
    }
  });

  module.exports = marker("Marker", markerSchema);