// Bài tin tức nằm ở articles.json. Thêm, sửa, xóa bằng trang quản trị (npm run admin).
// Khối nội dung: h2 | p | ul | compare (bảng so sánh tự lấy từ danh mục sản phẩm) | cta
import list from './articles.json' with { type: 'json' };

export type Block =
  | { t: 'h2'; v: string }
  | { t: 'p'; v: string }
  | { t: 'ul'; v: string[] }
  | { t: 'compare' }
  | { t: 'cta' };

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  readMin: number;
  tag: string;
  blocks: Block[];
}

// mới nhất lên đầu
export const ARTICLES: Article[] = (list as Article[]).slice().sort((a, b) => b.date.localeCompare(a.date));
