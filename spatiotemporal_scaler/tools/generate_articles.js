const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'content', 'articles');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const date = '2026-09-13T00:00:00Z';

function spaceUnit(i){
  return i >= 6 ? 'ly' : 'km';
}

for(let s=0;s<=8;s++){
  for(let t=0;t<=20;t++){
    const slug = `s${s}_t${t}`;
    const filename = `${date.slice(0,10)}-${slug}.md`;
    const filepath = path.join(outDir, filename);
    const content = `---\ntitle: "Space ${s} / Time ${t}"\ndate: "${date}"\nslug: "${slug}"\nsummary: "プレースホルダ: space_index=${s}, time_index=${t}"\nauthor: "未設定"\nspace_index: ${s}\nspace_unit: "${spaceUnit(s)}"\ntime_index: ${t}\npublished: true\n---\n\n# プレースホルダ記事 (space_index=${s}, time_index=${t})\n\nこのファイルはスライダー位置 space_index=${s}, time_index=${t} のプレースホルダです。\nスライダー操作で表示が入れ替わっていることがわかるよう、位置情報を明記しています。\n本文は後で手動で編集してください。\n`;
    fs.writeFileSync(filepath, content, 'utf8');
  }
}

console.log('Generated 189 placeholder articles in', outDir);
