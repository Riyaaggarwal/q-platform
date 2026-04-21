# Architecture

## Product Architecture

```text
User Interfaces
  Web App
  Notebook/Jupyter Extension
  CLI
  API Clients

API Gateway
  Auth
  Rate Limits
  Request Routing

Core Platform
  Workspace Service
  Experiment Service
  Model Registry
  Dataset Registry
  Provenance Engine
  Benchmark Engine
  Solver Orchestrator
  Report Builder

Solver Layer
  Classical Optimizers
  Qiskit
  AWS Braket
  D-Wave / Annealing
  PennyLane
  Custom Backend Adapters
  Future: SNN / Neuromorphic Solvers

Storage and Infra
  PostgreSQL for metadata
  Object storage for datasets, run artifacts, logs
  Redis for caching and queues
  Worker pool for solver jobs
  Search index for workspaces and reports
```

## Suggested Production Stack

This prototype is dependency-free. A production path could be:

- Frontend: Next.js or React Router, TypeScript, Tailwind or a design system.
- API: FastAPI or NestJS.
- Workers: Celery/RQ, Temporal, or AWS Step Functions.
- Metadata: PostgreSQL.
- Artifacts: S3-compatible storage.
- Auth: Auth0, WorkOS, or Cognito depending on customer segment.
- Quantum integrations: Qiskit Runtime, AWS Braket SDK, D-Wave Ocean, PennyLane.
- Reproducibility: pinned container images, environment hashes, dataset checksums.

## Core Technical Principle

Every experiment should be reproducible as a durable bundle:

```text
Experiment = Problem + Dataset + Model + Solver Plan + Parameters + Environment
             + Run Logs + Results + Metrics + Human Review
```

## MVP Boundary

Do not build full quantum infrastructure first.

Build:

- a clean experiment object model,
- a visual problem builder for 2-3 optimization templates,
- local/classical solver simulation stubs,
- backend adapter interfaces,
- comparison dashboards,
- collaboration and report workflows.

Then add real backend execution behind the same interface.

## Backend Adapter Shape

Each solver adapter should expose:

- capabilities,
- input schema,
- validation,
- estimated cost,
- run submission,
- run status,
- artifact collection,
- normalized metrics.

This lets the product compare Qiskit, Braket, D-Wave, local heuristics, and future SNN
solvers without redesigning the user experience.
