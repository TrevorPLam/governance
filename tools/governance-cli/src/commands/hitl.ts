import * as path from 'path';
import chalk from 'chalk';
import { getProjectRoot, writeFile } from '../utils/files';
import { appendAuditEvent } from '../utils/audit';
import {
  HitlItem,
  readActiveHitl,
  readArchivedHitl,
  writeActiveHitl,
  writeArchivedHitl,
} from '../utils/hitl';

interface HitlCreateOptions {
  id?: string;
  summary: string;
  risk?: string;
  owner?: string;
}

interface HitlAssignOptions {
  id: string;
  owner: string;
}

interface HitlResolveOptions {
  id: string;
  resolution: string;
}

interface HitlReportOptions {
  format?: string;
  output?: string;
}

function generateHitlId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  return `HITL-${date}-${now.getTime()}`;
}

function formatHitlMarkdown(items: HitlItem[]): string {
  const lines = ['# HITL Report', '', '| ID | Status | Summary | Owner | Risk |', '|---|---|---|---|---|'];
  for (const item of items) {
    lines.push(
      `| ${item.hitl_id} | ${item.status} | ${item.summary} | ${item.owner ?? '-'} | ${item.risk ?? '-'} |`,
    );
  }
  return lines.join('\n');
}

export async function hitlListCommand(): Promise<void> {
  console.log(chalk.blue('\n🧭 Governance CLI - HITL List\n'));
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveHitl(projectRoot);

  if (items.length === 0) {
    console.log('No active HITL items.');
    return;
  }

  for (const item of items) {
    console.log(`- ${item.hitl_id}: ${item.summary} [${item.status}]`);
  }
}

export async function hitlCreateCommand(options: HitlCreateOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveHitl(projectRoot);
  const hitlId = options.id ?? generateHitlId();
  const status = options.owner ? 'assigned' : 'open';

  const newItem: HitlItem = {
    hitl_id: hitlId,
    status,
    summary: options.summary,
    risk: options.risk,
    owner: options.owner,
    created_at: new Date().toISOString(),
  };

  items.push(newItem);
  await writeActiveHitl(projectRoot, items);
  await appendAuditEvent(projectRoot, {
    timestamp: new Date().toISOString(),
    type: 'hitl',
    action: 'create',
    data: newItem,
  });

  console.log(chalk.green(`Created HITL item ${hitlId}.`));
}

export async function hitlAssignCommand(options: HitlAssignOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveHitl(projectRoot);
  const item = items.find((entry) => entry.hitl_id === options.id);
  if (!item) {
    console.log(chalk.red(`HITL item not found: ${options.id}`));
    return;
  }

  item.owner = options.owner;
  item.status = 'assigned';
  await writeActiveHitl(projectRoot, items);
  await appendAuditEvent(projectRoot, {
    timestamp: new Date().toISOString(),
    type: 'hitl',
    action: 'assign',
    data: { hitl_id: item.hitl_id, owner: options.owner },
  });

  console.log(chalk.green(`Assigned HITL item ${options.id} to ${options.owner}.`));
}

export async function hitlResolveCommand(options: HitlResolveOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveHitl(projectRoot);
  const index = items.findIndex((entry) => entry.hitl_id === options.id);
  if (index === -1) {
    console.log(chalk.red(`HITL item not found: ${options.id}`));
    return;
  }

  const [item] = items.splice(index, 1);
  const resolvedItem: HitlItem = {
    ...item,
    status: 'resolved',
    resolved_at: new Date().toISOString(),
    resolution: options.resolution,
  };

  const archived = await readArchivedHitl(projectRoot);
  archived.push(resolvedItem);
  await writeActiveHitl(projectRoot, items);
  await writeArchivedHitl(projectRoot, archived);
  await appendAuditEvent(projectRoot, {
    timestamp: new Date().toISOString(),
    type: 'hitl',
    action: 'resolve',
    data: { hitl_id: item.hitl_id, resolution: options.resolution },
  });

  console.log(chalk.green(`Resolved HITL item ${options.id}.`));
}

export async function hitlReportCommand(options: HitlReportOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveHitl(projectRoot);
  const format = options.format ?? 'text';

  let output = '';
  if (format === 'json') {
    output = JSON.stringify(items, null, 2);
  } else if (format === 'markdown') {
    output = formatHitlMarkdown(items);
  } else {
    output = items.map((item) => `${item.hitl_id}: ${item.summary}`).join('\n');
  }

  if (options.output) {
    const outputPath = path.resolve(options.output);
    await writeFile(outputPath, output);
    console.log(chalk.green(`Report written to ${outputPath}`));
    return;
  }

  console.log(output);
}
