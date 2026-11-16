// Trang quản trị chạy trên MÁY BẠN (127.0.0.1:4400), không phải một phần của website đưa lên mạng.
// Sửa các file trong src/data/*.json, tải ảnh vào public/products/, và build lại website để xem thử.
import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, copyFileSync, readdirSync, unlinkSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'src', 'data');
const BACKUP = join(DATA, '.backup');
const IMG = join(ROOT, 'public', 'products');
const PORT = Number(process.env.ADMIN_PORT || 4400);
const PREVIEW = 4399;
const NAMES = ['settings', 'products', 'articles', 'policies'];
const GROUPS = ['mini', 'gia-dinh', 'van-tay'];
const HOSTS = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`]);

const readJson = (n) => JSON.parse(readFileSync(join(DATA, `${n}.json`), 'utf8'));
const isStr = (v) => typeof v === 'string';
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

function validate(name, d) {
  const bad = (m) => { throw new Error(m); };
  if (name === 'settings') {
    if (!isStr(d.name) || !d.name.trim()) bad('Tên cửa hàng không được để trống.');
    if (!/^https?:\/\/[^\s/]+/.test(d.url)) bad('Tên miền phải bắt đầu bằng https://');
    if (!Array.isArray(d.phones) || d.phones.some((p) => !/^[\d\s.+()-]{8,}$/.test(p))) bad('Số điện thoại hotline chưa đúng.');
    if (d.zalo && !/^[\d\s.+()-]{8,}$/.test(d.zalo)) bad('Số Zalo chưa đúng.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.leadEmail)) bad('Email nhận đơn hàng chưa đúng.');
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) bad('Email hiển thị trên web chưa đúng.');
    if (typeof d.indexable !== 'boolean') bad('Thiếu cài đặt cho Google.');
  } else if (name === 'products') {
    if (!Array.isArray(d)) bad('Dữ liệu sản phẩm sai định dạng.');
    const seen = new Set();
    d.forEach((p, i) => {
      const at = `Sản phẩm #${i + 1}${p && p.code ? ' (' + p.code + ')' : ''}: `;
      if (!p || !isStr(p.code) || !p.code.trim()) bad(at + 'thiếu mã mẫu.');
      if (!isStr(p.slug) || !/^[a-z0-9-]+$/.test(p.slug)) bad(at + 'đường dẫn (slug) chỉ gồm chữ thường, số và dấu gạch.');
      if (seen.has(p.slug)) bad(at + 'đường dẫn bị trùng với mẫu khác.');
      seen.add(p.slug);
      if (!GROUPS.includes(p.group)) bad(at + 'nhóm không hợp lệ.');
      if (!isNum(p.weight) || p.weight <= 0) bad(at + 'cân nặng phải là số lớn hơn 0.');
      if (!Array.isArray(p.dims) || p.dims.length !== 3 || !p.dims.every((x) => isNum(x) && x > 0)) bad(at + 'kích thước cần đủ 3 số (dài, rộng, cao).');
      if (!Array.isArray(p.colors) || !p.colors.length) bad(at + 'cần ít nhất 1 màu.');
      if (!isNum(p.price) || p.price < 0 || !isNum(p.oldPrice) || p.oldPrice < 0) bad(at + 'giá phải là số, 0 nghĩa là "Liên hệ báo giá".');
      if (p.image && !/^\/products\/[\w.-]+$/.test(p.image)) bad(at + 'đường dẫn ảnh không hợp lệ.');
    });
  } else if (name === 'articles') {
    if (!Array.isArray(d)) bad('Dữ liệu bài viết sai định dạng.');
    const seen = new Set();
    d.forEach((a, i) => {
      const at = `Bài #${i + 1}: `;
      if (!isStr(a.title) || !a.title.trim()) bad(at + 'thiếu tiêu đề.');
      if (!isStr(a.slug) || !/^[a-z0-9-]+$/.test(a.slug)) bad(at + 'đường dẫn chỉ gồm chữ thường, số và dấu gạch.');
      if (seen.has(a.slug)) bad(at + 'đường dẫn bị trùng.');
      seen.add(a.slug);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date)) bad(at + 'ngày phải dạng 2026-11-16.');
      if (!Array.isArray(a.blocks)) bad(at + 'thiếu nội dung.');
      for (const b of a.blocks) if (!['h2', 'p', 'ul', 'compare', 'cta'].includes(b.t)) bad(at + 'có khối nội dung lạ.');
    });
  } else if (name === 'policies') {
    if (!d || typeof d !== 'object') bad('Dữ liệu chính sách sai định dạng.');
    for (const [k, v] of Object.entries(d)) {
      if (!/^[a-z0-9-]+$/.test(k)) bad('Tên trang chính sách không hợp lệ: ' + k);
      if (!isStr(v.title) || !isStr(v.description) || !isStr(v.h1) || !Array.isArray(v.blocks)) bad(`Trang "${k}" thiếu nội dung.`);
    }
  }
}

function save(name, data) {
  validate(name, data);
  mkdirSync(BACKUP, { recursive: true });
  const file = join(DATA, `${name}.json`);
  if (existsSync(file)) {
    copyFileSync(file, join(BACKUP, `${name}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`));
    const olds = readdirSync(BACKUP).filter((f) => f.startsWith(name + '-')).sort();
    while (olds.length > 20) unlinkSync(join(BACKUP, olds.shift()));
  }
  const tmp = file + '.tmp';
  writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n', 'utf8');
  renameSync(tmp, file);
}

function upload(filename, dataUrl) {
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || '');
  if (!m) throw new Error('Chỉ nhận ảnh JPG, PNG hoặc WEBP.');
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 6 * 1024 * 1024) throw new Error('Ảnh quá lớn (tối đa 6 MB).');
  const base = String(filename || 'anh').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'anh';
  const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
  mkdirSync(IMG, { recursive: true });
  let name = `${base}.${ext}`, i = 2;
  while (existsSync(join(IMG, name))) name = `${base}-${i++}.${ext}`;
  writeFileSync(join(IMG, name), buf);
  return `/products/${name}`;
}

let building = false;
function build() {
  return new Promise((resolve) => {
    if (building) return resolve({ ok: false, output: 'Đang cập nhật, vui lòng đợi.' });
    building = true;
    let out = '';
    const p = spawn('npm run build', { cwd: ROOT, shell: true });
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (out += d));
    p.on('close', (code) => { building = false; resolve({ ok: code === 0, output: out.replace(/\x1b\[[0-9;]*m/g, '').split('\n').filter((l) => l.trim()).slice(-14).join('\n') }); });
  });
}

const send = (res, code, body, type = 'application/json; charset=utf-8') => {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
};
const readBody = (req) => new Promise((resolve, reject) => {
  const chunks = []; let n = 0;
  req.on('data', (c) => { n += c.length; if (n > 9e6) { reject(new Error('Dữ liệu quá lớn.')); req.destroy(); } else chunks.push(c); });
  req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  req.on('error', reject);
});

const server = http.createServer(async (req, res) => {
  try {
    // chỉ cho phép truy cập từ chính máy này (chặn DNS rebinding và trang web lạ gọi vào)
    if (!HOSTS.has(req.headers.host)) return send(res, 403, { error: 'Không được phép.' });
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method !== 'GET') {
      const o = req.headers.origin;
      if (!o || !HOSTS.has(new URL(o).host)) return send(res, 403, { error: 'Không được phép.' });
    }
    if (req.method === 'GET' && url.pathname === '/') return send(res, 200, readFileSync(join(ROOT, 'admin', 'index.html')), 'text/html; charset=utf-8');
    if (req.method === 'GET' && url.pathname === '/api/all') return send(res, 200, Object.fromEntries(NAMES.map((n) => [n, readJson(n)])));
    if (req.method === 'GET' && url.pathname === '/api/status') {
      const up = await fetch(`http://localhost:${PREVIEW}/`).then((r) => r.ok).catch(() => false);
      return send(res, 200, { previewUp: up, previewUrl: `http://localhost:${PREVIEW}/`, building });
    }
    const m = /^\/api\/save\/(\w+)$/.exec(url.pathname);
    if (req.method === 'PUT' && m && NAMES.includes(m[1])) {
      save(m[1], JSON.parse(await readBody(req)));
      return send(res, 200, { ok: true });
    }
    if (req.method === 'POST' && url.pathname === '/api/upload') {
      const b = JSON.parse(await readBody(req));
      return send(res, 200, { path: upload(b.filename, b.dataUrl) });
    }
    if (req.method === 'POST' && url.pathname === '/api/build') return send(res, 200, await build());
    send(res, 404, { error: 'Không tìm thấy.' });
  } catch (e) {
    send(res, 400, { error: e.message || String(e) });
  }
});

let previewChild = null;
async function ensurePreview() {
  const up = await fetch(`http://localhost:${PREVIEW}/`).then((r) => r.ok).catch(() => false);
  if (up) return;
  if (!existsSync(join(ROOT, 'dist'))) await build();
  previewChild = spawn(`npx astro preview --port ${PREVIEW}`, { cwd: ROOT, shell: true, stdio: 'ignore' });
}

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Trang quản trị: http://localhost:${PORT}/  (nhấn Ctrl+C để tắt)`);
  await ensurePreview();
  console.log(`Website xem thử: http://localhost:${PREVIEW}/`);
});
const stop = () => { try { if (previewChild) spawn('taskkill', ['/pid', String(previewChild.pid), '/T', '/F']); } catch {} process.exit(0); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
