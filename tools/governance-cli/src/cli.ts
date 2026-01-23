#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { validateCommand } from './commands/validate';
import { verifyCommand } from './commands/verify';
import { checkUpdatesCommand } from './commands/check-updates';
import { updateCommand } from './commands/update';
import { maturityCheckCommand } from './commands/maturity-check';
import {
  metricsCollectCommand,
  metricsDashboardCommand,
  metricsReportCommand,
} from './commands/metrics';
import { lintCommand } from './commands/lint';
import {
  hitlAssignCommand,
  hitlCreateCommand,
  hitlListCommand,
  hitlReportCommand,
  hitlResolveCommand,
} from './commands/hitl';
import {
  waiverAnalyticsCommand,
  waiverApproveCommand,
  waiverExportCommand,
  waiverExtendCommand,
  waiverRejectCommand,
  waiverRequestCommand,
} from './commands/waiver';
import { migrateCommand } from './commands/migrate';

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

// Metrics commands
const metrics = program
  .command('metrics')
  .description('Collect and report governance metrics');

metrics
  .command('collect')
  .description('Collect governance metrics for the current repository')
  .option('-v, --verbose', 'Show detailed metrics output')
  .action(metricsCollectCommand);

metrics
  .command('report')
  .description('Show the latest metrics report')
  .option('-f, --format <format>', 'Output format: text, json, markdown', 'text')
  .action(metricsReportCommand);

metrics
  .command('dashboard')
  .description('Run a local metrics dashboard')
  .option('-p, --port <port>', 'Dashboard port', (value) => parseInt(value, 10), 3579)
  .action(metricsDashboardCommand);

// Lint command
program
  .command('lint')
  .description('Run policy validators and governance linters')
  .option('--schema', 'Run JSON schema validators')
  .option('--regex', 'Run regex-based linters')
  .option('--opa', 'Run OPA policy validators')
  .option('--all', 'Run all validators')
  .option('-v, --verbose', 'Show detailed output')
  .action(lintCommand);

// Migration command
program
  .command('migrate')
  .description('Apply governance migrations for new framework features')
  .option('--dry-run', 'Show what would be migrated without changes')
  .action(migrateCommand);

// HITL commands
const hitl = program.command('hitl').description('Manage HITL escalations');

hitl.command('list').description('List active HITL items').action(hitlListCommand);

hitl
  .command('create')
  .description('Create a new HITL item')
  .requiredOption('--summary <summary>', 'HITL summary')
  .option('--id <id>', 'HITL ID (auto-generated if omitted)')
  .option('--risk <risk>', 'Risk level')
  .option('--owner <owner>', 'Assign to owner')
  .action(hitlCreateCommand);

hitl
  .command('assign')
  .description('Assign an existing HITL item')
  .requiredOption('--id <id>', 'HITL ID')
  .requiredOption('--owner <owner>', 'Owner to assign')
  .action(hitlAssignCommand);

hitl
  .command('resolve')
  .description('Resolve an existing HITL item')
  .requiredOption('--id <id>', 'HITL ID')
  .requiredOption('--resolution <resolution>', 'Resolution notes')
  .action(hitlResolveCommand);

hitl
  .command('report')
  .description('Generate HITL report')
  .option('-f, --format <format>', 'Output format: text, json, markdown', 'text')
  .option('-o, --output <path>', 'Write report to file')
  .action(hitlReportCommand);

// Waiver commands
const waiver = program.command('waiver').description('Manage policy waivers');

waiver
  .command('request')
  .description('Request a new waiver')
  .requiredOption('--policy <policy>', 'Policy name')
  .requiredOption('--reason <reason>', 'Waiver reason')
  .requiredOption('--expires-at <date>', 'Expiration timestamp (ISO)')
  .option('--id <id>', 'Waiver ID (auto-generated if omitted)')
  .action(waiverRequestCommand);

waiver
  .command('approve')
  .description('Approve a waiver request')
  .requiredOption('--id <id>', 'Waiver ID')
  .requiredOption('--approver <approver>', 'Approver name')
  .action(waiverApproveCommand);

waiver
  .command('reject')
  .description('Reject a waiver request')
  .requiredOption('--id <id>', 'Waiver ID')
  .option('--reason <reason>', 'Rejection reason')
  .action(waiverRejectCommand);

waiver
  .command('extend')
  .description('Extend waiver expiration')
  .requiredOption('--id <id>', 'Waiver ID')
  .requiredOption('--expires-at <date>', 'New expiration timestamp (ISO)')
  .action(waiverExtendCommand);

waiver
  .command('analytics')
  .description('Show waiver analytics')
  .action(waiverAnalyticsCommand);

waiver
  .command('export')
  .description('Export waiver data')
  .option('-f, --format <format>', 'Output format: json, csv', 'json')
  .option('-o, --output <path>', 'Write export to file')
  .action(waiverExportCommand);

// Maturity check command
program
  .command('maturity-check')
  .description('Assess governance maturity level for the current repository')
  .option('--json', 'Output report as JSON')
  .option('-r, --report <path>', 'Write JSON report to file')
  .option('-v, --verbose', 'Show detailed criteria results')
  .action(maturityCheckCommand);

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
