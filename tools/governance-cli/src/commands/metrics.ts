import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import { getGovernanceRoot, getProjectRoot, readFile } from '../utils/files';
import { collectMetrics, persistMetrics, readLatestMetrics } from '../utils/metrics';

interface MetricsCollectOptions {
  verbose?: boolean;
}

interface MetricsReportOptions {
  format?: string;
}

interface MetricsDashboardOptions {
  port?: number;
}

function formatMetricsText(report: NonNullable<Awaited<ReturnType<typeof readLatestMetrics>>>): string {
  return [
    `Generated: ${report.generated_at}`,
    `Policy coverage: ${(report.compliance.policy_coverage * 100).toFixed(1)}%`,
    `Manifest placeholders: ${report.compliance.manifest_placeholders}`,
    `HITL active: ${report.compliance.hitl_active}`,
    `Waivers active: ${report.compliance.waivers_active}`,
    `Docs present: ${report.quality.docs_present ? 'yes' : 'no'}`,
    `Automation present: ${report.quality.automation_present ? 'yes' : 'no'}`,
  ].join('\n');
}

function formatMetricsMarkdown(report: NonNullable<Awaited<ReturnType<typeof readLatestMetrics>>>): string {
  return [
    '# Governance Metrics Report',
    '',
    `- Generated: ${report.generated_at}`,
    `- Policy coverage: ${(report.compliance.policy_coverage * 100).toFixed(1)}%`,
    `- Manifest placeholders: ${report.compliance.manifest_placeholders}`,
    `- HITL active: ${report.compliance.hitl_active}`,
    `- Waivers active: ${report.compliance.waivers_active}`,
    `- Docs present: ${report.quality.docs_present ? 'yes' : 'no'}`,
    `- Automation present: ${report.quality.automation_present ? 'yes' : 'no'}`,
    '',
    '## Warnings',
    ...(report.warnings.length > 0
      ? report.warnings.map((warning) => `- ${warning}`)
      : ['- None']),
  ].join('\n');
}

export async function metricsCollectCommand(options: MetricsCollectOptions): Promise<void> {
  console.log(chalk.blue('\n📈 Governance CLI - Metrics Collect\n'));
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const report = await collectMetrics(projectRoot);
  const metricsPath = await persistMetrics(projectRoot, report);
  console.log(`Project root: ${projectRoot}`);
  console.log(`Metrics written: ${metricsPath}`);

  if (options.verbose) {
    console.log('\nReport:');
    console.log(JSON.stringify(report, null, 2));
  }
}

export async function metricsReportCommand(options: MetricsReportOptions): Promise<void> {
  console.log(chalk.blue('\n📊 Governance CLI - Metrics Report\n'));
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const report = await readLatestMetrics(projectRoot);

  if (!report) {
    console.log(chalk.yellow('No metrics found. Run "governance metrics collect" first.'));
    return;
  }

  const format = options.format ?? 'text';
  if (format === 'json') {
    console.log(JSON.stringify(report, null, 2));
  } else if (format === 'markdown') {
    console.log(formatMetricsMarkdown(report));
  } else {
    console.log(formatMetricsText(report));
  }
}

export async function metricsDashboardCommand(options: MetricsDashboardOptions): Promise<void> {
  console.log(chalk.blue('\n🧭 Governance CLI - Metrics Dashboard\n'));
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const dashboardPath = path.join(getGovernanceRoot(), 'tools', 'dashboard', 'index.html');
  const port = options.port ?? 3579;

  if (!(await fs.pathExists(dashboardPath))) {
    console.log(chalk.red('Dashboard template not found.'));
    return;
  }

  const server = http.createServer(async (req, res) => {
    if (!req.url || req.url === '/') {
      const html = await readFile(dashboardPath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }

    if (req.url === '/metrics.json') {
      const report = await readLatestMetrics(projectRoot);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(report ?? { error: 'No metrics data found' }));
      return;
    }

    res.writeHead(404);
    res.end();
  });

  server.listen(port, () => {
    console.log(`Dashboard running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop.');
  });
}
