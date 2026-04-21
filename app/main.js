const templates = {
  energy: {
    name: "Energy dispatch",
    dataset: "grid-load-v3.csv",
    nodes: [
      ["Load forecast", 110, 90, "#3a6f90"],
      ["Battery fleet", 360, 90, "#0c8f8f"],
      ["Price signal", 610, 90, "#d7951d"],
      ["Objective", 235, 250, "#6d4568"],
      ["Constraints", 500, 250, "#c95538"]
    ],
    edges: [
      [0, 3],
      [1, 3],
      [2, 3],
      [1, 4],
      [2, 4]
    ],
    summary:
      "Annealing-compatible search is producing a better objective value than the first classical baseline, but the team needs repeatability checks before claiming advantage."
  },
  portfolio: {
    name: "Portfolio QUBO",
    dataset: "portfolio-risk-2026.parquet",
    nodes: [
      ["Assets", 120, 95, "#3a6f90"],
      ["Risk model", 360, 95, "#6d4568"],
      ["Exposure caps", 610, 95, "#c95538"],
      ["QUBO objective", 235, 255, "#0c8f8f"],
      ["Scenario sweep", 500, 255, "#d7951d"]
    ],
    edges: [
      [0, 3],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4]
    ],
    summary:
      "The quantum-inspired route improves diversification under tight exposure caps, while the classical baseline remains the fastest option for simple risk settings."
  },
  routing: {
    name: "Fleet routing",
    dataset: "delivery-windows-v5.csv",
    nodes: [
      ["Stops", 120, 95, "#3a6f90"],
      ["Vehicles", 360, 95, "#0c8f8f"],
      ["Time windows", 610, 95, "#c95538"],
      ["Route cost", 235, 255, "#6d4568"],
      ["Penalty model", 500, 255, "#d7951d"]
    ],
    edges: [
      [0, 3],
      [1, 3],
      [2, 4],
      [3, 4],
      [1, 4]
    ],
    summary:
      "The strongest result comes from a hybrid route that uses classical pruning before quantum-inspired sampling on hard assignment clusters."
  }
};

const baseRuns = [
  { id: "classical", run: "Baseline MIP", backend: "Local classical", quality: 88, runtime: 42, cost: 3, status: "Complete" },
  { id: "qiskit", run: "QAOA sweep", backend: "Qiskit Runtime", quality: 83, runtime: 118, cost: 34, status: "Complete" },
  { id: "braket", run: "Sampler job", backend: "AWS Braket", quality: 86, runtime: 132, cost: 41, status: "Complete" },
  { id: "annealing", run: "Annealing search", backend: "Hybrid adapter", quality: 93, runtime: 76, cost: 16, status: "Complete" }
];

const circuits = {
  qaoa: {
    badge: "12 qubits",
    gates: ["H", "RZ", "CX", "RZZ", "RX", "MEASURE"],
    summary: "QAOA ansatz committed for optimization checks."
  },
  kernel: {
    badge: "8 qubits",
    gates: ["H", "RY", "RZ", "ZZFeatureMap", "CX", "MEASURE"],
    summary: "Quantum kernel feature map committed for anomaly detection."
  },
  vqe: {
    badge: "10 qubits",
    gates: ["RY", "RZ", "CX", "RY", "CX", "MEASURE"],
    summary: "VQE trial state committed for simulator smoke tests."
  }
};

const comments = [
  ["Riya", "PR #14 needs repeatability checks before we merge this into the decision report."],
  ["Maya", "Please add the stronger local-search baseline as a required check."],
  ["Dev", "Qiskit and Braket adapters are normalized enough to compare artifacts."]
];

const workspaces = {
  energy: {
    ownerName: "GridLab Ventures",
    repo: "battery-dispatch",
    description: "Benchmark quantum-ready methods against classical dispatch baselines.",
    study: "Battery fleet dispatch",
    copy: "Testing whether quantum-inspired search improves dispatch cost under grid constraints.",
    template: "energy",
    owner: "VP Grid Operations",
    value: "Reduce dispatch cost by 8-12%",
    risk: "Quantum route must beat tuned classical baseline.",
    estimate: "$4.8M"
  },
  finance: {
    ownerName: "Northstar Quant",
    repo: "portfolio-qubo",
    description: "Validate QUBO portfolio allocation against risk-aware classical baselines.",
    study: "Portfolio risk allocation",
    copy: "Measuring whether QUBO formulations improve allocation quality under exposure caps.",
    template: "portfolio",
    owner: "Head of Quant Research",
    value: "Improve risk-adjusted return by 3-5%",
    risk: "Hybrid search must stay explainable to the investment committee.",
    estimate: "$2.1M"
  }
};

const branches = {
  main: {
    commit: "a18c9f2",
    label: "main",
    queue: "Run required checks on main",
    status: "Accepted evidence"
  },
  "qaoa-sweep": {
    commit: "d72ab04",
    label: "qaoa-sweep",
    queue: "Run Qiskit parameter sweep checks",
    status: "Review open"
  },
  "hybrid-anneal": {
    commit: "f04e7c1",
    label: "hybrid-anneal",
    queue: "Run hybrid annealing repeatability checks",
    status: "Changes requested"
  }
};

let activeTemplate = "energy";
let activeView = "workspace";
let activeWorkspace = "energy";
let activeBranch = "main";
let activeCircuit = "qaoa";
let selectedMetric = "quality";
let selectedSolvers = new Set(baseRuns.map((run) => run.id));

const modelCanvas = document.querySelector("#modelCanvas");
const circuitCanvas = document.querySelector("#circuitCanvas");
const resultCanvas = document.querySelector("#resultCanvas");
const resultRows = document.querySelector("#resultRows");
const commentList = document.querySelector("#commentList");

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawModel() {
  const ctx = modelCanvas.getContext("2d");
  const data = templates[activeTemplate];
  ctx.clearRect(0, 0, modelCanvas.width, modelCanvas.height);
  ctx.fillStyle = "#fbfdfc";
  ctx.fillRect(0, 0, modelCanvas.width, modelCanvas.height);

  data.edges.forEach(([from, to]) => {
    const a = data.nodes[from];
    const b = data.nodes[to];
    ctx.strokeStyle = "#9badad";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(a[1], a[2] + 28);
    ctx.lineTo(b[1], b[2] - 28);
    ctx.stroke();
  });

  data.nodes.forEach(([label, x, y, color]) => {
    drawRoundedRect(ctx, x - 88, y - 28, 176, 56, 8);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = "700 14px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
  });
}

function drawCircuit() {
  const ctx = circuitCanvas.getContext("2d");
  const circuit = circuits[activeCircuit];
  const lanes = activeCircuit === "kernel" ? 5 : 6;
  ctx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
  ctx.fillStyle = "#fbfdfc";
  ctx.fillRect(0, 0, circuitCanvas.width, circuitCanvas.height);

  for (let lane = 0; lane < lanes; lane += 1) {
    const y = 62 + lane * 46;
    ctx.strokeStyle = "#9badad";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(58, y);
    ctx.lineTo(704, y);
    ctx.stroke();
    ctx.fillStyle = "#5f6f76";
    ctx.font = "700 13px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`q${lane}`, 42, y + 4);
  }

  circuit.gates.forEach((gate, index) => {
    const x = 105 + index * 96;
    const y = 62 + (index % lanes) * 46;
    drawRoundedRect(ctx, x - 27, y - 18, 54, 36, 8);
    ctx.fillStyle = gate === "MEASURE" ? "#fff9ed" : "#ffffff";
    ctx.fill();
    ctx.strokeStyle = gate === "MEASURE" ? "#d7951d" : "#6d4568";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = gate === "MEASURE" ? "#7a4f00" : "#6d4568";
    ctx.font = gate.length > 5 ? "700 9px Inter, system-ui, sans-serif" : "800 13px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(gate, x, y + 1);

    if (gate === "CX" || gate === "RZZ") {
      const y2 = 62 + ((index + 1) % lanes) * 46;
      ctx.strokeStyle = "#6d4568";
      ctx.beginPath();
      ctx.moveTo(x, y + 18);
      ctx.lineTo(x, y2 - 18);
      ctx.stroke();
    }
  });
}

function getActiveRuns() {
  return baseRuns.filter((run) => selectedSolvers.has(run.id));
}

function drawResults() {
  const ctx = resultCanvas.getContext("2d");
  const runs = getActiveRuns();
  const metricMax = selectedMetric === "quality" ? 100 : Math.max(...runs.map((run) => run[selectedMetric]), 1);
  const colors = ["#0c8f8f", "#6d4568", "#d7951d", "#c95538"];

  ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  ctx.fillStyle = "#fbfdfc";
  ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);

  if (!runs.length) {
    ctx.fillStyle = "#5f6f76";
    ctx.font = "700 18px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Select at least one solver to compare results.", resultCanvas.width / 2, 180);
    return;
  }

  ctx.strokeStyle = "#dce5e5";
  ctx.lineWidth = 1;

  for (let i = 0; i < 4; i += 1) {
    const y = 58 + i * 70;
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(850, y);
    ctx.stroke();
  }

  runs.forEach((run, index) => {
    const barHeight = (run[selectedMetric] / metricMax) * 210;
    const x = 125 + index * 180;
    const y = 285 - barHeight;
    drawRoundedRect(ctx, x, y, 92, barHeight, 8);
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();
    ctx.fillStyle = "#172026";
    ctx.font = "700 14px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(run[selectedMetric]), x + 46, y - 12);
    ctx.fillStyle = "#5f6f76";
    ctx.font = "600 13px Inter, system-ui, sans-serif";
    ctx.fillText(run.run, x + 46, 320);
  });
}

function renderRows() {
  const runs = getActiveRuns();
  if (!runs.length) {
    resultRows.innerHTML = `
      <tr>
        <td colspan="6">No solvers selected.</td>
      </tr>
    `;
    return;
  }

  resultRows.innerHTML = runs
    .map(
      (run) => `
        <tr>
          <td>${run.run}</td>
          <td>${run.backend}</td>
          <td>${run.quality}</td>
          <td>${run.runtime}s</td>
          <td>$${run.cost}</td>
          <td>${run.status}</td>
        </tr>
      `
    )
    .join("");
}

function renderComments() {
  commentList.innerHTML = comments
    .map(
      ([name, text]) => `
        <article class="comment-card">
          <strong>${name}</strong>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
}

function updateStatus() {
  const data = templates[activeTemplate];
  const workspace = workspaces[activeWorkspace];
  const branch = branches[activeBranch];
  const evidence = Math.min(96, 54 + selectedSolvers.size * 5 + comments.length * 2);
  document.querySelector("#repoOwner").textContent = workspace.ownerName;
  document.querySelector("#repoName").textContent = workspace.repo;
  document.querySelector("#repoDescription").textContent = workspace.description;
  document.querySelector("#repoBranch").textContent = branch.label;
  document.querySelector("#repoCommit").textContent = branch.commit;
  document.querySelector("#branchBadge").textContent = branch.label;
  document.querySelector("#statusProblem").textContent = data.name;
  document.querySelector("#statusDataset").textContent = data.dataset;
  document.querySelector("#statusSolvers").textContent = `${selectedSolvers.size} selected`;
  document.querySelector("#statusEvidence").textContent = `${evidence}%`;
  document.querySelector("#reportSummary").textContent = data.summary;
}

function updateView() {
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    const views = panel.dataset.panel.split(" ");
    panel.dataset.hidden = views.includes(activeView) ? "false" : "true";
  });
}

function render() {
  updateStatus();
  updateView();
  drawModel();
  drawCircuit();
  drawResults();
  renderRows();
  renderComments();
}

document.querySelectorAll(".template-card").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".template-card").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeTemplate = button.dataset.template;
    document.querySelector("#queueTitle").textContent =
      activeTemplate === "routing" ? "Run routing cluster checks" : branches[activeBranch].queue;
    render();
  });
});

document.querySelectorAll(".workspace-choice").forEach((button) => {
  button.addEventListener("click", () => {
    const workspace = workspaces[button.dataset.workspace];
    activeWorkspace = button.dataset.workspace;
    activeTemplate = workspace.template;

    document.querySelectorAll(".workspace-choice").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".template-card").forEach((item) => {
      item.classList.toggle("active", item.dataset.template === activeTemplate);
    });

    document.querySelector("#sidebarStudy").textContent = workspace.study;
    document.querySelector("#sidebarStudyCopy").textContent = workspace.copy;
    document.querySelector("#ownerInput").value = workspace.owner;
    document.querySelector("#valueInput").value = workspace.value;
    document.querySelector("#riskInput").value = workspace.risk;
    document.querySelector("#valueEstimate").textContent = workspace.estimate;
    document.querySelector("#repoVisibility").textContent = "Private";
    comments.unshift(["System", `${workspace.ownerName}/${workspace.repo} loaded.`]);
    activeBranch = "main";
    document.querySelectorAll(".branch-row").forEach((item) => {
      item.classList.toggle("active", item.dataset.branch === activeBranch);
    });
    render();
  });
});

document.querySelectorAll(".branch-row").forEach((button) => {
  button.addEventListener("click", () => {
    activeBranch = button.dataset.branch;
    document.querySelectorAll(".branch-row").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("#queueTitle").textContent = branches[activeBranch].queue;
    document.querySelector("#statusReview").textContent = branches[activeBranch].status;
    comments.unshift(["System", `Checked out ${branches[activeBranch].label} at ${branches[activeBranch].commit}.`]);
    render();
  });
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeView = button.dataset.view;
    render();
  });
});

document.querySelectorAll(".circuit-template").forEach((button) => {
  button.addEventListener("click", () => {
    activeCircuit = button.dataset.circuit;
    document.querySelectorAll(".circuit-template").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("#circuitBadge").textContent = circuits[activeCircuit].badge;
    document.querySelector("#auditState").textContent = circuits[activeCircuit].summary;
    if (activeCircuit === "kernel") {
      document.querySelector("#statusProblem").textContent = "Quantum anomaly detection";
      document.querySelector("#detectorBadge").textContent = "Kernel selected";
    }
    render();
  });
});

document.querySelectorAll(".pipeline-step").forEach((button) => {
  button.addEventListener("click", () => {
    const viewByStep = {
      intake: "workspace",
      model: "model",
      benchmark: "circuit",
      review: "bench",
      decision: "report"
    };
    activeView = viewByStep[button.dataset.step];
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.view === activeView);
    });
    document.querySelectorAll(".pipeline-step").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    render();
  });
});

document.querySelectorAll("[data-solver]").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      selectedSolvers.add(checkbox.dataset.solver);
    } else {
      selectedSolvers.delete(checkbox.dataset.solver);
    }
    render();
  });
});

["ownerInput", "valueInput", "riskInput"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("change", () => {
    document.querySelector("#statusReview").textContent = "Hypothesis updated";
    document.querySelector("#auditState").textContent = "Commercial hypothesis changed after last run";
  });
});

document.querySelector("#metricSelect").addEventListener("change", (event) => {
  selectedMetric = event.target.value;
  drawResults();
});

document.querySelector("#commentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#commentInput");
  const value = input.value.trim();
  if (!value) return;
  comments.unshift(["You", value]);
  input.value = "";
  renderComments();
});

document.querySelector("#runButton").addEventListener("click", () => {
  document.querySelector("#statusReview").textContent = "Checks passed";
  document.querySelector("#auditState").textContent = "New run captured with full provenance";
  document.querySelector("#backendBadge").textContent = `${selectedSolvers.size} adapters used`;
  baseRuns.forEach((run, index) => {
    run.quality = Math.min(98, run.quality + (index % 2 === 0 ? 1 : 2));
    run.runtime = Math.max(24, run.runtime - (index + 1) * 2);
  });
  render();
});

document.querySelector("#reviewButton").addEventListener("click", () => {
  document.querySelector("#statusReview").textContent = "PR #14 open";
  document.querySelectorAll(".pipeline-step").forEach((item) => {
    item.classList.toggle("active", ["intake", "model", "benchmark", "review"].includes(item.dataset.step));
  });
  activeBranch = "hybrid-anneal";
  document.querySelectorAll(".branch-row").forEach((item) => {
    item.classList.toggle("active", item.dataset.branch === activeBranch);
  });
  comments.unshift(["System", "Opened PR #14 from hybrid-anneal into main."]);
  render();
});

document.querySelector("#queueButton").addEventListener("click", () => {
  document.querySelector("#queueTitle").textContent = "Checks queued with provenance lock";
  document.querySelector("#statusReview").textContent = "Checks queued";
  comments.unshift(["System", `Required checks queued for ${branches[activeBranch].label}.`]);
  render();
});

document.querySelector("#exportButton").addEventListener("click", () => {
  activeBranch = "main";
  document.querySelector("#reportBadge").textContent = "Merged to main";
  document.querySelector("#statusReview").textContent = "Evidence merged";
  document.querySelectorAll(".branch-row").forEach((item) => {
    item.classList.toggle("active", item.dataset.branch === activeBranch);
  });
  document.querySelectorAll(".pipeline-step").forEach((item) => item.classList.add("active"));
  comments.unshift(["System", "Merged reviewed evidence into main and updated the decision report."]);
  render();
});

render();
