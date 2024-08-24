const Boards = require("../models/boards");
const Lists = require("../models/lists");
const Cards = require("../models/cards");
const Users = require("../models/users");

const {APIError} = require("../middlewares/errorHandler")



exports.post_cards = async (req,res) => {
    const userId = req.user.id;
    const {name,descripton,color,position} = req.body;
    const {boardId,listId} = req.params;

    try{
        const board = await Boards.findOne({ _id: boardId });
        const list = await Lists.findOne({ _id: listId });


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

        if(boardId.toString() !== list.boardId.toString()){
            return res.status(404).json({
                success: false,
                message:"Card eklemek istediğiniz liste bu board'a ait değil"
            })

        }

        const card = new Cards({
            name,
            descripton,
            color,
            position,
            listId,
            createdBy:userId
        });
        const newCard = await card.save();
        res.status(201).json({
            success: true,
            data: newCard,
            message: "Kayıt Başarılı",
        });

       }catch(err){
        console.log(err)
        throw new APIError("Sunucu Hatası",500)
       }
}

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

        const newList = await list.save();
        res.status(201).json({
            success: true,
            data: newList,
            message: "Kayıt Başarılı",
        });
       }catch(err){
        console.log(err)
        throw new APIError("Sunucu Hatası",500)
       }
}

//board'a kullanıcı eklene
exports.post_add_member = async (req,res) => {
    const { email } = req.body;  
    const boardId = req.params.id; 
    const userId = req.user.id; 

    try {
        const board = await Boards.findOne({ _id: boardId });
        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board bulunamadı"
            });
        }

        if (board.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Bu board'a erişim izniniz yok"
            });
        }

        //kullanıcıyı bul
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Kullanıcı bulunamadı"
            });
        }

        if (board.members.includes(user._id) && board.createdBy.toString() == userId) {
            return res.status(400).json({
                success: false,
                message: "Kullanıcı zaten bu board'un bir üyesi"
            });
        }

  
        board.members.push(user._id);
        if (board.members.length > 0) {
            board.isPublic = true;
        }
        await board.save();

        res.status(200).json({
            success: true,
            message: "Üye başarıyla eklendi",
            board
        });
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası", 500);
    }
}

exports.get_boards_details = async (req,res) => {
    const userId = req.user.id;
    const boardId = req.params.id;
    try {
        const boards = await Boards.findOne({_id:boardId});
        
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
        
        const lists = await Lists.find({boardId});

        const listsWithCards = await Promise.all(lists.map(async (list) => {
            const cards = await Cards.find({ listId: list._id });
            return {
                ...list.toObject(),
                cards
            };
        }));

        res.status(200).json({
            success: true,
            board: boards,
            listsWithCards
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
