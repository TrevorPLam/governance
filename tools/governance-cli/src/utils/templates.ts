import * as path from 'path';
import { copyDirectory, copyFile, getRepoTemplateDir, getRootFilesTemplateDir, ensureDirectory } from './files';
import { Tier } from '../types';

/**
 * Utility functions for template operations
 */

/**
 * Get files to copy based on tier
 */
export function getFilesForTier(tier: Tier): {
  includeAgents: boolean;
  includeTemplates: boolean;
  includeDocs: boolean;
  includeAutomation: boolean;
} {
  switch (tier) {
    case Tier.Minimal:
      return {
        includeAgents: false,
        includeTemplates: false,
        includeDocs: false,
        includeAutomation: false,
      };
    case Tier.Standard:
      return {
        includeAgents: true,
        includeTemplates: true,
        includeDocs: true,
        includeAutomation: false,
      };
    case Tier.Complete:
      return {
        includeAgents: true,
        includeTemplates: true,
        includeDocs: true,
        includeAutomation: true,
      };
    default:
      return {
        includeAgents: false,
        includeTemplates: false,
        includeDocs: false,
        includeAutomation: false,
      };
  }
}

/**
 * Copy templates to project based on tier
 */
export async function copyTemplates(projectRoot: string, tier: Tier): Promise<void> {
  const repoTemplateDir = getRepoTemplateDir();
  const destRepoDir = path.join(projectRoot, '.repo');
  
  // Ensure destination exists
  await ensureDirectory(destRepoDir);

  const config = getFilesForTier(tier);

  // Always copy core files (policy, manifest, VERSION, GOVERNANCE.md)
  await copyDirectory(path.join(repoTemplateDir, 'policy'), path.join(destRepoDir, 'policy'));
  await copyFile(
    path.join(repoTemplateDir, 'repo.manifest.yaml'),
    path.join(destRepoDir, 'repo.manifest.yaml'),
  );
  await copyFile(
    path.join(repoTemplateDir, 'VERSION'),
    path.join(destRepoDir, 'VERSION'),
  );
  await copyFile(
    path.join(repoTemplateDir, 'GOVERNANCE.md'),
    path.join(destRepoDir, 'GOVERNANCE.md'),
  );
  await copyFile(
    path.join(repoTemplateDir, 'README.md'),
    path.join(destRepoDir, 'README.md'),
  );

  // Copy based on tier
  if (config.includeAgents) {
    await copyDirectory(path.join(repoTemplateDir, 'agents'), path.join(destRepoDir, 'agents'));
  }

  if (config.includeTemplates) {
    await copyDirectory(path.join(repoTemplateDir, 'templates'), path.join(destRepoDir, 'templates'));
  }

  if (config.includeDocs) {
    await copyDirectory(path.join(repoTemplateDir, 'docs'), path.join(destRepoDir, 'docs'));
  }

  if (config.includeAutomation) {
    await copyDirectory(path.join(repoTemplateDir, 'automation'), path.join(destRepoDir, 'automation'));
  }

  // Create tracking folders
  await ensureDirectory(path.join(destRepoDir, 'hitl'));
  await ensureDirectory(path.join(destRepoDir, 'waivers'));
  await ensureDirectory(path.join(destRepoDir, 'archive'));
}

/**
 * Copy root files (TODO templates)
 */
export async function copyRootFiles(projectRoot: string): Promise<void> {
  const rootFilesDir = getRootFilesTemplateDir();
  
  await copyFile(
    path.join(rootFilesDir, 'P0TODO.md'),
    path.join(projectRoot, 'P0TODO.md'),
  );
  await copyFile(
    path.join(rootFilesDir, 'P1TODO.md'),
    path.join(projectRoot, 'P1TODO.md'),
  );
  await copyFile(
    path.join(rootFilesDir, 'P2TODO.md'),
    path.join(projectRoot, 'P2TODO.md'),
  );
  await copyFile(
    path.join(rootFilesDir, 'COMPLETEDTODO.md'),
    path.join(projectRoot, 'COMPLETEDTODO.md'),
  );
}

/**
 * Get template version
 */
export async function getTemplateVersion(): Promise<string> {
  const { readFile, fileExists } = await import('./files');
  const versionPath = path.join(getRepoTemplateDir(), 'VERSION');
  
  if (await fileExists(versionPath)) {
    const content = await readFile(versionPath);
    return content.trim().split('\n')[0] || '1.0.0';
  }
  
  return '1.0.0';
}

/**
 * Get installed governance version
 */
export async function getInstalledVersion(projectRoot: string): Promise<string | null> {
  const { readFile, fileExists } = await import('./files');
  const versionPath = path.join(projectRoot, '.repo', 'VERSION');
  
  if (!(await fileExists(versionPath))) {
    return null;
  }
  
  try {
    const content = await readFile(versionPath);
    return content.trim().split('\n')[0] || null;
  } catch {
    return null;
  }
}
