# Website bán két sắt Neko Safe online (bản tạm)

Astro, site tĩnh, tiếng Việt mặc định (`/`), tiếng Anh (`/en/`). Giao diện dùng được trên điện thoại và máy tính.

## Chạy thử
```
npm install
npm run dev      # xem tại http://localhost:4321
npm run build    # ra thư mục dist/
```

## Sửa ở đâu
| Việc | File |
|---|---|
| Tên cửa hàng, hotline, Zalo, email, tên miền, mạng xã hội của bạn (`sameAs`) | `src/data/site.ts` |
| Mẫu két (giá, ảnh, thông số, màu) | `src/data/products.ts` |
| Bài tin tức, đánh giá | `src/data/articles.ts` (thêm 1 mục là có bài mới) |
| Chính sách thanh toán, vận chuyển, bảo hành, đổi trả | `src/data/policies.ts` (bản nháp, điền các mục `[..]`) |
| Chữ trang chủ, FAQ, tiêu đề SEO (vi/en) | `src/i18n/content.ts` |
| Màu sắc, giao diện | `src/styles/global.css` |

Ảnh sản phẩm: đặt vào `public/products/` rồi điền `image: '/products/ns20.jpg'` trong `products.ts`. Chưa có ảnh thì dùng hình minh họa.

## Trước khi mở cho Google
1. Đối chiếu thông số mẫu (cân nặng, kích thước, màu) với catalogue chính hãng.
2. Điền giá, bảo hành, phí và thời gian giao, thông tin chuyển khoản: mọi chỗ còn `[..]`.
3. Sửa `url` thành tên miền thật, thêm ảnh chia sẻ `public/og-default.png` (1200x630).
4. Đổi `indexable: false` thành `true` trong `site.ts`, build lại, đưa lên host, gửi `/sitemap-index.xml` vào Google Search Console.

## Đang làm tạm
`indexable: false` nên mọi trang có `noindex` và `robots.txt` chặn toàn bộ. Đừng bật `true` khi còn chữ giữ chỗ.
