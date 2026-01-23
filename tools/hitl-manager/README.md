# HITL Manager

Manages Human-in-the-Loop items stored in `.repo/hitl/`.

## CLI
```bash
governance hitl list
governance hitl create --summary "Review auth flow" --risk high
governance hitl assign --id HITL-001 --owner "security-team"
governance hitl resolve --id HITL-001 --resolution "Approved with safeguards"
governance hitl report --format markdown
```
