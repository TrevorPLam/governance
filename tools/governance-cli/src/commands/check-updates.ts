import chalk from 'chalk';
import { getProjectRoot, directoryExists } from '../utils/files';
import { getTemplateVersion, getInstalledVersion } from '../utils/templates';

/**
 * Check updates command handler
 */
export async function checkUpdatesCommand() {
  console.log(chalk.blue.bold('\n🔄 Governance CLI - Check Updates\n'));

  try {
    // Get project root
    const projectRoot = (await getProjectRoot()) || process.cwd();
    console.log(chalk.gray(`Project root: ${projectRoot}\n`));

    // Check if governance exists
    const repoDir = projectRoot + '/.repo';
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

    // Compare versions
    if (!installedVersion) {
      console.log(chalk.yellow('⚠️  Could not determine installed version'));
      console.log(chalk.gray('Consider running "governance update" to ensure you have the latest version\n'));
      return;
    }

    if (installedVersion === latestVersion) {
      console.log(chalk.green.bold('✅ You are using the latest version!\n'));
    } else {
      console.log(chalk.yellow.bold('📦 Update available!\n'));
      console.log(chalk.gray(`Run ${chalk.cyan('governance update')} to upgrade to version ${latestVersion}\n`));
      
      // Show what's new (if we can parse versions)
      const current = parseVersion(installedVersion);
      const latest = parseVersion(latestVersion);
      
      if (current && latest) {
        if (latest.major > current.major) {
          console.log(chalk.red('  ⚠️  Major version update - may include breaking changes'));
        } else if (latest.minor > current.minor) {
          console.log(chalk.yellow('  📝 Minor version update - new features available'));
        } else if (latest.patch > current.patch) {
          console.log(chalk.blue('  🐛 Patch version update - bug fixes and improvements'));
        }
        console.log();
      }
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error checking for updates:'));
    console.error(chalk.red((error as Error).message));
    process.exit(1);
  }
}

/**
 * Parse semantic version string
 */
function parseVersion(version: string): { major: number; minor: number; patch: number } | null {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
}
