import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';
import {
  fileExists,
  getPolicyValidatorsRoot,
  getProjectRoot,
  readFile,
} from '../utils/files';
import { getSchemaPath, validateYamlWithSchema } from '../utils/validators';

interface LintOptions {
  schema?: boolean;
  regex?: boolean;
  opa?: boolean;
  all?: boolean;
  verbose?: boolean;
}

interface LintIssue {
  file: string;
  message: string;
}

const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.java'];
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.repo']);

async function listJsonFiles(dir: string): Promise<string[]> {
  if (!(await fs.pathExists(dir))) {
    return [];
  }
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => path.join(dir, entry.name));
}

async function walkFiles(dir: string, files: string[] = []): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        await walkFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

async function runSchemaValidations(projectRoot: string): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  const manifestPath = path.join(projectRoot, '.repo', 'repo.manifest.yaml');
  if (await fileExists(manifestPath)) {
    const result = await validateYamlWithSchema(
      'repo.manifest.schema.json',
      getSchemaPath('repo.manifest.schema.json'),
      manifestPath,
    );
    if (!result.valid) {
      issues.push({
        file: manifestPath,
        message: result.errors.join(', '),
      });
    }
  }

  const metricsConfigPath = path.join(projectRoot, '.repo', 'metrics', 'metrics.config.json');
  if (await fileExists(metricsConfigPath)) {
    const schemaPath = getSchemaPath('metrics.config.schema.json');
    const result = await validateYamlWithSchema('metrics.config.schema.json', schemaPath, metricsConfigPath);
    if (!result.valid) {
      issues.push({
        file: metricsConfigPath,
        message: result.errors.join(', '),
      });
    }
  }

  const jsonTargets = [
    { dir: '.repo/hitl', schema: 'hitl.schema.json' },
    { dir: '.repo/waivers', schema: 'waiver.schema.json' },
    { dir: '.repo/adr', schema: 'adr.schema.json' },
    { dir: '.repo/agent-logs', schema: 'agent-log.schema.json' },
    { dir: '.repo/agent-traces', schema: 'agent-trace.schema.json' },
    { dir: '.repo/task-packets', schema: 'task-packet.schema.json' },
  ];

  for (const target of jsonTargets) {
    const dirPath = path.join(projectRoot, target.dir);
    const schemaPath = getSchemaPath(target.schema);
    const files = await listJsonFiles(dirPath);
    for (const jsonFile of files) {
      const result = await validateYamlWithSchema(target.schema, schemaPath, jsonFile);
      if (!result.valid) {
        issues.push({
          file: jsonFile,
          message: result.errors.join(', '),
        });
      }
    }
  }

  return issues;
}

async function runRegexLint(projectRoot: string): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  const patternsPath = path.join(getPolicyValidatorsRoot(), 'linters', 'forbidden-patterns.json');
  if (!(await fileExists(patternsPath))) {
    return issues;
  }

  const patternConfig = JSON.parse(await readFile(patternsPath)) as { patterns: string[] };
  const patterns = patternConfig.patterns.map((pattern) => new RegExp(pattern, 'g'));
  const files = await walkFiles(projectRoot);

  for (const filePath of files) {
    const ext = path.extname(filePath);
    if (!SOURCE_EXTENSIONS.includes(ext)) continue;
    const content = await readFile(filePath);
    for (const regex of patterns) {
      if (regex.test(content)) {
        issues.push({
          file: filePath,
          message: `Forbidden pattern detected: ${regex.source}`,
        });
      }
    }
  }

  return issues;
}

function runOpaValidation(projectRoot: string): LintIssue[] {
  const opaPolicyPath = path.join(getPolicyValidatorsRoot(), 'opa', 'policies.rego');
  if (!fs.existsSync(opaPolicyPath)) {
    return [];
  }

  try {
    execSync('opa version', { stdio: 'ignore' });
  } catch {
    return [
      {
        file: opaPolicyPath,
        message: 'OPA binary not found. Install OPA to enable policy evaluation.',
      },
    ];
  }

  const inputPath = path.join(projectRoot, '.repo', 'repo.manifest.yaml');
  if (!fs.existsSync(inputPath)) {
    return [
      {
        file: inputPath,
        message: 'Manifest not found for OPA evaluation.',
      },
    ];
  }

  try {
    execSync(`opa eval -i "${inputPath}" -d "${opaPolicyPath}" "data.governance.allow"`, {
      stdio: 'ignore',
    });
  } catch {
    return [
      {
        file: opaPolicyPath,
        message: 'OPA policy evaluation failed.',
      },
    ];
  }

  return [];
}

export async function lintCommand(options: LintOptions): Promise<void> {
  console.log(chalk.blue('\n🧹 Governance CLI - Lint\n'));
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  console.log(`Project root: ${projectRoot}`);

  const runAll = options.all || (!options.schema && !options.regex && !options.opa);
  const issues: LintIssue[] = [];

  if (runAll || options.schema) {
    issues.push(...(await runSchemaValidations(projectRoot)));
  }

  if (runAll || options.regex) {
    issues.push(...(await runRegexLint(projectRoot)));
  }

  if (runAll || options.opa) {
    issues.push(...runOpaValidation(projectRoot));
  }

  if (issues.length === 0) {
    console.log(chalk.green('✅ No lint issues found.'));
    return;
  }

  console.log(chalk.red(`\n❌ ${issues.length} lint issue(s) found:\n`));
  for (const issue of issues) {
    console.log(`- ${issue.file}: ${issue.message}`);
  }

  if (options.verbose) {
    console.log('\nRun with --schema/--regex/--opa to isolate validators.');
  }

  process.exitCode = 1;
}
