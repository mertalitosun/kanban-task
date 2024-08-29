const Boards = require("../models/boards");
const Lists = require("../models/lists");
const Cards = require("../models/cards");
const Users = require("../models/users");

const {APIError} = require("../middlewares/errorHandler")


exports.update_cards = async (req, res) => {
    const userId = req.user.id;  
    const { boardId, listId, cardId } = req.params;
    const { name, description, position, color,listIdNumber } = req.body; //listIdNumber = card'ın bağlı olduğu list'in ID numarasıdır.

    try {
        //Board
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
                message: "Bu Card'ı Güncellemeye izniniz yok"
            });
        }

        //Liste
        const list = await Lists.findOne({ _id: listId });

        if (!list || list.boardId.toString() !== boardId) {
            return res.status(404).json({
                success: false,
                message: "Liste bulunamadı veya bu board'a ait değil"
            });
        }

        //kart 
        const card = await Cards.findOne({ _id: cardId });

        if (!card || card.listId.toString() !== listId) {
            return res.status(404).json({
                success: false,
                message: "Kart bulunamadı veya bu listeye ait değil"
            });
        }

        let updateFields = {};

        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (position !== undefined) updateFields.position = position;
        if (color) updateFields.color = color;
        if(listIdNumber) updateFields.listId = listIdNumber;

       
        const updatedCard = await Cards.findOneAndUpdate({ _id: cardId, listId: listId }, updateFields, { new: true });

        if (!updatedCard) {
            return res.status(404).json({
                success: false,
                message: "Card Bulunamadı" 
            });
        }

        return res.status(200).json({
            success: true, 
            message: "Kart başarıyla güncellendi",
            card: updatedCard
        });
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası", 500);
    }
}
exports.delete_cards = async (req, res) => {
    const userId = req.user.id;  
    const { boardId, listId, cardId } = req.params;  
    
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
                message: "Bu Card'ı silme izniniz yok"
            });
        }

        const list = await Lists.findOne({ _id: listId });

        if (!list || list.boardId.toString() !== boardId) {
            return res.status(404).json({
                success: false,
                message: "Liste bulunamadı veya bu board'a ait değil"
            });
        }

        const card = await Cards.findOne({ _id: cardId });

        if (!card || card.listId.toString() !== listId) {
            return res.status(404).json({
                success: false,
                message: "Kart bulunamadı veya bu listeye ait değil"
            });
        }

        await Cards.deleteOne({ _id: cardId });
        
        res.status(200).json({
            success: true,
            message: "Kart başarıyla silindi"
        });


    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası", 500);
    }
};
exports.post_cards = async (req,res) => {
    const userId = req.user.id;
    const {name,description,color,position=1} = req.body;
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
            description,
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

exports.update_lists = async (req,res) => {
    const userId = req.user.id;
    const { boardId, listId } = req.params;
    const { name } = req.body;

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
                message: "Bu listeyi güncellemeye izniniz yok"
            });
        }

        const list = await Lists.findOne({ _id: listId });

        if (!list || list.boardId.toString() !== boardId) {
            return res.status(404).json({
                success: false,
                message: "Liste bulunamadı veya bu board'a ait değil"
            });
        }

        list.name = name;
        await list.save();

        res.status(200).json({
            success: true,
            message: "Liste başarıyla güncellendi",
            data: list
        });
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası", 500);
    }
}

exports.delete_lists = async (req, res) => {
    const userId = req.user.id;
    const { boardId, listId } = req.params;

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
                message: "Bu listeyi silme izniniz yok"
            });
        }

        const list = await Lists.findOne({ _id: listId });

        if (!list || list.boardId.toString() !== boardId) {
            return res.status(404).json({
                success: false,
                message: "Liste bulunamadı veya bu board'a ait değil"
            });
        }

        await Cards.deleteMany({ listId: listId });
        await Lists.deleteOne({ _id: listId });

        res.status(200).json({
            success: true,
            message: "Liste başarıyla silindi"
        });
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası", 500);
    }
};
exports.post_lists = async (req,res) => {
    const userId = req.user.id;
    const {name} = req.body;
    const boardId = req.params.boardId;
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
exports.get_lists = async (req, res) => {
    const userId = req.user.id;
    const  boardId  = req.params.boardId;

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

exports.get_members = async (req, res) => {
    const userId = req.user.id;
    const boardId = req.params.boardId;

    try {
        const board = await Boards.findOne({ _id: boardId }).populate("members"); 

        if (!board) {
            return res.status(404).json({
                success: false,
                message: "Board bulunamadı"
            });
        }

        if (!board.members.some(member => member._id.toString() === userId)) {
            return res.status(403).json({
                success: false,
                message: "Bu board'a erişim izniniz yok"
            });
        }

        res.status(200).json({
            success: true,
            message:"İşlem başarılı",
            members: board.members,
            board:board
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Sunucu Hatası"
        });
    }
}

exports.delete_members = async (req,res) => {
    const { memberId } = req.params;  
    const boardId = req.params.boardId; 
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
                message: "Bu board'dan üye silme izniniz yok"
            });
        }

        if (board.createdBy.toString() === memberId) {
            return res.status(403).json({
                success: false,
                message: "Bu board'un oluşturucusu silinemez"
            });
        }

        const memberIndex = board.members.indexOf(memberId);
        if (memberIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Üye bu board'un bir parçası değil"
            });
        }

        board.members.splice(memberIndex, 1);
        if (board.members.length === 0) {
            board.isPublic = false; 
        }

        await board.save();

        res.status(200).json({
            success: true,
            message: "Üye başarıyla board'dan silindi",
            board
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Sunucu Hatası"
        });
    }
}
//board'a kullanıcı ekleme
exports.post_add_member = async (req,res) => {
    const { email } = req.body;  
    const boardId = req.params.boardId; 
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
                message: "Bu board'un kurucusu değilsiniz sadece board kurucuları üye ekleme işlemi yapabilir."
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
    const boardId = req.params.boardId;
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

exports.update_boards = async (req,res) => {
    const userId = req.user.id;
    const { boardId } = req.params;
    const { name } = req.body;

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
                message: "Bu board'u güncellemeye izniniz yok"
            });
        }


        board.name = name;
        await board.save();

        res.status(200).json({
            success: true,
            message: "Board başarıyla güncellendi",
            data: board
        });
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası", 500);
    }
}
exports.delete_boards = async (req, res) => {
    const userId = req.user.id;
    const boardId = req.params.boardId;

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
                message: "Bu board'u silme izniniz yok"
            });
        }

        await Lists.deleteMany({ boardId: boardId });
        await Cards.deleteMany({ boardId: boardId });

        await Boards.deleteOne({ _id: boardId });

        res.status(200).json({
            success: true,
            message: "Board başarıyla silindi"
        });
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası", 500);
    }
};
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

        //Varsayılan Listeler
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
                { createdBy: id },
                { members: id }
            ]
        });

        res.status(200).json({
            success: true,
            data: boards
        });
        if(!id){
            throw new APIError("giriş yok",401)
        }
    } catch (error) {
        console.error(error);
        throw new APIError("Sunucu Hatası",500)
    }
};
