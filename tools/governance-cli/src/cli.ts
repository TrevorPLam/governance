#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { validateCommand } from './commands/validate';
import { verifyCommand } from './commands/verify';
import { checkUpdatesCommand } from './commands/check-updates';
import { updateCommand } from './commands/update';

const program = new Command();

program
  .name('governance')
  .description('CLI tool for AI-Native repository governance')
  .version('1.0.0');

// Init command
program
  .command('init')
  .description('Initialize governance in the current repository')
  .option('-n, --name <name>', 'Project name')
  .option('-t, --tier <tier>', 'Governance tier (minimal, standard, complete)', 'standard')
  .option('--no-auto-fill', 'Disable automatic manifest filling')
  .option('--no-interactive', 'Run in non-interactive mode')
  .action(initCommand);

// Validate command
program
  .command('validate')
  .description('Validate governance configuration and manifest')
  .option('-v, --verbose', 'Show detailed validation output')
  .action(validateCommand);

// Verify command
program
  .command('verify')
  .description('Run governance verification checks')
  .option('-p, --profile <profile>', 'Verification profile (quick, ci, release)', 'quick')
  .option('-v, --verbose', 'Show detailed verification output')
  .action(verifyCommand);

// Check updates command
program
  .command('check-updates')
  .description('Check for governance framework updates')
  .action(checkUpdatesCommand);

// Update command
program
  .command('update')
  .description('Update governance framework to latest version')
  .option('--dry-run', 'Show what would be updated without applying changes')
  .option('--force', 'Force update even if there are local modifications')
  .option('--no-backup', 'Skip creating backup before update')
  .action(updateCommand);

// Error handling
program.on('command:*', () => {
  console.error(chalk.red(`\nError: Unknown command '${program.args.join(' ')}'`));
  console.log(chalk.yellow('\nRun "governance --help" to see available commands.\n'));
  process.exit(1);
});

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
