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

const comments = [
  ["Riya", "Need a repeatability panel before we show this to a customer."],
  ["Maya", "Classical baseline should include the stronger local-search variant."],
  ["Dev", "Backend adapters are normalized enough for Qiskit and Braket next."]
];

let activeTemplate = "energy";
let activeView = "workspace";
let selectedMetric = "quality";
let selectedSolvers = new Set(baseRuns.map((run) => run.id));

const modelCanvas = document.querySelector("#modelCanvas");
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
  resultRows.innerHTML = getActiveRuns()
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
  document.querySelector("#statusProblem").textContent = data.name;
  document.querySelector("#statusDataset").textContent = data.dataset;
  document.querySelector("#statusSolvers").textContent = `${selectedSolvers.size} selected`;
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
  drawResults();
  renderRows();
  renderComments();
}

document.querySelectorAll(".template-card").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".template-card").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeTemplate = button.dataset.template;
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
  document.querySelector("#statusReview").textContent = "Benchmark complete";
  document.querySelector("#auditState").textContent = "New run captured with full provenance";
  baseRuns.forEach((run, index) => {
    run.quality = Math.min(98, run.quality + (index % 2 === 0 ? 1 : 2));
    run.runtime = Math.max(24, run.runtime - (index + 1) * 2);
  });
  render();
});

document.querySelector("#reviewButton").addEventListener("click", () => {
  document.querySelector("#statusReview").textContent = "Review requested";
  comments.unshift(["System", "Review request sent to workspace reviewers."]);
  renderComments();
});

document.querySelector("#exportButton").addEventListener("click", () => {
  document.querySelector("#reportBadge").textContent = "Ready to share";
  document.querySelector("#statusReview").textContent = "Report ready";
});

render();
