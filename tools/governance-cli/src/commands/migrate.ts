import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import { copyDirectory, copyFile, getProjectRoot, getRepoTemplateDir } from '../utils/files';

interface MigrateOptions {
  dryRun?: boolean;
}

interface MigrationStep {
  type: 'file' | 'dir';
  relativePath: string;
}

const MIGRATION_STEPS: MigrationStep[] = [
  { type: 'dir', relativePath: '.repo/metrics' },
  { type: 'file', relativePath: '.repo/metrics/metrics.config.json' },
  { type: 'file', relativePath: '.repo/metrics/README.md' },
  { type: 'dir', relativePath: '.repo/hitl' },
  { type: 'file', relativePath: '.repo/hitl/active.json' },
  { type: 'file', relativePath: '.repo/hitl/archive.json' },
  { type: 'file', relativePath: '.repo/hitl/README.md' },
  { type: 'dir', relativePath: '.repo/waivers' },
  { type: 'file', relativePath: '.repo/waivers/active.json' },
  { type: 'file', relativePath: '.repo/waivers/archive.json' },
  { type: 'file', relativePath: '.repo/waivers/README.md' },
  { type: 'dir', relativePath: '.repo/audit' },
  { type: 'file', relativePath: '.repo/audit/audit.log.jsonl' },
  { type: 'file', relativePath: '.repo/audit/README.md' },
];

export async function migrateCommand(options: MigrateOptions): Promise<void> {
  console.log(chalk.blue('\n🧭 Governance CLI - Migrate\n'));
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const templateRoot = getRepoTemplateDir();

  const pending = [];
  for (const step of MIGRATION_STEPS) {
    const targetPath = path.join(projectRoot, step.relativePath);
    if (!(await fs.pathExists(targetPath))) {
      pending.push(step);
    }
  }

  if (pending.length === 0) {
    console.log(chalk.green('✅ No migrations needed.'));
    return;
  }

  console.log(`Project root: ${projectRoot}`);
  console.log(`Pending migrations: ${pending.length}`);

  if (options.dryRun) {
    console.log('\nDry run mode - no changes will be made.');
    for (const step of pending) {
      console.log(`- ${step.relativePath}`);
    }
    return;
  }

  const backupDir = path.join(projectRoot, '.repo', 'archive', `pre-migrate-${Date.now()}`);
  await fs.ensureDir(backupDir);
  await fs.copy(path.join(projectRoot, '.repo'), backupDir);
  console.log(`Backup created at ${backupDir}`);

  for (const step of pending) {
    const srcPath = path.join(templateRoot, step.relativePath.replace('.repo/', ''));
    const destPath = path.join(projectRoot, step.relativePath);
    if (step.type === 'dir') {
      await copyDirectory(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
    console.log(`Applied: ${step.relativePath}`);
  }

  console.log(chalk.green('\n✅ Migration complete.'));
}
