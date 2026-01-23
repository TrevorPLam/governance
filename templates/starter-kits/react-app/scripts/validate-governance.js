#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  '.repo/repo.manifest.yaml',
  '.repo/README.md',
  'package.json',
  'README.md',
  'src/App.tsx',
  'vite.config.ts'
];

const REQUIRED_SCRIPTS = [
  'dev',
  'build',
  'test',
  'lint',
  'governance:validate'
];

let errors = 0;

console.log('🔍 Validating governance compliance...\n');

console.log('Checking required files...');
REQUIRED_FILES.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} - MISSING`);
    errors++;
  }
});

console.log('\nChecking required scripts...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
REQUIRED_SCRIPTS.forEach(script => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`  ✓ ${script}`);
  } else {
    console.log(`  ✗ ${script} - MISSING`);
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
