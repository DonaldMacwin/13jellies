const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'content', 'articles');
const files = fs.readdirSync(dir).filter(f => /^2026-09-13-s\d+_t\d+\.md$/.test(f));
let updated = 0;

for (const f of files) {
  const m = f.match(/s(\d+)_t(\d+)\.md$/);
  if (!m) continue;
  const s = Number(m[1]);
  const t = Number(m[2]);
  const p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');

  // Replace title
  c = c.replace(/title:\s*"[^"]*"/, `title: "Space ${s} / Time ${t}"`);
  // Replace slug
  c = c.replace(/slug:\s*"[^"]*"/, `slug: "s${s}_t${t}"`);
  // Replace space_index
  if (/space_index:\s*\d+/.test(c)) {
    c = c.replace(/space_index:\s*\d+/, `space_index: ${s}`);
  } else {
    c = c.replace(/(author:[^\n]*\n)/, `$1space_index: ${s}\n`);
  }
  // Replace space_unit (keep existing)
  // Replace time_index
  if (/time_index:\s*\d+/.test(c)) {
    c = c.replace(/time_index:\s*\d+/, `time_index: ${t}`);
  } else {
    c = c.replace(/(space_index:[^\n]*\n)/, `$1time_index: ${t}\n`);
  }

  // Replace heading line
  c = c.replace(/#\s+プレースホルダ記事\s+\(space_index=\d+, time_index=\d+\)/, `# プレースホルダ記事 (space_index=${s}, time_index=${t})`);
  // Replace any inline mentions like 'space_index=5, time_index=10' in summary or body
  c = c.replace(/space_index=\d+/g, `space_index=${s}`);
  c = c.replace(/time_index=\d+/g, `time_index=${t}`);

  fs.writeFileSync(p, c, 'utf8');
  updated++;
}

console.log(`Updated ${updated} files`);
