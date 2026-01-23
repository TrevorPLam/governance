import * as path from 'path';
import { ensureDirectory, fileExists, readJsonFile, writeJsonFile } from './files';

export interface WaiverItem {
  waiver_id: string;
  policy: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  expires_at: string;
  created_at: string;
  approved_by?: string;
  resolved_at?: string;
}

function getWaiverDir(projectRoot: string): string {
  return path.join(projectRoot, '.repo', 'waivers');
}

function getActivePath(projectRoot: string): string {
  return path.join(getWaiverDir(projectRoot), 'active.json');
}

function getArchivePath(projectRoot: string): string {
  return path.join(getWaiverDir(projectRoot), 'archive.json');
}

async function ensureWaiverFiles(projectRoot: string): Promise<void> {
  const dir = getWaiverDir(projectRoot);
  await ensureDirectory(dir);
  const activePath = getActivePath(projectRoot);
  const archivePath = getArchivePath(projectRoot);
  if (!(await fileExists(activePath))) {
    await writeJsonFile(activePath, []);
  }
  if (!(await fileExists(archivePath))) {
    await writeJsonFile(archivePath, []);
  }
}

export async function readActiveWaivers(projectRoot: string): Promise<WaiverItem[]> {
  await ensureWaiverFiles(projectRoot);
  return readJsonFile<WaiverItem[]>(getActivePath(projectRoot));
}

export async function readArchivedWaivers(projectRoot: string): Promise<WaiverItem[]> {
  await ensureWaiverFiles(projectRoot);
  return readJsonFile<WaiverItem[]>(getArchivePath(projectRoot));
}

export async function writeActiveWaivers(projectRoot: string, items: WaiverItem[]): Promise<void> {
  await ensureWaiverFiles(projectRoot);
  await writeJsonFile(getActivePath(projectRoot), items);
}

export async function writeArchivedWaivers(projectRoot: string, items: WaiverItem[]): Promise<void> {
  await ensureWaiverFiles(projectRoot);
  await writeJsonFile(getArchivePath(projectRoot), items);
}
