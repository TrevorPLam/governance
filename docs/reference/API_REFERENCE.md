# API Reference

**Document Type:** Reference  
**Audience:** Developers, Tool Integrators, Extension Developers  
**Last Updated:** 2026-01-22

---

## Overview

This document provides comprehensive API reference for programmatically using the Governance CLI and its underlying utilities. Use these APIs to:

- Integrate governance validation into custom tools
- Build extensions and plugins
- Create custom CI/CD integrations
- Automate governance workflows
- Develop custom validators

**Location:** APIs are available in `@trevorplam/governance-cli` package  
**Language:** TypeScript/JavaScript (Node.js)

---

## Table of Contents

1. [Installation](#installation)
2. [Core APIs](#core-apis)
   - [Manifest API](#manifest-api)
   - [File Operations API](#file-operations-api)
   - [Template API](#template-api)
   - [Validation API](#validation-api)
3. [Type Definitions](#type-definitions)
4. [Extension Points](#extension-points)
5. [Integration Examples](#integration-examples)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

---

## Installation

### For Programmatic Use

```bash
# Install as a dependency
npm install @trevorplam/governance-cli

# Or with yarn
yarn add @trevorplam/governance-cli
```

### For Development/Extension

```bash
# Clone and install
git clone https://github.com/TrevorPLam/governance.git
cd governance/tools/governance-cli
npm install
npm run build
```

---

## Core APIs

### Manifest API

The Manifest API provides functions for reading, writing, and manipulating `repo.manifest.yaml` files.

#### `readManifest(projectRoot: string): Promise<RepoManifest | null>`

Reads and parses the manifest file from a project.

**Parameters:**
- `projectRoot` (string): Path to the project root directory

**Returns:**
- `Promise<RepoManifest | null>`: Parsed manifest object or null if not found

**Example:**
```typescript
import { readManifest } from '@trevorplam/governance-cli/utils/manifest';

async function checkManifest() {
  const manifest = await readManifest('/path/to/project');
  if (manifest) {
    console.log('Commands:', manifest.commands);
    console.log('Version:', manifest.governance.version);
  } else {
    console.log('No manifest found');
  }
}
```

**Throws:**
- `Error`: If manifest exists but cannot be parsed

---

#### `writeManifest(projectRoot: string, manifest: RepoManifest): Promise<void>`

Writes a manifest object to the project's manifest file.

**Parameters:**
- `projectRoot` (string): Path to the project root directory
- `manifest` (RepoManifest): Manifest object to write

**Returns:**
- `Promise<void>`

**Example:**
```typescript
import { readManifest, writeManifest } from '@trevorplam/governance-cli/utils/manifest';

async function updateManifest() {
  const manifest = await readManifest('/path/to/project');
  if (manifest) {
    // Update a command
    manifest.commands.install = 'pnpm install';
    await writeManifest('/path/to/project', manifest);
    console.log('Manifest updated');
  }
}
```

---

#### `detectProjectInfo(projectRoot: string): Promise<ProjectInfo>`

Auto-detects project type and configuration.

**Parameters:**
- `projectRoot` (string): Path to the project root directory

**Returns:**
- `Promise<ProjectInfo>`: Object containing detected project information

**Example:**
```typescript
import { detectProjectInfo } from '@trevorplam/governance-cli/utils/manifest';

async function analyzeProject() {
  const info = await detectProjectInfo('/path/to/project');
  console.log('Project name:', info.name);
  console.log('Project type:', info.type); // 'npm', 'yarn', 'pip', etc.
  console.log('Package manager:', info.packageManager);
  console.log('Has package.json:', info.hasPackageJson);
}
```

**Detected Project Types:**
- `npm` - Node.js with npm
- `yarn` - Node.js with Yarn
- `pip` - Python with pip
- `maven` - Java with Maven
- `gradle` - Java/Kotlin with Gradle
- `unknown` - Unrecognized project type

---

#### `autoFillManifest(projectRoot: string, manifest: RepoManifest): Promise<RepoManifest>`

Automatically fills manifest commands based on project configuration (e.g., package.json scripts).

**Parameters:**
- `projectRoot` (string): Path to the project root directory
- `manifest` (RepoManifest): Manifest object to auto-fill

**Returns:**
- `Promise<RepoManifest>`: Updated manifest with auto-filled commands

**Example:**
```typescript
import { autoFillManifest, readManifest, writeManifest } from '@trevorplam/governance-cli/utils/manifest';

async function smartInit() {
  let manifest = await readManifest('/path/to/project');
  if (manifest) {
    // Auto-fill based on package.json scripts
    manifest = await autoFillManifest('/path/to/project', manifest);
    await writeManifest('/path/to/project', manifest);
    console.log('Manifest auto-filled');
  }
}
```

**Auto-Fill Logic:**
- Detects package.json scripts and maps to canonical commands
- Detects Python pyproject.toml and suggests pip commands
- Detects Maven pom.xml and suggests mvn commands
- Preserves existing command values
- Leaves unknowable commands as placeholders

---

#### `hasPlaceholders(manifest: RepoManifest): boolean`

Checks if manifest contains placeholder values.

**Parameters:**
- `manifest` (RepoManifest): Manifest object to check

**Returns:**
- `boolean`: True if placeholders exist

**Example:**
```typescript
import { readManifest, hasPlaceholders } from '@trevorplam/governance-cli/utils/manifest';

async function checkCompletion() {
  const manifest = await readManifest('/path/to/project');
  if (manifest && hasPlaceholders(manifest)) {
    console.log('⚠️ Manifest has incomplete placeholders');
  }
}
```

---

#### `getPlaceholderCommands(manifest: RepoManifest): string[]`

Returns list of command names that have placeholder values.

**Parameters:**
- `manifest` (RepoManifest): Manifest object to check

**Returns:**
- `string[]`: Array of command names with placeholders

**Example:**
```typescript
import { readManifest, getPlaceholderCommands } from '@trevorplam/governance-cli/utils/manifest';

async function listIncomplete() {
  const manifest = await readManifest('/path/to/project');
  if (manifest) {
    const placeholders = getPlaceholderCommands(manifest);
    console.log('Incomplete commands:', placeholders);
    // Output: ['test:integration', 'build:prod']
  }
}
```

---

### File Operations API

The File Operations API provides utilities for file and directory management.

#### `fileExists(filePath: string): Promise<boolean>`

Checks if a file exists.

**Parameters:**
- `filePath` (string): Path to the file

**Returns:**
- `Promise<boolean>`: True if file exists

**Example:**
```typescript
import { fileExists } from '@trevorplam/governance-cli/utils/files';

async function checkGovernance() {
  const hasManifest = await fileExists('.repo/repo.manifest.yaml');
  if (hasManifest) {
    console.log('✓ Governance manifest found');
  }
}
```

---

#### `directoryExists(dirPath: string): Promise<boolean>`

Checks if a directory exists.

**Parameters:**
- `dirPath` (string): Path to the directory

**Returns:**
- `Promise<boolean>`: True if directory exists

**Example:**
```typescript
import { directoryExists } from '@trevorplam/governance-cli/utils/files';

async function checkStructure() {
  const hasRepo = await directoryExists('.repo');
  const hasPolicy = await directoryExists('.repo/policy');
  console.log('Has .repo:', hasRepo);
  console.log('Has policy:', hasPolicy);
}
```

---

#### `copyDirectory(src: string, dest: string): Promise<void>`

Recursively copies a directory.

**Parameters:**
- `src` (string): Source directory path
- `dest` (string): Destination directory path

**Returns:**
- `Promise<void>`

**Example:**
```typescript
import { copyDirectory } from '@trevorplam/governance-cli/utils/files';

async function backupGovernance() {
  await copyDirectory('.repo', '.repo.backup');
  console.log('Governance backed up');
}
```

**Options:**
- Does not overwrite existing files by default
- Creates destination directory if it doesn't exist

---

#### `copyFile(src: string, dest: string): Promise<void>`

Copies a single file.

**Parameters:**
- `src` (string): Source file path
- `dest` (string): Destination file path

**Returns:**
- `Promise<void>`

**Example:**
```typescript
import { copyFile } from '@trevorplam/governance-cli/utils/files';

async function copyManifest() {
  await copyFile('.repo/repo.manifest.yaml', '.repo/repo.manifest.backup.yaml');
  console.log('Manifest backed up');
}
```

---

#### `readFile(filePath: string): Promise<string>`

Reads a file as a UTF-8 string.

**Parameters:**
- `filePath` (string): Path to the file

**Returns:**
- `Promise<string>`: File contents

**Example:**
```typescript
import { readFile } from '@trevorplam/governance-cli/utils/files';

async function readPolicy() {
  const constitution = await readFile('.repo/policy/CONSTITUTION.md');
  console.log('Constitution length:', constitution.length);
}
```

---

#### `writeFile(filePath: string, content: string): Promise<void>`

Writes a string to a file as UTF-8.

**Parameters:**
- `filePath` (string): Path to the file
- `content` (string): Content to write

**Returns:**
- `Promise<void>`

**Example:**
```typescript
import { writeFile } from '@trevorplam/governance-cli/utils/files';

async function createDocument() {
  const content = '# My ADR\n\nDecision...';
  await writeFile('.repo/docs/adr/0001-my-decision.md', content);
  console.log('ADR created');
}
```

---

#### `readJsonFile<T>(filePath: string): Promise<T>`

Reads and parses a JSON file.

**Parameters:**
- `filePath` (string): Path to the JSON file
- `T` (type parameter): Expected type of the parsed JSON

**Returns:**
- `Promise<T>`: Parsed JSON object

**Example:**
```typescript
import { readJsonFile } from '@trevorplam/governance-cli/utils/files';

interface PackageJson {
  name: string;
  version: string;
  scripts?: Record<string, string>;
}

async function readPackage() {
  const pkg = await readJsonFile<PackageJson>('package.json');
  console.log('Project:', pkg.name);
  console.log('Version:', pkg.version);
}
```

---

#### `writeJsonFile(filePath: string, data: unknown): Promise<void>`

Writes an object to a JSON file with pretty formatting.

**Parameters:**
- `filePath` (string): Path to the JSON file
- `data` (unknown): Data to serialize

**Returns:**
- `Promise<void>`

**Example:**
```typescript
import { writeJsonFile } from '@trevorplam/governance-cli/utils/files';

async function createConfig() {
  const config = {
    governance: {
      enabled: true,
      tier: 'standard',
    },
  };
  await writeJsonFile('.governance.json', config);
}
```

**Formatting:**
- Uses 2-space indentation
- Includes trailing newline

---

#### `ensureDirectory(dirPath: string): Promise<void>`

Creates a directory if it doesn't exist (including parent directories).

**Parameters:**
- `dirPath` (string): Path to the directory

**Returns:**
- `Promise<void>`

**Example:**
```typescript
import { ensureDirectory } from '@trevorplam/governance-cli/utils/files';

async function createStructure() {
  await ensureDirectory('.repo/hitl/pending');
  await ensureDirectory('.repo/waivers/active');
  console.log('Folders created');
}
```

---

#### `getProjectRoot(startDir?: string): Promise<string | null>`

Finds the project root by looking for package.json, pyproject.toml, or pom.xml.

**Parameters:**
- `startDir` (string, optional): Directory to start searching from (defaults to cwd)

**Returns:**
- `Promise<string | null>`: Project root path or null if not found

**Example:**
```typescript
import { getProjectRoot } from '@trevorplam/governance-cli/utils/files';

async function findRoot() {
  const root = await getProjectRoot();
  if (root) {
    console.log('Project root:', root);
  } else {
    console.log('Not in a project directory');
  }
}
```

**Search Order:**
1. Looks for package.json (Node.js)
2. Looks for pyproject.toml (Python)
3. Looks for pom.xml (Maven/Java)
4. Returns null if none found

---

### Template API

The Template API provides functions for working with governance templates.

#### `copyTemplates(projectRoot: string, tier: Tier): Promise<void>`

Copies governance templates to a project based on selected tier.

**Parameters:**
- `projectRoot` (string): Path to the project root directory
- `tier` (Tier): Tier level (Minimal, Standard, or Complete)

**Returns:**
- `Promise<void>`

**Example:**
```typescript
import { copyTemplates, Tier } from '@trevorplam/governance-cli';

async function initGovernance() {
  await copyTemplates('/path/to/project', Tier.Standard);
  console.log('Templates copied');
}
```

**Tier Behavior:**
- **Minimal**: Core files only (policies, manifest, VERSION, GOVERNANCE.md)
- **Standard**: + agents, templates, docs
- **Complete**: + automation scripts

---

#### `copyRootFiles(projectRoot: string): Promise<void>`

Copies root-level TODO template files to a project.

**Parameters:**
- `projectRoot` (string): Path to the project root directory

**Returns:**
- `Promise<void>`

**Example:**
```typescript
import { copyRootFiles } from '@trevorplam/governance-cli/utils/templates';

async function addTodoFiles() {
  await copyRootFiles('/path/to/project');
  console.log('TODO files added');
}
```

**Files Copied:**
- P0TODO.md (urgent/blocking tasks)
- P1TODO.md (high priority tasks)
- P2TODO.md (normal priority tasks)
- COMPLETEDTODO.md (completed tasks archive)

---

#### `getTemplateVersion(): Promise<string>`

Gets the version of the governance templates.

**Parameters:** None

**Returns:**
- `Promise<string>`: Template version (e.g., "1.0.0")

**Example:**
```typescript
import { getTemplateVersion } from '@trevorplam/governance-cli/utils/templates';

async function checkVersion() {
  const version = await getTemplateVersion();
  console.log('Template version:', version);
}
```

---

#### `getInstalledVersion(projectRoot: string): Promise<string | null>`

Gets the installed governance version in a project.

**Parameters:**
- `projectRoot` (string): Path to the project root directory

**Returns:**
- `Promise<string | null>`: Installed version or null if not installed

**Example:**
```typescript
import { getTemplateVersion, getInstalledVersion } from '@trevorplam/governance-cli/utils/templates';

async function checkUpdateAvailable() {
  const installed = await getInstalledVersion('/path/to/project');
  const latest = await getTemplateVersion();
  
  if (installed && installed !== latest) {
    console.log(`Update available: ${installed} → ${latest}`);
  }
}
```

---

#### `getFilesForTier(tier: Tier): TierConfig`

Gets configuration for which files to include based on tier.

**Parameters:**
- `tier` (Tier): Tier level

**Returns:**
- `TierConfig`: Object with boolean flags for each component

**Example:**
```typescript
import { getFilesForTier, Tier } from '@trevorplam/governance-cli/utils/templates';

function showTierConfig() {
  const config = getFilesForTier(Tier.Standard);
  console.log('Include agents:', config.includeAgents); // true
  console.log('Include templates:', config.includeTemplates); // true
  console.log('Include docs:', config.includeDocs); // true
  console.log('Include automation:', config.includeAutomation); // false
}
```

---

### Validation API

The Validation API provides programmatic access to validation logic.

#### Validation Functions

**Note:** Validation functions are currently implemented as part of the CLI command. For programmatic validation, you can import and use the command handler:

**Example:**
```typescript
import { validateCommand } from '@trevorplam/governance-cli/commands/validate';

async function runValidation() {
  try {
    await validateCommand({ verbose: true });
    console.log('Validation completed');
  } catch (error) {
    console.error('Validation failed:', error);
  }
}
```

#### Custom Validation

You can build custom validators using the file and manifest APIs:

**Example:**
```typescript
import { readManifest, hasPlaceholders } from '@trevorplam/governance-cli/utils/manifest';
import { fileExists } from '@trevorplam/governance-cli/utils/files';

async function customValidation(projectRoot: string): Promise<boolean> {
  // Check manifest exists
  const manifest = await readManifest(projectRoot);
  if (!manifest) {
    console.error('No manifest found');
    return false;
  }

  // Check for placeholders
  if (hasPlaceholders(manifest)) {
    console.warn('Manifest has placeholders');
  }

  // Check required files
  const requiredFiles = [
    '.repo/policy/CONSTITUTION.md',
    '.repo/policy/PRINCIPLES.md',
  ];

  for (const file of requiredFiles) {
    if (!(await fileExists(`${projectRoot}/${file}`))) {
      console.error(`Missing file: ${file}`);
      return false;
    }
  }

  return true;
}
```

---

## Type Definitions

### Core Types

#### `RepoManifest`

```typescript
interface RepoManifest {
  governance: {
    version: string;
    framework: string;
  };
  commands: {
    install?: string;
    'check:quick'?: string;
    'check:ci'?: string;
    'test:all'?: string;
    'test:unit'?: string;
    'test:integration'?: string;
    'lint:check'?: string;
    'lint:fix'?: string;
    build?: string;
    'build:prod'?: string;
    dev?: string;
  };
  verify_profiles?: {
    quick?: string[];
    ci?: string[];
    release?: string[];
  };
  boundaries?: {
    layers?: Record<string, string[]>;
    features?: string[];
  };
  security?: {
    hitl_triggers?: string[];
    forbidden_patterns?: string[];
  };
}
```

#### `ProjectInfo`

```typescript
interface ProjectInfo {
  name: string;
  path: string;
  type?: 'npm' | 'yarn' | 'pip' | 'maven' | 'gradle' | 'unknown';
  packageManager?: string;
  hasPackageJson?: boolean;
  hasPyprojectToml?: boolean;
  hasPomXml?: boolean;
}
```

#### `ValidationResult`

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  type: string;
  message: string;
  file?: string;
  line?: number;
  suggestion?: string;
}

interface ValidationWarning {
  type: string;
  message: string;
  file?: string;
  line?: number;
}
```

#### `VerificationResult`

```typescript
interface VerificationResult {
  passed: boolean;
  checks: CheckResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
}

interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
  details?: string;
}
```

#### `Tier`

```typescript
enum Tier {
  Minimal = 'minimal',
  Standard = 'standard',
  Complete = 'complete',
}
```

#### `WaiverInfo`

```typescript
interface WaiverInfo {
  id: string;
  policy: string;
  reason: string;
  requestor: string;
  approver?: string;
  expirationDate?: string;
  status: 'active' | 'expired' | 'archived';
  createdAt: string;
}
```

#### `HitlInfo`

```typescript
interface HitlInfo {
  id: string;
  type: string;
  description: string;
  requestor: string;
  resolver?: string;
  status: 'pending' | 'resolved' | 'escalated';
  createdAt: string;
  resolvedAt?: string;
}
```

---

## Extension Points

The Governance CLI is designed to be extensible. Here are common extension points:

### Custom Commands

Add custom commands to the CLI:

```typescript
// custom-command.ts
import { Command } from 'commander';

export function registerCustomCommand(program: Command) {
  program
    .command('custom')
    .description('My custom governance command')
    .action(async () => {
      console.log('Running custom command');
      // Your logic here
    });
}
```

### Custom Validators

Create custom validation logic:

```typescript
// custom-validator.ts
import { ValidationResult } from '@trevorplam/governance-cli/types';

export async function validateCustomPolicy(
  projectRoot: string
): Promise<ValidationResult> {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  // Your custom validation logic
  // ...

  return result;
}
```

### Custom Templates

Extend template copying with custom files:

```typescript
// custom-templates.ts
import { copyFile, ensureDirectory } from '@trevorplam/governance-cli/utils/files';

export async function copyCustomTemplates(projectRoot: string) {
  await ensureDirectory(`${projectRoot}/.repo/custom`);
  await copyFile(
    '/path/to/custom/template.md',
    `${projectRoot}/.repo/custom/template.md`
  );
}
```

### Pre/Post Hooks

Add hooks to CLI commands:

```typescript
// hooks.ts
export async function preInit(projectRoot: string) {
  console.log('Pre-init hook running...');
  // Preparation logic
}

export async function postInit(projectRoot: string) {
  console.log('Post-init hook running...');
  // Cleanup or additional setup
}
```

---

## Integration Examples

### CI/CD Integration

```typescript
// ci-integration.ts
import { validateCommand } from '@trevorplam/governance-cli/commands/validate';
import { verifyCommand } from '@trevorplam/governance-cli/commands/verify';

async function runCIChecks() {
  console.log('Running governance checks in CI...');
  
  try {
    // Validate configuration
    await validateCommand({ verbose: false });
    
    // Run verification
    await verifyCommand({ profile: 'ci' });
    
    console.log('✓ All governance checks passed');
    process.exit(0);
  } catch (error) {
    console.error('✗ Governance checks failed');
    process.exit(1);
  }
}

runCIChecks();
```

### Custom Build Tool Integration

```typescript
// build-integration.ts
import { readManifest } from '@trevorplam/governance-cli/utils/manifest';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runBuildWithGovernance() {
  const manifest = await readManifest(process.cwd());
  
  if (!manifest) {
    throw new Error('No governance manifest found');
  }

  // Run pre-build checks
  if (manifest.commands['check:quick']) {
    console.log('Running pre-build checks...');
    await execAsync(manifest.commands['check:quick']);
  }

  // Run build
  if (manifest.commands.build) {
    console.log('Building project...');
    await execAsync(manifest.commands.build);
  }

  console.log('Build completed successfully');
}

runBuildWithGovernance();
```

### Monitoring Integration

```typescript
// monitoring.ts
import { readManifest, hasPlaceholders } from '@trevorplam/governance-cli/utils/manifest';
import { getInstalledVersion, getTemplateVersion } from '@trevorplam/governance-cli/utils/templates';

async function collectGovernanceMetrics() {
  const projectRoot = process.cwd();
  const manifest = await readManifest(projectRoot);
  
  const metrics = {
    governanceEnabled: !!manifest,
    hasPlaceholders: manifest ? hasPlaceholders(manifest) : false,
    installedVersion: await getInstalledVersion(projectRoot),
    latestVersion: await getTemplateVersion(),
    timestamp: new Date().toISOString(),
  };

  // Send to monitoring system
  console.log('Governance Metrics:', metrics);
  // await sendToMonitoring(metrics);
}

// Run periodically
setInterval(collectGovernanceMetrics, 3600000); // Every hour
```

### IDE Extension Integration

```typescript
// ide-extension.ts
import { readManifest, getPlaceholderCommands } from '@trevorplam/governance-cli/utils/manifest';

async function getManifestDiagnostics(projectRoot: string) {
  const manifest = await readManifest(projectRoot);
  const diagnostics = [];

  if (!manifest) {
    return [{
      severity: 'error',
      message: 'No governance manifest found',
      file: '.repo/repo.manifest.yaml',
    }];
  }

  // Check for placeholders
  const placeholders = getPlaceholderCommands(manifest);
  for (const cmd of placeholders) {
    diagnostics.push({
      severity: 'warning',
      message: `Command "${cmd}" has placeholder value`,
      file: '.repo/repo.manifest.yaml',
    });
  }

  return diagnostics;
}
```

---

## Error Handling

### Common Error Patterns

#### File Not Found

```typescript
import { readManifest } from '@trevorplam/governance-cli/utils/manifest';

async function safeReadManifest(projectRoot: string) {
  try {
    const manifest = await readManifest(projectRoot);
    if (!manifest) {
      console.log('Manifest not found - governance not initialized');
      return null;
    }
    return manifest;
  } catch (error) {
    console.error('Error reading manifest:', error.message);
    return null;
  }
}
```

#### Invalid YAML

```typescript
import { readFile } from '@trevorplam/governance-cli/utils/files';
import * as yaml from 'js-yaml';

async function safeParseYaml(filePath: string) {
  try {
    const content = await readFile(filePath);
    return yaml.load(content);
  } catch (error) {
    if (error.name === 'YAMLException') {
      console.error('Invalid YAML syntax:', error.message);
    } else {
      console.error('Error reading file:', error.message);
    }
    return null;
  }
}
```

#### Permission Errors

```typescript
import { copyFile } from '@trevorplam/governance-cli/utils/files';

async function safeCopyFile(src: string, dest: string) {
  try {
    await copyFile(src, dest);
    return true;
  } catch (error) {
    if (error.code === 'EACCES') {
      console.error('Permission denied:', dest);
    } else if (error.code === 'ENOENT') {
      console.error('File not found:', src);
    } else {
      console.error('Copy failed:', error.message);
    }
    return false;
  }
}
```

---

## Best Practices

### 1. Always Check for Null/Undefined

```typescript
const manifest = await readManifest(projectRoot);
if (!manifest) {
  // Handle missing manifest
  return;
}
// Use manifest safely
```

### 2. Use Project Root Detection

```typescript
import { getProjectRoot } from '@trevorplam/governance-cli/utils/files';

const projectRoot = await getProjectRoot() || process.cwd();
```

### 3. Validate Before Operations

```typescript
import { hasPlaceholders } from '@trevorplam/governance-cli/utils/manifest';

const manifest = await readManifest(projectRoot);
if (manifest && hasPlaceholders(manifest)) {
  console.warn('Manifest has incomplete configuration');
  // Decide whether to proceed
}
```

### 4. Use Proper Error Handling

```typescript
try {
  await copyTemplates(projectRoot, Tier.Standard);
} catch (error) {
  console.error('Failed to copy templates:', error);
  // Cleanup or rollback
}
```

### 5. Respect Tier Configurations

```typescript
import { getFilesForTier, Tier } from '@trevorplam/governance-cli/utils/templates';

const config = getFilesForTier(Tier.Minimal);
if (config.includeAgents) {
  // Only copy agent files if tier includes them
}
```

### 6. Version Compatibility

```typescript
const installed = await getInstalledVersion(projectRoot);
const latest = await getTemplateVersion();

if (installed && compareVersions(installed, latest) < 0) {
  console.log('Update recommended');
}
```

### 7. Idempotent Operations

```typescript
import { fileExists, copyFile } from '@trevorplam/governance-cli/utils/files';

async function idempotentCopy(src: string, dest: string) {
  if (await fileExists(dest)) {
    console.log('File already exists, skipping');
    return;
  }
  await copyFile(src, dest);
}
```

### 8. Clear User Feedback

```typescript
import chalk from 'chalk';

async function operationWithFeedback() {
  console.log(chalk.blue('Starting operation...'));
  // Do work
  console.log(chalk.green('✓ Operation completed'));
}
```

---

## See Also

- [CLI Reference](./CLI_REFERENCE.md) - Command-line interface documentation
- [Manifest Reference](./MANIFEST_REFERENCE.md) - Manifest file format
- [Policy Reference](./POLICY_REFERENCE.md) - Governance policies
- [How to Integrate CI/CD](../guides/HOW_TO_INTEGRATE_CI_CD.md) - CI/CD integration guide

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
