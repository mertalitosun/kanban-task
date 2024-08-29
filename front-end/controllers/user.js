exports.delete_cards= (req, res) => {
  const {boardId} = req.params
  res.render("users/delete-cards", {
    title: "Kart Sil",
    boardId
  });
};

exports.post_cards = (req, res) => {
  res.render("users/add-cards", {
    title: "Yeni Kart",
  });
};

exports.delete_lists = (req, res) => {
  const {boardId} = req.params
  res.render("users/delete-lists", {
    title: "Liste Sil",
    boardId
  });
};
exports.update_lists = (req, res) => {
  const {boardId} = req.params
  res.render("users/update-lists", {
    title: "Liste Güncelle",
    boardId
  });
};
exports.post_lists = (req, res) => {
  res.render("users/add-lists", {
    title: "Yeni Liste",
  });
};
exports.delete_boards = (req, res) => {
  res.render("users/delete-boards", {
    title: "Board Sil",
  });
};

exports.delete_boards_members = (req,res)=>{
  const {boardId} = req.params

  res.render("users/delete-members", {
    title: "Üye Sil",
    boardId
  });
}
exports.post_boards_members = (req,res)=>{
  res.render("users/add-members", {
    title: "Yeni Üye",
  });
}
exports.get_boards_members = (req,res)=>{
  res.render("users/members", {
    title: "Üyeler",
  });
}
exports.post_boards = (req, res) => {
  res.render("users/add-boards", {
    title: "New Boards",
  });
};
exports.get_boards_details = (req, res) => {
  res.render("users/board-details", {
    title: "My Boards",
  });
};

exports.get_boards = (req, res) => {
  res.render("users/boards", {
    title: "My Boards",
  });
};
