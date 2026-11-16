import type { Locale } from '../data/site';

// Nội dung hai ngôn ngữ cho các trang song ngữ (trang chủ, sản phẩm, liên hệ).
// Mỗi trang có title (<60 ký tự) và description (<160 ký tự). Các [..] là chỗ cần xác nhận/điền.
export const T = {
  vi: {
    nav: { home: 'Trang chủ', products: 'Sản phẩm', news: 'Tin tức', contact: 'Liên hệ' },
    otherLang: 'English',
    call: 'Gọi ngay',
    home: {
      title: 'Két sắt Neko Safe chính hãng, giao tận nơi toàn quốc',
      description: 'Mua két sắt Neko Safe điện tử, vân tay, mini và gia đình. Xem thông số, tư vấn miễn phí qua hotline, giao tận nơi toàn quốc.',
      eyebrow: 'Đại lý Neko Safe bán online',
      h1: 'Két sắt Neko Safe cho gia đình, giao tận nơi',
      lead: 'Từ két mini 6 kg đến két vân tay 40 kg. Xem thông số rõ ràng, được tư vấn chọn đúng cỡ, đặt hàng qua điện thoại và nhận két tại nhà.',
      cta: 'Xem tất cả két sắt',
      contactCta: 'Gọi tư vấn miễn phí',
      trust: [
        { h: 'Giao tận nơi', p: 'Toàn quốc, [thời gian và phí giao]' },
        { h: 'Tư vấn miễn phí', p: 'Chọn đúng cỡ, đúng loại khóa' },
        { h: 'Bảo hành [..] tháng', p: '[Bảo hành tại nhà / gửi hãng]' },
        { h: 'Đặt hàng dễ', p: 'Gọi hoặc nhắn, nhận hàng rồi thanh toán [COD]' },
      ],
      catsTitle: 'Chọn két theo nhu cầu',
      cats: [
        { k: 'mini', h: 'Két mini', p: 'Giấy tờ, trang sức. Nhỏ gọn, để trong tủ.' },
        { k: 'gia-dinh', h: 'Két gia đình', p: 'Vàng, tiền mặt, hồ sơ. Khóa điện tử.' },
        { k: 'van-tay', h: 'Két vân tay', p: 'Mở nhanh, cả nhà dùng chung.' },
      ],
      featured: 'Mẫu được quan tâm',
      seeAll: 'Xem tất cả',
      whyTitle: 'Vì sao chọn dòng Neko Safe',
      why: [
        { h: '10 mẫu, nhiều kích thước', p: 'Từ 6 kg đến 40 kg, dễ chọn đúng cỡ cho giấy tờ, vàng hay hồ sơ.' },
        { h: 'Điện tử và vân tay', p: 'Bấm mã quen thuộc hoặc mở bằng vân tay, tùy thói quen của gia đình.' },
        { h: 'Nhiều màu sắc', p: 'Đen, trắng, đỏ, xanh, hồng, nâu để hợp với không gian nhà bạn.' },
        { h: 'Có người tư vấn thật', p: 'Hotline giải đáp trước khi mua, hướng dẫn dùng sau khi nhận.' },
      ],
      stepsTitle: 'Đặt mua trong 3 bước',
      steps: [
        { h: 'Chọn mẫu', p: 'Xem thông số và chọn két phù hợp, hoặc gọi hotline để được tư vấn.' },
        { h: 'Xác nhận đơn', p: 'Gọi hoặc nhắn tên, địa chỉ, số điện thoại. Chúng tôi xác nhận giá và thời gian giao.' },
        { h: 'Nhận và thanh toán', p: '[Nhận két tại nhà, kiểm tra rồi thanh toán / chuyển khoản trước].' },
      ],
      newsTitle: 'Tin tức và kinh nghiệm chọn két',
      faqTitle: 'Câu hỏi thường gặp',
      faq: [
        { q: 'Két sắt Neko Safe có chống cháy không?', a: 'Các mẫu mini và gia đình phục vụ chống trộm, cất giấy tờ và tài sản nhỏ. Khả năng chống cháy khác nhau theo mẫu, vui lòng hỏi hotline về từng mẫu cụ thể trước khi mua nếu bạn cần.' },
        { q: 'Hết pin thì mở két bằng cách nào?', a: 'Két điện tử thường có chìa cơ hoặc cổng cấp nguồn khẩn cấp. Hãy cất chìa dự phòng ở nơi khác và xem hướng dẫn kèm theo từng mẫu.' },
        { q: 'Két mini có bị khiêng đi không?', a: 'Két nhẹ có thể bị khiêng nếu không cố định. Nên bắt vít vào sàn hoặc thành tủ, hoặc chọn mẫu nặng hơn như NS60 trở lên.' },
        { q: 'Bao lâu thì nhận được hàng?', a: '[Điền thời gian giao nội thành và đi tỉnh.]' },
        { q: 'Thanh toán như thế nào?', a: '[Điền: thanh toán khi nhận hàng (COD) và/hoặc chuyển khoản.] Xem chi tiết ở trang Hình thức thanh toán.' },
      ],
      band: 'Chưa biết chọn két nào?',
      bandP: 'Cho chúng tôi biết bạn cất gì và đặt ở đâu, chúng tôi gợi ý mẫu phù hợp.',
    },
    products: {
      title: 'Danh mục két sắt Neko Safe: điện tử, vân tay, mini',
      description: 'Tất cả mẫu két sắt Neko Safe NS20 đến NS100FE: cân nặng, kích thước, loại khóa, màu sắc. Lọc theo két mini, gia đình, vân tay.',
      h1: 'Két sắt Neko Safe',
      all: 'Tất cả',
      sort: 'Sắp xếp',
      sortOpts: { def: 'Mặc định', wa: 'Nhẹ đến nặng', wd: 'Nặng đến nhẹ', n: 'Tên A-Z' },
      contactPrice: 'Liên hệ báo giá',
      detail: 'Xem chi tiết',
      weight: 'Nặng',
      size: 'Kích thước',
      count: 'mẫu',
    },
    contact: {
      title: 'Liên hệ đặt mua két sắt Neko Safe, nhận báo giá',
      description: 'Gọi hotline 0343.989.989 hoặc nhắn Zalo 0918.008.883 để được tư vấn và báo giá két sắt Neko Safe, giao tận nơi toàn quốc.',
      h1: 'Liên hệ đặt mua và tư vấn',
      lead: 'Gọi hotline, hoặc cho chúng tôi biết nhu cầu (cất gì, đặt ở đâu, ngân sách). Chúng tôi phản hồi trong ngày làm việc.',
      email: 'Email',
      hours: 'Giờ làm việc: [8:00 - 21:00 hàng ngày]',
    },
  },
  en: {
    nav: { home: 'Home', products: 'Safes', news: 'News', contact: 'Contact' },
    otherLang: 'Tiếng Việt',
    call: 'Call now',
    home: {
      title: 'Buy Neko Safe Safes Online in Vietnam | Delivered',
      description: 'Buy Neko Safe electronic and fingerprint safes in Vietnam: mini and home models. Clear specs, free advice by phone, delivery to your door.',
      eyebrow: 'Neko Safe online dealer in Vietnam',
      h1: 'Neko Safe safes, delivered to your door in Vietnam',
      lead: 'From a 6 kg mini safe to a 40 kg fingerprint safe. Clear specs, help choosing the right size, order by phone and receive at home.',
      cta: 'Browse all safes',
      contactCta: 'Call for free advice',
      trust: [
        { h: 'Door-to-door delivery', p: 'Nationwide, [lead time and fee]' },
        { h: 'Free advice', p: 'Pick the right size and lock' },
        { h: '[..] months warranty', p: '[On-site / return to maker]' },
        { h: 'Easy ordering', p: 'Call or message, pay [on delivery]' },
      ],
      catsTitle: 'Choose by need',
      cats: [
        { k: 'mini', h: 'Mini safes', p: 'Documents and jewelry. Compact.' },
        { k: 'gia-dinh', h: 'Home safes', p: 'Gold, cash, files. Electronic lock.' },
        { k: 'van-tay', h: 'Fingerprint safes', p: 'Quick open, shared by family.' },
      ],
      featured: 'Popular models',
      seeAll: 'See all',
      whyTitle: 'Why the Neko Safe range',
      why: [
        { h: '10 models, many sizes', p: 'From 6 kg to 40 kg, easy to match to documents, gold or files.' },
        { h: 'Electronic and fingerprint', p: 'Familiar keypad or fingerprint, to suit your household.' },
        { h: 'Many colors', p: 'Black, white, red, blue, pink and brown to match your home.' },
        { h: 'Real people to advise', p: 'Hotline help before you buy and after you receive.' },
      ],
      stepsTitle: 'Order in 3 steps',
      steps: [
        { h: 'Pick a model', p: 'Check the specs, or call the hotline for advice.' },
        { h: 'Confirm your order', p: 'Call or message your name, address and phone. We confirm price and delivery time.' },
        { h: 'Receive and pay', p: '[Receive at home, inspect, then pay / pay by transfer first].' },
      ],
      newsTitle: 'News and buying tips',
      faqTitle: 'FAQ',
      faq: [
        { q: 'Are Neko Safe safes fire-resistant?', a: 'The mini and home models are mainly for theft protection and storing documents and small valuables. Fire resistance varies by model, so please ask the hotline about a specific model if you need it.' },
        { q: 'How do I open the safe if the battery dies?', a: 'Electronic safes usually have a backup key or emergency power contacts. Keep the spare key elsewhere and follow the manual for your model.' },
        { q: 'Can a mini safe be carried away?', a: 'A light safe can be carried off if not fixed down. Bolt it to the floor or cabinet, or choose a heavier model such as NS60 and above.' },
        { q: 'How long does delivery take?', a: '[Fill in lead time for cities and provinces.]' },
        { q: 'How do I pay?', a: '[Fill in: cash on delivery and/or bank transfer.] See the payment page for details (Vietnamese).' },
      ],
      band: 'Not sure which safe to choose?',
      bandP: 'Tell us what you store and where it will go, and we will suggest a model.',
    },
    products: {
      title: 'Neko Safe Safes for Sale in Vietnam: Electronic, Fingerprint',
      description: 'All Neko Safe models NS20 to NS100FE: weight, size, lock type and colors. Filter by mini, home and fingerprint safes.',
      h1: 'Neko Safe safes',
      all: 'All',
      sort: 'Sort',
      sortOpts: { def: 'Default', wa: 'Light to heavy', wd: 'Heavy to light', n: 'Name A-Z' },
      contactPrice: 'Contact for price',
      detail: 'View details',
      weight: 'Weight',
      size: 'Size',
      count: 'models',
    },
    contact: {
      title: 'Contact Us to Buy a Neko Safe in Vietnam',
      description: 'Call 0343.989.989 or message Zalo 0918.008.883 for advice and a quote on Neko Safe safes, delivered to your door across Vietnam.',
      h1: 'Contact and order',
      lead: 'Call the hotline, or tell us what you need (what you store, where it goes, budget). We reply within one business day.',
      email: 'Email',
      hours: 'Hours: [8:00 - 21:00 daily]',
    },
  },
} satisfies Record<Locale, unknown>;

export type Page = 'home' | 'products' | 'contact';

const SLUGS: Record<Locale, Record<Page, string>> = {
  vi: { home: '', products: 'san-pham/', contact: 'lien-he/' },
  en: { home: '', products: 'safes/', contact: 'contact/' },
};

export function pathFor(locale: Locale, page: Page): string {
  return (locale === 'vi' ? '/' : '/en/') + SLUGS[locale][page];
}

export const VI_PAGES = {
  news: '/tin-tuc/',
  order: '/dat-hang/',
  privacy: '/chinh-sach/bao-mat/',
  payment: '/chinh-sach/thanh-toan/',
  shipping: '/chinh-sach/van-chuyen/',
  warranty: '/chinh-sach/bao-hanh/',
  returns: '/chinh-sach/doi-tra/',
};
