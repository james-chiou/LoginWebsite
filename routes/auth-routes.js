const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// 登入會員
router.get("/login", (req, res) => {
  return res.render("login", { user: req.user });
});
// 登出會員
router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) return res.send(err);
    return res.redirect("/");
  });
});
// 註冊會員
router.get("/signup", (req, res) => {
  return res.render("signup", { user: req.user });
});
// Google登入
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
// 註冊會員資料傳送 & 確認
router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  // 確認密碼長度
  if (password.length < 8) {
    req.flash("error_msg", "密碼長度過短，至少需要8個數字或英文字。");
    return res.redirect("/auth/signup");
  }

  // 確認信箱是否被註冊過
  const foundEmail = await User.findOne({ email }).exec();
  if (foundEmail) {
    req.flash(
      "error_msg",
      "信箱已經被註冊。請使用另一個信箱，或者嘗試使用此信箱登入系統"
    );
    return res.redirect("/auth/signup");
  }
  // 密碼加密
  let hashedPassword = await bcrypt.hash(password, 12);
  let newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  req.flash("success_msg", "恭喜註冊成功! 現在可以登入系統了!");
  return res.redirect("/auth/login");
});
// 會員登入成功，重新導向
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "登入失敗。帳號或密碼不正確。",
  }),
  (req, res) => {
    return res.redirect("/profile");
  }
);
// Google登入成功，重新導向
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log("進入redirect區域");
  return res.redirect("/profile");
});

module.exports = router;
