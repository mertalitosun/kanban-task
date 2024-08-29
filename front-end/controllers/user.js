exports.delete_cards= (req, res) => {
    res.render("users/delete-cards", {
        title: "Delete Cards",
    });
};
exports.post_cards = (req, res) => {
    res.render("users/add-cards", {
        title: "New Cards",
    });
};
exports.delete_lists = (req, res) => {
  res.render("users/delete-lists", {
    title: "Delete Lists",
  });
};
exports.post_lists = (req, res) => {
  res.render("users/add-lists", {
    title: "New Lists",
  });
};
exports.delete_boards = (req, res) => {
  res.render("users/delete-boards", {
    title: "Delete Boards",
  });
};
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
