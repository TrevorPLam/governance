# Maintenance Playbook
## Routine governance maintenance

**Owner:** Governance Lead  
**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Purpose

Define routine tasks to keep governance policies, tooling, and records healthy.

---

## Cadence Overview

- **Weekly:** Review HITL items and validate governance checks.
- **Monthly:** Review waivers, update docs, audit logs.
- **Quarterly:** Update governance templates and test runbooks.

---

## Weekly Tasks

- Review `/.repo/policy/HITL.md` for pending items.
- Verify HITL items have owners and due dates.
- Run `governance verify --profile=quick` on active repos.

---

## Monthly Tasks

- Review `/.repo/policy/WAIVERS.md` for expirations.
- Close or renew waivers with updated remediation plans.
- Check for outdated documentation in `docs/`.
- Audit `COMPLETEDTODO.md` for archival completeness.

---

## Quarterly Tasks

- Check for governance framework updates.
- Refresh templates and standards if needed.
- Review boundary exceptions in `repo.manifest.yaml`.
- Test incident response and migration playbooks.

---

## Tooling Updates

1. Run `governance check-updates`.
2. Perform `governance update --dry-run`.
3. Backup `.repo/` and apply update.
4. Re-run `governance validate` and `governance verify --profile=ci`.

---

## Archive Procedures

- Move completed HITL items to Archived table in `/.repo/policy/HITL.md`.
- Move completed waivers to Historical table in `/.repo/policy/WAIVERS.md`.
- Archive completed tasks in `COMPLETEDTODO.md`.

---

## References

- `templates/.repo/policy/HITL.md`
- `templates/.repo/policy/WAIVERS.md`
- `docs/reference/CLI_REFERENCE.md`
- `docs/playbooks/INCIDENT_RESPONSE_PLAYBOOK.md`

