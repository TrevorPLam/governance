# Request for Comments (RFC) Template
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

This template defines the structure for Requests for Comments (RFCs). RFCs are used to propose significant changes and gather feedback before implementation.

## RFC Structure

```markdown
# RFC-XXX: [Title]

**Status:** [Draft | Under Review | Accepted | Rejected | Implemented]  
**Author:** [Name]  
**Created:** YYYY-MM-DD  
**Last Updated:** YYYY-MM-DD  
**Discussion:** [Link to discussion thread]

## Summary

[One-paragraph explanation of the proposal]

## Motivation

### Problem
[What problem does this solve? Why is this important?]

### Current State
[What is the current situation?]

### Desired State
[What do we want to achieve?]

### Goals
1. Goal 1
2. Goal 2
3. Goal 3

### Non-Goals
[What is explicitly out of scope?]

## Proposal

### Overview
[High-level description of the proposed solution]

### Design

#### Architecture
[Architectural overview, diagrams if helpful]

#### Components
**Component 1:**
- Purpose: [What it does]
- Interface: [How to interact with it]
- Dependencies: [What it depends on]

**Component 2:**
[Same structure]

#### Data Flow
[How data flows through the system]

#### APIs
[API contracts, if applicable]

#### Configuration
[Any configuration needed]

### Implementation Plan

#### Phase 1: [Name]
**Duration:** [Estimate]  
**Deliverables:**
- Deliverable 1
- Deliverable 2

#### Phase 2: [Name]
[Same structure]

#### Phase 3: [Name]
[Same structure]

### Migration Strategy
[How to migrate from current to proposed state]

## Alternatives Considered

### Alternative 1: [Name]
**Description:** [What is it?]

**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

**Why Not Chosen:** [Explanation]

---

### Alternative 2: [Name]
[Same structure]

---

## Impact Analysis

### Technical Impact
**Affected Systems:**
- System 1: [How affected]
- System 2: [How affected]

**Breaking Changes:**
- Change 1: [Description and mitigation]
- Change 2: [Description and mitigation]

**Dependencies:**
- New: [List new dependencies]
- Changed: [List changed dependencies]
- Removed: [List removed dependencies]

### Team Impact
**Development:** [How it affects development workflow]  
**Operations:** [How it affects operations]  
**QA:** [How it affects testing]  
**Documentation:** [What needs to be documented]

### User Impact
**End Users:** [How it affects end users]  
**Internal Users:** [How it affects internal tools]  
**API Clients:** [How it affects API clients]

### Performance Impact
**Expected:** [Expected performance changes]  
**Worst Case:** [Worst case performance]  
**Mitigation:** [How to mitigate performance issues]

### Security Impact
**Security Changes:** [Any security implications]  
**New Attack Vectors:** [New security risks]  
**Mitigation:** [How risks are mitigated]

## Risks

### Risk 1: [Description]
**Likelihood:** [Low | Medium | High]  
**Impact:** [Low | Medium | High]  
**Mitigation:** [How to mitigate]  
**Contingency:** [What if it happens]

---

### Risk 2: [Description]
[Same structure]

---

## Dependencies

### Required Before This
- Dependency 1: [Why needed first]
- Dependency 2: [Why needed first]

### Blocks These
- Blocked item 1: [Why blocked]
- Blocked item 2: [Why blocked]

### Related Work
- Related RFC/ADR 1
- Related RFC/ADR 2

## Testing Strategy

### Unit Tests
[What unit tests are needed]

### Integration Tests
[What integration tests are needed]

### E2E Tests
[What E2E tests are needed]

### Performance Tests
[What performance tests are needed]

### Security Tests
[What security tests are needed]

### Migration Tests
[How to test migration]

## Monitoring & Observability

### Metrics
- Metric 1: [What to measure]
- Metric 2: [What to measure]

### Alerts
- Alert 1: [When to trigger]
- Alert 2: [When to trigger]

### Dashboards
[What dashboards to create]

### Logging
[What to log]

## Rollout Strategy

### Feature Flags
[Which feature flags needed]

### Rollout Phases
1. Phase 1: [Description]
2. Phase 2: [Description]
3. Phase 3: [Description]

### Success Criteria
[How to measure success at each phase]

### Rollback Plan
[How to rollback if issues arise]

## Documentation

### User Documentation
- [ ] User guide updates
- [ ] API documentation
- [ ] Examples and tutorials

### Developer Documentation
- [ ] Architecture documentation
- [ ] Code documentation
- [ ] Migration guide

### Operational Documentation
- [ ] Runbooks
- [ ] Monitoring guide
- [ ] Troubleshooting guide

## Open Questions

1. **Question 1?**
   - Proposed answer: [Answer]
   - Decision needed by: [Date]

2. **Question 2?**
   - Proposed answer: [Answer]
   - Decision needed by: [Date]

## Timeline

| Phase | Duration | Start Date | End Date | Status |
|-------|----------|------------|----------|--------|
| RFC Review | 2 weeks | YYYY-MM-DD | YYYY-MM-DD | In Progress |
| Implementation Phase 1 | 2 weeks | YYYY-MM-DD | YYYY-MM-DD | Not Started |
| Implementation Phase 2 | 3 weeks | YYYY-MM-DD | YYYY-MM-DD | Not Started |
| Testing | 1 week | YYYY-MM-DD | YYYY-MM-DD | Not Started |
| Rollout | 2 weeks | YYYY-MM-DD | YYYY-MM-DD | Not Started |

## Success Metrics

### Short-term (1 month)
- Metric 1: [Target value]
- Metric 2: [Target value]

### Medium-term (3 months)
- Metric 1: [Target value]
- Metric 2: [Target value]

### Long-term (6 months)
- Metric 1: [Target value]
- Metric 2: [Target value]

## Feedback

### Review Requests
- [ ] Team Lead: [Name]
- [ ] Security Team
- [ ] Platform Team
- [ ] Product Manager
- [ ] Other stakeholder

### Feedback Received
[Link to feedback or summarize here]

### Addressed Concerns
- Concern 1: [How addressed]
- Concern 2: [How addressed]

## Decision

**Status:** [Pending | Accepted | Rejected]  
**Date:** YYYY-MM-DD  
**Decision Maker:** [Name]

**Decision:**
[Decision text]

**Conditions:**
[Any conditions for approval]

**Next Steps:**
1. Next step 1
2. Next step 2
3. Next step 3

## References

- [Link to related RFCs]
- [Link to related ADRs]
- [Link to external resources]
- [Link to discussion threads]

---

**Revision History:**
- v1.0 (YYYY-MM-DD): Initial draft
- v1.1 (YYYY-MM-DD): Addressed feedback
- v2.0 (YYYY-MM-DD): Final version
```

## Example RFC

```markdown
# RFC-003: Implement Event-Driven Architecture for Order Processing

**Status:** Under Review  
**Author:** Backend Team Lead  
**Created:** 2026-01-15  
**Last Updated:** 2026-01-20  
**Discussion:** https://github.com/org/repo/discussions/42

## Summary

Migrate order processing from synchronous REST API calls to an event-driven architecture using a message queue, improving scalability, reliability, and enabling future features like order tracking and notifications.

## Motivation

### Problem
Current order processing is synchronous and tightly coupled:
- Order creation calls payment service directly
- Payment service calls inventory service directly
- If any service is down, entire order fails
- No retry mechanism
- Cannot track order status over time
- Cannot add features like notifications without changing order service

### Current State
```
Client → Order API → Payment API → Inventory API → Database
```
- Synchronous chain of API calls
- Tight coupling between services
- No resilience to service failures
- Order processing takes 2-5 seconds

### Desired State
```
Client → Order API → Message Queue → [Payment Worker, Inventory Worker, Notification Worker]
```
- Event-driven architecture
- Loose coupling between services
- Resilient to failures
- Fast response to client (<200ms)
- Extensible for new features

### Goals
1. Improve order processing reliability
2. Reduce response time to client
3. Enable async order status tracking
4. Support future features (notifications, analytics)
5. Improve system resilience

### Non-Goals
- Migrating other parts of system (only orders)
- Real-time order tracking (comes later)
- Changing payment or inventory services internally

## Proposal

### Overview
Introduce a message queue (RabbitMQ) between order service and downstream services. Order service publishes events; workers process events asynchronously.

### Design

#### Architecture
```
┌────────┐     ┌──────────┐     ┌──────────────┐
│ Client │────▶│  Order   │────▶│   RabbitMQ   │
└────────┘     │   API    │     │ Message Queue│
               └──────────┘     └──────┬───────┘
                                       │
                   ┌───────────────────┼────────────────┐
                   ▼                   ▼                ▼
              ┌─────────┐         ┌──────────┐    ┌──────────┐
              │ Payment │         │Inventory │    │Notification│
              │ Worker  │         │ Worker   │    │  Worker   │
              └─────────┘         └──────────┘    └──────────┘
```

#### Components

**Order API:**
- Purpose: Receive order requests, validate, publish events
- Interface: REST API (POST /orders)
- Dependencies: RabbitMQ, Database

**Message Queue (RabbitMQ):**
- Purpose: Reliable message delivery
- Interface: AMQP protocol
- Dependencies: None

**Payment Worker:**
- Purpose: Process payments asynchronously
- Interface: Consumes `order.created` events
- Dependencies: Payment service, Database

**Inventory Worker:**
- Purpose: Reserve inventory asynchronously
- Interface: Consumes `payment.completed` events
- Dependencies: Inventory service, Database

**Notification Worker:**
- Purpose: Send notifications (future)
- Interface: Consumes various order events
- Dependencies: Email service

#### Data Flow
1. Client POST /orders
2. Order API validates, saves order (status: pending)
3. Order API publishes `order.created` event
4. Order API returns 202 Accepted to client
5. Payment Worker consumes event, processes payment
6. Payment Worker publishes `payment.completed` or `payment.failed`
7. Inventory Worker consumes event, reserves inventory
8. Order status updated to `completed` or `failed`

#### APIs

**Order API:**
```
POST /orders
{
  "items": [...],
  "customer_id": "..."
}

Response: 202 Accepted
{
  "order_id": "12345",
  "status": "pending",
  "status_url": "/orders/12345/status"
}
```

**Status API (new):**
```
GET /orders/12345/status

Response: 200 OK
{
  "order_id": "12345",
  "status": "processing",
  "events": [
    {"type": "created", "timestamp": "..."},
    {"type": "payment_completed", "timestamp": "..."}
  ]
}
```

#### Configuration
```yaml
RABBITMQ_URL: amqp://localhost:5672
ORDER_QUEUE: orders
PAYMENT_QUEUE: payments
INVENTORY_QUEUE: inventory
```

### Implementation Plan

#### Phase 1: Infrastructure (1 week)
**Deliverables:**
- RabbitMQ deployed
- Connection library added
- Basic pub/sub working

#### Phase 2: Order Events (2 weeks)
**Deliverables:**
- Order API publishes events
- Order status tracking
- Status API endpoint

#### Phase 3: Workers (2 weeks)
**Deliverables:**
- Payment worker implemented
- Inventory worker implemented
- End-to-end flow working

#### Phase 4: Migration (1 week)
**Deliverables:**
- Feature flag for new flow
- Gradual rollout (10%, 50%, 100%)
- Old flow deprecated

### Migration Strategy
1. Deploy new infrastructure (no traffic)
2. Deploy order API with feature flag (disabled)
3. Deploy workers
4. Enable feature flag for 10% of traffic
5. Monitor for 2 days
6. Increase to 50%, monitor 2 days
7. Increase to 100%
8. Remove old synchronous code after 1 month

## Alternatives Considered

### Alternative 1: Keep Synchronous, Add Retry Logic
**Description:** Keep current architecture, add retry logic and circuit breakers

**Pros:**
- Simpler, no new infrastructure
- Faster to implement

**Cons:**
- Still tightly coupled
- Doesn't improve response time
- Doesn't enable future features
- Retry logic increases complexity

**Why Not Chosen:** Doesn't solve fundamental coupling problem

### Alternative 2: Use Kafka Instead of RabbitMQ
**Description:** Use Kafka for event streaming

**Pros:**
- Better for event sourcing
- Higher throughput
- Built-in partitioning

**Cons:**
- Overkill for our needs
- More complex to operate
- Larger resource footprint
- Team not familiar with Kafka

**Why Not Chosen:** RabbitMQ sufficient for our scale, simpler to operate

## Impact Analysis

### Technical Impact
**Affected Systems:**
- Order service: Major changes (event publishing)
- Payment service: Minor changes (new worker)
- Inventory service: Minor changes (new worker)

**Breaking Changes:**
- Order API response changes from 200 to 202
- Clients must poll status endpoint for completion

**Dependencies:**
- New: RabbitMQ (amqplib 0.10.3)
- Changed: Order service API contract

### Team Impact
**Development:** Need to learn message queue patterns  
**Operations:** Need to monitor RabbitMQ  
**QA:** Need to test async flows  
**Documentation:** API docs need updating

### User Impact
**End Users:** Faster order submission (<200ms vs 2-5s)  
**Internal Users:** Can track order status  
**API Clients:** Must update to new API contract (breaking change)

### Performance Impact
**Expected:** 
- Order API response time: 2-5s → <200ms
- Order completion time: Same (2-5s)

**Worst Case:** Queue backlog if workers can't keep up  
**Mitigation:** Scale workers horizontally

### Security Impact
**Security Changes:** Message queue adds new attack surface  
**New Attack Vectors:** Could inject malicious messages  
**Mitigation:** Message validation, authentication, encrypted connections

## Risks

### Risk 1: Message Queue Downtime
**Likelihood:** Low  
**Impact:** High (orders stop processing)  
**Mitigation:** High availability setup, monitoring  
**Contingency:** Fallback to synchronous processing

### Risk 2: Messages Lost
**Likelihood:** Low  
**Impact:** High (lost orders)  
**Mitigation:** Durable queues, message persistence, acknowledgments  
**Contingency:** Replay from database

### Risk 3: Duplicate Processing
**Likelihood:** Medium  
**Impact:** Medium (duplicate charges)  
**Mitigation:** Idempotency keys, deduplication  
**Contingency:** Manual reconciliation

## Testing Strategy

### Unit Tests
- Event publishing logic
- Message validation
- Worker processing logic

### Integration Tests
- End-to-end order flow
- Failure scenarios (payment fails, inventory out of stock)
- Retry logic

### E2E Tests
- Full order submission and completion
- Status tracking

### Performance Tests
- Load test order API
- Measure queue throughput
- Test worker scaling

### Security Tests
- Message validation
- Authentication
- Authorization

## Monitoring & Observability

### Metrics
- Queue depth
- Message processing time
- Worker error rate
- Order completion rate

### Alerts
- Queue depth >1000: Scale workers
- Worker error rate >5%: Investigate
- Message age >5 minutes: Check workers

### Dashboards
- Order processing dashboard
- Queue health dashboard
- Worker performance dashboard

### Logging
- All events published
- All events consumed
- All errors with context

## Timeline

| Phase | Duration | Start Date | End Date | Status |
|-------|----------|------------|----------|--------|
| RFC Review | 1 week | 2026-01-15 | 2026-01-22 | In Progress |
| Phase 1: Infrastructure | 1 week | 2026-01-23 | 2026-01-30 | Not Started |
| Phase 2: Order Events | 2 weeks | 2026-01-30 | 2026-02-13 | Not Started |
| Phase 3: Workers | 2 weeks | 2026-02-13 | 2026-02-27 | Not Started |
| Phase 4: Migration | 1 week | 2026-02-27 | 2026-03-06 | Not Started |

## Success Metrics

### Short-term (1 month)
- Order API response time <200ms: 95%
- Order completion rate: 99%+
- Queue depth: <100

### Medium-term (3 months)
- Zero message loss
- Worker scaling working
- Order tracking used by customers

### Long-term (6 months)
- New features built on events (notifications)
- Old synchronous code removed
- Team comfortable with event-driven patterns

## Decision

**Status:** Under Review  
**Date:** Pending  
**Decision Maker:** Architecture Team

**Next Steps:**
1. Gather feedback (due: 2026-01-22)
2. Address concerns
3. Get approval
4. Create ADR if approved
5. Start Phase 1

## References

- Similar RFC at Company X: [link]
- RabbitMQ best practices: [link]
- Event-driven patterns: [link]

---

**Revision History:**
- v1.0 (2026-01-15): Initial draft
- v1.1 (2026-01-20): Added security section based on feedback
```

## RFC Process

1. **Draft:** Author writes RFC
2. **Review:** Team reviews and provides feedback
3. **Revision:** Author addresses feedback
4. **Decision:** Decision maker approves or rejects
5. **Implementation:** If approved, create ADR and implement
6. **Retrospective:** Review after implementation

## When to Create an RFC

Create RFCs for:
- ✅ Major architectural changes
- ✅ New significant features
- ✅ Breaking changes
- ✅ Infrastructure changes
- ✅ Process changes

Don't create RFCs for:
- ❌ Bug fixes
- ❌ Minor features
- ❌ Refactoring
- ❌ Documentation updates

## References

- ADR Template: /.repo/templates/ADR_TEMPLATE.md
- Principles: /.repo/policy/PRINCIPLES.md
- HITL Process: /.repo/policy/HITL.md
