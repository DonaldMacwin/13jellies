const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'content', 'articles');
const datePrefix = '2026-09-13-';

// Shift s5..s8 down to s4..s7 (process high->low to avoid collisions)
for (let s = 8; s >= 5; s--) {
  for (let t = 0; t <= 20; t++) {
    const oldName = `${datePrefix}s${s}_t${t}.md`;
    const oldPath = path.join(dir, oldName);
    if (!fs.existsSync(oldPath)) continue;

    const newS = s - 1;
    const newName = `${datePrefix}s${newS}_t${t}.md`;
    const newPath = path.join(dir, newName);

    let content = fs.readFileSync(oldPath, 'utf8');
    // Update slug
    content = content.replace(new RegExp(`slug:\s*"s${s}_t${t}"`), `slug: "s${newS}_t${t}"`);
    // Update space_index
    content = content.replace(new RegExp(`space_index:\s*${s}`), `space_index: ${newS}`);
    // Update title
    content = content.replace(new RegExp(`title:\s*"Space ${s} / Time ${t}"`), `title: "Space ${newS} / Time ${t}"`);
    // Update heading
    content = content.replace(new RegExp(`# プレースホルダ記事 \(space_index=${s}, time_index=${t}\)`), `# プレースホルダ記事 (space_index=${newS}, time_index=${t})`);

    fs.writeFileSync(newPath, content, 'utf8');
    fs.unlinkSync(oldPath);
  }
}

// Remove any remaining original s4 files (user requested s4 omitted)
for (let t = 0; t <= 20; t++) {
  const p = path.join(dir, `${datePrefix}s4_t${t}.md`);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log('Shift complete.');
