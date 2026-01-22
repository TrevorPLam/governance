import chalk from 'chalk';
import { VerificationResult } from '../types';
import { getProjectRoot, directoryExists } from '../utils/files';
import { readManifest } from '../utils/manifest';

/**
 * Verify command handler
 */
export async function verifyCommand(options: { profile?: string; verbose?: boolean }) {
  console.log(chalk.blue.bold('\n✓ Governance CLI - Verify\n'));

  try {
    // Get project root
    const projectRoot = (await getProjectRoot()) || process.cwd();
    console.log(chalk.gray(`Project root: ${projectRoot}`));
    console.log(chalk.gray(`Profile: ${options.profile || 'quick'}\n`));

    // Check if governance exists
    const repoDir = projectRoot + '/.repo';
    if (!(await directoryExists(repoDir))) {
      console.log(chalk.red('❌ Governance not initialized in this project.'));
      console.log(chalk.yellow(`\nRun ${chalk.cyan('governance init')} to get started.\n`));
      process.exit(1);
    }

    const result: VerificationResult = {
      passed: true,
      checks: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
      },
    };

    const profile = options.profile || 'quick';
    const manifest = await readManifest(projectRoot);
    const profileChecks = manifest?.verify_profiles?.[profile as keyof typeof manifest.verify_profiles] || ['manifest', 'structure'];

    console.log(chalk.blue('Running verification checks...\n'));

    // Run checks based on profile
    for (const check of profileChecks) {
      switch (check) {
        case 'manifest':
          await verifyManifest(projectRoot, result);
          break;
        case 'structure':
          await verifyStructure(projectRoot, result);
          break;
        case 'policies':
          await verifyPolicies(projectRoot, result);
          break;
        case 'security':
          await verifySecurity(projectRoot, result);
          break;
        default:
          result.checks.push({
            name: check,
            passed: false,
            message: `Unknown check: ${check}`,
          });
      }
    }

    // Calculate summary
    result.summary.total = result.checks.length;
    result.summary.passed = result.checks.filter((c) => c.passed).length;
    result.summary.failed = result.checks.filter((c) => !c.passed).length;
    result.passed = result.summary.failed === 0;

    // Display results
    displayResults(result, options.verbose);

    // Exit with appropriate code
    if (!result.passed) {
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error during verification:'));
    console.error(chalk.red((error as Error).message));
    if (options.verbose) {
      console.error(chalk.gray('\nStack trace:'));
      console.error(chalk.gray((error as Error).stack || 'No stack trace available'));
    }
    process.exit(1);
  }
}

/**
 * Verify manifest
 */
async function verifyManifest(projectRoot: string, result: VerificationResult): Promise<void> {
  const manifest = await readManifest(projectRoot);

  if (!manifest) {
    result.checks.push({
      name: 'Manifest exists',
      passed: false,
      message: 'Manifest file not found',
    });
    return;
  }

  result.checks.push({
    name: 'Manifest exists',
    passed: true,
    message: 'Manifest file found and valid',
  });

  // Check required commands are configured
  const requiredCommands = ['install', 'check:quick', 'check:ci'];
  let allConfigured = true;
  const missing: string[] = [];

  for (const cmd of requiredCommands) {
    const value = manifest.commands?.[cmd as keyof typeof manifest.commands];
    if (!value || value === '<FILL_FROM_REPO>') {
      allConfigured = false;
      missing.push(cmd);
    }
  }

  result.checks.push({
    name: 'Required commands configured',
    passed: allConfigured,
    message: allConfigured
      ? 'All required commands are configured'
      : `Missing commands: ${missing.join(', ')}`,
  });
}

/**
 * Verify structure
 */
async function verifyStructure(projectRoot: string, result: VerificationResult): Promise<void> {
  const { fileExists } = await import('../utils/files');
  const path = await import('path');

  const requiredFiles = [
    '.repo/GOVERNANCE.md',
    '.repo/VERSION',
    '.repo/repo.manifest.yaml',
    '.repo/policy/CONSTITUTION.md',
    '.repo/policy/PRINCIPLES.md',
  ];

  let allPresent = true;
  const missing: string[] = [];

  for (const file of requiredFiles) {
    const filePath = path.join(projectRoot, file);
    if (!(await fileExists(filePath))) {
      allPresent = false;
      missing.push(file);
    }
  }

  result.checks.push({
    name: 'Required files present',
    passed: allPresent,
    message: allPresent
      ? 'All required governance files are present'
      : `Missing files: ${missing.join(', ')}`,
  });
}

/**
 * Verify policies
 */
async function verifyPolicies(projectRoot: string, result: VerificationResult): Promise<void> {
  const { fileExists, readFile } = await import('../utils/files');
  const path = await import('path');

  const policyFiles = [
    'CONSTITUTION.md',
    'PRINCIPLES.md',
    'QUALITY_GATES.md',
    'SECURITY_BASELINE.md',
    'BOUNDARIES.md',
  ];

  let allValid = true;
  const invalid: string[] = [];

  for (const file of policyFiles) {
    const filePath = path.join(projectRoot, '.repo', 'policy', file);
    if (await fileExists(filePath)) {
      const content = await readFile(filePath);
      if (content.trim().length < 100) {
        allValid = false;
        invalid.push(file);
      }
    } else {
      allValid = false;
      invalid.push(file);
    }
  }

  result.checks.push({
    name: 'Policy files valid',
    passed: allValid,
    message: allValid
      ? 'All policy files are present and valid'
      : `Invalid or missing policies: ${invalid.join(', ')}`,
  });
}

/**
 * Verify security
 */
async function verifySecurity(projectRoot: string, result: VerificationResult): Promise<void> {
  const { fileExists } = await import('../utils/files');
  const path = await import('path');

  const securityFile = path.join(projectRoot, '.repo', 'policy', 'SECURITY_BASELINE.md');
  
  result.checks.push({
    name: 'Security baseline configured',
    passed: await fileExists(securityFile),
    message: (await fileExists(securityFile))
      ? 'Security baseline policy is configured'
      : 'Security baseline policy not found',
  });
}

/**
 * Display verification results
 */
function displayResults(result: VerificationResult, verbose?: boolean): void {
  console.log();

  // Display individual checks
  for (const check of result.checks) {
    const icon = check.passed ? chalk.green('✓') : chalk.red('✗');
    console.log(`${icon} ${check.name}`);
    if (verbose || !check.passed) {
      console.log(chalk.gray(`  ${check.message}`));
      if (check.details && verbose) {
        console.log(chalk.gray(`  ${check.details}`));
      }
    }
  }

  console.log();

  // Summary
  const { summary } = result;
  console.log(chalk.bold('Summary:'));
  console.log(chalk.gray(`  Total checks: ${summary.total}`));
  console.log(chalk.green(`  Passed: ${summary.passed}`));
  if (summary.failed > 0) {
    console.log(chalk.red(`  Failed: ${summary.failed}`));
  }
  if (summary.skipped > 0) {
    console.log(chalk.yellow(`  Skipped: ${summary.skipped}`));
  }

  console.log();

  if (result.passed) {
    console.log(chalk.green.bold('✅ All verification checks passed!\n'));
  } else {
    console.log(chalk.red.bold(`❌ Verification failed with ${summary.failed} failed check(s)\n`));
  }
}
