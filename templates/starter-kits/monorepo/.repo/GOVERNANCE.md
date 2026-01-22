# Governance Framework

**Version:** 1.0.0  
**Status:** Injectable Template  
**Layer:** Entry Point

---

## Welcome to the AI-Native Repository Governance Framework

This directory (`.repo/`) contains a complete governance framework designed to enable AI agents and human developers to work together safely and effectively.

## 🎯 What This Framework Does

This governance system provides:

1. **Clear Policies** - Constitutional rules, principles, and quality gates
2. **Safety Boundaries** - Security baselines and architectural boundaries
3. **Human-in-the-Loop (HITL)** - Explicit escalation points for risky decisions
4. **Command Manifest** - Single source of truth for build, test, and verification commands
5. **Waiver Management** - Formal process for policy exceptions
6. **Traceability** - Every change must be justified and verifiable

## 📖 Read This First

### For Developers
1. **Start with**: [`policy/CONSTITUTION.md`](policy/CONSTITUTION.md) - The 8 fundamental articles
2. **Then read**: [`policy/PRINCIPLES.md`](policy/PRINCIPLES.md) - Operating principles (P3-P25)
3. **Understand**: [`repo.manifest.yaml`](repo.manifest.yaml) - How to run checks correctly

### For AI Agents
1. **Always read**: `repo.manifest.yaml` first (your instruction card)
2. **Follow**: All policies in `policy/` directory
3. **Escalate**: When in doubt, create HITL item (don't guess)
4. **Verify**: Every change must have evidence

### For Approvers/Reviewers
1. **Check**: [`policy/HITL.md`](policy/HITL.md) - Active human-in-the-loop items
2. **Review**: [`policy/WAIVERS.md`](policy/WAIVERS.md) - Active policy exceptions
3. **Verify**: All changes have proper traceability

## 📂 Directory Structure

```
.repo/
├── GOVERNANCE.md           ← You are here (start here)
├── VERSION                 ← Framework version tracking
├── repo.manifest.yaml      ← Command definitions (critical!)
├── policy/                 ← Authoritative governance rules
│   ├── CONSTITUTION.md     ← 8 fundamental articles (immutable)
│   ├── PRINCIPLES.md       ← Operating principles (updateable)
│   ├── QUALITY_GATES.md    ← Quality standards and gates
│   ├── SECURITY_BASELINE.md← Security requirements
│   ├── BOUNDARIES.md       ← Architectural boundaries
│   ├── HITL.md            ← Human-in-the-loop tracking
│   └── WAIVERS.md         ← Policy exception tracking
├── agents/                 ← AI agent framework (Phase 2)
│   ├── roles/             ← Agent role definitions
│   ├── prompts/           ← Agent prompt templates
│   └── checklists/        ← Task checklists
├── templates/             ← Document templates (Phase 2)
├── docs/                  ← Documentation standards
│   ├── standards/         ← Documentation standards
│   └── adr/              ← Architecture Decision Records
└── automation/            ← CI/CD and automation (Phase 3)
    ├── ci/               ← CI/CD templates
    └── scripts/          ← Automation scripts
```

## 🚦 How to Use This Framework

### Daily Development Workflow
1. Check if your change triggers HITL (see [`policy/SECURITY_BASELINE.md`](policy/SECURITY_BASELINE.md))
2. Follow principles from [`policy/PRINCIPLES.md`](policy/PRINCIPLES.md)
3. Use commands defined in [`repo.manifest.yaml`](repo.manifest.yaml)
4. Verify your changes meet quality gates (see [`policy/QUALITY_GATES.md`](policy/QUALITY_GATES.md))

### Before Merging a PR
- [ ] All tests pass (use `check:ci` command from manifest)
- [ ] No active HITL blockers (check [`policy/HITL.md`](policy/HITL.md))
- [ ] Required waivers are documented (if applicable)
- [ ] Changes are traceable to task definition
- [ ] Evidence of verification is included

### When You Need to Deviate
1. Check if your situation requires a waiver
2. Follow the waiver process in [`policy/WAIVERS.md`](policy/WAIVERS.md)
3. Document your justification
4. Get required approvals
5. Set expiration date

## 🔴 Critical Rules (Never Skip These)

1. **Article 3 (No Guessing)**: If you don't know, mark it `<UNKNOWN>` and escalate to HITL
2. **Article 6 (Safety Before Speed)**: For risky changes → STOP → ASK → VERIFY → PROCEED
3. **Article 8 (HITL for External Systems)**: Credentials, billing, production = always HITL
4. **P8 (Read Repo First)**: Always check `.repo/` docs and manifest before deciding
5. **P10 (Risk Triggers a Stop)**: Non-trivial risk = HITL

## 🎓 Understanding the Layers

The framework uses a 3-layer update model:

- **Layer 1 (CUSTOM)**: Repository-specific content (HITL, WAIVERS, manifest)
- **Layer 2 (UPDATEABLE)**: Framework-provided but customizable (policies)
- **Layer 3 (IMMUTABLE)**: Core framework structure

Each file has a marker indicating its layer.

## 📞 Getting Help

### Common Questions
- **"Can I change the CONSTITUTION?"** → Only with explicit founder approval (Article 1)
- **"What if I'm not sure about a command?"** → Set `<UNKNOWN>` in manifest, create HITL
- **"Do I need HITL for this?"** → Check triggers in [`policy/SECURITY_BASELINE.md`](policy/SECURITY_BASELINE.md)
- **"How do I request a waiver?"** → Follow process in [`policy/WAIVERS.md`](policy/WAIVERS.md)

### Support
- Review policy documents in `policy/` directory
- Check `docs/standards/manifest.md` for manifest help
- Create HITL item when uncertain
- Consult repository owner/founder for ambiguity

## 🚀 Quick Start Checklist

For new repositories adopting this framework:

1. [ ] Copy `.repo/` folder to your repository root
2. [ ] Open `repo.manifest.yaml`
3. [ ] Fill in commands using `docs/standards/manifest.md` guide
4. [ ] Replace all `<FILL_FROM_REPO>` placeholders
5. [ ] Set `<UNKNOWN>` for unclear items (with HITL)
6. [ ] Review and customize `policy/WAIVERS.md` structure
7. [ ] Review and customize `policy/HITL.md` structure
8. [ ] Test commands locally to verify they work
9. [ ] Commit the governance framework
10. [ ] Start using it for all changes

## 📋 Maintenance

- **Review HITL items**: Weekly (or as they come in)
- **Review Waivers**: Monthly (check for expirations)
- **Update Manifest**: When build/test commands change
- **Update Policies**: Only when necessary (follow Layer rules)

---

## 📝 About This Framework

This governance framework follows the AI-Native Repository Governance System design, enabling:
- Automated governance enforcement
- Human-in-the-loop decision making for high-risk items
- Clear boundaries and policies
- Incremental delivery and verification
- Safety before speed

**Remember**: The goal is to enable safe, effective collaboration between AI and humans, not to create bureaucracy. Use judgment, escalate when needed, and always prioritize safety and quality.

---

**Questions?** Start with the CONSTITUTION.md and work your way through the policy documents. When in doubt, create a HITL item.
