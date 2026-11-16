// Nội dung các trang chính sách nằm ở policies.json (BẢN NHÁP: điền các mục [..] bằng thông tin thật).
// {{hotline}} và {{zalo}} tự thay bằng số trong settings.json.
import raw from './policies.json' with { type: 'json' };
import { SITE } from './site';

type Policy = { title: string; description: string; h1: string; blocks: { h: string; items: string[] }[] };

const fill = (s: string) => s.replaceAll('{{hotline}}', SITE.phones[0]?.display ?? '').replaceAll('{{zalo}}', SITE.zaloDisplay);

export const PAGES: Record<string, Policy> = Object.fromEntries(
  Object.entries(raw as Record<string, Policy>).map(([k, v]) => [
    k,
    { ...v, blocks: v.blocks.map((b) => ({ h: b.h, items: b.items.map(fill) })) },
  ]),
);
