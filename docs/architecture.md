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
  Q-Repo Service
  Experiment Service
  Q-Trust Service
  Automation Service
  Circuit Registry
  Model Registry
  Dataset Registry
  Provenance Engine
  CI/CD Check Engine
  Benchmark Engine
  Solver Orchestrator
  Report Builder

Solver Layer
  Classical Optimizers
  Qiskit
  AWS Braket
  D-Wave / Annealing
  PennyLane
  OpenQASM Import/Export
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

## CI/CD Check Engine

Q-Checks are the product equivalent of GitHub Actions for scientific workflows.

Checks should run on every branch commit and review:

- model compile,
- dataset validation,
- circuit lint,
- simulator smoke test,
- hardware compatibility,
- budget approval,
- baseline comparison,
- reproducibility capture,
- report readiness.

Each check writes structured status, logs, artifacts, metrics, and reviewer-facing
summaries back to the Q-Repo.

## Automation Service

Q-Automate should coordinate recurring and event-based work:

- scheduled benchmark sweeps,
- branch or commit-triggered check runs,
- report generation,
- hardware budget approvals,
- backend queue monitoring,
- dataset drift detection,
- reviewer notifications,
- publish/export workflows.

The automation service should treat every action as auditable provenance. If an
automation updates a report, submits a backend job, or changes workflow status, the
Q-Repo timeline should show what happened, why, and which artifacts were produced.

## Q-Trust Service

Q-Trust is the differentiating service. It evaluates whether an experiment is safe to
promote into a business or research claim.

Inputs:

- baseline strength,
- reproducibility metadata,
- run variance across seeds,
- dataset checksum and drift,
- backend and hardware conditions,
- cost and queue estimates,
- reviewer approvals,
- report completeness.

Outputs:

- baseline fairness score,
- reproducibility score,
- cost confidence,
- claim risk,
- required next checks,
- decision recommendation.

## Circuit Registry

The circuit registry stores quantum circuits as versioned repo artifacts.

Supported representations should include:

- visual graph model for the UI,
- OpenQASM for portability,
- Qiskit circuit import/export,
- Braket circuit import/export,
- PennyLane template import/export,
- backend-specific transpilation artifacts.

This registry is also where gate depth, qubit count, backend support, noise assumptions,
and hardware cost estimates should live.
