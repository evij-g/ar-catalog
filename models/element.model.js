const {Schema, model} = require("mongoose");

const elementSchema = new Schema({
    markerId: {
        type: Number
    },
    markerLink: {
        type: String,
        required: true
    },
    patternLink:{
        type:String
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
    position: {
        type: String,
        default: "0 0 0"
    },
    rotation: {
        type: String,
        default: "-90 0 0"
    },
    scale:{
        type: String,
        default: "1 1 1"
    },
    resizefactor:{
        type: String,
        default: "1"
    },
    imageUrl: {
        type: String,
        required: true
    },
    material: {type: String}
});

module.exports = model("Element", elementSchema);