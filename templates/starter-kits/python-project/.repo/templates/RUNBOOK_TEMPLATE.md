# Runbook Template
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

This template defines the structure for operational runbooks. Runbooks provide step-by-step procedures for operational tasks, deployments, and incident response.

## Runbook Structure

```markdown
# Runbook: [Operation Name]

**Type:** [Deployment | Maintenance | Recovery | Configuration | Incident Response]  
**Frequency:** [On-Demand | Daily | Weekly | Monthly | Emergency]  
**Owner:** [Team or person responsible]  
**Last Updated:** YYYY-MM-DD  
**Last Tested:** YYYY-MM-DD

## Summary

### Purpose
[Brief description of what this runbook accomplishes]

### When to Use
[Situations when this runbook should be executed]

### Prerequisites
[What must be in place before starting]

### Estimated Duration
[How long this typically takes]

### Risk Level
[Low | Medium | High | Critical]

## Pre-Flight Checklist

Before starting, verify:
- [ ] Prerequisite 1
- [ ] Prerequisite 2
- [ ] Prerequisite 3
- [ ] Backup completed (if applicable)
- [ ] Rollback plan reviewed
- [ ] Team notified
- [ ] Maintenance window scheduled (if applicable)

## Steps

### Step 1: [Title]
**Duration:** [Estimated time]  
**Risk:** [Low | Medium | High]

**Commands:**
```bash
# Commands to execute
command1
command2
```

**Expected Output:**
```
Expected output from commands
```

**Verification:**
- [ ] Output matches expected
- [ ] No errors in logs
- [ ] Service responds correctly

**If This Fails:**
[What to do if step fails]

---

### Step 2: [Title]
[Same structure as Step 1]

---

### Step 3: [Title]
[Same structure as Step 1]

---

## Verification

### Health Checks
After completion, verify:
- [ ] Check 1: [How to verify]
- [ ] Check 2: [How to verify]
- [ ] Check 3: [How to verify]

### Monitoring
Monitor these metrics for [duration]:
- Metric 1: [Expected value]
- Metric 2: [Expected value]
- Metric 3: [Expected value]

### Success Criteria
Operation is successful when:
1. Criterion 1
2. Criterion 2
3. Criterion 3

## Rollback

### When to Rollback
Rollback immediately if:
- Condition 1
- Condition 2
- Condition 3

### Rollback Steps

#### Step 1: [Title]
```bash
# Rollback commands
rollback1
rollback2
```

#### Step 2: [Title]
[Rollback step description]

### Rollback Verification
Verify rollback succeeded:
- [ ] Check 1
- [ ] Check 2
- [ ] Check 3

## Troubleshooting

### Common Issues

#### Issue 1: [Description]
**Symptoms:**
- Symptom A
- Symptom B

**Diagnosis:**
```bash
# Diagnostic commands
diagnostic1
diagnostic2
```

**Resolution:**
[How to fix]

---

#### Issue 2: [Description]
[Same structure as Issue 1]

---

## Emergency Contacts

### During Business Hours
- **Primary:** Name (phone, email)
- **Secondary:** Name (phone, email)

### After Hours
- **On-Call:** Pager/phone number
- **Escalation:** Manager contact

## Post-Execution

### Documentation
After completion:
- [ ] Update this runbook if needed
- [ ] Document any issues encountered
- [ ] Update monitoring if needed
- [ ] Share lessons learned

### Communication
- [ ] Notify team of completion
- [ ] Update status page (if applicable)
- [ ] Send completion report (if required)

## Notes

[Any additional context, warnings, or tips]

---

**Version:** 1.0  
**Created:** YYYY-MM-DD  
**Last Modified:** YYYY-MM-DD  
**Testing Status:** [Tested | Untested | Partially Tested]
```

## Example Runbook

```markdown
# Runbook: Deploy API Service to Production

**Type:** Deployment  
**Frequency:** As needed (typically weekly)  
**Owner:** Platform Team  
**Last Updated:** 2026-01-22  
**Last Tested:** 2026-01-20

## Summary

### Purpose
Deploy the API service to production environment with zero-downtime rolling update.

### When to Use
- When new version is ready for production
- When hotfix needs to be deployed
- When configuration update is required

### Prerequisites
- Release candidate tested in staging
- All tests passing in CI/CD
- Security scan completed
- Team has approved deployment
- Rollback plan ready

### Estimated Duration
15-20 minutes

### Risk Level
Medium

## Pre-Flight Checklist

Before starting, verify:
- [ ] Release candidate deployed to staging successfully
- [ ] All automated tests passing
- [ ] Security scan shows no critical issues
- [ ] Database migrations tested (if applicable)
- [ ] Rollback plan reviewed and ready
- [ ] Team notified in #deployments channel
- [ ] Maintenance window scheduled (if breaking changes)
- [ ] Monitoring dashboards open

## Steps

### Step 1: Backup Current State
**Duration:** 2 minutes  
**Risk:** Low

**Commands:**
```bash
# Create snapshot of current deployment
kubectl get deployment api-service -o yaml > backup-$(date +%Y%m%d-%H%M%S).yaml

# Verify backup created
ls -lh backup-*.yaml
```

**Expected Output:**
```
backup-20260122-103000.yaml
```

**Verification:**
- [ ] Backup file exists
- [ ] Backup file contains valid YAML

**If This Fails:**
Do not proceed. Investigate why backup failed.

---

### Step 2: Update Container Image
**Duration:** 1 minute  
**Risk:** Low

**Commands:**
```bash
# Update deployment with new image
kubectl set image deployment/api-service \
  api=registry.example.com/api-service:v1.2.3

# Verify update command succeeded
echo $?
```

**Expected Output:**
```
deployment.apps/api-service image updated
0
```

**Verification:**
- [ ] Command exit code is 0
- [ ] Deployment updated message shown

**If This Fails:**
Check image tag exists in registry. Verify kubectl credentials.

---

### Step 3: Monitor Rolling Update
**Duration:** 10-15 minutes  
**Risk:** Medium

**Commands:**
```bash
# Watch rollout status
kubectl rollout status deployment/api-service --timeout=10m

# Monitor pods
kubectl get pods -l app=api-service --watch
```

**Expected Output:**
```
Waiting for deployment "api-service" rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for deployment "api-service" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "api-service" rollout to finish: 3 out of 3 new replicas have been updated...
deployment "api-service" successfully rolled out
```

**Verification:**
- [ ] All pods in Running state
- [ ] No CrashLoopBackOff
- [ ] Health checks passing
- [ ] Old pods terminated gracefully

**If This Fails:**
If rollout fails or pods crash, proceed to rollback immediately.

---

### Step 4: Run Smoke Tests
**Duration:** 2 minutes  
**Risk:** Low

**Commands:**
```bash
# Test critical endpoints
curl -f https://api.example.com/health
curl -f https://api.example.com/api/v1/status
curl -f -H "Authorization: Bearer $TEST_TOKEN" \
  https://api.example.com/api/v1/users/me
```

**Expected Output:**
```
{"status":"healthy"}
{"version":"1.2.3","status":"ok"}
{"id":"test-user","email":"test@example.com"}
```

**Verification:**
- [ ] All endpoints return 200 OK
- [ ] Response format correct
- [ ] No errors in application logs

**If This Fails:**
Proceed to rollback. Investigate issue in staging.

---

## Verification

### Health Checks
After completion, verify:
- [ ] All pods running: `kubectl get pods -l app=api-service`
- [ ] Health endpoint returning healthy: `curl https://api.example.com/health`
- [ ] Metrics endpoint accessible: `curl https://api.example.com/metrics`
- [ ] No errors in logs: `kubectl logs -l app=api-service --tail=100`

### Monitoring
Monitor these metrics for 30 minutes:
- Error rate: Should be <0.1%
- Response time (p99): Should be <200ms
- Request rate: Should match baseline
- CPU/Memory: Should be within normal range

### Success Criteria
Deployment is successful when:
1. All pods are running and healthy
2. Health checks passing
3. Smoke tests passed
4. No increase in error rate
5. Performance within acceptable range
6. No alerts triggered

## Rollback

### When to Rollback
Rollback immediately if:
- Error rate increases >1%
- Response time >500ms
- Pods crashlooping
- Health checks failing
- Critical feature broken
- Data corruption detected

### Rollback Steps

#### Step 1: Initiate Rollback
```bash
# Rollback to previous version
kubectl rollout undo deployment/api-service

# Verify rollback started
kubectl rollout status deployment/api-service
```

#### Step 2: Verify Rollback
```bash
# Check pods are running previous version
kubectl get pods -l app=api-service -o jsonpath='{.items[0].spec.containers[0].image}'

# Run smoke tests again
curl -f https://api.example.com/health
```

#### Step 3: Monitor After Rollback
Monitor metrics for 15 minutes to ensure stability restored.

### Rollback Verification
Verify rollback succeeded:
- [ ] Pods running previous version
- [ ] Error rate returned to normal
- [ ] Response times acceptable
- [ ] No alerts firing

## Troubleshooting

### Common Issues

#### Issue 1: Pods Failing Health Checks
**Symptoms:**
- Pods show 0/1 Ready
- Health endpoint returns 503
- Pods restarting repeatedly

**Diagnosis:**
```bash
# Check pod logs
kubectl logs -l app=api-service --tail=50

# Describe pod for events
kubectl describe pod <pod-name>

# Check application startup
kubectl logs <pod-name> --previous
```

**Resolution:**
- Check environment variables are correct
- Verify database connectivity
- Check dependent services are available
- Review recent code changes for startup issues

---

#### Issue 2: High Error Rate After Deployment
**Symptoms:**
- Error rate >1%
- 500 errors in application logs
- Alert: "High Error Rate" firing

**Diagnosis:**
```bash
# Check error logs
kubectl logs -l app=api-service | grep ERROR

# Check specific error patterns
kubectl logs -l app=api-service | grep -A5 "database"
```

**Resolution:**
- If database migration issue: Rollback immediately
- If configuration issue: Update config and redeploy
- If code issue: Rollback and fix in staging

---

## Emergency Contacts

### During Business Hours (9am-5pm ET)
- **Primary:** Platform Team Lead (555-0100, platform@example.com)
- **Secondary:** DevOps Engineer (555-0101, devops@example.com)

### After Hours
- **On-Call:** PagerDuty (platform-oncall)
- **Escalation:** CTO (555-0200) - Only for critical issues

## Post-Execution

### Documentation
After completion:
- [ ] Tag release in Git: `git tag v1.2.3`
- [ ] Update CHANGELOG.md
- [ ] Update deployment log in wiki
- [ ] Document any issues encountered
- [ ] Update monitoring alerts if needed
- [ ] Update this runbook if steps changed

### Communication
- [ ] Post deployment completion in #deployments
- [ ] Update status page (if customer-facing changes)
- [ ] Send deployment report to stakeholders
- [ ] Close deployment ticket

## Notes

- Always deploy during low-traffic hours when possible
- Keep monitoring dashboard open during entire deployment
- Have two team members available for deployments
- Document any deviations from this runbook
- Test rollback procedure quarterly

---

**Version:** 2.1  
**Created:** 2026-01-10  
**Last Modified:** 2026-01-22  
**Testing Status:** Tested (last test: 2026-01-20)
```

## Runbook Best Practices

### Writing Runbooks
- ✅ Be explicit and detailed
- ✅ Include actual commands to run
- ✅ Show expected output
- ✅ Document failure scenarios
- ✅ Test procedures regularly
- ✅ Keep up to date

### Using Runbooks
- ✅ Follow steps exactly
- ✅ Verify each step before proceeding
- ✅ Document deviations
- ✅ Update runbook if steps change
- ✅ Don't skip verification steps
- ✅ Have rollback plan ready

### Maintaining Runbooks
- ✅ Review after each use
- ✅ Test quarterly
- ✅ Update when systems change
- ✅ Version control runbooks
- ✅ Archive outdated runbooks

## References

- Release Manager Role: /.repo/agents/roles/release.md
- Incident Checklist: /.repo/agents/checklists/incident.md
- Quality Gates: /.repo/policy/QUALITY_GATES.md
