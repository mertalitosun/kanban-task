const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
    name:{type:String,required:true},
    isPublic: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
},{timestamps: true})
module.exports = mongoose.model("Boards", boardSchema)