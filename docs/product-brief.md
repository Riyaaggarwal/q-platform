# Product Brief

## Working Name

**Q-Platform** should be the company and platform name.

**Q-Collab** should become the collaboration product surface inside the platform:
workspaces, peer review, comments, reproducibility, shared datasets, and reports.

This avoids splitting the story into two products too early. The market message becomes:

> Q-Platform helps teams prove where quantum-ready optimization is useful.

## One-Liner

Q-Platform is a collaborative experimentation platform that turns optimization
problems into reproducible benchmarks across classical, quantum, and
quantum-inspired solvers.

## Stronger Positioning

Most quantum software either serves algorithm experts or hides the hard parts behind
demo abstractions. Q-Platform should sit between research and deployment:

- visual enough for domain experts to understand the model,
- rigorous enough for researchers to trust the experiment,
- operational enough for industry teams to make decisions.

## Platform Vision

Q-Platform should become the **Canva or Atlassian-style work platform for quantum
teams**: one place where researchers, engineers, consultants, and decision makers can
create, run, review, automate, and publish quantum work.

The core modules should stay memorable:

- **Q-Model**: build optimization models, quantum circuits, anomaly workflows, and
  reusable templates.
- **Q-Bench**: benchmark classical, quantum, quantum-inspired, and future SNN methods
  against shared metrics.
- **Q-Collab**: manage reviews, comments, approvals, workspaces, permissions, and shared
  evidence packages.
- **Q-Repos**: version datasets, models, circuits, parameters, runs, reports, and
  provenance.
- **Q-Automate**: schedule sweeps, trigger CI/CD checks, monitor hardware queues, guard
  budgets, detect dataset drift, and generate reports.

The GitHub-like repository model is the backbone. The product experience should still
feel like a single integrated platform, not a developer-only source-control clone.

## Launch Narrative

The investor/customer hook:

> Quantum teams are stuck between notebooks, cloud consoles, spreadsheets, and slide
> decks. Q-Platform gives them one collaborative workspace to turn quantum experiments
> into reproducible evidence.

The first wedge is optimization benchmarking, but the larger platform expands into
circuits, anomaly detection, simulation workflows, hardware evaluation, automated
reports, and team governance.

## Competitive Focus

Do not compete head-on as "another broad quantum workbench." Existing platforms already
cover cloud access, notebooks, circuit design, jobs, provider catalogs, and developer
environments.

Q-Platform should focus on the under-served pain:

- Can we trust this quantum result?
- Did it beat the right classical baseline?
- Can another team reproduce it?
- What did the hardware run cost?
- Is the claim safe to show leadership, customers, investors, or reviewers?
- Should we continue funding this use case?

This is the wedge: **Q-Platform is the trust and evidence layer for quantum work.**

The product should still include Q-Model, Q-Bench, Q-Collab, Q-Repos, Circuit Studio,
and Q-Automate, but those modules should serve the evidence mission. The goal is not to
be the broadest quantum IDE. The goal is to be the place where teams decide whether a
quantum method is real, reproducible, and worth more investment.

## Pain Points To Own

1. **Baseline fairness**
   Most quantum PoCs are weak because the classical comparison is too soft. Q-Bench
   should make strong baselines mandatory.

2. **Reproducibility**
   Every dataset, seed, SDK version, backend, queue condition, circuit, and parameter
   choice should be captured.

3. **Claim governance**
   Teams need to review claims before they become slides, papers, customer reports, or
   funding asks.

4. **Cost confidence**
   Hardware spend, simulator cost, queue time, and rerun budgets should be visible next
   to value estimates.

5. **Decision readiness**
   The output is not just a chart. It is a recommendation: stop, rerun, publish, pilot,
   or fund the next phase.

## Product Bet

The most defensible first product is **Q-Trust + Q-Bench**:

- Q-Bench runs the comparisons.
- Q-Trust judges whether the evidence is good enough.
- Q-Collab turns that judgment into a review workflow.
- Q-Automate keeps evidence fresh as data, solvers, and hardware change.

That is narrower than "all-in-one quantum platform," but much easier to sell and much
harder for generic platforms to copy deeply.

## Target Users

- Quantum researchers validating new algorithms against serious baselines.
- Industry innovation teams testing optimization use cases before committing budget.
- Operations teams with scheduling, routing, portfolio, logistics, energy, or resource
  allocation problems.
- Consultants and labs producing reproducible studies for customers or grant-funded
  projects.

## MVP Wedge

Start with optimization benchmarking, not every quantum workflow.

The MVP should support:

- importing or building an optimization model,
- attaching datasets,
- selecting classical and quantum solver runs,
- comparing outputs with transparent metrics,
- sharing the full workflow with collaborators.

Good first problem templates:

- portfolio optimization,
- vehicle routing or delivery assignment,
- job-shop scheduling,
- energy dispatch,
- max-cut and graph partitioning.

## Product Loop

The app should make one repeatable loop feel obvious:

1. Capture a commercial or research hypothesis.
2. Turn it into a constrained optimization model.
3. Run trusted classical baselines first.
4. Add quantum, quantum-inspired, and future SNN solvers through adapters.
5. Compare quality, runtime, cost, feasibility, and reproducibility.
6. Ask reviewers whether the evidence is decision-grade.
7. Export a report that explains whether the use case deserves more investment.

That loop is the product. The quantum integrations are powerful, but they are not the
whole company.

## GitHub-Style Product Model

The clearest product metaphor is **GitHub for optimization evidence**.

Users should not feel like they are filling out a dashboard. They should feel like they
are working in a durable repository where every scientific and business decision is
versioned.

Core objects:

- **Q-Repo**: a repository for one optimization use case. It contains model files,
  datasets, solver plans, run artifacts, reviews, and decision reports.
- **Branch**: an experiment variant, such as `qaoa-sweep`, `hybrid-anneal`, or
  `baseline-local-search`.
- **Commit**: a change to the model, dataset, constraints, solver parameters, or report.
- **Q-Checks**: solver runs that behave like CI checks. Classical baselines, Qiskit,
  Braket, annealing, and future SNN adapters all report normalized status and metrics.
- **Q-Review**: a pull-request-like review where teammates inspect baseline fairness,
  constraint validity, reproducibility, cost, and result quality.
- **Merge Evidence**: accepted experiment evidence becomes part of the canonical report
  on `main`.

The day-to-day user flow:

1. Create a Q-Repo from a template.
2. Add or import datasets.
3. Commit model and constraint changes.
4. Create a branch for an experiment variant.
5. Run Q-Checks across selected solvers.
6. Open a Q-Review for the evidence.
7. Resolve comments and rerun checks.
8. Merge evidence into the decision report.

This makes Q-Platform familiar to technical teams while still being specialized for
optimization and quantum evaluation.

## Quantum Circuit Creation

Circuit creation should not be a separate toy editor. It should be part of the Q-Repo.

A user can create circuits in three ways:

- **Visual circuit studio**: drag gates, parameter blocks, measurement operations, and
  feature maps onto qubit lanes.
- **Code-native import**: import Qiskit, PennyLane, Braket, OpenQASM, or internal circuit
  files and render them as versioned artifacts.
- **Template generation**: create QAOA, VQE, quantum-kernel, amplitude-estimation, or
  annealing-compatible workflows from problem templates.

Each circuit commit should track:

- qubit count,
- gate depth,
- two-qubit gate count,
- parameter count,
- target backend compatibility,
- estimated runtime and cost,
- simulator result,
- hardware result when available.

The key product move is that circuits are reviewed like code. A reviewer should be able
to comment on an ansatz, feature map, encoding choice, depth, noise sensitivity, or
hardware budget before the experiment is merged.

## Quantum Anomaly Detection

Anomaly detection can become a strong applied workflow because it maps naturally to
industry data: grid telemetry, finance transactions, manufacturing signals, cyber logs,
and sensor streams.

From a quantum point of view, Q-Platform should support several routes:

- **Quantum kernel anomaly detection**: encode data into quantum feature maps, compute
  similarity kernels, and compare against one-class SVM or kernel methods.
- **Variational quantum classifiers**: train parameterized circuits against labeled
  anomalies when labels exist.
- **Quantum-inspired distance search**: use annealing or hybrid solvers to identify
  unusual clusters or constraint-breaking states.
- **Amplitude and state encoding studies**: evaluate whether a data representation
  produces separability or signal compression worth further investigation.

Every workflow must compare against classical detectors: isolation forest, one-class
SVM, robust covariance, autoencoders, and rules. Without this baseline discipline, the
platform becomes a demo machine instead of decision infrastructure.

## CI/CD For Experiments

CI/CD should mean "continuous integration and delivery of evidence."

When a user commits to a branch, Q-Checks should run automatically:

- model schema validation,
- dataset checksum and drift checks,
- circuit linting,
- simulator smoke tests,
- hardware compatibility checks,
- estimated queue time and budget checks,
- classical baseline checks,
- reproducibility checks,
- security and secret scanning,
- report contract validation.

Merge rules should be configurable:

- require classical baseline,
- require simulator result before hardware run,
- require approval for spend above a threshold,
- require repeatability across seeds,
- require reviewer signoff before a report becomes canonical.

This is where Q-Platform can feel much more serious than a notebook workflow.

## Automation Layer

Automations should be a headline feature, not a hidden settings page.

Useful first automations:

- nightly benchmark sweeps,
- hardware budget guards,
- dataset drift monitors,
- anomaly detection refreshes,
- required check reruns after model changes,
- report generation after review approval,
- reviewer notifications when evidence is ready,
- backend queue monitoring for Qiskit Runtime, AWS Braket, D-Wave, and local simulators.

This is how Q-Platform becomes sticky: once teams trust it to run recurring experiments,
monitor results, and produce reports, it becomes part of their operating cadence.

## First Product Promise

Before a customer spends six months on a quantum proof of concept, Q-Platform should
help them answer:

- Is this problem formulated well enough to benchmark?
- What is the strongest classical baseline?
- Does any quantum or quantum-inspired route outperform it on a meaningful metric?
- Is the result reproducible enough to justify the next step?
- What would it cost to operationalize?

## Why Now

- Quantum hardware is improving, but value claims remain hard to verify.
- Enterprises are exploring quantum but need fair comparisons to classical baselines.
- Qiskit, Braket, PennyLane, D-Wave, and custom solvers create fragmented workflows.
- Reproducibility and collaboration are still mostly stitched together through notebooks,
  cloud files, and ad hoc dashboards.

## Differentiation

- Treat classical baselines as first-class, not as an afterthought.
- Make reproducibility a core object: dataset, model, parameters, backend, logs, costs,
  results, comments, and report all travel together.
- Bridge visual modeling and code-native workflows.
- Track experiment provenance like Git, but designed for optimization science.
- Provide decision-grade comparisons, not just raw quantum circuit output.

## Company Moat

The long-term moat is an experiment knowledge graph:

- problem formulations,
- dataset characteristics,
- solver performance across problem families,
- parameter settings,
- backend behavior,
- cost and quality tradeoffs,
- team annotations and expert review.

Over time, this becomes a recommendation system for choosing modeling strategies and
solver paths.

## Naming System

- **Q-Platform**: the product and company.
- **Q-Collab**: collaborative workspace, review, comments, sharing.
- **Q-Bench**: benchmarking engine and dashboards.
- **Q-Flow**: workflow orchestration and reproducibility.
- **Q-Model**: visual and code model builder.

These names are placeholders, but the hierarchy is useful.
