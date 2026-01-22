Below is a **research execution plan designed for maximum signal, minimum waste, and zero human burnout**, tailored to your reality:

* **Solo human**
* **100% AI-generated repos**
* **Goal = Diamond-Level, AI-Native Repository OS**
* **Multiple research engines with different strengths**
* **You want raw material → synthesis → enforceable policy**

This is **not** a generic plan. It is an **operational research pipeline**.

---

# DIAMOND-LEVEL RESEARCH EXECUTION PLAN

## (AI-Native Software Factory)

---

## PRINCIPLES (READ FIRST)

These rules govern *how* you research:

1. **Research ≠ Synthesis**

   * Research engines gather facts, patterns, examples.
   * Synthesis engines build frameworks and decisions.
   * Never mix roles in the same pass.

2. **No Early Consolidation**

   * Duplication is a feature early.
   * Compression only happens *after* coverage is proven.

3. **Evidence > Opinion**

   * Every claim must map to:

     * a real practice
     * a real tool
     * a real failure mode
     * or a real standard

4. **Research Should Produce Levers**

   * Each topic must end in:

     * a setting
     * a policy
     * a rule
     * a tool
     * or a measurable threshold

---

## PHASE 0 — RESEARCH BOOTSTRAP (ONE-TIME)

### Output

A **stable research backbone** that all later work builds on.

### Actions

* Lock this **unconsolidated topic list** as the canonical scope
* Create folders (or docs):

  ```
  /research/raw/
  /research/synth/
  /research/decisions/
  /research/policies/
  ```
* Create a **Decision Log** (even a simple markdown file)

---

## PHASE 1 — SOURCE-HEAVY DISCOVERY

### Platform: **Perplexity Deep Research**

**Purpose:**
Maximize **breadth + citations + real-world practices**

**DO NOT ask Perplexity to design systems.**
Ask it to **prove what exists**.

---

### Batch Structure (Perplexity)

Run **independent batches**.
Never chain them.

Each batch should:

* Take 5–15 minutes
* Produce 5–20 high-quality sources
* End with tools, settings, examples, failures

---

### Batch 1 — GitHub as a Governance Engine

**Topics**

* Branch protection rules & rulesets
* Auto-merge constraints
* Merge queues
* Environment protection
* Secret scanning & push protection
* Required status checks
* Signed commits & tags

**Prompt Pattern**

> Research current GitHub repository, branch, and environment settings that enforce governance without human code review.
> Focus on: rulesets, auto-merge constraints, merge queues, required checks, environment protection, secret scanning, and signed commits.
> Provide concrete settings, limitations, and real failure modes.

**Output Goes To**

```
/research/raw/github-governance.md
```

---

### Batch 2 — Policy-as-Code & Waiver Systems

**Topics**

* Policy engines (OPA, Rego, custom)
* Waiver models in CI
* Expiry, renewal limits, ratchets
* WARN→FAIL enforcement strategies

**Prompt Focus**

* Who actually does this?
* What breaks?
* What’s enforceable vs aspirational?

---

### Batch 3 — Supply Chain Integrity (Solo-Viable)

**Topics**

* SBOM generation
* Provenance
* Artifact signing
* Dependency trust failures
* CI hardening

**Important**
Ask:

* What is realistic for a solo dev?
* What *must* be automated?

---

### Batch 4 — Architecture Enforcement

**Topics**

* Architecture manifests
* Static boundary enforcement
* Drift detection
* Fitness functions
* Duplication & complexity detection

---

### Batch 5 — AI-Generated Code Failure Modes

**Topics**

* AI code quality statistics
* Security flaw prevalence
* PR rejection patterns
* Large diff risks
* Silent degradation

---

### Exit Criteria for Phase 1

You stop when:

* No *new* categories are appearing
* Sources start repeating patterns
* You can point to **real tooling** for most ideas

---

## PHASE 2 — STRUCTURAL SYNTHESIS

### Platform: **Gemini Deep Research**

**Purpose:**
Turn raw findings into **systems, models, and architecture**

Gemini excels at:

* Conceptual layering
* System boundaries
* Long-range reasoning
* Architectural coherence

---

### Inputs to Gemini

* Entire `/research/raw/` folder
* Your **Repo OS specification**
* Your **solo operator constraints**

---

### Gemini Tasks (Run Separately)

#### Task 1 — Repo OS Architecture

* Repo as OS
* Kernel vs user space
* Enforcement layers
* Failure containment

#### Task 2 — Governance Model

* Risk classification
* Gate matrix
* Auto-merge rules
* HITL choke points

#### Task 3 — Waiver & Ratchet Engine

* Lifecycle
* Data model
* Escalation rules
* Abuse prevention

#### Task 4 — Supply Chain Trust Chain

* PR → CI → release → deploy
* What is verified where
* What is non-waivable

---

### Output Goes To

```
/research/synth/
```

---

## PHASE 3 — DECISION MAKING

### Platform: **ChatGPT (You + Me)**

**Purpose:**
Convert models into **decisions**.

This is where:

* Tradeoffs are made
* Defaults are chosen
* You say “no” to complexity

---

### Decision Artifacts

Each decision must answer:

* Why this?
* Why not alternatives?
* What is forbidden?
* What is waivable?
* What escalates to human?

Examples:

* “We will never auto-merge security changes”
* “All new dependencies require manual approval”
* “Architecture violations require ADR + waiver”

---

### Output Goes To

```
/research/decisions/
```

---

## PHASE 4 — POLICY & CONFIG TRANSLATION

### Platform: **ChatGPT (Execution Mode)**

**Purpose:**
Turn decisions into **machine-enforceable artifacts**

---

### Deliverables

* GitHub settings checklist
* Branch protection rules
* CI YAML templates
* Policy files
* PR templates
* Waiver schemas
* Architecture manifests

---

### Output Goes To

```
/research/policies/
```

---

## PHASE 5 — PILOT & RATChet

**Purpose:**
Introduce enforcement **without killing velocity**

---

### Order of Enforcement

1. Instrument only (warn)
2. Contract required
3. Tests required
4. Auto-merge low risk
5. Never-auto categories
6. Ratchet complexity
7. Tighten waivers
8. Enforce supply chain

---

## FEEDBACK LOOPS (CRITICAL)

Every 10–20 PRs, review:

* Waiver count
* Auto-merge rate
* Test failures
* Manual escalations
* CI cost

Adjust:

* Thresholds
* Risk rules
* Agent prompts

---

## FINAL NOTE (IMPORTANT)

You are not “researching software development.”

You are **designing a self-governing AI system** where:

* Policy replaces people
* CI replaces trust
* Evidence replaces opinion
* You replace an org chart

This plan ensures:

* No blind spots
* No premature decisions
* No false confidence

