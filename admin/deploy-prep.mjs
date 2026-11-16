// Đóng gói website để đưa lên GitHub Pages (địa chỉ dạng https://<tài-khoản>.github.io/<tên-kho>/).
// Dùng:  node admin/deploy-prep.mjs neko-safe-web
// Kết quả: thư mục .deploy/<tên-kho>/ (đã sửa mọi link bắt đầu bằng "/" thành "/<tên-kho>/").
import { spawnSync } from 'node:child_process';
import { cpSync, rmSync, readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const repo = process.argv[2];
if (!repo || !/^[\w.-]+$/.test(repo)) { console.error('Thiếu tên kho. Ví dụ: node admin/deploy-prep.mjs neko-safe-web'); process.exit(1); }

const b = spawnSync('npm run build', { cwd: ROOT, shell: true, stdio: 'inherit' });
if (b.status !== 0) process.exit(b.status || 1);

const out = join(ROOT, '.deploy', repo);
rmSync(join(ROOT, '.deploy'), { recursive: true, force: true });
cpSync(join(ROOT, 'dist'), out, { recursive: true });

let files = 0;
(function walk(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) {
      const s = readFileSync(p, 'utf8').replace(/\b(href|src|action)="\/(?!\/)/g, `$1="/${repo}/`);
      writeFileSync(p, s); files++;
    }
  }
})(out);
writeFileSync(join(out, '.nojekyll'), '');
if (existsSync(join(out, 'index.html'))) cpSync(join(out, 'index.html'), join(out, '404.html'));
console.log(`Đã đóng gói ${files} trang vào .deploy/${repo}/`);
