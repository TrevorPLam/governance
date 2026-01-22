import chalk from 'chalk';
import inquirer from 'inquirer';
import * as path from 'path';
import { UpdateOptions } from '../types';
import { getProjectRoot, directoryExists, copyDirectory, ensureDirectory } from '../utils/files';
import { getTemplateVersion, getInstalledVersion } from '../utils/templates';
import { readManifest, writeManifest } from '../utils/manifest';

/**
 * Update command handler
 */
export async function updateCommand(options: UpdateOptions) {
  console.log(chalk.blue.bold('\n🔄 Governance CLI - Update\n'));

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

    // Get versions
    const installedVersion = await getInstalledVersion(projectRoot);
    const latestVersion = await getTemplateVersion();

    console.log(chalk.bold('Version Information:\n'));
    console.log(`  Current version:  ${chalk.cyan(installedVersion || 'Unknown')}`);
    console.log(`  Latest version:   ${chalk.cyan(latestVersion)}`);
    console.log();

    // Check if update is needed
    if (installedVersion === latestVersion && !options.force) {
      console.log(chalk.green.bold('✅ Already using the latest version!\n'));
      console.log(chalk.gray(`Use ${chalk.cyan('--force')} to reinstall anyway.\n`));
      return;
    }

    // Dry run mode
    if (options.dryRun) {
      console.log(chalk.yellow.bold('🔍 Dry Run Mode - No changes will be made\n'));
      console.log(chalk.gray('Files that would be updated:\n'));
      console.log(chalk.gray('  • .repo/policy/ (Layer 2 files - updateable)'));
      console.log(chalk.gray('  • .repo/templates/ (Layer 3 files - updateable)'));
      console.log(chalk.gray('  • .repo/docs/standards/ (Layer 2 files - updateable)'));
      console.log(chalk.gray('  • .repo/VERSION (updated to new version)'));
      console.log();
      console.log(chalk.yellow('Files that would be preserved:\n'));
      console.log(chalk.yellow('  • .repo/repo.manifest.yaml (Layer 1 - custom)'));
      console.log(chalk.yellow('  • .repo/hitl/ (Layer 1 - custom)'));
      console.log(chalk.yellow('  • .repo/waivers/ (Layer 1 - custom)'));
      console.log(chalk.yellow('  • .repo/docs/adr/ (Layer 1 - custom)'));
      console.log();
      return;
    }

    // Confirm update
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Update governance from ${installedVersion || 'unknown'} to ${latestVersion}?`,
        default: true,
      },
    ]);

    if (!confirm) {
      console.log(chalk.gray('\nUpdate cancelled.\n'));
      return;
    }

    // Create backup if enabled
    if (options.backup !== false) {
      console.log(chalk.blue('📦 Creating backup...\n'));
      const backupDir = path.join(repoDir, 'archive', `pre-update-${installedVersion || 'unknown'}`);
      await ensureDirectory(backupDir);
      await copyDirectory(repoDir, backupDir);
      console.log(chalk.green(`✓ Backup created at .repo/archive/pre-update-${installedVersion || 'unknown'}/\n`));
    }

    // Read current manifest to preserve it
    const currentManifest = await readManifest(projectRoot);

    // Update Layer 2 files (policies, standards)
    console.log(chalk.blue('📝 Updating Layer 2 files (policies and standards)...\n'));
    
    const { getRepoTemplateDir } = await import('../utils/templates');
    const templateDir = getRepoTemplateDir();

    // Update policies (Layer 2)
    await copyDirectory(
      path.join(templateDir, 'policy'),
      path.join(repoDir, 'policy'),
    );
    console.log(chalk.green('✓ Updated policy files'));

    // Update standards (Layer 2)
    await copyDirectory(
      path.join(templateDir, 'docs', 'standards'),
      path.join(repoDir, 'docs', 'standards'),
    );
    console.log(chalk.green('✓ Updated documentation standards'));

    // Update Layer 3 files (templates)
    console.log(chalk.blue('\n📝 Updating Layer 3 files (templates)...\n'));
    await copyDirectory(
      path.join(templateDir, 'templates'),
      path.join(repoDir, 'templates'),
    );
    console.log(chalk.green('✓ Updated templates'));

    // Update VERSION file
    const { writeFile } = await import('../utils/files');
    await writeFile(
      path.join(repoDir, 'VERSION'),
      `${latestVersion}\n`,
    );
    console.log(chalk.green('✓ Updated VERSION file'));

    // Preserve manifest (Layer 1 - custom)
    if (currentManifest) {
      // Update only the governance.version field
      currentManifest.governance.version = latestVersion;
      await writeManifest(projectRoot, currentManifest);
      console.log(chalk.green('✓ Preserved custom manifest with updated version'));
    }

    // Success message
    console.log(chalk.green.bold('\n✅ Update completed successfully!\n'));
    console.log(chalk.bold('What was updated:\n'));
    console.log(chalk.green('  ✓ Policy files (Layer 2)'));
    console.log(chalk.green('  ✓ Documentation standards (Layer 2)'));
    console.log(chalk.green('  ✓ Templates (Layer 3)'));
    console.log(chalk.green('  ✓ VERSION file'));
    console.log();
    console.log(chalk.bold('What was preserved:\n'));
    console.log(chalk.yellow('  ✓ Your manifest customizations (Layer 1)'));
    console.log(chalk.yellow('  ✓ HITL items (Layer 1)'));
    console.log(chalk.yellow('  ✓ Waivers (Layer 1)'));
    console.log(chalk.yellow('  ✓ ADRs (Layer 1)'));
    console.log();
    console.log(chalk.gray(`Next steps:\n`));
    console.log(`  1. Run ${chalk.cyan('governance validate')} to check the updated configuration`);
    console.log(`  2. Review changes and test your project`);
    if (options.backup !== false) {
      console.log(`  3. Backup is available at ${chalk.cyan(`.repo/archive/pre-update-${installedVersion}/`)}`);
    }
    console.log();

  } catch (error) {
    console.error(chalk.red('\n❌ Error during update:'));
    console.error(chalk.red((error as Error).message));
    process.exit(1);
  }
}
