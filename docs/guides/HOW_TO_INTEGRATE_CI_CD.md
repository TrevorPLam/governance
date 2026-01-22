# How To: Integrate CI/CD
## Step-by-Step Guide to Setting Up Governance in CI/CD Pipelines

**Purpose:** Learn how to integrate governance checks into your CI/CD pipeline across different platforms (GitHub Actions, GitLab CI, CircleCI, Jenkins, Azure Pipelines).

**Time Required:** 45-90 minutes  
**Skill Level:** Intermediate to Advanced

---

## Table of Contents

1. [Understanding CI/CD Integration](#understanding-cicd-integration)
2. [GitHub Actions Setup](#github-actions-setup)
3. [GitLab CI Setup](#gitlab-ci-setup)
4. [CircleCI Setup](#circleci-setup)
5. [Jenkins Setup](#jenkins-setup)
6. [Azure Pipelines Setup](#azure-pipelines-setup)
7. [Custom CI/CD Integration](#custom-cicd-integration)

---

## Understanding CI/CD Integration

### What Gets Integrated?

Governance checks run automatically in your CI/CD pipeline:

```
┌─────────────────────────────────────────────┐
│  CI/CD Pipeline with Governance             │
├─────────────────────────────────────────────┤
│                                             │
│  1. Checkout Code                           │
│  2. Install Dependencies                    │
│  3. ⚡ Governance Validation                │
│     ├─ Validate manifest                    │
│     ├─ Check boundaries                     │
│     ├─ Verify quality gates                 │
│     └─ Check for HITL items                 │
│  4. Run Tests                               │
│  5. Build Application                       │
│  6. Security Scan                           │
│  7. Deploy (if all passed)                  │
│                                             │
└─────────────────────────────────────────────┘
```

### Key Integration Points

**1. Pull Request Validation**
- Runs on every PR
- Blocks merge if governance fails
- Comments results on PR

**2. Main Branch Protection**
- Runs on main/develop branches
- Prevents broken code from merging
- Sends notifications on failure

**3. Release Pipeline**
- Runs full governance check
- Includes security scanning
- Verifies release readiness

**4. Scheduled Checks**
- Daily/weekly governance audit
- Checks for expired waivers
- Reports governance drift

---

## GitHub Actions Setup

### Step 1: Copy Workflow Templates

Copy governance workflow templates to your repository:

```bash
# Create workflows directory
mkdir -p .github/workflows

# Copy governance templates (from governance repo)
cp templates/.github/workflows/templates/governance-check.yml .github/workflows/
cp templates/.github/workflows/templates/quality-gates.yml .github/workflows/
cp templates/.github/workflows/templates/security-scan.yml .github/workflows/
cp templates/.github/workflows/templates/release.yml .github/workflows/
```

### Step 2: Configure Governance Check Workflow

Edit `.github/workflows/governance-check.yml`:

```yaml
name: Governance Check

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  governance-validation:
    name: Validate Governance
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Governance CLI
        run: npm install -g @trevorplam/governance-cli
      
      - name: Validate Governance Setup
        id: validate
        run: |
          governance-cli validate --verbose
          echo "result=$?" >> $GITHUB_OUTPUT
      
      - name: Check Boundaries
        if: success() || failure()
        id: boundaries
        run: |
          governance-cli verify --profile=boundaries
          echo "result=$?" >> $GITHUB_OUTPUT
      
      - name: Verify Manifest
        if: success() || failure()
        id: manifest
        run: |
          governance-cli validate --check=manifest
          echo "result=$?" >> $GITHUB_OUTPUT
      
      - name: Check HITL Items
        if: success() || failure()
        id: hitl
        run: |
          governance-cli hitl check --block-if-pending
          echo "result=$?" >> $GITHUB_OUTPUT
      
      - name: Generate Summary
        if: always()
        run: |
          echo "## 🏛️ Governance Check Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Check | Result |" >> $GITHUB_STEP_SUMMARY
          echo "|-------|--------|" >> $GITHUB_STEP_SUMMARY
          echo "| Validation | ${{ steps.validate.outputs.result == '0' && '✅ Passed' || '❌ Failed' }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Boundaries | ${{ steps.boundaries.outputs.result == '0' && '✅ Passed' || '❌ Failed' }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Manifest | ${{ steps.manifest.outputs.result == '0' && '✅ Passed' || '❌ Failed' }} |" >> $GITHUB_STEP_SUMMARY
          echo "| HITL | ${{ steps.hitl.outputs.result == '0' && '✅ Passed' || '⏸️ Pending' }} |" >> $GITHUB_STEP_SUMMARY
      
      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const validation = '${{ steps.validate.outputs.result }}' === '0';
            const boundaries = '${{ steps.boundaries.outputs.result }}' === '0';
            const manifest = '${{ steps.manifest.outputs.result }}' === '0';
            const hitl = '${{ steps.hitl.outputs.result }}' === '0';
            
            const allPassed = validation && boundaries && manifest && hitl;
            const emoji = allPassed ? '✅' : '❌';
            
            const body = `## ${emoji} Governance Check Results
            
            | Check | Status |
            |-------|--------|
            | Governance Validation | ${validation ? '✅ Passed' : '❌ Failed'} |
            | Boundary Enforcement | ${boundaries ? '✅ Passed' : '❌ Failed'} |
            | Manifest Validation | ${manifest ? '✅ Passed' : '❌ Failed'} |
            | HITL Items | ${hitl ? '✅ No blocking items' : '⏸️ Action required'} |
            
            ${allPassed ? '✅ All governance checks passed! Safe to merge.' : '❌ Governance checks failed. Please review and fix issues.'}
            
            [View detailed logs](${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }})
            `;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: body
            });
      
      - name: Fail if governance checks failed
        if: steps.validate.outputs.result != '0' || steps.boundaries.outputs.result != '0' || steps.manifest.outputs.result != '0'
        run: exit 1
```

### Step 3: Configure Quality Gates Workflow

Edit `.github/workflows/quality-gates.yml`:

```yaml
name: Quality Gates

on:
  pull_request:
    branches: [main, develop]

jobs:
  quality-checks:
    name: Quality Gate Validation
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests with coverage
        run: npm run test:coverage
      
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          THRESHOLD=80
          
          if (( $(echo "$COVERAGE < $THRESHOLD" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below threshold $THRESHOLD%"
            exit 1
          else
            echo "✅ Coverage $COVERAGE% meets threshold $THRESHOLD%"
          fi
      
      - name: Run linter
        run: npm run lint
      
      - name: Check bundle size
        run: npm run build:check-size
      
      - name: Complexity check
        run: npx complexity-report --threshold 10
```

### Step 4: Configure Security Scan Workflow

Edit `.github/workflows/security-scan.yml`:

```yaml
name: Security Scan

on:
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday

jobs:
  security:
    name: Security Scanning
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Dependency vulnerability scan
        run: npm audit --audit-level=moderate
      
      - name: Secret scanning
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
      
      - name: Check for forbidden patterns
        run: |
          governance-cli security check --patterns
      
      - name: SAST scan
        uses: github/codeql-action/analyze@v2
```

### Step 5: Setup Composite Actions

Copy reusable composite actions:

```bash
# Copy composite actions
cp -r templates/.github/actions .github/
```

Example composite action (`.github/actions/governance-setup/action.yml`):

```yaml
name: 'Governance Setup'
description: 'Setup governance CLI and validate configuration'

inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '18'

runs:
  using: 'composite'
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'
    
    - name: Install Governance CLI
      shell: bash
      run: npm install -g @trevorplam/governance-cli
    
    - name: Validate Governance
      shell: bash
      run: governance-cli validate
```

### Step 6: Protect Branches

Enable branch protection in GitHub:

```
Settings → Branches → Add rule

Branch name pattern: main

☑️ Require a pull request before merging
☑️ Require status checks to pass before merging
  ☑️ Governance Check
  ☑️ Quality Gates
  ☑️ Security Scan
☑️ Require branches to be up to date before merging
☑️ Do not allow bypassing the above settings
```

---

## GitLab CI Setup

### Step 1: Create GitLab CI Configuration

Create `.gitlab-ci.yml`:

```yaml
# .gitlab-ci.yml
# Governance-enabled GitLab CI pipeline

stages:
  - validate
  - test
  - build
  - security
  - deploy

variables:
  NODE_VERSION: "18"
  GOVERNANCE_CLI_VERSION: "latest"

# Governance validation stage
governance:validate:
  stage: validate
  image: node:${NODE_VERSION}
  before_script:
    - npm install -g @trevorplam/governance-cli@${GOVERNANCE_CLI_VERSION}
  script:
    - echo "🏛️ Validating governance configuration..."
    - governance-cli validate --verbose
    - governance-cli verify --profile=boundaries
    - governance-cli validate --check=manifest
    - governance-cli hitl check --block-if-pending
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  artifacts:
    reports:
      junit: governance-report.xml
    when: always

# Boundary check (separate job for clarity)
governance:boundaries:
  stage: validate
  image: node:${NODE_VERSION}
  before_script:
    - npm ci
    - npm install -g @trevorplam/governance-cli
  script:
    - echo "🔍 Checking architectural boundaries..."
    - governance-cli verify --profile=boundaries --strict
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  allow_failure: false

# Quality gates
quality:gates:
  stage: test
  image: node:${NODE_VERSION}
  before_script:
    - npm ci
  script:
    - echo "📊 Running quality gate checks..."
    - npm run test:coverage
    - npm run lint
    - npm run build:check-size
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

# Security scanning
security:scan:
  stage: security
  image: node:${NODE_VERSION}
  before_script:
    - npm ci
  script:
    - echo "🔒 Running security scans..."
    - npm audit --audit-level=moderate
    - governance-cli security check --patterns
  allow_failure: false
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'

# SAST scanning
sast:
  stage: security
  script:
    - echo "Running SAST scan..."
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml
```

### Step 2: Configure Merge Request Rules

In GitLab project settings:

```
Settings → Merge requests → Merge checks

☑️ Pipelines must succeed
☑️ All threads must be resolved

Merge request approvals:
☑️ Prevent approval by author
☑️ Prevent editing approval rules in merge requests
Number of approvals required: 1
```

---

## CircleCI Setup

### Step 1: Create CircleCI Configuration

Create `.circleci/config.yml`:

```yaml
version: 2.1

# Define reusable executors
executors:
  node-executor:
    docker:
      - image: cimg/node:18.0
    working_directory: ~/repo

# Define reusable commands
commands:
  setup-governance:
    description: "Install and setup governance CLI"
    steps:
      - run:
          name: Install Governance CLI
          command: npm install -g @trevorplam/governance-cli
      
      - run:
          name: Validate Governance
          command: governance-cli validate --verbose

  check-boundaries:
    description: "Check architectural boundaries"
    steps:
      - run:
          name: Check Boundaries
          command: governance-cli verify --profile=boundaries --strict

# Define jobs
jobs:
  governance-validation:
    executor: node-executor
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}
            - v1-dependencies-
      
      - run:
          name: Install dependencies
          command: npm ci
      
      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package-lock.json" }}
      
      - setup-governance
      - check-boundaries
      
      - run:
          name: Check HITL Items
          command: governance-cli hitl check --block-if-pending
      
      - store_artifacts:
          path: governance-report.json
          destination: governance-report

  quality-gates:
    executor: node-executor
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}
      
      - run:
          name: Run tests with coverage
          command: npm run test:coverage
      
      - run:
          name: Check coverage threshold
          command: |
            COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
            if (( $(echo "$COVERAGE < 80" | bc -l) )); then
              echo "Coverage $COVERAGE% below 80%"
              exit 1
            fi
      
      - run:
          name: Run linter
          command: npm run lint
      
      - store_test_results:
          path: coverage
      
      - store_artifacts:
          path: coverage

  security-scan:
    executor: node-executor
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}
      
      - run:
          name: Audit dependencies
          command: npm audit --audit-level=moderate
      
      - run:
          name: Check forbidden patterns
          command: governance-cli security check --patterns
      
      - store_artifacts:
          path: security-report.json

# Define workflows
workflows:
  version: 2
  governance-workflow:
    jobs:
      - governance-validation:
          filters:
            branches:
              ignore: []
      
      - quality-gates:
          requires:
            - governance-validation
      
      - security-scan:
          requires:
            - governance-validation
      
      - hold-for-approval:
          type: approval
          requires:
            - quality-gates
            - security-scan
          filters:
            branches:
              only:
                - main
                - develop
```

---

## Jenkins Setup

### Step 1: Create Jenkinsfile

Create `Jenkinsfile`:

```groovy
// Jenkinsfile with Governance Integration

pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v $HOME/.npm:/.npm'
        }
    }
    
    environment {
        GOVERNANCE_CLI = '@trevorplam/governance-cli'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Governance Validation') {
            parallel {
                stage('Validate Configuration') {
                    steps {
                        script {
                            sh '''
                                npm install -g ${GOVERNANCE_CLI}
                                governance-cli validate --verbose
                            '''
                        }
                    }
                }
                
                stage('Check Boundaries') {
                    steps {
                        script {
                            sh '''
                                npm install -g ${GOVERNANCE_CLI}
                                governance-cli verify --profile=boundaries
                            '''
                        }
                    }
                }
                
                stage('Verify Manifest') {
                    steps {
                        script {
                            sh '''
                                npm install -g ${GOVERNANCE_CLI}
                                governance-cli validate --check=manifest
                            '''
                        }
                    }
                }
            }
        }
        
        stage('Quality Gates') {
            parallel {
                stage('Tests') {
                    steps {
                        sh 'npm run test:coverage'
                        
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'coverage/lcov-report',
                            reportFiles: 'index.html',
                            reportName: 'Coverage Report'
                        ])
                    }
                }
                
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                
                stage('Build Size') {
                    steps {
                        sh 'npm run build:check-size'
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    sh '''
                        npm audit --audit-level=moderate || true
                        governance-cli security check --patterns
                    '''
                }
            }
        }
        
        stage('Check HITL') {
            steps {
                script {
                    def hitlStatus = sh(
                        script: 'governance-cli hitl check --block-if-pending',
                        returnStatus: true
                    )
                    
                    if (hitlStatus != 0) {
                        error('HITL items require human action')
                    }
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'governance-report.json', allowEmptyArchive: true
            junit testResults: 'test-results/**/*.xml', allowEmptyResults: true
        }
        
        success {
            echo '✅ All governance checks passed!'
        }
        
        failure {
            echo '❌ Governance checks failed'
        }
    }
}
```

---

## Azure Pipelines Setup

### Step 1: Create Azure Pipelines Configuration

Create `azure-pipelines.yml`:

```yaml
# Azure Pipelines with Governance Integration

trigger:
  branches:
    include:
      - main
      - develop
  paths:
    exclude:
      - docs/
      - README.md

pr:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  NODE_VERSION: '18.x'
  GOVERNANCE_CLI: '@trevorplam/governance-cli'

stages:
  - stage: Governance
    displayName: 'Governance Validation'
    jobs:
      - job: Validate
        displayName: 'Validate Governance'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)
            displayName: 'Install Node.js'
          
          - script: npm ci
            displayName: 'Install dependencies'
          
          - script: |
              npm install -g $(GOVERNANCE_CLI)
              governance-cli validate --verbose
            displayName: 'Validate governance configuration'
          
          - script: |
              governance-cli verify --profile=boundaries
            displayName: 'Check architectural boundaries'
          
          - script: |
              governance-cli validate --check=manifest
            displayName: 'Verify manifest'
          
          - script: |
              governance-cli hitl check --block-if-pending
            displayName: 'Check HITL items'
          
          - task: PublishTestResults@2
            condition: always()
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'governance-report.xml'
              testRunTitle: 'Governance Validation'

  - stage: Quality
    displayName: 'Quality Gates'
    dependsOn: Governance
    condition: succeeded()
    jobs:
      - job: Test
        displayName: 'Run Tests'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)
          
          - script: npm ci
            displayName: 'Install dependencies'
          
          - script: npm run test:coverage
            displayName: 'Run tests with coverage'
          
          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'test-results/**/*.xml'
          
          - task: PublishCodeCoverageResults@1
            inputs:
              codeCoverageTool: 'Cobertura'
              summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
          
          - script: npm run lint
            displayName: 'Run linter'

  - stage: Security
    displayName: 'Security Scan'
    dependsOn: Governance
    condition: succeeded()
    jobs:
      - job: Scan
        displayName: 'Security Scanning'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)
          
          - script: npm ci
            displayName: 'Install dependencies'
          
          - script: npm audit --audit-level=moderate
            displayName: 'Audit dependencies'
            continueOnError: true
          
          - script: |
              npm install -g $(GOVERNANCE_CLI)
              governance-cli security check --patterns
            displayName: 'Check forbidden patterns'
```

---

## Custom CI/CD Integration

### Step 1: Generic Integration Script

For any CI/CD platform, create a shell script:

```bash
#!/bin/bash
# governance-ci.sh - Generic governance CI script

set -e

echo "🏛️ Running Governance Checks..."

# Install governance CLI
echo "📦 Installing Governance CLI..."
npm install -g @trevorplam/governance-cli

# Validate governance setup
echo "✅ Validating governance configuration..."
governance-cli validate --verbose || {
    echo "❌ Governance validation failed"
    exit 1
}

# Check boundaries
echo "🔍 Checking architectural boundaries..."
governance-cli verify --profile=boundaries || {
    echo "❌ Boundary check failed"
    exit 1
}

# Verify manifest
echo "📋 Verifying manifest..."
governance-cli validate --check=manifest || {
    echo "❌ Manifest validation failed"
    exit 1
}

# Check HITL items
echo "👤 Checking HITL items..."
governance-cli hitl check --block-if-pending || {
    echo "⏸️ HITL items require human action"
    exit 1
}

echo "✅ All governance checks passed!"
```

Make it executable:
```bash
chmod +x governance-ci.sh
```

Use in any CI system:
```bash
./governance-ci.sh
```

---

## Next Steps

After setting up CI/CD integration:

1. **✅ Test pipeline** - Create test PR, verify checks run
2. **✅ Monitor results** - Check CI logs for governance reports
3. **✅ Adjust thresholds** - Fine-tune quality gates
4. **✅ Train team** - Explain CI/CD governance checks
5. **✅ Document failures** - Create troubleshooting guide
6. **✅ Optimize performance** - Cache dependencies, parallelize

## Related Guides

- [How To: Configure Manifest](./HOW_TO_CONFIGURE_MANIFEST.md) - Configure CI commands
- [How To: Define Boundaries](./HOW_TO_DEFINE_BOUNDARIES.md) - Boundary enforcement in CI
- [How To: Manage Waivers](./HOW_TO_MANAGE_WAIVERS.md) - Handle CI failures with waivers
- [How To: Work With Agents](./HOW_TO_WORK_WITH_AGENTS.md) - Agent checks in CI/CD

## Additional Resources

- `.github/workflows/` - GitHub Actions templates
- `templates/ci-cd/` - CI/CD templates for all platforms
- `.repo/repo.manifest.yaml` - CI command configuration
- Phase 3 Documentation - CI/CD automation

---

**Status:** Ready to use  
**Last Updated:** 2026-01-22  
**Version:** 1.0.0
