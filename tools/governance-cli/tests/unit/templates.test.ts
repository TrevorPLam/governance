import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs-extra';
import * as path from 'path';
import { getTemplateDir, getRepoTemplateDir } from '../../src/utils/files';

describe('Template Utilities', () => {
  it('should find template directory', () => {
    const templateDir = getTemplateDir();
    expect(templateDir).toBeDefined();
    expect(typeof templateDir).toBe('string');
    expect(fs.existsSync(templateDir)).toBe(true);
  });

  it('should find .repo template directory', () => {
    const repoTemplateDir = getRepoTemplateDir();
    expect(repoTemplateDir).toBeDefined();
    expect(fs.existsSync(repoTemplateDir)).toBe(true);
  });

  it('should have required policy files', () => {
    const repoTemplateDir = getRepoTemplateDir();
    const policyFiles = [
      'CONSTITUTION.md',
      'PRINCIPLES.md',
      'QUALITY_GATES.md',
      'SECURITY_BASELINE.md',
      'BOUNDARIES.md',
      'HITL.md',
      'WAIVERS.md',
    ];

    for (const file of policyFiles) {
      const filePath = path.join(repoTemplateDir, 'policy', file);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  it('should include advanced governance folders', () => {
    const repoTemplateDir = getRepoTemplateDir();
    const expectedPaths = [
      'metrics/metrics.config.json',
      'hitl/active.json',
      'hitl/archive.json',
      'waivers/active.json',
      'waivers/archive.json',
      'audit/audit.log.jsonl',
    ];

    for (const relativePath of expectedPaths) {
      const filePath = path.join(repoTemplateDir, relativePath);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });
});
