// Thông tin cửa hàng nằm ở settings.json. Sửa bằng trang quản trị (npm run admin) hoặc sửa file đó trực tiếp.
import settings from './settings.json' with { type: 'json' };

const tel = (display: string) => {
  const d = display.replace(/\D/g, '');
  return d.startsWith('84') ? `+${d}` : `+84${d.replace(/^0/, '')}`;
};
const zaloDigits = String(settings.zalo || '').replace(/\D/g, '');

export const SITE = {
  url: settings.url.replace(/\/+$/, ''),
  indexable: settings.indexable, // false = đang làm tạm: chặn Google lập chỉ mục
  name: settings.name,
  brand: settings.brand,
  email: settings.email,
  leadEmail: settings.leadEmail, // đơn đặt hàng và yêu cầu tư vấn gửi về đây (qua FormSubmit)
  zalo: zaloDigits,
  zaloDisplay: settings.zalo,
  phones: settings.phones.filter(Boolean).map((display: string) => ({ display, tel: tel(display) })),
  address: settings.address,
  logo: '/favicon.svg',
  ogImage: settings.ogImage,
  sameAs: settings.sameAs as string[],
};

// Tiếng Việt là ngôn ngữ mặc định (URL gốc /), tiếng Anh ở /en/
export const LOCALES = ['vi', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const HTML_LANG: Record<Locale, string> = { vi: 'vi-VN', en: 'en-US' };
