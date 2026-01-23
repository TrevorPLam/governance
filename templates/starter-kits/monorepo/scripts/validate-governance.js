#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  '.repo/repo.manifest.yaml',
  'package.json',
  'README.md',
  'packages/app/package.json',
  'packages/lib/package.json',
  'packages/utils/package.json'
];

let errors = 0;
console.log('🔍 Validating governance compliance...\n');
console.log('Checking required files...');
REQUIRED_FILES.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} - MISSING`);
    errors++;
  }
});

console.log('\n' + '='.repeat(50));
if (errors === 0) {
  console.log('✅ All governance checks passed!');
  process.exit(0);
} else {
  console.log(`❌ ${errors} governance check(s) failed!`);
  process.exit(1);
}
