const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRelative = 'spatiotemporal_scaler/content/articles';
const dir = path.join(__dirname, '..', 'content', 'articles');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = path.join(__dirname, '..', 'content', `articles_backup_${timestamp}`);

if (!fs.existsSync(dir)) {
  console.error('Articles directory not found:', dir);
  process.exit(1);
}

fs.mkdirSync(backupDir, { recursive: true });
try {
  fs.cpSync(dir, backupDir, { recursive: true, force: true });
  console.log('Backed up articles to', backupDir);
} catch (e) {
  console.error('Backup failed', e);
  process.exit(1);
}

try {
  const out = execSync(`git rev-parse --is-inside-work-tree`, { encoding: 'utf8' }).trim();
  if (out !== 'true') {
    console.warn('Not inside a git repo; skipping git restore');
    process.exit(0);
  }
} catch (e) {
  console.warn('Git not available or not a repo; skipping git restore');
  process.exit(0);
}

try {
  execSync(`git checkout -- ${repoRelative}`, { stdio: 'inherit' });
  console.log('Restored articles from git HEAD');
} catch (e) {
  console.error('git checkout failed', e.message);
  process.exit(1);
}
