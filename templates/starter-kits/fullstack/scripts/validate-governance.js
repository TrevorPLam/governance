#!/usr/bin/env node
const fs = require('fs');

const REQUIRED_FILES = [
  '.repo/repo.manifest.yaml',
  'package.json',
  'README.md',
  'client/package.json',
  'server/package.json',
  'client/src/App.tsx',
  'server/src/server.ts'
];

let errors = 0;
console.log('🔍 Validating governance compliance...\n');
REQUIRED_FILES.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} - MISSING`);
    errors++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(errors === 0 ? '✅ All governance checks passed!' : `❌ ${errors} check(s) failed!`);
process.exit(errors === 0 ? 0 : 1);
