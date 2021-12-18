const {Schema, model} = require("mongoose");

const elementSchema = new Schema({
    markerId: {
        type: Number
    },
    markerLink: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    material: String
});

module.exports = model("Element", elementSchema);