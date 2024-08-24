const Boards = require("../models/boards");
const Lists = require("../models/lists");
const Cards = require("../models/cards");

const {APIError} = require("../middlewares/errorHandler")


exports.get_lists = async (req, res) => {
    const userId = req.user.id;
    const  boardId  = req.params.id;

    try {
        const board = await Boards.findOne({ _id: boardId });

        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board bulunamadı"
            });
        }

        if (board.createdBy.toString() !== userId && !board.members.includes(userId)) {
            return res.status(403).json({
                success: false,
                message: "Bu board'a erişim izniniz yok"
            });
        }

        const lists = await Lists.find({ boardId }).populate("boardId");

        res.status(200).json({
            success: true,
            lists
        });

    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası", 500);
    }
};

exports.post_lists = async (req,res) => {
    const userId = req.user.id;
    const {name} = req.body;
    const boardId = req.params.id;
    try{
        const board = await Boards.findOne({ _id: boardId });

        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board bulunamadı"
            });
        }

        if (board.createdBy.toString() !== userId && !board.members.includes(userId)) {
            return res.status(403).json({
                success: false,
                message: "Bu board'a erişim izniniz yok"
            });
        }

        const list = new Lists({
            name,
            boardId,
            createdBy:userId
        });

        const response = await list.save();
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

exports.get_boards_details = async (req,res) => {
    const userId = req.user.id;
    const boardId = req.params.id;
    try {
        const boards = await Boards.findOne({_id:boardId});
        const lists = await Lists.find({boardId})

        if(!boards){
            return res.status(404).json({
                success:false,
                message: "Board Bulunamadı"
            })
        }

        if (boards.createdBy.toString() !== userId && !boards.members.includes(userId)) {
            return res.status(403).json({
                success: false,
                message: "Bu board'a erişim izniniz yok"
            });
        }

        res.status(200).json({
            success: true,
            board: boards,
            lists
        });
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası",500)
    }
}

exports.post_boards = async(req,res) =>{
    const {name} = req.body;
    const userId = req.user.id
    try{
        const board = new Boards({
            name,
            createdBy: userId,
            members: userId,
        });
        const response = await board.save();

        //default lists
        const defaultLists = ["Backlog", " To Do", "In Progress", "Done"];
        const listsToCreate = defaultLists.map(listName => ({
            name: listName,
            boardId: board._id,
            createdBy: userId
        }));
        
        const createdLists = await Lists.insertMany(listsToCreate);
        res.status(201).json({
            success: true,
            boards: response,
            lists:createdLists,
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
