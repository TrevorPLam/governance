import * as fs from 'fs-extra';
import * as path from 'path';
import { directoryExists, fileExists, readFile, readJsonFile } from './files';

export type MaturityCheckType =
  | 'file'
  | 'dir'
  | 'files'
  | 'dirs'
  | 'dir_has_files'
  | 'file_not_contains';

export interface MaturityCheck {
  type: MaturityCheckType;
  path?: string;
  paths?: string[];
  patterns?: string[];
}

export interface MaturityCriterion {
  id: string;
  description: string;
  checks: MaturityCheck[];
}

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  criteria: MaturityCriterion[];
}

export interface MaturityCriteria {
  version: string;
  levels: MaturityLevel[];
}

export interface CriterionResult {
  id: string;
  description: string;
  passed: boolean;
  failures: string[];
}

export interface MaturityReport {
  criteriaVersion: string;
  assessedRoot: string;
  currentLevel: MaturityLevel;
  nextLevel: MaturityLevel | null;
  criteriaResults: CriterionResult[];
  timestamp: string;
}

function resolvePath(projectRoot: string, relativePath: string): string {
  return path.resolve(projectRoot, relativePath);
}

async function checkFile(projectRoot: string, relativePath: string): Promise<boolean> {
  return fileExists(resolvePath(projectRoot, relativePath));
}

async function checkDir(projectRoot: string, relativePath: string): Promise<boolean> {
  return directoryExists(resolvePath(projectRoot, relativePath));
}

async function checkDirHasFiles(projectRoot: string, relativePath: string): Promise<boolean> {
  const absolute = resolvePath(projectRoot, relativePath);
  if (!(await directoryExists(absolute))) {
    return false;
  }
  const entries = await fs.readdir(absolute);
  return entries.length > 0;
}

async function checkFileNotContains(
  projectRoot: string,
  relativePath: string,
  patterns: string[],
): Promise<boolean> {
  const absolute = resolvePath(projectRoot, relativePath);
  if (!(await fileExists(absolute))) {
    return false;
  }
  const content = await readFile(absolute);
  return patterns.every((pattern) => !content.includes(pattern));
}

export async function loadMaturityCriteria(criteriaPath: string): Promise<MaturityCriteria> {
  return readJsonFile<MaturityCriteria>(criteriaPath);
}

export async function evaluateCriterion(
  projectRoot: string,
  criterion: MaturityCriterion,
): Promise<CriterionResult> {
  const failures: string[] = [];

  for (const check of criterion.checks) {
    if (check.type === 'file' && check.path) {
      const ok = await checkFile(projectRoot, check.path);
      if (!ok) failures.push(`Missing file: ${check.path}`);
    } else if (check.type === 'dir' && check.path) {
      const ok = await checkDir(projectRoot, check.path);
      if (!ok) failures.push(`Missing directory: ${check.path}`);
    } else if (check.type === 'files' && check.paths) {
      for (const filePath of check.paths) {
        const ok = await checkFile(projectRoot, filePath);
        if (!ok) failures.push(`Missing file: ${filePath}`);
      }
    } else if (check.type === 'dirs' && check.paths) {
      for (const dirPath of check.paths) {
        const ok = await checkDir(projectRoot, dirPath);
        if (!ok) failures.push(`Missing directory: ${dirPath}`);
      }
    } else if (check.type === 'dir_has_files' && check.path) {
      const ok = await checkDirHasFiles(projectRoot, check.path);
      if (!ok) failures.push(`No files found in directory: ${check.path}`);
    } else if (check.type === 'file_not_contains' && check.path && check.patterns) {
      const ok = await checkFileNotContains(projectRoot, check.path, check.patterns);
      if (!ok) {
        failures.push(`File contains disallowed placeholders: ${check.path}`);
      }
    } else {
      failures.push(`Invalid check definition for criterion: ${criterion.id}`);
    }
  }

  return {
    id: criterion.id,
    description: criterion.description,
    passed: failures.length === 0,
    failures,
  };
}

export async function runMaturityAssessment(
  projectRoot: string,
  criteriaPath: string,
): Promise<MaturityReport> {
  const criteria = await loadMaturityCriteria(criteriaPath);
  const levels = [...criteria.levels].sort((a, b) => a.level - b.level);

  const criteriaResults: CriterionResult[] = [];
  let currentLevel = levels[0];

  for (const level of levels) {
    if (level.criteria.length === 0) {
      currentLevel = level;
      continue;
    }

    const levelResults = await Promise.all(
      level.criteria.map((criterion) => evaluateCriterion(projectRoot, criterion)),
    );
    criteriaResults.push(...levelResults);

    const levelPassed = levelResults.every((result) => result.passed);
    if (levelPassed) {
      currentLevel = level;
    } else {
      break;
    }
  }

  const nextLevelIndex = levels.findIndex((level) => level.level === currentLevel.level) + 1;
  const nextLevel = nextLevelIndex < levels.length ? levels[nextLevelIndex] : null;

  return {
    criteriaVersion: criteria.version,
    assessedRoot: projectRoot,
    currentLevel,
    nextLevel,
    criteriaResults,
    timestamp: new Date().toISOString(),
  };
}
