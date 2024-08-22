const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String},
    position: {type:Number},
    color:{type:String,required:true},
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lists' }
},{timestamps: true})
module.exports = mongoose.model("Cards", cardSchema)