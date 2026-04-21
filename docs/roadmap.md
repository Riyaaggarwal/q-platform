# Roadmap

## Phase 0: Narrative and Prototype

- Clarify Q-Platform as the main product and Q-Collab as the collaboration layer.
- Build a clickable prototype that shows the experiment lifecycle.
- Interview 10-15 quantum researchers, innovation leads, and optimization users.
- Pick one flagship problem family for the first technical demo.

## Phase 1: MVP

- Workspace and project structure.
- Create Q-Repo flow with templates for optimization, anomaly detection, circuit validation, and simulation studies.
- Mock connector flow for notebooks, GitHub, datasets, and local simulation.
- Dataset upload and version metadata.
- Optimization template builder for portfolio, routing, and scheduling.
- Classical baseline runs with transparent metrics.
- Stubbed quantum backend adapters that preserve the future architecture.
- Experiment comparison dashboard.
- Comments, review status, and shareable reports.
- Commercial hypothesis intake: decision owner, value target, risk to prove.
- Evidence score that tracks whether a workflow is ready for customer or internal review.
- Keep Q-Model, Q-Bench, Q-Collab, Q-Repos, and Q-Automate as visible product modules.
- Add basic automations: nightly sweep, budget guard, report generator, and check reruns.
- Add Q-Trust: baseline fairness score, reproducibility score, claim risk, and decision gate.
- Make every report end with one recommendation: stop, rerun, publish, pilot, or fund.
- Claim Ledger with claim owner, evidence status, risk, and promotion state.
- Evidence Pack checklist and restricted Data Room sharing flow.
- Baseline Audit queue for mandatory classical comparisons.

## Phase 2: Real Integrations

- Qiskit Runtime integration.
- AWS Braket integration.
- D-Wave Ocean integration if annealing use cases are in scope.
- GitHub sync and notebook parser.
- Dataset connector with checksums and lineage.
- Job queue and artifact storage.
- Environment pinning and run reproducibility.
- Organization permissions and audit trail.
- Notebook import from Qiskit, PennyLane, Braket, and Python workflows.
- Circuit registry with OpenQASM import/export.

## Phase 3: Enterprise Value

- Cost and runtime forecasting.
- Solver recommendation based on problem shape.
- Governance, compliance, and private deployment options.
- Customer-ready benchmark reports.
- Template marketplace for common optimization workflows.
- Automation marketplace for repeatable quantum research operations.

## Phase 4: Intelligence Layer

- Experiment knowledge graph.
- Automated baseline selection.
- Parameter sweep recommendations.
- Natural language experiment summaries.
- Future SNN/neuromorphic solver track.

## Founder Notes

The company should avoid becoming a "quantum dashboard." The sharper opportunity is
decision infrastructure: a trusted way to decide whether a quantum, quantum-inspired,
or classical method is worth using for a real optimization problem.

The wedge should be proof quality. Other platforms can provide access, notebooks,
circuits, and jobs. Q-Platform should own the moment when someone asks: "Can we trust
this result enough to make a decision?"

The first demo should make one thing obvious: a messy quantum PoC enters Q-Platform,
and a decision-ready evidence pack comes out.

Near-term founder discipline:

- Sell the value of better decisions, not the novelty of quantum.
- Keep workflows reproducible from day one.
- Make classical baselines excellent so quantum results are credible.
- Pick one or two industries for early proof, likely energy and logistics.
- Treat SNN as an expansion path once the solver adapter layer is real.
