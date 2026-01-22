import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Utility functions for git operations
 */

/**
 * Check if directory is a git repository
 */
export async function isGitRepository(cwd: string = process.cwd()): Promise<boolean> {
  try {
    await execAsync('git rev-parse --git-dir', { cwd });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get git root directory
 */
export async function getGitRoot(cwd: string = process.cwd()): Promise<string | null> {
  try {
    const { stdout } = await execAsync('git rev-parse --show-toplevel', { cwd });
    return stdout.trim();
  } catch {
    return null;
  }
}

/**
 * Check if there are uncommitted changes
 */
export async function hasUncommittedChanges(cwd: string = process.cwd()): Promise<boolean> {
  try {
    const { stdout } = await execAsync('git status --porcelain', { cwd });
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

/**
 * Get current branch name
 */
export async function getCurrentBranch(cwd: string = process.cwd()): Promise<string | null> {
  try {
    const { stdout } = await execAsync('git branch --show-current', { cwd });
    return stdout.trim();
  } catch {
    return null;
  }
}

/**
 * Add file to .gitignore
 */
export async function addToGitignore(
  pattern: string,
  gitignorePath: string,
): Promise<void> {
  const fs = await import('fs-extra');
  let content = '';
  
  try {
    content = await fs.readFile(gitignorePath, 'utf-8');
  } catch {
    // File doesn't exist, will be created
  }

  // Check if pattern already exists as a complete line
  const lines = content.split('\n');
  if (lines.some(line => line.trim() === pattern)) {
    return;
  }

  // Add pattern as a new line
  const newContent = content + (content.endsWith('\n') || content === '' ? '' : '\n') + pattern + '\n';
  await fs.writeFile(gitignorePath, newContent, 'utf-8');
}
