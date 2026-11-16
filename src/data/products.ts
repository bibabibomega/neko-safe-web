// Danh mục sản phẩm nằm ở products.json. Thêm, sửa, xóa bằng trang quản trị (npm run admin) hoặc sửa file đó.
import list from './products.json' with { type: 'json' };

export type Group = 'mini' | 'gia-dinh' | 'van-tay';

export interface Product {
  slug: string;
  code: string;
  brand: string;
  name: string; // để trống thì tự đặt "Két sắt {brand} {code}"
  group: Group;
  lock: string;
  weight: number; // kg
  dims: number[]; // dài x rộng x cao, mm
  colors: string[];
  price: number; // VND, 0 = "Liên hệ báo giá"
  oldPrice: number;
  image: string; // đường dẫn ảnh, ví dụ /products/ns20.jpg. Trống = hình minh họa
  tagline: string;
  hidden?: boolean;
}

export const PRODUCTS: Product[] = (list as Product[]).filter((p) => !p.hidden);

export const GROUP_LABEL: Record<Group, string> = { mini: 'Két mini', 'gia-dinh': 'Két gia đình', 'van-tay': 'Két vân tay' };
export const GROUP_LABEL_EN: Record<Group, string> = { mini: 'Mini safes', 'gia-dinh': 'Home safes', 'van-tay': 'Fingerprint safes' };

export const nameVi = (p: Product) => p.name || `Két sắt ${p.brand} ${p.code}`;
export const nameEn = (p: Product) => p.name || `${p.brand} ${p.code} ${p.group === 'van-tay' ? 'fingerprint safe' : 'electronic safe'}`;
export const dimText = (p: Product) => `${p.dims[0]} x ${p.dims[1]} x ${p.dims[2]} mm`;
export const money = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + ' ₫';
