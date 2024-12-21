const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
require("./config/passport");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const methodOverride = require("method-override");

// 連結MongoDB
mongoose
  // .connect(process.env.MONGODB_CONNECTION)
  .connect("mongodb://localhost:27017/exampleDB")
  .then(() => {
    console.log("Connecting to mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

// 設定Middlewares以及排版引擎
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(methodOverride("_method"));

app.use(function (req, res, next) {
  // 這個中間件會呼叫每個請求
  // 檢查了請求的查詢屬性
  // 如果 _method 存在
  // 那我們知道，客戶端需要呼叫 DELETE 請求
  if (req.query._method == "DELETE") {
    // 改變原來的method
    // 進入 DELETE 方法
    req.method = "DELETE";
    // 並將請求的 url 設定為 req.path 路徑
    req.url = req.path;
  }
  next();
});
// 設定routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.get("/about", (req, res) => {
  return res.render("about", { user: req.user });
});
app.get("/", (req, res) => {
  return res.render("index", { user: req.user });
});

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
