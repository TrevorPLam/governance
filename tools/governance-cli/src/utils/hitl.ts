import * as path from 'path';
import { ensureDirectory, fileExists, readJsonFile, writeJsonFile } from './files';

export interface HitlItem {
  hitl_id: string;
  status: 'open' | 'assigned' | 'resolved';
  summary: string;
  risk?: string;
  owner?: string;
  created_at: string;
  resolved_at?: string;
  resolution?: string;
}

function getHitlDir(projectRoot: string): string {
  return path.join(projectRoot, '.repo', 'hitl');
}

function getActivePath(projectRoot: string): string {
  return path.join(getHitlDir(projectRoot), 'active.json');
}

function getArchivePath(projectRoot: string): string {
  return path.join(getHitlDir(projectRoot), 'archive.json');
}

async function ensureHitlFiles(projectRoot: string): Promise<void> {
  const dir = getHitlDir(projectRoot);
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

export async function readActiveHitl(projectRoot: string): Promise<HitlItem[]> {
  await ensureHitlFiles(projectRoot);
  return readJsonFile<HitlItem[]>(getActivePath(projectRoot));
}

export async function readArchivedHitl(projectRoot: string): Promise<HitlItem[]> {
  await ensureHitlFiles(projectRoot);
  return readJsonFile<HitlItem[]>(getArchivePath(projectRoot));
}

export async function writeActiveHitl(projectRoot: string, items: HitlItem[]): Promise<void> {
  await ensureHitlFiles(projectRoot);
  await writeJsonFile(getActivePath(projectRoot), items);
}

export async function writeArchivedHitl(projectRoot: string, items: HitlItem[]): Promise<void> {
  await ensureHitlFiles(projectRoot);
  await writeJsonFile(getArchivePath(projectRoot), items);
}
