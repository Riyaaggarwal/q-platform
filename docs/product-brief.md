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
