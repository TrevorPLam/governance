import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Utility functions for file operations
 */

/**
 * Check if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a directory exists
 */
export async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Copy directory recursively
 */
export async function copyDirectory(src: string, dest: string): Promise<void> {
  await fs.copy(src, dest, {
    overwrite: false,
    errorOnExist: false,
  });
}

/**
 * Copy file
 */
export async function copyFile(src: string, dest: string): Promise<void> {
  await fs.copy(src, dest, {
    overwrite: false,
  });
}

/**
 * Read file as string
 */
export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8');
}

/**
 * Write string to file
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Read JSON file
 */
export async function readJsonFile<T = unknown>(filePath: string): Promise<T> {
  const content = await readFile(filePath);
  return JSON.parse(content) as T;
}

/**
 * Write JSON file
 */
export async function writeJsonFile(filePath: string, data: unknown): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  await writeFile(filePath, content);
}

/**
 * Create directory if it doesn't exist
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

/**
 * Get template directory path
 */
export function getTemplateDir(): string {
  // Assume templates are in the governance repo root, two levels up from this CLI
  return path.resolve(__dirname, '../../../templates');
}

/**
 * Get .repo template path
 */
export function getRepoTemplateDir(): string {
  return path.join(getTemplateDir(), '.repo');
}

/**
 * Get root-files template path
 */
export function getRootFilesTemplateDir(): string {
  return path.join(getTemplateDir(), 'root-files');
}

/**
 * Find file in parent directories
 */
export async function findFileInParents(
  fileName: string,
  startDir: string = process.cwd(),
): Promise<string | null> {
  let currentDir = path.resolve(startDir);
  const root = path.parse(currentDir).root;

  while (currentDir !== root) {
    const filePath = path.join(currentDir, fileName);
    if (await fileExists(filePath)) {
      return filePath;
    }
    currentDir = path.dirname(currentDir);
  }

  // Check root
  const rootFilePath = path.join(root, fileName);
  if (await fileExists(rootFilePath)) {
    return rootFilePath;
  }

  return null;
}

/**
 * Get project root (directory containing package.json, pyproject.toml, etc.)
 */
export async function getProjectRoot(startDir: string = process.cwd()): Promise<string | null> {
  const packageJson = await findFileInParents('package.json', startDir);
  if (packageJson) {
    return path.dirname(packageJson);
  }

  const pyproject = await findFileInParents('pyproject.toml', startDir);
  if (pyproject) {
    return path.dirname(pyproject);
  }

  const pomXml = await findFileInParents('pom.xml', startDir);
  if (pomXml) {
    return path.dirname(pomXml);
  }

  return null;
}
