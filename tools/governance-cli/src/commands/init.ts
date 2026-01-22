import chalk from 'chalk';
import inquirer from 'inquirer';
import * as path from 'path';
import { InitOptions, Tier, RepoManifest } from '../types';
import {
  getProjectRoot,
  directoryExists,
  ensureDirectory,
  fileExists,
  writeFile,
} from '../utils/files';
import { detectProjectInfo, autoFillManifest, writeManifest } from '../utils/manifest';
import { copyTemplates, copyRootFiles, getTemplateVersion } from '../utils/templates';
import { addToGitignore } from '../utils/git';

/**
 * Init command handler
 */
export async function initCommand(options: InitOptions) {
  console.log(chalk.blue.bold('\n🚀 Governance CLI - Initialize\n'));

  try {
    // Get project root
    const projectRoot = (await getProjectRoot()) || process.cwd();
    console.log(chalk.gray(`Project root: ${projectRoot}\n`));

    // Check if governance already exists
    const repoDir = path.join(projectRoot, '.repo');
    if (await directoryExists(repoDir)) {
      console.log(chalk.yellow('⚠️  Governance already initialized in this project.'));
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'Do you want to reinitialize (this will overwrite existing files)?',
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.gray('\nOperation cancelled.\n'));
        return;
      }
    }

    // Detect project info
    const projectInfo = await detectProjectInfo(projectRoot);
    console.log(chalk.gray(`Detected project type: ${projectInfo.type || 'unknown'}`));
    console.log(chalk.gray(`Package manager: ${projectInfo.packageManager || 'unknown'}\n`));

    let projectName = options.projectName || projectInfo.name;
    let tier: Tier = Tier.Standard;

    // Interactive mode
    if (options.interactive !== false) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: projectName,
          when: !options.projectName,
        },
        {
          type: 'list',
          name: 'tier',
          message: 'Select governance tier:',
          choices: [
            {
              name: 'Minimal - Core policies and manifest only (10 files)',
              value: 'minimal',
            },
            {
              name: 'Standard - Policies + agent framework + templates (45 files) [Recommended]',
              value: 'standard',
            },
            {
              name: 'Complete - Everything including automation (55+ files)',
              value: 'complete',
            },
          ],
          default: 'standard',
          when: !options.tier,
        },
      ]);

      if (answers.projectName) projectName = answers.projectName;
      if (answers.tier) tier = answers.tier as Tier;
    } else {
      // Non-interactive mode
      if (options.tier) {
        tier = options.tier as Tier;
      }
    }

    console.log(chalk.blue('\n📦 Copying templates...\n'));

    // Copy templates based on tier
    await copyTemplates(projectRoot, tier);
    console.log(chalk.green(`✓ Copied .repo/ directory (${tier} tier)`));

    // Copy root TODO files
    await copyRootFiles(projectRoot);
    console.log(chalk.green('✓ Copied TODO templates (P0TODO.md, P1TODO.md, P2TODO.md, COMPLETEDTODO.md)'));

    // Create tracking folders
    await ensureDirectory(path.join(repoDir, 'hitl'));
    await ensureDirectory(path.join(repoDir, 'waivers'));
    await ensureDirectory(path.join(repoDir, 'archive'));
    console.log(chalk.green('✓ Created tracking folders (hitl/, waivers/, archive/)'));

    // Initialize manifest
    console.log(chalk.blue('\n⚙️  Configuring manifest...\n'));
    
    const templateVersion = await getTemplateVersion();
    let manifest: RepoManifest = {
      governance: {
        version: templateVersion,
        framework: 'ai-native-governance',
      },
      commands: {
        install: '<FILL_FROM_REPO>',
        'check:quick': '<FILL_FROM_REPO>',
        'check:ci': '<FILL_FROM_REPO>',
        'test:all': '<UNKNOWN>',
        'test:unit': '<UNKNOWN>',
        'test:integration': '<UNKNOWN>',
        'lint:check': '<UNKNOWN>',
        'lint:fix': '<UNKNOWN>',
        build: '<UNKNOWN>',
        'build:prod': '<UNKNOWN>',
        dev: '<UNKNOWN>',
      },
      verify_profiles: {
        quick: ['manifest', 'structure'],
        ci: ['manifest', 'structure', 'policies'],
        release: ['manifest', 'structure', 'policies', 'security'],
      },
    };

    // Auto-fill manifest if enabled
    if (options.autoFill !== false) {
      manifest = await autoFillManifest(projectRoot, manifest);
      console.log(chalk.green('✓ Auto-filled manifest from project configuration'));
    }

    // Write manifest
    await writeManifest(projectRoot, manifest);
    console.log(chalk.green('✓ Created repo.manifest.yaml'));

    // Update .gitignore
    const gitignorePath = path.join(projectRoot, '.gitignore');
    try {
      await addToGitignore('.repo/archive/', gitignorePath);
      console.log(chalk.green('✓ Updated .gitignore'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Could not update .gitignore (you may need to add .repo/archive/ manually)'));
    }

    // Success message
    console.log(chalk.green.bold('\n✅ Governance initialized successfully!\n'));
    console.log(chalk.bold('Next steps:\n'));
    console.log(`  1. Review ${chalk.cyan('.repo/GOVERNANCE.md')} for an overview`);
    console.log(`  2. Check ${chalk.cyan('.repo/repo.manifest.yaml')} and fill any ${chalk.yellow('<FILL_FROM_REPO>')} placeholders`);
    console.log(`  3. Run ${chalk.cyan('governance validate')} to check your configuration`);
    console.log(`  4. Review policies in ${chalk.cyan('.repo/policy/')} and customize as needed`);
    console.log(`\n  ${chalk.gray('Tip: Use')} ${chalk.cyan('governance --help')} ${chalk.gray('to see all available commands')}\n`);

  } catch (error) {
    console.error(chalk.red('\n❌ Error during initialization:'));
    console.error(chalk.red((error as Error).message));
    console.error(chalk.gray('\nStack trace:'));
    console.error(chalk.gray((error as Error).stack || 'No stack trace available'));
    process.exit(1);
  }
}
