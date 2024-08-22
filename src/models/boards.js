const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
    name:{type:String,required:true},
    publicId: { type: String, required: true },
},{timestamps: true})
module.exports = mongoose.model("Boards", boardSchema)