import * as path from 'path';
import * as fs from 'fs-extra';
import { directoryExists, ensureDirectory, fileExists, readFile, writeJsonFile } from './files';

export interface MetricsConfig {
  version: string;
  retention_days: number;
  thresholds: {
    policy_coverage_min: number;
    manifest_placeholders_max: number;
    waiver_active_max: number;
    hitl_active_max: number;
  };
}

export interface MetricsReport {
  version: string;
  generated_at: string;
  repository_root: string;
  compliance: {
    policy_coverage: number;
    policies_present: number;
    policies_required: number;
    manifest_placeholders: number;
    hitl_active: number;
    waivers_active: number;
  };
  quality: {
    docs_present: boolean;
    automation_present: boolean;
    agent_framework_present: boolean;
    test_coverage: number | null;
  };
  velocity: {
    pr_merge_time_hours: number | null;
    build_success_rate: number | null;
    deployment_frequency_per_week: number | null;
  };
  agent: {
    agent_logs_present: boolean;
    agent_trace_schema_present: boolean;
    agent_success_rate: number | null;
  };
  warnings: string[];
}

const REQUIRED_POLICIES = [
  '.repo/policy/CONSTITUTION.md',
  '.repo/policy/PRINCIPLES.md',
  '.repo/policy/QUALITY_GATES.md',
  '.repo/policy/SECURITY_BASELINE.md',
  '.repo/policy/BOUNDARIES.md',
  '.repo/policy/HITL.md',
  '.repo/policy/WAIVERS.md',
];

function getMetricsDir(projectRoot: string): string {
  return path.join(projectRoot, '.repo', 'metrics');
}

function getMetricsPath(projectRoot: string): string {
  return path.join(getMetricsDir(projectRoot), 'metrics.json');
}

function getMetricsHistoryPath(projectRoot: string): string {
  return path.join(getMetricsDir(projectRoot), 'metrics.history.jsonl');
}

async function countManifestPlaceholders(projectRoot: string): Promise<number> {
  const manifestPath = path.join(projectRoot, '.repo', 'repo.manifest.yaml');
  if (!(await fileExists(manifestPath))) {
    return 0;
  }
  const content = await readFile(manifestPath);
  const placeholders = ['<FILL_FROM_REPO>', '<UNKNOWN>'];
  return placeholders.reduce((count, placeholder) => count + content.split(placeholder).length - 1, 0);
}

function countMarkdownTableRows(content: string): number {
  const lines = content.split('\n');
  return lines.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) return false;
    if (trimmed.includes('---')) return false;
    if (trimmed.toLowerCase().includes('status')) return false;
    if (trimmed.toLowerCase().includes('date')) return false;
    return trimmed.length > 2;
  }).length;
}

async function countTableEntries(filePath: string): Promise<number> {
  if (!(await fileExists(filePath))) {
    return 0;
  }
  const content = await readFile(filePath);
  return countMarkdownTableRows(content);
}

export async function loadMetricsConfig(projectRoot: string): Promise<MetricsConfig> {
  const configPath = path.join(getMetricsDir(projectRoot), 'metrics.config.json');
  if (await fileExists(configPath)) {
    return JSON.parse(await readFile(configPath)) as MetricsConfig;
  }

  return {
    version: '1.0.0',
    retention_days: 90,
    thresholds: {
      policy_coverage_min: 0.95,
      manifest_placeholders_max: 0,
      waiver_active_max: 5,
      hitl_active_max: 3,
    },
  };
}

export async function collectMetrics(projectRoot: string): Promise<MetricsReport> {
  const warnings: string[] = [];
  const policiesPresent = await Promise.all(
    REQUIRED_POLICIES.map(async (policyPath) => fileExists(path.join(projectRoot, policyPath))),
  );
  const policiesRequired = REQUIRED_POLICIES.length;
  const policiesFound = policiesPresent.filter(Boolean).length;

  const manifestPlaceholders = await countManifestPlaceholders(projectRoot);
  const hitlPath = path.join(projectRoot, '.repo', 'policy', 'HITL.md');
  const waiversPath = path.join(projectRoot, '.repo', 'policy', 'WAIVERS.md');
  const hitlActive = await countTableEntries(hitlPath);
  const waiversActive = await countTableEntries(waiversPath);

  const docsPresent = await fileExists(path.join(projectRoot, '.repo', 'docs', 'DOCS_INDEX.md'));
  const automationPresent =
    (await directoryExists(path.join(projectRoot, '.repo', 'automation', 'ci'))) ||
    (await directoryExists(path.join(projectRoot, '.repo', 'automation', 'scripts')));
  const agentFrameworkPresent = await fileExists(
    path.join(projectRoot, '.repo', 'agents', 'AGENTS.md'),
  );
  const agentLogsPresent = await fileExists(
    path.join(projectRoot, '.repo', 'templates', 'AGENT_LOG_TEMPLATE.md'),
  );
  const agentTraceSchemaPresent = await fileExists(
    path.join(projectRoot, '.repo', 'templates', 'AGENT_TRACE_SCHEMA.json'),
  );

  const testCoverage = null;
  if (testCoverage === null) {
    warnings.push('Test coverage not detected; configure coverage export to populate this metric.');
  }

  return {
    version: '1.0.0',
    generated_at: new Date().toISOString(),
    repository_root: projectRoot,
    compliance: {
      policy_coverage: policiesFound / policiesRequired,
      policies_present: policiesFound,
      policies_required: policiesRequired,
      manifest_placeholders: manifestPlaceholders,
      hitl_active: hitlActive,
      waivers_active: waiversActive,
    },
    quality: {
      docs_present: docsPresent,
      automation_present: automationPresent,
      agent_framework_present: agentFrameworkPresent,
      test_coverage: testCoverage,
    },
    velocity: {
      pr_merge_time_hours: null,
      build_success_rate: null,
      deployment_frequency_per_week: null,
    },
    agent: {
      agent_logs_present: agentLogsPresent,
      agent_trace_schema_present: agentTraceSchemaPresent,
      agent_success_rate: null,
    },
    warnings,
  };
}

export async function persistMetrics(projectRoot: string, report: MetricsReport): Promise<string> {
  const metricsDir = getMetricsDir(projectRoot);
  await ensureDirectory(metricsDir);
  const metricsPath = getMetricsPath(projectRoot);
  const historyPath = getMetricsHistoryPath(projectRoot);

  await writeJsonFile(metricsPath, report);
  await fs.appendFile(historyPath, `${JSON.stringify(report)}\n`, 'utf-8');

  return metricsPath;
}

export async function readLatestMetrics(projectRoot: string): Promise<MetricsReport | null> {
  const metricsPath = getMetricsPath(projectRoot);
  if (!(await fileExists(metricsPath))) {
    return null;
  }
  return JSON.parse(await readFile(metricsPath)) as MetricsReport;
}
