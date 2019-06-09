# Phase 2
## _Cài đặt toàn bộ hệ thống website của Báo Điện Tử TH16-News(TNT News)_
## Website chưa cài đặt online
## URL mặc định (localhost:3000)
## Trang chủ & Phân hệ khách vãng lai & phân hệ subriber:
- Trang chủ(/)
- Xem danh sách bài viết theo chuyên mục(/category/:id)
- Xem chi tiết bài viết(/post/:id)
- Đăng nhập (/login)
- Đăng ký (/signup)
## Phân hệ phóng viên:
+ Xem bài mình viết theo tiêu chí:
  + tất cả bài viết (/writer/postlist/all)
  + đã xuất bản (/writer/postlist/published)
  + đã duyệt và chờ xuất bản (/writer/postlist/approved)
  + bị từ chối (/writer/postlist/denied)
  + đang chờ duyệt - DRAFT (/writer/postlist/wait)
## Phân hệ biên tập viên:
+ Xem các bài viết DRAFT thuộc chuyên mục mình chịu trách nhiệm (/editor/postlist)
--------------------------------------------------------
# Phase 1
## _Hệ thống trang tĩnh của Báo Điện Tử TH16-News(TNT News)_
## Website có thể xem tại: [http://tntnewsstatic.herokuapp.com](http://tntnewsstatic.herokuapp.com)
## Trang chủ & Phân hệ khách vãng lai & phân hệ subriber:
- Trang chủ(index.html)
- Xem danh sách bài viết(catgories-post.html)
- Xem chi tiết bài viết(single-post.html)
- Đăng nhập (login.html)
- Đăng ký (signup.html)
## Phân hệ Phóng viên: 
- Đăng bài viết, Hiệu chỉnh bài viết (Module/Writer/add-new-post.html)
- Xem danh sách bài viết (Module/Writer/components-blog-posts.html)
- Bản nháp (Module/Writer/index.html)
- Thông tin tài khoản (Module/Writer/user-profile-lite.html)
- Danh sách bài viết được duyệt và từ chối (Module/Writer/form-components.html)
## Phân hệ Biên tập viên:
- Danh sách bài viết mới nhất (Module/Editor/index.html)
- Xem chi tiết bài viết (Module/Editor/detail-post.html)
- Duyệt và từ chối bài viết (Module/Editor/components-blog-posts.html)
- Thông tin tài khoản (Module/Editor/user-profile-lite.html)
- Chỉnh sửa bài viết (Module/Editor/add-new-post.html)
