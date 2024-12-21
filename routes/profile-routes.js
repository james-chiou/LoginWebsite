const router = require("express").Router();
const Post = require("../models/post-model");

// 確認使用者是否登入
const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/auth/login");
  }
};
// 確認使用者的身分確認
router.get("/", authCheck, async (req, res) => {
  let postFound = await Post.find({ author: req.user._id });
  //console.log(postFound);
  return res.render("profile", { user: req.user, posts: postFound }); // deSerializeUser()
});
// 發布文章頁面
router.get("/post", authCheck, (req, res) => {
  return res.render("post", { user: req.user });
});

// router.get("/:_id", authCheck, async (req, res) => {
//   let { _id } = req.params;
//   try {
//     let foundPost = await Post.findOne({ _id }).exec();
//     if (foundPost != null) {
//       return res.render("post_page", { user: req.user, foundPost });
//     } else {
//       return res.status(400).render("post_not_found");
//     }
//   } catch (e) {
//     return res.status(400).render("post_not_found");
//   }
// });

// 發布文章
router.post("/post", authCheck, async (req, res) => {
  let { title, content } = req.body;
  let newPost = new Post({ title, content, author: req.user._id });
  try {
    await newPost.save();
    return res.redirect("/profile");
  } catch (e) {
    req.flash("error_msg", "標題與內容都需要填寫。");
    return res.redirect("/profile/post");
  }
});
//進入編輯文章
router.get("/:_id/edit", authCheck, async (req, res) => {
  let { _id } = req.params;
  try {
    let foundPost = await Post.findOne({ _id }).exec();
    if (foundPost != null) {
      return res.render("edit_page", { user: req.user, foundPost });
    } else {
      return res.status(400).render("post_not_found");
    }
  } catch (e) {
    return res.status(400).render("post_not_found");
  }
});
// 編輯文章
router.put("/:_id", authCheck, async (req, res) => {
  try {
    let { _id } = req.params;
    let { title, content } = req.body;
    await Post.findOneAndUpdate(
      { _id },
      { title, content },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    return res.redirect("/profile");
  } catch (e) {
    req.flash("error_msg", "標題與內容都需要填寫。");
    return res.redirect("/profile/:_id/edit");
  }
});

// 刪除文章
router.delete("/:_id", authCheck, async (req, res) => {
  try {
    let { _id } = req.params;
    await Post.deleteOne({ _id }).exec();
    return res.redirect("/profile");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

module.exports = router;
