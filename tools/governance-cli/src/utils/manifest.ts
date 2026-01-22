import * as yaml from 'js-yaml';
import * as path from 'path';
import { readFile, writeFile, fileExists, readJsonFile } from './files';
import { RepoManifest, ProjectInfo } from '../types';

/**
 * Utility functions for manifest operations
 */

/**
 * Read manifest file
 */
export async function readManifest(projectRoot: string): Promise<RepoManifest | null> {
  const manifestPath = path.join(projectRoot, '.repo', 'repo.manifest.yaml');
  
  if (!(await fileExists(manifestPath))) {
    return null;
  }

  try {
    const content = await readFile(manifestPath);
    return yaml.load(content) as RepoManifest;
  } catch (error) {
    throw new Error(`Failed to parse manifest: ${(error as Error).message}`);
  }
}

/**
 * Write manifest file
 */
export async function writeManifest(projectRoot: string, manifest: RepoManifest): Promise<void> {
  const manifestPath = path.join(projectRoot, '.repo', 'repo.manifest.yaml');
  const content = yaml.dump(manifest, {
    indent: 2,
    lineWidth: 100,
    noRefs: true,
  });
  await writeFile(manifestPath, content);
}

/**
 * Detect project type and info
 */
export async function detectProjectInfo(projectRoot: string): Promise<ProjectInfo> {
  const info: ProjectInfo = {
    name: path.basename(projectRoot),
    path: projectRoot,
  };

  // Check for Node.js projects
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (await fileExists(packageJsonPath)) {
    info.hasPackageJson = true;
    try {
      const packageJson = await readJsonFile<{ name?: string }>(packageJsonPath);
      if (packageJson.name) {
        info.name = packageJson.name;
      }
      
      // Detect package manager
      if (await fileExists(path.join(projectRoot, 'yarn.lock'))) {
        info.type = 'yarn';
        info.packageManager = 'yarn';
      } else if (await fileExists(path.join(projectRoot, 'package-lock.json'))) {
        info.type = 'npm';
        info.packageManager = 'npm';
      } else {
        info.type = 'npm';
        info.packageManager = 'npm';
      }
    } catch {
      info.type = 'npm';
    }
  }

  // Check for Python projects
  const pyprojectPath = path.join(projectRoot, 'pyproject.toml');
  if (await fileExists(pyprojectPath)) {
    info.hasPyprojectToml = true;
    info.type = 'pip';
    info.packageManager = 'pip';
  }

  // Check for Maven projects
  const pomXmlPath = path.join(projectRoot, 'pom.xml');
  if (await fileExists(pomXmlPath)) {
    info.hasPomXml = true;
    info.type = 'maven';
    info.packageManager = 'mvn';
  }

  // Check for Gradle projects
  const buildGradlePath = path.join(projectRoot, 'build.gradle');
  if (await fileExists(buildGradlePath)) {
    info.type = 'gradle';
    info.packageManager = 'gradle';
  }

  return info;
}

/**
 * Auto-fill manifest from project configuration
 */
export async function autoFillManifest(
  projectRoot: string,
  manifest: RepoManifest,
): Promise<RepoManifest> {
  const info = await detectProjectInfo(projectRoot);

  // Fill based on package.json for Node.js projects
  if (info.hasPackageJson) {
    try {
      const packageJson = await readJsonFile<{ scripts?: Record<string, string> }>(
        path.join(projectRoot, 'package.json'),
      );

      if (packageJson.scripts) {
        const scripts = packageJson.scripts;

        // Map common script names to manifest commands
        if (scripts.install || scripts.postinstall) {
          manifest.commands.install = info.packageManager === 'yarn' ? 'yarn install' : 'npm install';
        } else {
          manifest.commands.install = info.packageManager === 'yarn' ? 'yarn install' : 'npm install';
        }

        if (scripts.test) {
          manifest.commands['test:all'] = `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}test`;
        }

        if (scripts['test:unit']) {
          manifest.commands['test:unit'] = `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}test:unit`;
        }

        if (scripts['test:integration']) {
          manifest.commands['test:integration'] = `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}test:integration`;
        }

        if (scripts.lint) {
          manifest.commands['lint:check'] = `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}lint`;
        }

        if (scripts['lint:fix']) {
          manifest.commands['lint:fix'] = `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}lint:fix`;
        }

        if (scripts.build) {
          manifest.commands.build = `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}build`;
        }

        if (scripts['build:prod']) {
          manifest.commands['build:prod'] = `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}build:prod`;
        }

        if (scripts.dev || scripts.start) {
          manifest.commands.dev = scripts.dev
            ? `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}dev`
            : `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}start`;
        }

        // Set up check commands
        if (scripts.test && scripts.lint) {
          manifest.commands['check:quick'] = `${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}lint && ${info.packageManager} ${info.packageManager === 'yarn' ? '' : 'run '}test`;
          manifest.commands['check:ci'] = manifest.commands['check:quick'];
        }
      }
    } catch (error) {
      console.warn('Failed to auto-fill from package.json:', (error as Error).message);
    }
  }

  // Fill based on pyproject.toml for Python projects
  if (info.hasPyprojectToml) {
    manifest.commands.install = manifest.commands.install || 'pip install -e .';
    manifest.commands['test:all'] = manifest.commands['test:all'] || 'pytest';
    manifest.commands['lint:check'] = manifest.commands['lint:check'] || 'ruff check .';
    manifest.commands['lint:fix'] = manifest.commands['lint:fix'] || 'ruff check --fix .';
  }

  // Fill based on pom.xml for Maven projects
  if (info.hasPomXml) {
    manifest.commands.install = manifest.commands.install || 'mvn install';
    manifest.commands['test:all'] = manifest.commands['test:all'] || 'mvn test';
    manifest.commands.build = manifest.commands.build || 'mvn package';
    manifest.commands['check:ci'] = manifest.commands['check:ci'] || 'mvn verify';
  }

  return manifest;
}

/**
 * Check if manifest has placeholders
 */
export function hasPlaceholders(manifest: RepoManifest): boolean {
  const manifestStr = JSON.stringify(manifest);
  return manifestStr.includes('<FILL_FROM_REPO>') || manifestStr.includes('<UNKNOWN>');
}

/**
 * Get list of placeholder commands
 */
export function getPlaceholderCommands(manifest: RepoManifest): string[] {
  const placeholders: string[] = [];
  
  for (const [key, value] of Object.entries(manifest.commands)) {
    if (typeof value === 'string' && (value.includes('<FILL_FROM_REPO>') || value.includes('<UNKNOWN>'))) {
      placeholders.push(key);
    }
  }
  
  return placeholders;
}
