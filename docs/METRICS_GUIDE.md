# Metrics Guide

**Purpose:** Explain governance metrics, collection, and interpretation.

**Last Updated:** 2026-01-22  
**Version:** 1.0.0

---

## Overview

Governance metrics provide objective signals about compliance, quality, and workflow health. Metrics are collected locally and stored in `.repo/metrics/`.

Use:
```bash
governance metrics collect
governance metrics report
governance metrics dashboard
```

---

## Metrics Categories

### Compliance
- **Policy coverage:** % of required policy files present.
- **Manifest placeholders:** Count of `<FILL_FROM_REPO>` and `<UNKNOWN>` in `repo.manifest.yaml`.
- **HITL active:** Active HITL entries.
- **Waivers active:** Active waiver entries.

### Quality
- **Docs present:** `.repo/docs/DOCS_INDEX.md` exists.
- **Automation present:** `.repo/automation/` contains scripts or CI templates.
- **Agent framework present:** `.repo/agents/AGENTS.md` exists.
- **Test coverage:** Optional; configure to populate.

### Velocity (Optional)
Not collected by default; placeholders for enterprise integrations:
- PR merge time
- Build success rate
- Deployment frequency

### Agent Metrics (Optional)
Not collected by default; placeholders for enterprise integrations:
- Agent success rate

---

## Files and Storage

Metrics live in `.repo/metrics/`:
- `metrics.config.json` - thresholds and retention
- `metrics.json` - latest metrics snapshot
- `metrics.history.jsonl` - append-only history

---

## CLI Commands

### Collect
```bash
governance metrics collect
```

### Report
```bash
governance metrics report
governance metrics report --format json
governance metrics report --format markdown
```

### Dashboard (Local)
```bash
governance metrics dashboard --port 3579
```

---

## Configuration

Edit `.repo/metrics/metrics.config.json` to adjust thresholds.

Example:
```json
{
  "version": "1.0.0",
  "retention_days": 90,
  "thresholds": {
    "policy_coverage_min": 0.95,
    "manifest_placeholders_max": 0,
    "waiver_active_max": 5,
    "hitl_active_max": 3
  }
}
```

---

## Troubleshooting

- **No metrics found:** Run `governance metrics collect` first.
- **Placeholders detected:** Fill `repo.manifest.yaml` and re-collect.
- **Missing automation:** Add scripts or CI templates under `.repo/automation/`.
