# Incident Response Playbook
## Security incidents, policy violations, and outages

**Owner:** Security Lead  
**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Purpose

Provide a consistent response process for incidents that impact security, policy compliance, or system availability.

---

## Incident Types

- **Security incident:** Secrets exposure, vulnerability exploit, unauthorized access.
- **Policy violation:** Missing required artifacts, boundary breaches, invalid waivers.
- **System outage:** CI/CD failures, critical service downtime, release blocking issue.

---

## Immediate Actions (All Incidents)

1. **Declare the incident** and create a tracking record (ticket or doc).
2. **Trigger HITL** if any of the following apply:
   - Security impact.
   - External systems involved.
   - Production data or money flows at risk.
3. **Capture evidence** (logs, timestamps, affected systems).
4. **Assign owner** and incident commander.

---

## Security Incident Flow

1. Contain: revoke credentials, rotate secrets, isolate affected systems.
2. Assess: identify scope and affected data.
3. Remediate: patch vulnerabilities, remove exposed data.
4. Verify: run `check:security` and collect evidence.
5. Communicate: stakeholders and required notifications.

---

## Policy Violation Flow

1. Identify violation source (policy file, manifest, or boundary breach).
2. Determine if a waiver is allowed; if yes, file a waiver with expiration.
3. Create remediation task in TODOs.
4. Re-run `governance verify` before merge.

---

## Outage Flow

1. Stabilize service and restore critical paths.
2. Roll back or disable recent changes.
3. Validate recovery with health checks.
4. Re-run relevant governance checks after recovery.

---

## Escalation

Escalate when:
- Production data is at risk.
- Security triggers are met.
- Required approvals are missing.
- Incident persists beyond SLA.

---

## Post-Mortem

Required for:
- Security incidents.
- Outages affecting users.
- Repeated policy violations.

Post-mortem should include:
- Timeline of events.
- Root cause analysis.
- Corrective actions and owners.
- Updates to policies or runbooks.

---

## References

- `templates/.repo/policy/SECURITY_BASELINE.md`
- `templates/.repo/policy/QUALITY_GATES.md`
- `templates/.repo/agents/checklists/incident.md`
- `docs/playbooks/MAINTENANCE_PLAYBOOK.md`

