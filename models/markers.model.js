const {Schema, model} = require("mongoose");

const markerSchema = new Schema({
    markerId: {
        type: Number,
        required: true
    },
    markerLink: {
        type: String,
        required: true
    },
    inUse: {
        type: Boolean,
    },
    patternFileLink:{
        type:String
    }
});





module.exports = model("Marker", markerSchema);