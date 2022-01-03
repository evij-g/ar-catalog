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
        type: String
    },
    rotation: {
        type: String
    },
    scale:{
        type: String
    },
    resizefactor:{
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    material: {type: String}
});

module.exports = model("Element", elementSchema);