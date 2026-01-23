# Incident Response Checklist
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

Use this checklist when responding to production incidents, outages, or critical issues.

## Incident Response Checklist

### Phase 1: Detection & Assessment (First 5 minutes)

#### 1. Incident Detection
- [ ] Incident detected via monitoring/alerting
- [ ] Incident severity assessed
- [ ] Initial impact estimated
- [ ] Incident ID assigned
- [ ] Response team notified

#### 2. Initial Assessment
- [ ] Verify incident is real (not false alarm)
- [ ] Determine affected systems/services
- [ ] Estimate number of affected users
- [ ] Check if data loss occurred
- [ ] Assess security implications

#### 3. Severity Classification
Determine severity level:
- [ ] **SEV1 (Critical):** Complete outage, data loss, security breach
- [ ] **SEV2 (High):** Major functionality broken, significant user impact
- [ ] **SEV3 (Medium):** Partial functionality affected, workaround exists
- [ ] **SEV4 (Low):** Minor issue, minimal user impact

### Phase 2: Initial Response (First 15 minutes)

#### 4. Establish Incident Command
- [ ] Incident commander assigned
- [ ] Communication channel created (#incident-XXX)
- [ ] Key stakeholders identified
- [ ] Roles assigned (commander, technical lead, communicator)

#### 5. Communication
- [ ] Internal team notified
- [ ] Management notified (if SEV1/SEV2)
- [ ] Status page updated (if customer-facing)
- [ ] Initial customer communication sent (if applicable)

#### 6. Quick Stabilization
- [ ] Check if quick rollback possible
- [ ] Check if circuit breakers needed
- [ ] Consider feature flag disabling
- [ ] Scale resources if needed
- [ ] Apply immediate mitigations

### Phase 3: Investigation (First 30 minutes)

#### 7. Gather Data
- [ ] Check recent deployments
- [ ] Review application logs
- [ ] Check infrastructure logs
- [ ] Review monitoring dashboards
- [ ] Check external dependencies
- [ ] Review recent configuration changes

#### 8. Root Cause Analysis
- [ ] Identify root cause (or likely cause)
- [ ] Trace error chain
- [ ] Identify trigger event
- [ ] Document timeline of events
- [ ] Identify contributing factors

#### 9. Impact Assessment
- [ ] Quantify affected users
- [ ] Measure downtime duration
- [ ] Assess data integrity
- [ ] Check for data loss
- [ ] Evaluate security implications
- [ ] Estimate business impact

### Phase 4: Resolution (Variable time)

#### 10. Resolution Strategy
Select approach:
- [ ] **Rollback:** Revert to last known good state
- [ ] **Hotfix:** Apply quick fix
- [ ] **Configuration:** Adjust configuration
- [ ] **Scale:** Add resources
- [ ] **Disable:** Turn off problematic feature
- [ ] **Failover:** Switch to backup system

#### 11. Execute Resolution
- [ ] Test resolution in staging (if time permits)
- [ ] Get approval from incident commander
- [ ] Apply resolution to production
- [ ] Monitor closely during application
- [ ] Verify resolution is working
- [ ] Confirm issue is resolved

#### 12. Verification
- [ ] Run smoke tests
- [ ] Check key metrics
- [ ] Verify affected functionality works
- [ ] Confirm no new issues introduced
- [ ] Check with affected users
- [ ] Monitor for 30+ minutes

### Phase 5: Recovery (Next hour)

#### 13. System Recovery
- [ ] Restore all services to normal
- [ ] Clear backlogs if any
- [ ] Verify data consistency
- [ ] Check dependent systems
- [ ] Resume normal operations

#### 14. Communication
- [ ] Update status page to resolved
- [ ] Notify internal team
- [ ] Notify management
- [ ] Send customer communication
- [ ] Thank response team

### Phase 6: Post-Incident (Next day)

#### 15. Documentation
- [ ] Document incident timeline
- [ ] Document root cause
- [ ] Document resolution steps
- [ ] Document impact metrics
- [ ] Archive logs and evidence
- [ ] Save all communications

#### 16. Post-Mortem
Schedule and conduct post-mortem:
- [ ] Schedule post-mortem meeting (within 48 hours)
- [ ] Invite all stakeholders
- [ ] Review incident timeline
- [ ] Identify root cause(s)
- [ ] List what went well
- [ ] List what could improve
- [ ] Create action items
- [ ] Assign owners to action items
- [ ] Set deadlines for actions

#### 17. Post-Mortem Document
Create written post-mortem including:
- [ ] Executive summary
- [ ] Timeline of events
- [ ] Root cause analysis
- [ ] Impact assessment
- [ ] What went well
- [ ] What could be improved
- [ ] Action items with owners
- [ ] Prevention measures

#### 18. Follow-Up Actions
- [ ] Implement immediate fixes
- [ ] Plan long-term solutions
- [ ] Update runbooks
- [ ] Improve monitoring
- [ ] Add alerting if missing
- [ ] Update documentation
- [ ] Share learnings with team

### Phase 7: Prevention (Next week)

#### 19. Preventive Measures
- [ ] Implement fixes to prevent recurrence
- [ ] Add monitoring/alerting
- [ ] Update runbooks
- [ ] Add automated tests
- [ ] Improve deployment process
- [ ] Update configuration management
- [ ] Review similar systems for same issue

#### 20. Process Improvements
- [ ] Update incident response procedures
- [ ] Improve detection methods
- [ ] Enhance communication templates
- [ ] Update escalation paths
- [ ] Add new runbooks
- [ ] Schedule training if needed

## Incident Roles

### Incident Commander
- Overall responsibility for incident
- Makes final decisions
- Coordinates response
- Manages communication

### Technical Lead
- Leads technical investigation
- Proposes solutions
- Executes resolution
- Coordinates technical team

### Communicator
- Handles internal communication
- Updates status page
- Drafts customer communications
- Coordinates with PR/marketing

### Scribe
- Documents timeline
- Takes notes
- Records decisions
- Tracks action items

## Communication Templates

### Initial Notification
```
🚨 INCIDENT DETECTED - [SEV1/SEV2/SEV3/SEV4]

Incident ID: INC-XXXX
Time: YYYY-MM-DD HH:MM UTC
Severity: [SEV1/SEV2/SEV3/SEV4]
Impact: [Brief description]
Status: Investigating

Incident Commander: [Name]
Communication Channel: #incident-XXXX

Updates will be posted every 15 minutes.
```

### Status Update
```
📊 INCIDENT UPDATE - INC-XXXX

Time: HH:MM UTC
Status: [Investigating/Mitigating/Resolved]
Progress: [What's been done]
Next Steps: [What's planned]
ETA: [If known]

Next update in 15 minutes.
```

### Resolution Notification
```
✅ INCIDENT RESOLVED - INC-XXXX

Time: HH:MM UTC
Duration: [Total time]
Resolution: [Brief description]
Impact: [Summary]

Post-mortem scheduled for: [Date/Time]
Thank you to the response team!
```

## Escalation Criteria

Escalate immediately when:
- [ ] SEV1 incident (complete outage)
- [ ] Data loss detected
- [ ] Security breach suspected
- [ ] Financial impact significant
- [ ] Legal/regulatory implications
- [ ] Media attention likely
- [ ] Customer SLA breach
- [ ] Resolution taking longer than expected

## Anti-Patterns

Avoid these incident response mistakes:

❌ **Panic:** Stay calm and methodical
❌ **Cowboy fixes:** Follow the process
❌ **Poor communication:** Over-communicate
❌ **No documentation:** Document everything
❌ **Blame culture:** Focus on systems, not people
❌ **Skipping post-mortem:** Always conduct post-mortem
❌ **Ignoring prevention:** Implement preventive measures

## References

- Runbook Template: /.repo/templates/RUNBOOK_TEMPLATE.md
- Release Manager Role: /.repo/agents/roles/release.md
- Security Baseline: /.repo/policy/SECURITY_BASELINE.md
- HITL Process: /.repo/policy/HITL.md
