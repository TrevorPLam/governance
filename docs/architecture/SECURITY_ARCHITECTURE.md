# Security Architecture

**Document Type:** Architecture  
**Audience:** Security Engineers, Architects, Compliance Officers  
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Overview](#overview)
2. [Security Model](#security-model)
3. [Threat Model](#threat-model)
4. [Security Boundaries](#security-boundaries)
5. [Secret Management](#secret-management)
6. [Audit Logging](#audit-logging)
7. [Security Review Process](#security-review-process)
8. [Vulnerability Management](#vulnerability-management)
9. [Compliance](#compliance)

---

## Overview

The Security Architecture defines how the governance framework maintains security across repositories, ensuring that security policies are enforced, vulnerabilities are managed, and all security-relevant actions are auditable.

### Security Principles

1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Minimal permissions by default
3. **Fail Secure**: Unknown situations default to secure state (HITL)
4. **Audit Everything**: Complete audit trail of security-relevant actions
5. **Human Oversight**: Critical security decisions require human approval
6. **No Secrets in Code**: Secrets never committed or logged
7. **Continuous Validation**: Security checks on every PR
8. **Zero Trust**: Verify all actions against policies

### Security Objectives

- **Confidentiality**: Protect sensitive data and secrets
- **Integrity**: Ensure code and data are not tampered with
- **Availability**: Maintain system availability and resilience
- **Auditability**: Track all security-relevant actions
- **Compliance**: Meet regulatory and organizational requirements

---

## Security Model

### Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│  (Source code, tests, configuration)                    │
└─────────────────────────────────────────────────────────┘
                        │ Protected by
                        ▼
┌─────────────────────────────────────────────────────────┐
│                 Governance Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Security   │  │   Agent     │  │   HITL      │    │
│  │  Baseline   │  │   Rules     │  │   Process   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                        │ Enforced by
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   Enforcement Layer                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  CLI        │  │   CI/CD     │  │  Security   │    │
│  │  Validation │  │   Checks    │  │  Scanners   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                        │ Logs to
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    Audit Layer                           │
│  (Logs, traces, HITL records, waiver tracking)         │
└─────────────────────────────────────────────────────────┘
```

### Security Control Points

1. **Policy Definition**: `.repo/policy/SECURITY_BASELINE.md`
2. **Manifest Configuration**: Security settings in `repo.manifest.yaml`
3. **Agent Constraints**: Security capabilities in agent roles
4. **CI/CD Gates**: Security scans in pipelines
5. **Human Review**: HITL for security-critical actions
6. **Audit Trail**: Logs in `.repo/archive/`

---

## Threat Model

### Threat Categories

#### 1. Code Security Threats

**Threats:**
- Injection attacks (SQL, XSS, command injection)
- Buffer overflows
- Insecure deserialization
- Weak cryptography
- Authentication bypasses
- Authorization flaws

**Mitigations:**
- Static analysis (SAST) in CI/CD
- Secure coding principles enforced
- Security review for sensitive code
- Agent restrictions on security code
- HITL required for auth/crypto changes

---

#### 2. Secret Exposure Threats

**Threats:**
- Secrets committed to version control
- Secrets in logs or traces
- Secrets in error messages
- Hardcoded credentials
- Exposed API keys

**Mitigations:**
- Absolute prohibition: no secrets in code
- Secret scanning in CI/CD
- Log redaction for sensitive data
- Environment variable requirements
- HITL verification for secret-adjacent code

---

#### 3. Dependency Threats

**Threats:**
- Vulnerable dependencies
- Malicious packages
- Supply chain attacks
- Outdated libraries
- Unmaintained dependencies

**Mitigations:**
- Dependency scanning on every PR
- ADR required for new dependencies
- Security review for dependency changes
- HITL for vulnerability reports
- Waiver tracking for known vulnerabilities

---

#### 4. Agent Security Threats

**Threats:**
- Agent exceeding permissions
- Agent bypassing security checks
- Agent making unauthorized changes
- Malicious agent prompts
- Agent hallucinations affecting security

**Mitigations:**
- Role-based permissions
- Security capability restrictions
- HITL for all security changes
- Agent action logging
- Three-pass verification system

---

#### 5. Process Threats

**Threats:**
- Security policies disabled
- CI/CD bypassed
- Quality gates skipped
- Unauthorized waivers
- Missing security reviews

**Mitigations:**
- Policy enforcement in governance
- CI/CD integration mandatory
- Waiver approval process
- HITL for policy changes
- Audit trail for all actions

---

## Security Boundaries

### Trust Boundaries

```
┌──────────────────────────────────────────────────┐
│          Untrusted Zone                          │
│  - External APIs                                 │
│  - User input                                    │
│  - Third-party libraries                         │
│  - Agent-generated code (before verification)    │
└──────────────────────────────────────────────────┘
                    │
          Validation & Sanitization
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│          Semi-Trusted Zone                       │
│  - Verified agent code                           │
│  - Tested dependencies                           │
│  - Reviewed PRs                                  │
└──────────────────────────────────────────────────┘
                    │
            Security Review
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│          Trusted Zone                            │
│  - Merged code (passed all checks)               │
│  - Governance policies                           │
│  - Security baseline                             │
│  - Human-approved changes                        │
└──────────────────────────────────────────────────┘
```

### Input Validation Boundaries

**External Input Sources:**
- User input (forms, APIs)
- External API responses
- File uploads
- Configuration files
- Environment variables

**Validation Requirements:**
- Type checking
- Range validation
- Format validation
- Sanitization
- Encoding

---

## Secret Management

### Secret Types

1. **Credentials**: Usernames, passwords, tokens
2. **API Keys**: Third-party service keys
3. **Cryptographic Keys**: Encryption keys, signing keys
4. **Certificates**: TLS/SSL certificates, private keys
5. **Connection Strings**: Database URLs with credentials

### Secret Handling Rules

#### Absolute Prohibition

**NEVER commit:**
- Passwords or passphrases
- API keys or tokens
- Private keys or certificates
- Connection strings with credentials
- OAuth client secrets
- Encryption keys

**NEVER log:**
- Any secret values
- Authorization headers
- Cookie values
- Password fields (even hashed)
- Key material

#### Approved Secret Storage

**Use:**
- Environment variables (`.env` files in `.gitignore`)
- Secret management services (AWS Secrets Manager, HashiCorp Vault)
- CI/CD secret storage (GitHub Secrets, GitLab CI Variables)
- Encrypted configuration (with keys stored separately)

**Example .gitignore:**
```
# Secrets and sensitive files
.env
.env.local
.env.*.local
*.key
*.pem
*.p12
secrets.yaml
config/secrets.json
```

### Secret Detection

**Automated Scanning:**
- Pre-commit hooks (optional)
- CI/CD secret scanning (mandatory)
- Regular repository scans
- Dependency secret scanning

**Detection Tools:**
- TruffleHog
- git-secrets
- Gitleaks
- GitHub Secret Scanning

**Action on Detection:**
1. Block PR/commit immediately
2. Create HITL item
3. Notify security team
4. Rotate compromised secrets
5. Audit exposure scope

---

## Audit Logging

### What Gets Logged

#### Governance Actions
- Policy updates
- Manifest changes
- Waiver requests and approvals
- HITL items and resolutions
- Boundary exceptions

#### Agent Actions
- Task assignments
- Code modifications
- HITL escalations
- Security reviews
- Capability usage

#### Security Events
- Failed security checks
- Vulnerability detections
- Secret scanning results
- Permission changes
- Policy violations

### Log Format

**Agent Logs**: Human-readable (Markdown)  
**Agent Traces**: Machine-readable (JSON)  
**HITL Records**: Structured (Markdown)  
**Waiver Records**: Tracked (Markdown)

### Log Storage

**Location**: `.repo/archive/`

```
.repo/archive/
├── logs/              # Agent logs
│   └── 2026-01-22-checkout-auth.md
├── traces/            # Agent traces (JSON)
│   └── 2026-01-22-checkout-auth.json
├── hitl/              # Archived HITL items
│   └── hitl-2026-01-22-001.md
└── waivers/           # Historical waivers
    └── waiver-2026-01-22-001.md
```

### Log Retention

- **Agent Logs**: Indefinite (version controlled)
- **Traces**: Indefinite (version controlled)
- **HITL**: Indefinite (version controlled)
- **Waivers**: Indefinite (version controlled)

### Sensitive Data in Logs

**Never Logged:**
- Secrets, passwords, keys
- Personal identifiable information (PII)
- Credit card numbers
- Social security numbers
- Health records

**Redaction Strategy:**
- Replace with `[REDACTED]`
- Log existence, not value
- Use IDs instead of sensitive data

---

## Security Review Process

### Security Review Triggers

From `.repo/policy/SECURITY_BASELINE.md`:

| ID | Trigger | Description |
|----|---------|-------------|
| 1 | Authentication | Auth/login behavior change |
| 2 | Payments | Money/payment flow change |
| 4 | Integration | External service integration change |
| 5 | Sensitive Data | Sensitive data handling change |
| 6 | Permissions | Permission/privacy change |
| 8 | Configuration | Production config/keys change |
| 9 | Cryptography | Cryptography/security control change |
| 10 | Dependencies | Dependency / supply-chain risk change |

### Review Process

```
┌──────────────────┐
│ Trigger Detected │
│ in PR            │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Create HITL Item │
│ with details     │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Block PR Merge   │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Human Security   │
│ Review           │
└──────────────────┘
        │
    ┌───┴───┐
  Approve  Reject
    │       │
    ▼       ▼
┌────────┐ ┌────────┐
│ Log    │ │ Request│
│ Decision│ │ Changes│
└────────┘ └────────┘
    │
    ▼
┌──────────────────┐
│ Allow PR Merge   │
└──────────────────┘
```

### Mandatory HITL Actions

From `.repo/policy/SECURITY_BASELINE.md`:

| ID | Action | Description |
|----|--------|-------------|
| 1 | Risk Assessment | Human approves security risk assessment |
| 2 | Secret Check | Human confirms no secrets exposed |
| 3 | Vulnerability Review | Human reviews dependency vulnerability report |
| 4 | Login Testing | Human confirms login/security test evidence |
| 5 | Payment Testing | Human confirms money-flow test evidence |
| 6 | Waiver Approval | Human approves waiver with expiration |
| 7 | Rollback Plan | Human confirms rollback plan for risky changes |
| 8 | External Steps | Human confirms external system steps completed |

### Evidence Requirements

**Standard Evidence:**
- What was run (command + filepath)
- Results summary (pass/fail)
- Test output (logs/screenshots)
- Scan results (security/vulnerability)
- Review notes (human reviewer)

**Security-Specific Evidence:**
- Security scan results
- Penetration test results
- Code review approval
- Risk assessment
- Rollback plan

---

## Vulnerability Management

### Vulnerability Detection

**Sources:**
1. **Dependency Scanning**:
   - npm audit (Node.js)
   - pip-audit (Python)
   - OWASP Dependency-Check (Java)
   
2. **Static Analysis (SAST)**:
   - CodeQL
   - SonarQube
   - Semgrep
   
3. **Secret Scanning**:
   - TruffleHog
   - git-secrets
   
4. **Container Scanning**:
   - Trivy
   - Grype

### Vulnerability Response

```
Vulnerability Detected
        │
        ▼
Create HITL Item
        │
        ▼
Severity Assessment
        │
    ┌───┴───────────┐
 Critical      Other
    │             │
    ▼             ▼
Block PR      Allow with
immediately   Waiver
    │             │
    ▼             ▼
Emergency     Track in
Fix           Backlog
    │             │
    └─────┬───────┘
          ▼
   Verify Fix
          │
          ▼
    Close HITL
```

### Severity Levels

| Severity | Action | Timeframe |
|----------|--------|-----------|
| Critical | Block, emergency fix | 24 hours |
| High | Block, fix required | 7 days |
| Medium | Allow with waiver | 30 days |
| Low | Track, fix when possible | 90 days |

### Waiver Process for Vulnerabilities

**Requirements:**
- Written justification
- Risk mitigation plan
- Expiration date (max 90 days)
- Human approval required
- Remediation task created

**Waiver Template:**
```markdown
# Vulnerability Waiver: CVE-2024-XXXX

**Vulnerability**: [Description]
**Severity**: High
**Component**: lodash@4.17.20

## Justification
[Why waiver is needed]

## Risk Mitigation
[How risk is reduced]

## Remediation Plan
- [ ] Update lodash when 4.17.22 available
- [ ] Monitor for patch release
- [ ] Retest after update

**Expiration**: 2026-03-22
**Approved By**: Security Lead
**Date**: 2026-01-22
```

---

## Compliance

### Regulatory Compliance

The governance framework supports compliance with:
- **SOC 2**: Security controls, audit trails
- **ISO 27001**: Information security management
- **GDPR**: Data protection, privacy by design
- **HIPAA**: Healthcare data protection
- **PCI DSS**: Payment card security

### Compliance Features

1. **Audit Trail**: Complete history of all changes
2. **Access Control**: Role-based permissions
3. **Data Protection**: Secret management, redaction
4. **Review Process**: Human approval for critical changes
5. **Documentation**: Policies, decisions, evidence

### Audit Support

**Audit Artifacts:**
- Policy documents (`.repo/policy/`)
- Agent logs (`.repo/archive/logs/`)
- HITL records (`.repo/archive/hitl/`)
- Waiver records (`.repo/archive/waivers/`)
- CI/CD reports (artifacts)

**Traceability:**
- Every change → Agent log → PR → Commit
- Every decision → HITL item → Resolution
- Every exception → Waiver → Approval → Expiration

### Compliance Checklist

- [ ] All policies documented
- [ ] Security baseline defined
- [ ] CI/CD security checks enabled
- [ ] Secret scanning active
- [ ] Dependency scanning active
- [ ] HITL process operational
- [ ] Waiver process documented
- [ ] Audit trail complete
- [ ] Human reviews required
- [ ] Evidence collection automated

---

## Security Best Practices

### For Developers

1. **Never commit secrets**: Use environment variables
2. **Review dependencies**: Check before adding new ones
3. **Request security review**: For sensitive changes
4. **Document decisions**: Use ADRs for security choices
5. **Test security**: Include security tests in test suites
6. **Follow principles**: Adhere to SECURITY_BASELINE.md
7. **Report vulnerabilities**: Create HITL for security issues

### For Reviewers

1. **Verify security checks**: Ensure all scans passed
2. **Review sensitive changes**: Authentication, payments, data
3. **Check evidence**: Validate test results and scans
4. **Question exceptions**: Challenge waiver requests
5. **Document approval**: Record reasoning for decisions
6. **Verify HITL**: Ensure HITL items resolved appropriately

### For Security Teams

1. **Monitor alerts**: Review security scan results
2. **Update policies**: Keep SECURITY_BASELINE current
3. **Track waivers**: Ensure waivers expire and are resolved
4. **Review HITL**: Prioritize security HITL items
5. **Audit logs**: Regular review of security-relevant logs
6. **Update scanners**: Keep security tools up to date
7. **Train teams**: Educate on security practices

---

## Related Documents

- [Architecture Overview](./ARCHITECTURE_OVERVIEW.md) - System architecture
- [Agent Architecture](./AGENT_ARCHITECTURE.md) - Agent security model
- [Security Baseline](../../templates/.repo/policy/SECURITY_BASELINE.md) - Security policy
- [HITL Policy](../../templates/.repo/policy/HITL.md) - Human-in-the-loop process
- [Waiver Policy](../../templates/.repo/policy/WAIVERS.md) - Exception management

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
