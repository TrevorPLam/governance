import * as path from 'path';
import * as fs from 'fs-extra';
import { ensureDirectory } from './files';

export interface AuditEvent {
  timestamp: string;
  type: 'hitl' | 'waiver';
  action: string;
  data: Record<string, unknown>;
}

export async function appendAuditEvent(projectRoot: string, event: AuditEvent): Promise<void> {
  const auditDir = path.join(projectRoot, '.repo', 'audit');
  await ensureDirectory(auditDir);
  const logPath = path.join(auditDir, 'audit.log.jsonl');
  await fs.appendFile(logPath, `${JSON.stringify(event)}\n`, 'utf-8');
}
