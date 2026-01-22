import chalk from 'chalk';
import * as path from 'path';
import { ValidationResult } from '../types';
import { getProjectRoot, fileExists, directoryExists } from '../utils/files';
import { readManifest, hasPlaceholders, getPlaceholderCommands } from '../utils/manifest';

/**
 * Validate command handler
 */
export async function validateCommand(options: { verbose?: boolean }) {
  console.log(chalk.blue.bold('\n🔍 Governance CLI - Validate\n'));

  try {
    // Get project root
    const projectRoot = (await getProjectRoot()) || process.cwd();
    console.log(chalk.gray(`Project root: ${projectRoot}\n`));

    // Check if governance exists
    const repoDir = path.join(projectRoot, '.repo');
    if (!(await directoryExists(repoDir))) {
      console.log(chalk.red('❌ Governance not initialized in this project.'));
      console.log(chalk.yellow(`\nRun ${chalk.cyan('governance init')} to get started.\n`));
      process.exit(1);
    }

    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
    };

    console.log(chalk.blue('Validating governance configuration...\n'));

    // Validate structure
    await validateStructure(projectRoot, result);

    // Validate manifest
    await validateManifest(projectRoot, result);

    // Validate policies
    await validatePolicies(projectRoot, result);

    // Display results
    displayResults(result, options.verbose);

    // Exit with appropriate code
    if (result.errors.length > 0) {
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error during validation:'));
    console.error(chalk.red((error as Error).message));
    if (options.verbose) {
      console.error(chalk.gray('\nStack trace:'));
      console.error(chalk.gray((error as Error).stack || 'No stack trace available'));
    }
    process.exit(1);
  }
}

/**
 * Validate folder structure
 */
async function validateStructure(projectRoot: string, result: ValidationResult): Promise<void> {
  const repoDir = path.join(projectRoot, '.repo');

  // Check required files
  const requiredFiles = [
    'GOVERNANCE.md',
    'VERSION',
    'repo.manifest.yaml',
    'policy/CONSTITUTION.md',
    'policy/PRINCIPLES.md',
    'policy/QUALITY_GATES.md',
    'policy/SECURITY_BASELINE.md',
    'policy/BOUNDARIES.md',
    'policy/HITL.md',
    'policy/WAIVERS.md',
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(repoDir, file);
    if (!(await fileExists(filePath))) {
      result.valid = false;
      result.errors.push({
        type: 'MISSING_FILE',
        message: `Required file missing: .repo/${file}`,
        file,
        suggestion: 'Run "governance init" to recreate missing files',
      });
    }
  }

  // Check recommended folders
  const recommendedFolders = ['hitl', 'waivers', 'archive'];
  for (const folder of recommendedFolders) {
    const folderPath = path.join(repoDir, folder);
    if (!(await directoryExists(folderPath))) {
      result.warnings.push({
        type: 'MISSING_FOLDER',
        message: `Recommended folder missing: .repo/${folder}/`,
        file: folder,
      });
    }
  }

  console.log(chalk.green('✓ Structure validation complete'));
}

/**
 * Validate manifest
 */
async function validateManifest(projectRoot: string, result: ValidationResult): Promise<void> {
  const manifest = await readManifest(projectRoot);

  if (!manifest) {
    result.valid = false;
    result.errors.push({
      type: 'MISSING_MANIFEST',
      message: 'Manifest file not found or invalid',
      file: '.repo/repo.manifest.yaml',
      suggestion: 'Run "governance init" to create manifest',
    });
    return;
  }

  // Check for version
  if (!manifest.governance?.version) {
    result.warnings.push({
      type: 'MISSING_VERSION',
      message: 'Manifest missing governance version',
      file: '.repo/repo.manifest.yaml',
    });
  }

  // Check for placeholders
  if (hasPlaceholders(manifest)) {
    const placeholders = getPlaceholderCommands(manifest);
    result.warnings.push({
      type: 'HAS_PLACEHOLDERS',
      message: `Manifest has ${placeholders.length} placeholder(s): ${placeholders.join(', ')}`,
      file: '.repo/repo.manifest.yaml',
    });
  }

  // Check required commands
  const requiredCommands = ['install', 'check:quick', 'check:ci'];
  for (const cmd of requiredCommands) {
    const value = manifest.commands?.[cmd as keyof typeof manifest.commands];
    if (!value || value === '<FILL_FROM_REPO>') {
      result.valid = false;
      result.errors.push({
        type: 'MISSING_COMMAND',
        message: `Required command not configured: ${cmd}`,
        file: '.repo/repo.manifest.yaml',
        suggestion: `Fill in the '${cmd}' command in repo.manifest.yaml`,
      });
    }
  }

  console.log(chalk.green('✓ Manifest validation complete'));
}

/**
 * Validate policies
 */
async function validatePolicies(projectRoot: string, result: ValidationResult): Promise<void> {
  const repoDir = path.join(projectRoot, '.repo');
  const policyDir = path.join(repoDir, 'policy');

  const policyFiles = [
    'CONSTITUTION.md',
    'PRINCIPLES.md',
    'QUALITY_GATES.md',
    'SECURITY_BASELINE.md',
    'BOUNDARIES.md',
    'HITL.md',
    'WAIVERS.md',
  ];

  // Check each policy file exists and has content
  for (const file of policyFiles) {
    const filePath = path.join(policyDir, file);
    if (await fileExists(filePath)) {
      const fs = await import('fs-extra');
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Check for version marker
      if (!content.includes('GOVERNANCE')) {
        result.warnings.push({
          type: 'MISSING_MARKER',
          message: `Policy file missing version marker: ${file}`,
          file: `policy/${file}`,
        });
      }

      // Check file is not empty
      if (content.trim().length < 100) {
        result.warnings.push({
          type: 'EMPTY_POLICY',
          message: `Policy file appears empty or too short: ${file}`,
          file: `policy/${file}`,
        });
      }
    }
  }

  console.log(chalk.green('✓ Policy validation complete'));
}

/**
 * Display validation results
 */
function displayResults(result: ValidationResult, verbose?: boolean): void {
  console.log();
  
  // Errors
  if (result.errors.length > 0) {
    console.log(chalk.red.bold(`❌ ${result.errors.length} Error(s) Found:\n`));
    for (const error of result.errors) {
      console.log(chalk.red(`  • ${error.message}`));
      if (error.file) {
        console.log(chalk.gray(`    File: ${error.file}`));
      }
      if (error.suggestion) {
        console.log(chalk.yellow(`    Suggestion: ${error.suggestion}`));
      }
      console.log();
    }
  }

  // Warnings
  if (result.warnings.length > 0) {
    console.log(chalk.yellow.bold(`⚠️  ${result.warnings.length} Warning(s) Found:\n`));
    for (const warning of result.warnings) {
      console.log(chalk.yellow(`  • ${warning.message}`));
      if (warning.file && verbose) {
        console.log(chalk.gray(`    File: ${warning.file}`));
      }
      console.log();
    }
  }

  // Summary
  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log(chalk.green.bold('✅ All validation checks passed!\n'));
  } else if (result.errors.length === 0) {
    console.log(chalk.yellow.bold(`✅ Validation passed with ${result.warnings.length} warning(s)\n`));
  } else {
    console.log(chalk.red.bold(`❌ Validation failed with ${result.errors.length} error(s)\n`));
  }
}
