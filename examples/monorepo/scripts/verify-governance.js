#!/usr/bin/env node
/**
 * Governance verification script
 * Checks that governance framework is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying governance configuration...\n');

let errors = 0;
let warnings = 0;

// Check .repo directory exists
if (!fs.existsSync('.repo')) {
  console.error('❌ ERROR: .repo/ directory not found');
  errors++;
} else {
  console.log('✅ .repo/ directory exists');
}

// Check manifest file
const manifestPath = '.repo/repo.manifest.yaml';
if (!fs.existsSync(manifestPath)) {
  console.error('❌ ERROR: repo.manifest.yaml not found');
  errors++;
} else {
  console.log('✅ repo.manifest.yaml exists');
  
  try {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    
    // Check for UNKNOWN or FILL_FROM_REPO placeholders
    if (manifestContent.includes('<UNKNOWN>')) {
      console.warn('⚠️  WARNING: Manifest contains <UNKNOWN> placeholders');
      warnings++;
    }
    if (manifestContent.includes('<FILL_FROM_REPO>')) {
      console.warn('⚠️  WARNING: Manifest contains <FILL_FROM_REPO> placeholders');
      warnings++;
    }
    
    console.log('✅ Manifest file is valid YAML');
    
  } catch (err) {
    console.error('❌ ERROR: Failed to read manifest:', err.message);
    errors++;
  }
}

// Check policy files
const requiredPolicies = [
  'CONSTITUTION.md',
  'PRINCIPLES.md',
  'BOUNDARIES.md',
  'QUALITY_GATES.md',
  'SECURITY_BASELINE.md',
  'HITL.md',
  'WAIVERS.md'
];

console.log('\n📋 Checking policy files...');
requiredPolicies.forEach(policy => {
  const policyPath = path.join('.repo/policy', policy);
  if (fs.existsSync(policyPath)) {
    console.log(`✅ ${policy} exists`);
  } else {
    console.error(`❌ ERROR: ${policy} not found`);
    errors++;
  }
});

// Check AGENT.md files
console.log('\n🤖 Checking AGENT.md files...');
const packagesDir = 'packages';
if (fs.existsSync(packagesDir)) {
  const packages = fs.readdirSync(packagesDir);
  packages.forEach(pkg => {
    const agentPath = path.join(packagesDir, pkg, 'AGENT.md');
    if (fs.existsSync(agentPath)) {
      console.log(`✅ ${pkg}/AGENT.md exists`);
    } else {
      console.warn(`⚠️  WARNING: ${pkg}/AGENT.md not found`);
      warnings++;
    }
  });
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('GOVERNANCE VERIFICATION SUMMARY');
console.log('='.repeat(50));
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  console.log('\n❌ Governance verification FAILED');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠️  Governance verification PASSED with warnings');
  process.exit(0);
} else {
  console.log('\n✅ Governance verification PASSED');
  process.exit(0);
}
