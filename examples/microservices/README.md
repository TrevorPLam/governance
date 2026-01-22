# Microservices Governance Example

**Purpose:** Demonstrate AI-Native Governance in a microservices architecture.

## Overview

This example shows governance across multiple microservices:
- User Service (authentication and user management)
- Product Service (product catalog)
- Order Service (order processing)
- API Gateway (routing and aggregation)
- Shared governance and communication patterns

## Structure

```
microservices/
├── .repo/                      # Shared governance framework
├── services/
│   ├── api-gateway/           # API Gateway service
│   │   ├── .repo/             # Service-specific governance
│   │   └── src/
│   ├── user-service/          # User microservice
│   │   ├── .repo/
│   │   └── src/
│   ├── product-service/       # Product microservice
│   │   ├── .repo/
│   │   └── src/
│   └── order-service/         # Order microservice
│       ├── .repo/
│       └── src/
├── shared/                     # Shared libraries
│   ├── common/                 # Common utilities
│   └── types/                  # Shared types
└── docker-compose.yml          # Local development
```

## Key Features Demonstrated

### 1. Service Boundaries
- Clear service responsibilities
- No direct database access between services
- Communication via APIs only
- Event-driven architecture

### 2. Governance Per Service
- Each service has its own `.repo/` folder
- Service-specific policies
- Independent deployments
- Service-level quality gates

### 3. Cross-Service Patterns
- API Gateway pattern
- Service discovery
- Circuit breakers
- Distributed tracing
- Centralized logging

### 4. Security in Microservices
- Service-to-service authentication
- API Gateway security
- Secrets management
- Network policies

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Docker and Docker Compose
- kubectl (for Kubernetes deployment)

### 2. Start All Services

```bash
cd examples/microservices

# Start all services with Docker Compose
docker-compose up -d

# Check service health
curl http://localhost:8000/health  # API Gateway
curl http://localhost:8001/health  # User Service
curl http://localhost:8002/health  # Product Service
curl http://localhost:8003/health  # Order Service
```

### 3. Test the System

```bash
# Register a user (via API Gateway)
curl -X POST http://localhost:8000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "secure123"}'

# Get products
curl http://localhost:8000/api/products

# Create an order
curl -X POST http://localhost:8000/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"productId": "123", "quantity": 2}'
```

## Service Details

### API Gateway (Port 8000)
**Responsibility:** Route requests, aggregate responses, handle auth

**Governance Focus:**
- Request routing rules
- Rate limiting
- Authentication verification
- Response aggregation

**Layer:** Application

### User Service (Port 8001)
**Responsibility:** User management, authentication, authorization

**Governance Focus:**
- Password security
- JWT token management
- User data privacy
- GDPR compliance

**Layer:** Domain + Data

### Product Service (Port 8002)
**Responsibility:** Product catalog, inventory management

**Governance Focus:**
- Data consistency
- Cache invalidation
- Search performance
- Image optimization

**Layer:** Domain + Data

### Order Service (Port 8003)
**Responsibility:** Order processing, payment integration

**Governance Focus:**
- Transaction integrity
- Payment security (PCI compliance)
- Order state management
- Idempotency

**Layer:** Domain + Data

## Microservices Governance Patterns

### 1. Service Communication

```typescript
// ✅ CORRECT: Service-to-service via API
const user = await fetch('http://user-service:8001/api/users/123');

// ❌ WRONG: Direct database access
// const user = await userDb.query('SELECT * FROM users WHERE id = 123');
```

### 2. Circuit Breaker Pattern

```typescript
import CircuitBreaker from 'opossum';

const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};

const breaker = new CircuitBreaker(fetchUserService, options);

breaker.fallback(() => ({ 
  error: 'User service unavailable',
  cached: true 
}));

const user = await breaker.fire(userId);
```

### 3. Distributed Tracing

```typescript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('order-service');

const span = tracer.startSpan('process-order');
try {
  // Process order
  span.setStatus({ code: SpanStatusCode.OK });
} catch (error) {
  span.setStatus({ 
    code: SpanStatusCode.ERROR,
    message: error.message 
  });
} finally {
  span.end();
}
```

### 4. Event-Driven Communication

```typescript
// Order Service publishes event
eventBus.publish('order.created', {
  orderId: '123',
  userId: '456',
  total: 99.99
});

// Inventory Service subscribes
eventBus.subscribe('order.created', async (event) => {
  await reduceInventory(event.orderId);
});
```

## Governance Challenges in Microservices

### Challenge 1: Distributed Transactions
**Solution:** Use saga pattern with compensating transactions

### Challenge 2: Data Consistency
**Solution:** Eventual consistency with event sourcing

### Challenge 3: Service Dependencies
**Solution:** Circuit breakers and fallbacks

### Challenge 4: Governance Drift
**Solution:** Shared governance framework with service-specific customization

## Quality Gates for Microservices

```yaml
# Shared quality gates (.repo/repo.manifest.yaml)
budgets:
  all_services:
    api_response: 200ms     # p95
    error_rate: 1%          # Maximum
    availability: 99.9%
    
  api_gateway:
    requests_per_second: 10000
    
  individual_services:
    startup_time: 10s
    memory_usage: 512MB
    cpu_usage: 50%
```

## Deployment Strategies

### Blue-Green Deployment
1. Deploy new version (green)
2. Run smoke tests
3. Switch traffic to green
4. Keep blue for rollback

### Canary Deployment
1. Deploy to 10% of instances
2. Monitor metrics
3. Gradually increase to 100%
4. Rollback if issues detected

### Rolling Deployment
1. Deploy one instance at a time
2. Health check before next
3. Continue until all updated
4. Automatic rollback on failure

## Monitoring and Observability

### Health Checks
Each service exposes:
- `/health` - Basic health
- `/ready` - Readiness probe
- `/metrics` - Prometheus metrics

### Logging
Centralized logging with structured format:
```json
{
  "timestamp": "2026-01-22T22:00:00Z",
  "service": "order-service",
  "level": "info",
  "traceId": "abc123",
  "message": "Order created",
  "orderId": "123"
}
```

### Metrics
Key metrics per service:
- Request rate
- Error rate
- Response time (p50, p95, p99)
- Saturation (CPU, memory, disk)

## Security Considerations

### Service-to-Service Auth
- Mutual TLS (mTLS)
- API keys
- OAuth 2.0 client credentials

### Network Security
- Service mesh (Istio/Linkerd)
- Network policies
- VPC isolation

### Secrets Management
- Kubernetes secrets
- HashiCorp Vault
- AWS Secrets Manager

## Testing Strategy

### Unit Tests
- Test each service independently
- Mock external dependencies
- 80%+ coverage

### Integration Tests
- Test service interactions
- Use test doubles
- Verify contracts

### End-to-End Tests
- Test complete user flows
- Run in staging environment
- Smoke tests in production

### Contract Tests
- Consumer-driven contracts
- Verify API compatibility
- Prevent breaking changes

## Troubleshooting

### Service Can't Reach Another Service
Check network configuration and service discovery.

### High Latency
Review service communication patterns and add caching.

### Data Inconsistency
Verify event processing and implement compensating transactions.

## Next Steps

1. **Review architecture** - Understand service boundaries
2. **Start services** - Run locally with Docker Compose
3. **Test communication** - Call services via API Gateway
4. **Add monitoring** - Set up logging and metrics
5. **Deploy** - Use Kubernetes manifests provided

## Related Examples

- [Monorepo Example](../monorepo/) - Single repository
- [Polyrepo Example](../polyrepo/) - Multiple repositories
- [Full-Stack Example](../fullstack/) - Traditional architecture

---

**Status:** Complete working example  
**Complexity:** Very High  
**Best For:** Large-scale distributed systems with multiple services  
**Time to Setup:** 90 minutes
