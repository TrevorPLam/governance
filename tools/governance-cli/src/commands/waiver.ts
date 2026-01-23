import * as path from 'path';
import chalk from 'chalk';
import { getProjectRoot, writeFile } from '../utils/files';
import { appendAuditEvent } from '../utils/audit';
import {
  WaiverItem,
  readActiveWaivers,
  readArchivedWaivers,
  writeActiveWaivers,
  writeArchivedWaivers,
} from '../utils/waivers';

interface WaiverRequestOptions {
  id?: string;
  policy: string;
  reason: string;
  expiresAt: string;
}

interface WaiverApproveOptions {
  id: string;
  approver: string;
}

interface WaiverRejectOptions {
  id: string;
  reason?: string;
}

interface WaiverExtendOptions {
  id: string;
  expiresAt: string;
}

interface WaiverExportOptions {
  format?: string;
  output?: string;
}

function generateWaiverId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  return `WVR-${date}-${now.getTime()}`;
}

function isExpired(item: WaiverItem): boolean {
  return new Date(item.expires_at).getTime() < Date.now();
}

export async function waiverRequestCommand(options: WaiverRequestOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveWaivers(projectRoot);
  const waiverId = options.id ?? generateWaiverId();

  const newItem: WaiverItem = {
    waiver_id: waiverId,
    policy: options.policy,
    reason: options.reason,
    status: 'pending',
    expires_at: options.expiresAt,
    created_at: new Date().toISOString(),
  };

  items.push(newItem);
  await writeActiveWaivers(projectRoot, items);
  await appendAuditEvent(projectRoot, {
    timestamp: new Date().toISOString(),
    type: 'waiver',
    action: 'request',
    data: newItem,
  });

  console.log(chalk.green(`Created waiver request ${waiverId}.`));
}

export async function waiverApproveCommand(options: WaiverApproveOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveWaivers(projectRoot);
  const item = items.find((entry) => entry.waiver_id === options.id);
  if (!item) {
    console.log(chalk.red(`Waiver not found: ${options.id}`));
    return;
  }

  item.status = 'approved';
  item.approved_by = options.approver;
  await writeActiveWaivers(projectRoot, items);
  await appendAuditEvent(projectRoot, {
    timestamp: new Date().toISOString(),
    type: 'waiver',
    action: 'approve',
    data: { waiver_id: item.waiver_id, approved_by: options.approver },
  });

  console.log(chalk.green(`Approved waiver ${options.id}.`));
}

export async function waiverRejectCommand(options: WaiverRejectOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveWaivers(projectRoot);
  const index = items.findIndex((entry) => entry.waiver_id === options.id);
  if (index === -1) {
    console.log(chalk.red(`Waiver not found: ${options.id}`));
    return;
  }

  const [item] = items.splice(index, 1);
  const archived = await readArchivedWaivers(projectRoot);
  const archivedItem: WaiverItem = {
    ...item,
    status: 'rejected',
    resolved_at: new Date().toISOString(),
  };
  archived.push(archivedItem);
  await writeActiveWaivers(projectRoot, items);
  await writeArchivedWaivers(projectRoot, archived);
  await appendAuditEvent(projectRoot, {
    timestamp: new Date().toISOString(),
    type: 'waiver',
    action: 'reject',
    data: { waiver_id: item.waiver_id, reason: options.reason },
  });

  console.log(chalk.green(`Rejected waiver ${options.id}.`));
}

export async function waiverExtendCommand(options: WaiverExtendOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveWaivers(projectRoot);
  const item = items.find((entry) => entry.waiver_id === options.id);
  if (!item) {
    console.log(chalk.red(`Waiver not found: ${options.id}`));
    return;
  }

  item.expires_at = options.expiresAt;
  await writeActiveWaivers(projectRoot, items);
  await appendAuditEvent(projectRoot, {
    timestamp: new Date().toISOString(),
    type: 'waiver',
    action: 'extend',
    data: { waiver_id: item.waiver_id, expires_at: options.expiresAt },
  });

  console.log(chalk.green(`Extended waiver ${options.id}.`));
}

export async function waiverAnalyticsCommand(): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveWaivers(projectRoot);

  const statusCounts: Record<string, number> = {};
  const policyCounts: Record<string, number> = {};
  let expiredCount = 0;

  for (const item of items) {
    statusCounts[item.status] = (statusCounts[item.status] ?? 0) + 1;
    policyCounts[item.policy] = (policyCounts[item.policy] ?? 0) + 1;
    if (isExpired(item)) {
      expiredCount += 1;
    }
  }

  console.log(chalk.blue('\n📊 Waiver Analytics\n'));
  console.log(`Active waivers: ${items.length}`);
  console.log(`Expired waivers: ${expiredCount}`);
  console.log(`By status: ${JSON.stringify(statusCounts)}`);
  console.log(`By policy: ${JSON.stringify(policyCounts)}`);
}

export async function waiverExportCommand(options: WaiverExportOptions): Promise<void> {
  const projectRoot = (await getProjectRoot()) ?? process.cwd();
  const items = await readActiveWaivers(projectRoot);
  const format = options.format ?? 'json';

  let output = '';
  if (format === 'csv') {
    const header = 'waiver_id,policy,status,expires_at,approved_by\n';
    const rows = items.map((item) =>
      [item.waiver_id, item.policy, item.status, item.expires_at, item.approved_by ?? ''].join(','),
    );
    output = header + rows.join('\n');
  } else {
    output = JSON.stringify(items, null, 2);
  }

  if (options.output) {
    const outputPath = path.resolve(options.output);
    await writeFile(outputPath, output);
    console.log(chalk.green(`Waiver export written to ${outputPath}`));
    return;
  }

  console.log(output);
}
