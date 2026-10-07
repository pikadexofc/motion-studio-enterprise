---
name: saas-product-engineering
description: Decoupled job queues, render worker isolation, API contracts, cloud storage abstraction, and observability for video SaaS.
---

# SaaS Product Engineering

## Activation
Activate when designing backend services, job queue interfaces (Redis/BullMQ), render worker lifecycle, storage abstractions (S3/GCS), or API schemas.

## Distributed Render Worker Pattern
```
[Client Web App] ---> [API Gateway / Fastify] ---> [Redis Job Queue]
                                                           |
                                              [Worker Pool (Puppeteer + FFmpeg)]
                                                           |
                                               [Object Storage S3/GCS]
```

## Security & Sandboxing
- Headless Chrome running user-generated compositions must run in an isolated sandbox with network access restricted (`--disable-web-security` strictly banned).
- File system access restricted to the project root directory.
- Hard timeout limits (e.g. 120s max execution per render job).
