# Google登入與本地登入系統
1. 本專案Server框架為Experss.js
2. OAth2.0與Passport.js實現第三方授權登入(本專案為Google登入)
同時實現本地登入系統
3. MongoDB儲存會員資料
4. EJS製作出 主頁面/註冊/登入/個人頁面/發布文章等畫面
5. 會員帳號密碼(auth-routes)相關 RESTful API  
   5.1 註冊會員 GET "/signup"  
   5.2 登入會員 GET "/login"  
   5.3 登出會員 GET "/logout"  
   5.4 Google登入 GET "/google"  
   5.5 註冊資料傳送 & 確認 POST "/signup"  
   5.6 本地登入成功，重新導向 POST "/login"  
   5.7 Google登入成功，重新導向 GET "/google/redirect"  
6. 會員資料(profile-routes)相關 RESTful API  
   6.1 確認使用者的身分 GET "/"  
   6.2 發布文章頁面 GET "/post"  
   6.3 發布文章 POST "/post"  
   6.4 進入編輯文章 GET "/{post_id}/edit"  
   6.5 編輯文章 PUT "/{post_id}"  
   6.6 刪除文章 DELETE "/{post_id}"  
   6.7 使用method-override套件解決HTML form無法傳送PUT/PATCH/DELETE的問題
