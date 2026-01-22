#!/usr/bin/env node
/**
 * Boundary checker script
 * Validates that imports follow the defined layer architecture
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking package boundaries...\n');

// Define allowed dependencies per package
const boundaryRules = {
  'utils': {
    allowed: [],  // Platform layer - no dependencies
    forbidden: ['ui', 'web-app', 'api']
  },
  'ui': {
    allowed: ['utils'],  // Presentation layer
    forbidden: ['web-app', 'api']
  },
  'web-app': {
    allowed: ['ui', 'utils'],  // Application layer
    forbidden: ['api']  // Cannot import backend code
  },
  'api': {
    allowed: ['utils'],  // Domain/Data layer
    forbidden: ['ui', 'web-app']  // Cannot import frontend
  }
};

let violations = 0;
let checked = 0;

// Check each package
const packagesDir = 'packages';
if (!fs.existsSync(packagesDir)) {
  console.error('❌ packages/ directory not found');
  process.exit(1);
}

const packages = fs.readdirSync(packagesDir);

packages.forEach(pkg => {
  const pkgDir = path.join(packagesDir, pkg);
  const srcDir = path.join(pkgDir, 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.warn(`⚠️  No src/ directory in ${pkg}`);
    return;
  }
  
  console.log(`\n📦 Checking ${pkg}...`);
  
  const rules = boundaryRules[pkg];
  if (!rules) {
    console.warn(`⚠️  No boundary rules defined for ${pkg}`);
    return;
  }
  
  // Recursively find all source files
  function findFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findFiles(fullPath));
      } else if (item.match(/\.(ts|tsx|js|jsx)$/)) {
        files.push(fullPath);
      }
    });
    
    return files;
  }
  
  const files = findFiles(srcDir);
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    checked++;
    
    // Check for forbidden imports
    rules.forbidden.forEach(forbiddenPkg => {
      const importPattern = new RegExp(`from ['"]@governance-example/${forbiddenPkg}`, 'g');
      const matches = content.match(importPattern);
      
      if (matches) {
        console.error(`❌ VIOLATION in ${path.relative('.', file)}:`);
        console.error(`   Forbidden import: @governance-example/${forbiddenPkg}`);
        console.error(`   Rule: ${pkg} cannot import from ${forbiddenPkg}`);
        violations++;
      }
    });
  });
  
  if (violations === 0) {
    console.log(`✅ ${pkg} boundaries valid`);
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('BOUNDARY CHECK SUMMARY');
console.log('='.repeat(50));
console.log(`Files checked: ${checked}`);
console.log(`Violations found: ${violations}`);

if (violations > 0) {
  console.log('\n❌ Boundary check FAILED');
  console.log('\nReview .repo/policy/BOUNDARIES.md for layer architecture rules.');
  process.exit(1);
} else {
  console.log('\n✅ All boundaries respected');
  process.exit(0);
}
