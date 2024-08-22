const Boards = require("../models/boards");
const Lists = require("../models/lists");
const Cards = require("../models/cards");

const {APIError} = require("../middlewares/errorHandler")


exports.post_boards = async(req,res) =>{
    const {name} = req.body;
    const {id} = req.user
    try{
        const board = new Boards({
            name,
            createdBy: id,
            members: id,
        });
        const response = await board.save();
        res.status(201).json({
            success: true,
            data: response,
            message: "Kayıt Başarılı",
        });
       }catch(err){
        console.log(err)
        throw new APIError("Sunucu Hatası",500)
       }
}

exports.get_boards = async(req,res) => {
    const id = req.user.id;
    try {
        const boards = await Boards.find({
            $or: [
                { isPublic: true }, 
                { createdBy: id },
                { members: id }
            ]
        });

        res.status(200).json({
            success: true,
            data: boards
        });
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası",500)
    }
};
