const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
    name:{type:String,required:true},
    isPublic: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},{timestamps: true})
module.exports = mongoose.model("Boards", boardSchema)