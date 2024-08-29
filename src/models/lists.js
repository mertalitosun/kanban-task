const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    name:{type:String,required:true},
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boards' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
},{timestamps: true})
module.exports = mongoose.model("Lists", listSchema)