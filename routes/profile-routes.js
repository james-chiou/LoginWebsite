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
  return res.render("profile", { user: req.user, posts: postFound }); // deSerializeUser()
});
// 發布文章頁面
router.get("/post", authCheck, (req, res) => {
  return res.render("post", { user: req.user });
});
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

module.exports = router;
