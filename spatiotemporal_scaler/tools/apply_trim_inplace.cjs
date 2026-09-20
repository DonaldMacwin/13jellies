const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'content', 'articles');
const datePrefix = '2026-09-13-';

const files = fs.readdirSync(dir).filter(f => /^2026-09-13-s\d+_t\d+\.md$/.test(f));

for (const f of files) {
  const m = f.match(/s(\d+)_t(\d+)\.md$/);
  if (!m) continue;
  const s = Number(m[1]);
  const t = Number(m[2]);

  if (s === 4) {
    // remove s4
    fs.unlinkSync(path.join(dir, f));
    continue;
  }

  let newS = s;
  if (s >= 5) newS = s - 1;

  const oldPath = path.join(dir, f);
  const newName = `${datePrefix}s${newS}_t${t}.md`;
  const newPath = path.join(dir, newName);

  let content = fs.readFileSync(oldPath, 'utf8');
  content = content.replace(new RegExp(`slug:\s*"s${s}_t${t}"`), `slug: "s${newS}_t${t}"`);
  content = content.replace(new RegExp(`space_index:\s*${s}`), `space_index: ${newS}`);
  content = content.replace(new RegExp(`title:\s*"Space ${s} / Time ${t}"`), `title: "Space ${newS} / Time ${t}"`);
  content = content.replace(new RegExp(`# プレースホルダ記事 \(space_index=${s}, time_index=${t}\)`), `# プレースホルダ記事 (space_index=${newS}, time_index=${t})`);

  fs.writeFileSync(newPath, content, 'utf8');
  if (newPath !== oldPath) fs.unlinkSync(oldPath);
}

console.log('Applied in-place trim: removed s4 and shifted s5..s8 down to s4..s7');
