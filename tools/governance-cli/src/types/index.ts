/**
 * Type definitions for governance-cli
 */

export interface RepoManifest {
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

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: string;
  message: string;
  file?: string;
  line?: number;
  suggestion?: string;
}

export interface ValidationWarning {
  type: string;
  message: string;
  file?: string;
  line?: number;
}

export interface VerificationResult {
  passed: boolean;
  checks: CheckResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
}

export interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
  details?: string;
}

export interface InitOptions {
  projectName?: string;
  tier?: 'minimal' | 'standard' | 'complete';
  autoFill?: boolean;
  interactive?: boolean;
}

export interface UpdateOptions {
  dryRun?: boolean;
  force?: boolean;
  backup?: boolean;
}

export enum Tier {
  Minimal = 'minimal',
  Standard = 'standard',
  Complete = 'complete',
}

export interface ProjectInfo {
  name: string;
  path: string;
  type?: 'npm' | 'yarn' | 'pip' | 'maven' | 'gradle' | 'unknown';
  packageManager?: string;
  hasPackageJson?: boolean;
  hasPyprojectToml?: boolean;
  hasPomXml?: boolean;
}

export interface WaiverInfo {
  id: string;
  policy: string;
  reason: string;
  requestor: string;
  approver?: string;
  expirationDate?: string;
  status: 'active' | 'expired' | 'archived';
  createdAt: string;
}

export interface HitlInfo {
  id: string;
  type: string;
  description: string;
  requestor: string;
  resolver?: string;
  status: 'pending' | 'resolved' | 'escalated';
  createdAt: string;
  resolvedAt?: string;
}
