const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'content', 'articles');
const missing = [];
const notPublished = [];

for (let s = 0; s <= 8; s++) {
  for (let t = 0; t <= 20; t++) {
    const fname = `2026-09-13-s${s}_t${t}.md`;
    const fp = path.join(dir, fname);
    if (!fs.existsSync(fp)) missing.push(fname);
    else {
      const c = fs.readFileSync(fp, 'utf8');
      if (!/published:\s*true/.test(c)) notPublished.push(fname);
    }
  }
}

const allMd = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
console.log('expected', 9 * 21, 'md_in_folder', allMd.length);
console.log('missing', missing.length, 'notPublished', notPublished.length);
if (missing.length) console.log('Missing files:\n' + missing.join('\n'));
if (notPublished.length) console.log('Not published:\n' + notPublished.join('\n'));
