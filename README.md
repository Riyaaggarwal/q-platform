# Q-Platform

Q-Platform is a collaborative experimentation platform for quantum-ready optimization.
It helps research and industry teams model optimization problems, run classical and
quantum methods, compare evidence, and share reproducible workflows in one place.

The product combines two ideas:

- **Q-Platform**: the operating system for optimization experiments, datasets, solvers,
  benchmarking, provenance, and decision support.
- **Q-Collab**: the workspace layer for teams, peer review, comments, notebooks,
  experiment templates, and publication or customer-ready reporting.

The early wedge is not "generic quantum collaboration." It is a practical question:

> When does a quantum or quantum-inspired method create measurable value over strong
> classical baselines for a real optimization problem?

## Repo Contents

- `app/` - a dependency-free web prototype for the Q-Platform product experience.
- `docs/product-brief.md` - positioning, target users, wedge, moat, and product shape.
- `docs/architecture.md` - system architecture and technical direction.
- `docs/roadmap.md` - MVP-to-company roadmap.
- `docs/data-model.md` - first-pass domain model for experiments and collaboration.
- `scripts/serve.mjs` - tiny local static server.

## Run Locally

From this repo:

```bash
node scripts/serve.mjs
```

Then open:

```text
http://localhost:5173
```

You can also open `app/index.html` directly in a browser.

## Product Thesis

Quantum computing adoption is blocked less by curiosity and more by proof. Teams need
a trusted way to translate real business or research problems into optimization
models, run fair benchmarks across solvers, and produce decision-grade evidence.

Q-Platform should become the evidence layer between quantum algorithms and operational
decisions.

## Near-Term Build Priorities

1. Model common optimization problems visually and as portable code artifacts.
2. Run classical baselines first, then quantum and quantum-inspired backends.
3. Compare quality, runtime, cost, constraints, and reproducibility in one place.
4. Package every run as a shareable workflow with datasets, parameters, logs, and notes.
5. Make collaboration feel native: review, comments, templates, permissions, reports.

## Future Expansion

The SNN app can become an adjacent module later: a neuromorphic/AI solver track for
spiking neural network approaches to optimization, simulation, or control. For now,
the platform should stay anchored on optimization benchmarking so the company story
does not sprawl too early.
