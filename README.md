# Google登入與本地登入系統
1. 本專案Server框架為Experss.js
2. OAth2.0與Passport.js實現第三方授權登入(本專案為Google登入)
同時實現本地登入系統
3. MongoDB儲存會員資料
4. EJS製作出 主頁面/註冊/登入/個人頁面/發布文章等頁面
5. 會員帳號密碼(auth-routes)相關 RESTful API  
   1. 註冊會員 GET "/signup"
   2. 登入會員 GET "/login"
   3. 登出會員 GET "/logout"
   4. Google登入 GET "/google"
   5. 註冊資料傳送 & 確認 POST "/signup"
   6. 本地登入成功，重新導向 POST "/login"
   7. Google登入成功，重新導向 GET "/google/redirect"  
6. 會員資料(profile-routes)相關 RESTful API  
   1. 確認使用者的身分 GET "/"
   2. 發布文章頁面 GET "/post"
   3. 發布文章 POST "/post"
   4. 進入編輯文章 GET "/{post_id}/edit"
   5.  編輯文章 PUT "/{post_id}"
   6.  刪除文章 DELETE "/{post_id}"
7. 本專案使用[Render](https://render.com/)網站進行部署，前往[Google登入與本地登入系統](https://loginwebsite-fciz.onrender.com)  
## 因Render網站的決策，本專案的Server不使用時會進入睡眠，所以在進入本網站時會需要等待30秒以上。
## 問題
HTML form 預設只能使用 GET/POST method !!  
1. 安裝method-override套件可以解決HTML form無法傳送PUT/PATCH/DELETE的問題
2. 在設定所有route之前加入`app.use(methodOverride("_method"))`，讓每一筆請求都會先以 methodOverride 進行前置處理
